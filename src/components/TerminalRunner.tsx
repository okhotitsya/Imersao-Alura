import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, HelpCircle, Sparkles, Check, AlertCircle } from 'lucide-react';

interface CalculationLog {
  id: string;
  expression: string;
  result: string;
  status: 'success' | 'error';
  explanation: string;
}

export const TerminalRunner: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('25 + 75 / 3');
  const [logs, setLogs] = useState<CalculationLog[]>([
    {
      id: '1',
      expression: '12 + 18',
      result: '30',
      status: 'success',
      explanation: 'Operação de Adição simples (+).'
    },
    {
      id: '2',
      expression: '50 * 4',
      result: '200',
      status: 'success',
      explanation: 'Multiplicação usando asterisco (*).'
    },
    {
      id: '3',
      expression: '100 / 4',
      result: '25.0',
      status: 'success',
      explanation: 'No Python, toda divisão simples (/) retorna um float (número decimal).'
    }
  ]);

  const handleRun = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const expr = inputVal.trim();
    try {
      // Check division by zero
      if (/\/\s*0(?!\.)/.test(expr)) {
        setLogs(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            expression: expr,
            result: 'ZeroDivisionError: division by zero',
            status: 'error',
            explanation: 'O Python gerou um ZeroDivisionError porque a divisão por 0 é indefinida na matemática!'
          }
        ]);
        return;
      }

      // Safe JS evaluation representing Python arithmetic for basic ops
      // Convert Python-like power (**) or standard ops
      const sanitized = expr.replace(/\*\*/g, '^'); // we can handle it
      // Let's use simple safe math evaluation
      // eslint-disable-next-line no-eval
      let res: number;
      if (expr.includes('**')) {
        const parts = expr.split('**').map(s => Number(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          res = Math.pow(parts[0], parts[1]);
        } else {
          res = Function(`"use strict"; return (${expr.replace(/\*\*/g, '**')})`)();
        }
      } else if (expr.includes('//')) {
        const parts = expr.split('//').map(s => Number(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          res = Math.floor(parts[0] / parts[1]);
        } else {
          res = Function(`"use strict"; return Math.floor(${expr.replace(/\/\//g, '/')})`)();
        }
      } else {
        res = Function(`"use strict"; return (${expr})`)();
      }

      if (isNaN(res) || !isFinite(res)) {
        throw new Error('Cálculo inválido');
      }

      let expNote = 'Cálculo executado com sucesso.';
      if (expr.includes('/') && !expr.includes('//')) {
        expNote = 'Divisão realizada: o Python retorna tipo float (ex: 25.0).';
      } else if (expr.includes('*') && (expr.includes('+') || expr.includes('-'))) {
        expNote = 'Ordem de Precedência: Multiplicação foi calculada antes da adição/subtração!';
      } else if (expr.includes('//')) {
        expNote = 'Divisão inteira (//): descarta as casas decimais e retorna apenas o quociente inteiro.';
      } else if (expr.includes('**')) {
        expNote = 'Exponenciação (**): eleva o primeiro número à potência do segundo.';
      }

      setLogs(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          expression: expr,
          result: res.toString(),
          status: 'success',
          explanation: expNote
        }
      ]);
    } catch {
      setLogs(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          expression: expr,
          result: 'SyntaxError: invalid syntax',
          status: 'error',
          explanation: 'Sintaxe matemática inválida. Verifique parênteses ou operadores consecutivos.'
        }
      ]);
    }
  };

  const clearTerminal = () => {
    setLogs([]);
  };

  const setSample = (sample: string) => {
    setInputVal(sample);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            Console Interativo Python (Teste ao Vivo)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Digite expressões matemáticas para testar como o interpretador Python as calcula e entenda a ordem das operações.
          </p>
        </div>
        <button
          onClick={clearTerminal}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 border border-slate-700/80 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Limpar Console
        </button>
      </div>

      {/* Caixa do Terminal */}
      <div className="rounded-xl border border-slate-800 bg-[#090d16] p-4 font-mono shadow-2xl flex flex-col gap-3 min-h-[280px]">
        {/* Banner do Python */}
        <div className="text-xs text-slate-500 border-b border-slate-800/80 pb-2 flex items-center justify-between">
          <span>Python 3.12 (Interactive Math Sandbox) - Digite sua conta abaixo</span>
          <span className="text-[11px] text-emerald-400 font-semibold">Pronto</span>
        </div>

        {/* Histórico de Comandos */}
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[300px] text-xs">
          {logs.length === 0 ? (
            <div className="text-slate-600 text-center py-6 italic">
              Nenhuma operação ainda. Digite uma conta abaixo ou clique em um dos exemplos rápidos!
            </div>
          ) : (
            logs.map(log => (
              <div key={log.id} className="flex flex-col gap-1 border-l-2 pl-3 py-0.5 border-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-sky-400 font-bold">&gt;&gt;&gt;</span>
                  <span className="text-slate-100">{log.expression}</span>
                </div>
                <div
                  className={`font-semibold pl-6 ${
                    log.status === 'success' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {log.result}
                </div>
                <div className="pl-6 text-[11px] text-slate-400 italic">
                  💡 {log.explanation}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Linha de Entrada de Comando */}
        <form onSubmit={handleRun} className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-emerald-400 font-bold text-sm shrink-0">&gt;&gt;&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Ex: 50 + 20 * 3 ou (100 - 10) / 2"
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-emerald-950"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Executar
          </button>
        </form>
      </div>

      {/* Sugestões de Testes para Iniciantes */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Testes para Praticar:
        </span>
        <button
          onClick={() => setSample('10 + 5 * 2')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          10 + 5 * 2 (Precedência)
        </button>
        <button
          onClick={() => setSample('(10 + 5) * 2')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          (10 + 5) * 2 (Com Parênteses)
        </button>
        <button
          onClick={() => setSample('15 / 4')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          15 / 4 (Divisão Float)
        </button>
        <button
          onClick={() => setSample('10 / 0')}
          className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 cursor-pointer"
        >
          10 / 0 (Testar Erro)
        </button>
        <button
          onClick={() => setSample('2 ** 8')}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          2 ** 8 (Potência)
        </button>
      </div>
    </div>
  );
};
