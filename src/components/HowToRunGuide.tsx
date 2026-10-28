import React, { useState } from 'react';
import { Terminal, Download, Laptop, CheckCircle2, Copy, Check, ExternalLink, Lightbulb } from 'lucide-react';

export const HowToRunGuide: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const stepsByOS = {
    windows: [
      {
        step: 1,
        title: 'Verifique se você tem o Python instalado',
        desc: 'Abra o Prompt de Comando (pressione a tecla Windows e digite "cmd"). Digite o comando abaixo e aperte Enter:',
        command: 'python --version',
        note: 'Se aparecer algo como "Python 3.10.x" ou superior, está tudo certo! Se não tiver instalado, baixe gratuitamente em python.org marcando a opção "Add Python to PATH".'
      },
      {
        step: 2,
        title: 'Salve o arquivo do código',
        desc: 'Clique no botão "Baixar .py" no topo desta página ou crie um arquivo chamado calculadora_gui.py no seu computador (por exemplo, dentro da sua pasta Documentos).',
        command: '',
        note: 'Você pode usar o Bloco de Notas, VS Code ou o próprio IDLE que vem junto com o Python.'
      },
      {
        step: 3,
        title: 'Execute a Calculadora',
        desc: 'Pelo Prompt de Comando, navegue até a pasta onde salvou o arquivo e rode o script:',
        command: 'python calculadora_gui.py',
        note: 'A janela gráfica cinza escuro abrirá na sua tela na mesma hora!'
      }
    ],
    mac: [
      {
        step: 1,
        title: 'Verifique o Python no macOS',
        desc: 'Abra o Terminal (pressione Cmd + Espaço e digite "Terminal"). Digite o comando:',
        command: 'python3 --version',
        note: 'No Mac, o Python 3 geralmente é executado com o comando python3.'
      },
      {
        step: 2,
        title: 'Salve o script Python',
        desc: 'Baixe o arquivo calculadora_gui.py para sua pasta Downloads ou Documentos.',
        command: 'cd ~/Downloads',
        note: 'Navegue pelo terminal até a pasta com o comando cd.'
      },
      {
        step: 3,
        title: 'Abra a interface gráfica',
        desc: 'Execute o script usando o comando python3:',
        command: 'python3 calculadora_gui.py',
        note: 'O Tkinter nativo do Mac iniciará a janela flutuante da calculadora.'
      }
    ],
    linux: [
      {
        step: 1,
        title: 'Verifique o Python e o pacote Tkinter',
        desc: 'Na maioria das distribuições Linux (Ubuntu/Debian/Fedora), o Python já vem instalado, mas o Tkinter pode precisar de um pacote:',
        command: 'sudo apt update && sudo apt install python3-tk -y',
        note: 'Para Fedora: sudo dnf install python3-tkinter'
      },
      {
        step: 2,
        title: 'Salve o código',
        desc: 'Salve o script como calculadora_gui.py na sua pasta pessoal.',
        command: 'ls calculadora_gui.py',
        note: 'Verifique se o arquivo está na pasta atual.'
      },
      {
        step: 3,
        title: 'Execute',
        desc: 'Rode o aplicativo no seu terminal:',
        command: 'python3 calculadora_gui.py',
        note: 'A calculadora abrirá com a barra de janelas do seu gerenciador (GNOME, KDE, etc).'
      }
    ]
  };

  const steps = stepsByOS[selectedOS];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Laptop className="w-5 h-5 text-sky-400" />
            Como Rodar no seu Computador (Passo a Passo)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Guia prático para você testar a sua calculadora nativamente fora do navegador.
          </p>
        </div>

        {/* Seletor de Sistema Operacional */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedOS('windows')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedOS === 'windows'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Windows
          </button>
          <button
            onClick={() => setSelectedOS('mac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedOS === 'mac'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            macOS
          </button>
          <button
            onClick={() => setSelectedOS('linux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedOS === 'linux'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Linux
          </button>
        </div>
      </div>

      {/* Grid de 3 Passos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map(s => (
          <div
            key={s.step}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold flex items-center justify-center shrink-0">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-slate-100">{s.title}</h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>

              {s.command && (
                <div className="flex items-center justify-between gap-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400">
                  <span className="truncate">{s.command}</span>
                  <button
                    onClick={() => copyToClipboard(s.command)}
                    className="text-slate-400 hover:text-slate-200 p-1 cursor-pointer shrink-0"
                    title="Copiar comando"
                  >
                    {copiedCmd === s.command ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-slate-400">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{s.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
