import React, { useState } from 'react';
import { Copy, Check, Download, Info, Code2, Layers, HelpCircle, Terminal } from 'lucide-react';
import { TKINTER_CODE, CONSOLE_CODE, CODE_EXPLANATIONS, CodeLineExplanation } from '../data/pythonCodes';

interface CodeViewerProps {
  activeLineRange?: [number, number] | null;
  onSelectExplanation?: (explanation: CodeLineExplanation) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  activeLineRange,
  onSelectExplanation,
}) => {
  const [activeTab, setActiveTab] = useState<'tkinter' | 'console'>('tkinter');
  const [copied, setCopied] = useState(false);
  const [selectedExplanation, setSelectedExplanation] = useState<CodeLineExplanation | null>(
    CODE_EXPLANATIONS[0]
  );

  const currentCode = activeTab === 'tkinter' ? TKINTER_CODE : CONSOLE_CODE;
  const lines = currentCode.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'tkinter' ? 'calculadora_gui.py' : 'calculadora_terminal.py';
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLineClick = (lineNum: number) => {
    if (activeTab !== 'tkinter') return;
    const match = CODE_EXPLANATIONS.find(
      exp => lineNum >= exp.lineStart && lineNum <= exp.lineEnd
    );
    if (match) {
      setSelectedExplanation(match);
      if (onSelectExplanation) {
        onSelectExplanation(match);
      }
    }
  };

  const getExplanationForLine = (lineNum: number) => {
    return CODE_EXPLANATIONS.find(
      exp => lineNum >= exp.lineStart && lineNum <= exp.lineEnd
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Barra de Controles e Abas */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3">
        {/* Alternador de Modo */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('tkinter')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tkinter'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Tkinter (Interface Gráfica)
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'console'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Modo Terminal (Console)
          </button>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 border border-emerald-500/50 transition-all cursor-pointer"
            title="Baixar arquivo .py pronto para executar no seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Visualizador de Código com Números de Linha */}
      <div className="relative rounded-xl border border-slate-800 bg-[#0d1117] overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
            <span className="text-slate-400 font-mono ml-2">
              {activeTab === 'tkinter' ? 'calculadora_gui.py' : 'calculadora_terminal.py'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {activeTab === 'tkinter' ? 'Clique em qualquer linha para ver a explicação' : 'Python 3'}
          </span>
        </div>

        <div className="overflow-x-auto max-h-[580px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 p-2 font-mono text-[13px] leading-relaxed">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted =
              activeLineRange &&
              lineNum >= activeLineRange[0] &&
              lineNum <= activeLineRange[1];

            const explanation = activeTab === 'tkinter' ? getExplanationForLine(lineNum) : undefined;
            const isSelected =
              activeTab === 'tkinter' &&
              selectedExplanation &&
              lineNum >= selectedExplanation.lineStart &&
              lineNum <= selectedExplanation.lineEnd;

            // Syntax coloring helper
            const isComment = line.trim().startsWith('#');
            const isDef = line.includes('def ') || line.includes('import ') || line.includes('from ');
            const isReturn = line.includes('return') || line.includes('try:') || line.includes('except');

            return (
              <div
                key={lineNum}
                onClick={() => handleLineClick(lineNum)}
                className={`group flex items-stretch py-0.5 px-2 rounded transition-colors ${
                  isSelected
                    ? 'bg-sky-950/60 border-l-2 border-sky-400'
                    : isHighlighted
                    ? 'bg-emerald-950/50 border-l-2 border-emerald-400'
                    : 'hover:bg-slate-800/40'
                } ${activeTab === 'tkinter' ? 'cursor-pointer' : 'cursor-text'}`}
              >
                {/* Linha número */}
                <span
                  className={`select-none text-right pr-4 w-10 text-[11px] font-mono shrink-0 transition-colors ${
                    isSelected
                      ? 'text-sky-300 font-bold'
                      : isHighlighted
                      ? 'text-emerald-400 font-bold'
                      : 'text-slate-500 group-hover:text-slate-400'
                  }`}
                >
                  {lineNum}
                </span>

                {/* Conteúdo da linha com realce suave */}
                <pre
                  className={`flex-1 font-mono overflow-visible m-0 ${
                    isComment
                      ? 'text-emerald-400/80 italic'
                      : isDef
                      ? 'text-sky-300'
                      : isReturn
                      ? 'text-purple-300'
                      : line.includes('tk.') || line.includes('tkinter')
                      ? 'text-amber-300'
                      : line.includes('eval') || line.includes('isinstance')
                      ? 'text-rose-300'
                      : 'text-slate-200'
                  }`}
                >
                  {line || ' '}
                </pre>

                {/* Indicador de dica ao passar o mouse */}
                {explanation && lineNum === explanation.lineStart && (
                  <span className="hidden group-hover:inline-flex items-center gap-1 text-[10px] bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded ml-2 shrink-0 border border-sky-700/50">
                    <Info className="w-3 h-3" /> Explicar
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cartão de Explicação Detalhada do Bloco Selecionado */}
      {activeTab === 'tkinter' && selectedExplanation && (
        <div className="rounded-xl border border-sky-500/30 bg-gradient-to-r from-slate-900 via-sky-950/30 to-slate-900 p-4 shadow-lg flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Code2 className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-white">
                {selectedExplanation.title}
              </h4>
            </div>
            <span className="text-xs font-mono bg-sky-500/10 text-sky-300 px-2.5 py-0.5 rounded-full border border-sky-500/20">
              Linhas {selectedExplanation.lineStart} a {selectedExplanation.lineEnd}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedExplanation.explanation}
          </p>

          <div className="flex items-start gap-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs text-amber-200/90">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Dica para Iniciantes: </span>
              {selectedExplanation.beginnerTip}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
