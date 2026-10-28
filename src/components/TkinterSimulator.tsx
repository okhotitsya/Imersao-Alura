import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, Sparkles, Terminal, Percent } from 'lucide-react';

interface TkinterSimulatorProps {
  onHighlightLine?: (lineStart: number, lineEnd: number, title: string) => void;
}

export const TkinterSimulator: React.FC<TkinterSimulatorProps> = ({ onHighlightLine }) => {
  const [display, setDisplay] = useState<string>('');
  const [history, setHistory] = useState<string>('');
  const [lastAction, setLastAction] = useState<{
    func: string;
    description: string;
    codeLine: string;
    lineRange: [number, number];
  }>({
    func: 'janela.mainloop()',
    description: 'Calculadora iniciada com as 4 operações básicas e suporte a Porcentagem (%).',
    codeLine: 'janela.mainloop()',
    lineRange: [180, 195]
  });
  const [osStyle, setOsStyle] = useState<'windows' | 'mac'>('windows');

  const notifyAction = (
    func: string,
    description: string,
    codeLine: string,
    lineStart: number,
    lineEnd: number
  ) => {
    setLastAction({
      func,
      description,
      codeLine,
      lineRange: [lineStart, lineEnd]
    });
    if (onHighlightLine) {
      onHighlightLine(lineStart, lineEnd, func);
    }
  };

  const handleCharClick = (char: string) => {
    if (display.startsWith('Erro')) {
      setDisplay(char);
      notifyAction(
        `ao_clicar('${char}')`,
        `Visor tinha erro, foi limpo e recebeu '${char}'`,
        `visor_var.set('${char}')`,
        10,
        19
      );
      return;
    }

    const newDisplay = display + char;
    setDisplay(newDisplay);
    notifyAction(
      `ao_clicar('${char}')`,
      `Adicionou '${char}' ao visor via concatenação de texto`,
      `visor_var.set(texto_atual + '${char}')`,
      10,
      19
    );
  };

  const handleClear = () => {
    setDisplay('');
    setHistory('');
    notifyAction(
      'limpar()',
      'Limpou todo o visor atribuindo string vazia ""',
      'visor_var.set("")',
      21,
      24
    );
  };

  const handleBackspace = () => {
    if (!display || display.startsWith('Erro')) {
      setDisplay('');
      return;
    }
    const updated = display.slice(0, -1);
    setDisplay(updated);
    notifyAction(
      'apagar_ultimo()',
      'Apagou o último dígito usando o slice [:-1]',
      'visor_var.set(texto_atual[:-1])',
      26,
      29
    );
  };

  const handlePercentage = () => {
    if (!display || display.startsWith('Erro')) return;

    // Verifica se temos expressão composta (ex: 200 + 10 ou 500 - 25)
    const match = display.match(/^(.+?)([\+\-\×\÷])(\d+(?:\.\d+)?)$/);
    if (match) {
      const baseExpr = match[1];
      const operator = match[2];
      const percentVal = parseFloat(match[3]);

      try {
        const formattedBase = baseExpr.replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-eval
        const baseResult = Function(`"use strict"; return (${formattedBase})`)();
        const calculatedPercent = (baseResult * percentVal) / 100;
        const cleanPercent = Number.isInteger(calculatedPercent)
          ? calculatedPercent.toString()
          : parseFloat(calculatedPercent.toFixed(6)).toString();

        const newDisplay = `${baseExpr}${operator}${cleanPercent}`;
        setDisplay(newDisplay);
        notifyAction(
          'porcentagem()',
          `Calculou ${percentVal}% de ${baseResult} = ${cleanPercent}. O visor agora exibe "${newDisplay}". Clique em "=" para o resultado final!`,
          `valor_percentual = (${baseResult} * ${percentVal}) / 100 # ${cleanPercent}`,
          31,
          63
        );
      } catch {
        setDisplay('Erro');
      }
    } else {
      // Número simples (ex: 50 -> 0.5)
      try {
        const formatted = display.replace(/×/g, '*').replace(/÷/g, '/');
        // eslint-disable-next-line no-eval
        const val = Function(`"use strict"; return (${formatted})`)();
        const res = val / 100;
        const cleanRes = Number.isInteger(res)
          ? res.toString()
          : parseFloat(res.toFixed(6)).toString();
        setDisplay(cleanRes);
        notifyAction(
          'porcentagem()',
          `Converteu ${val}% em fração decimal: ${val} ÷ 100 = ${cleanRes}`,
          `resultado = ${val} / 100 # ${cleanRes}`,
          31,
          63
        );
      } catch {
        setDisplay('Erro');
      }
    }
  };

  const handleCalculate = () => {
    if (!display || display.startsWith('Erro')) return;

    const formatted = display.replace(/×/g, '*').replace(/÷/g, '/');

    try {
      // Divisão por zero
      if (formatted.includes('/0') && !formatted.includes('/0.')) {
        setHistory(display + ' =');
        setDisplay('Erro: Divisão por 0');
        notifyAction(
          'calcular() -> ZeroDivisionError',
          'Tratou divisão por zero com bloco try/except sem travar a aplicação!',
          'except ZeroDivisionError: visor_var.set("Erro: Divisão por 0")',
          77,
          80
        );
        return;
      }

      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${formatted})`)();
      
      if (!isFinite(result) || isNaN(result)) {
        throw new Error('Invalid calculation');
      }

      const cleanResult = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(6)).toString();
      setHistory(display + ' =');
      setDisplay(cleanResult);

      notifyAction(
        'calcular()',
        `Expressão resolvida com sucesso: ${display} = ${cleanResult}`,
        `resultado = eval('${formatted}') # ${cleanResult}`,
        65,
        76
      );
    } catch {
      setHistory(display + ' =');
      setDisplay('Erro');
      notifyAction(
        'calcular() -> Exception',
        'Erro de sintaxe capturado pelo bloco try/except.',
        'except Exception: visor_var.set("Erro")',
        80,
        83
      );
    }
  };

  const runQuickTest = (expr: string) => {
    handleClear();
    setTimeout(() => {
      setDisplay(expr);
      notifyAction(
        'Exemplo Rápido',
        `Carregou exemplo "${expr}" para testar a operação`,
        `visor_var.set('${expr}')`,
        10,
        19
      );
    }, 100);
  };

  const runPercentageTest = () => {
    handleClear();
    setTimeout(() => {
      setDisplay('200+15');
      setTimeout(() => {
        // Automatically trigger percentage on 15% of 200
        const calculatedPercent = (200 * 15) / 100; // 30
        setDisplay('200+30');
        notifyAction(
          'porcentagem()',
          'Demonstração: 15% de 200 é 30. O visor foi atualizado para "200+30". Clique em "=" para ver 230!',
          'valor_percentual = (200 * 15) / 100 # 30',
          31,
          63
        );
      }, 400);
    }, 100);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Container da Janela Tkinter */}
      <div className="relative mx-auto w-full max-w-[340px] rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl shadow-emerald-950/20 overflow-hidden transition-all duration-300">
        
        {/* Barra de Título do Sistema Operacional (Windows / Mac) */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950/90 border-b border-slate-800 select-none">
          {osStyle === 'mac' ? (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 border border-rose-600 cursor-pointer" title="Fechar" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 border border-amber-600 cursor-pointer" title="Minimizar" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 border border-emerald-600 cursor-pointer" title="Maximizar" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-tr from-sky-500 to-amber-400 flex items-center justify-center text-[9px] font-bold text-slate-950">
                Py
              </div>
              <span className="text-xs font-semibold text-slate-300">Calculadora Python</span>
            </div>
          )}

          {osStyle === 'mac' ? (
            <span className="text-xs font-medium text-slate-400">Calculadora Python - Tkinter</span>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <span className="hover:text-white cursor-pointer px-1">🗕</span>
              <span className="hover:text-white cursor-pointer px-1">🗖</span>
              <span className="hover:text-rose-400 cursor-pointer px-1">✕</span>
            </div>
          )}
        </div>

        {/* Corpo da Calculadora Tkinter */}
        <div className="p-4 bg-slate-900 flex flex-col gap-3">
          
          {/* Header informativo do Tkinter */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Tkinter Rodando (+ Porcentagem)
            </span>
            <div className="flex items-center gap-1 bg-slate-800/80 rounded-md p-0.5 border border-slate-700/50">
              <button
                onClick={() => setOsStyle('windows')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  osStyle === 'windows' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Win
              </button>
              <button
                onClick={() => setOsStyle('mac')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  osStyle === 'mac' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mac
              </button>
            </div>
          </div>

          {/* Visor (tk.Entry) */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 shadow-inner flex flex-col justify-end min-h-[82px]">
            <div className="text-right text-xs font-mono text-slate-400 h-4 truncate">
              {history}
            </div>
            <div className={`text-right font-mono font-bold tracking-tight text-2xl truncate transition-all ${
              display.startsWith('Erro') ? 'text-rose-400 text-lg' : 'text-sky-400'
            }`}>
              {display || '0'}
            </div>
          </div>

          {/* Grade de Botões (Grid: 4 colunas x 5 linhas com %) */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {/* Linha 1 */}
            <button
              onClick={handleClear}
              className="py-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-base hover:bg-rose-500/30 active:scale-95 transition-all cursor-pointer"
              title="limpar()"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-base hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              title="apagar_ultimo()"
            >
              ⌫
            </button>
            <button
              onClick={handlePercentage}
              className="py-3 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-base hover:bg-sky-500/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-0.5"
              title="porcentagem()"
            >
              %
            </button>
            <button
              onClick={() => handleCharClick('÷')}
              className="py-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-lg hover:bg-amber-500/30 active:scale-95 transition-all cursor-pointer"
              title="Divisão"
            >
              ÷
            </button>

            {/* Linha 2 */}
            <button
              onClick={() => handleCharClick('7')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              7
            </button>
            <button
              onClick={() => handleCharClick('8')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              8
            </button>
            <button
              onClick={() => handleCharClick('9')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              9
            </button>
            <button
              onClick={() => handleCharClick('×')}
              className="py-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-lg hover:bg-amber-500/30 active:scale-95 transition-all cursor-pointer"
              title="Multiplicação"
            >
              ×
            </button>

            {/* Linha 3 */}
            <button
              onClick={() => handleCharClick('4')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              4
            </button>
            <button
              onClick={() => handleCharClick('5')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              5
            </button>
            <button
              onClick={() => handleCharClick('6')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              6
            </button>
            <button
              onClick={() => handleCharClick('-')}
              className="py-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-lg hover:bg-amber-500/30 active:scale-95 transition-all cursor-pointer"
              title="Subtração"
            >
              -
            </button>

            {/* Linha 4 */}
            <button
              onClick={() => handleCharClick('1')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              1
            </button>
            <button
              onClick={() => handleCharClick('2')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              2
            </button>
            <button
              onClick={() => handleCharClick('3')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              3
            </button>
            <button
              onClick={() => handleCharClick('+')}
              className="py-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-lg hover:bg-amber-500/30 active:scale-95 transition-all cursor-pointer"
              title="Adição"
            >
              +
            </button>

            {/* Linha 5 */}
            <button
              onClick={() => handleCharClick('0')}
              className="col-span-2 py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer text-left pl-6"
            >
              0
            </button>
            <button
              onClick={() => handleCharClick('.')}
              className="py-3 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-100 font-semibold text-lg hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
            >
              .
            </button>
            <button
              onClick={handleCalculate}
              className="py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/50 text-white font-bold text-xl shadow-lg shadow-emerald-900/30 active:scale-95 transition-all cursor-pointer"
              title="calcular()"
            >
              =
            </button>
          </div>
        </div>

        {/* Rodapé da Janela */}
        <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Grid 4x6 • Segoe UI</span>
          <button 
            onClick={handleClear}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Monitor em Tempo Real do Python */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Inspetor de Execução Python
            </h4>
          </div>
          <span className="text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono px-2 py-0.5 rounded-full">
            Linhas {lastAction.lineRange[0]}–{lastAction.lineRange[1]}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3 bg-slate-950 rounded-lg p-2.5 border border-slate-800 font-mono text-xs">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-[10px] text-slate-400 font-sans font-semibold">Função Chamada:</span>
              <span className="text-amber-400 font-bold">{lastAction.func}</span>
              <span className="text-[10px] text-slate-400 font-sans font-semibold mt-1">Comando Executado:</span>
              <code className="text-sky-300 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                {lastAction.codeLine}
              </code>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/50">
            <span className="font-semibold text-white">Explicação: </span>
            {lastAction.description}
          </p>
        </div>

        {/* Atalhos para testar operações e porcentagem */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Testes Rápidos das Operações & Porcentagem:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => runQuickTest('15+27')}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 text-center transition-colors cursor-pointer"
            >
              15 + 27
            </button>
            <button
              onClick={() => runQuickTest('100-35')}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 text-center transition-colors cursor-pointer"
            >
              100 - 35
            </button>
            <button
              onClick={() => runQuickTest('12×8')}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 text-center transition-colors cursor-pointer"
            >
              12 × 8
            </button>
            <button
              onClick={() => runQuickTest('144÷12')}
              className="px-2 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 text-center transition-colors cursor-pointer"
            >
              144 ÷ 12
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
            <button
              onClick={runPercentageTest}
              className="px-2.5 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 text-xs border border-sky-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-medium"
            >
              <Percent className="w-3.5 h-3.5 text-sky-400" />
              Testar Porcentagem: 15% de 200
            </button>
            <button
              onClick={() => runQuickTest('50÷0')}
              className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs border border-rose-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Testar Divisão por 0 (50 ÷ 0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
