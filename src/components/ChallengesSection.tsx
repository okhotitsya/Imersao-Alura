import React, { useState } from 'react';
import { Trophy, ChevronDown, ChevronUp, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  level: 'Fácil' | 'Médio' | 'Avançado';
  question: string;
  hint: string;
  solutionCode: string;
  explanation: string;
}

export const ChallengesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('desafio-1');

  const challenges: Challenge[] = [
    {
      id: 'desafio-1',
      title: 'Mudar o Esquema de Cores (Tema Claro ou Neon)',
      level: 'Fácil',
      question: 'Como personalizar as cores da calculadora para deixá-la com um visual claro ou com botões roxos?',
      hint: 'Procure pelos argumentos "bg=" (cor de fundo) e "fg=" (cor do texto/fonte) nas linhas do tk.Button e janela.configure().',
      solutionCode: `# Para fundo roxo moderno nos botões numéricos:
btn = tk.Button(
    janela,
    text=texto,
    bg="#7C3AED",       # Roxo moderno (Violet)
    fg="#FFFFFF",       # Texto branco
    activebackground="#6D28D9"
)

# Para mudar o fundo da janela:
janela.configure(bg="#0F172A")`,
      explanation:
        'No Tkinter, praticamente todos os elementos visuais aceitam `bg` (background) e `fg` (foreground/texto). Você pode usar nomes comuns como "white", "black", "blue" ou códigos hexadecimais como "#10B981".'
    },
    {
      id: 'desafio-2',
      title: 'Adicionar Suporte ao Teclado Físico (Event Binding)',
      level: 'Médio',
      question: 'Como permitir que a pessoa use o teclado numérico do computador sem precisar clicar nos botões com o mouse?',
      hint: 'O Tkinter tem uma função chamada janela.bind("<Key>", funcao) para escutar teclas físicas.',
      solutionCode: `def capturar_teclado(evento):
    tecla = evento.char
    
    if tecla in "0123456789+-/*":
        ao_clicar(tecla)
    elif evento.keysym in ("Return", "KP_Enter"):
        calcular()
    elif evento.keysym in ("BackSpace",):
        apagar_ultimo()
    elif evento.keysym in ("Escape",):
        limpar()

# Conecta o evento do teclado à janela:
janela.bind("<Key>", capturar_teclado)`,
      explanation:
        'O método `.bind()` vincula ações do mundo real (como pressionar a tecla Enter ou Backspace) a funções que você criou. O `evento.char` traz o caractere digitado e `evento.keysym` traz o nome da tecla especial.'
    },
    {
      id: 'desafio-3',
      title: 'Adicionar a Operação de Porcentagem (%)',
      level: 'Médio',
      question: 'Como criar um botão de porcentagem que converte o número digitado em fração por 100?',
      hint: 'Basta pegar o número atual do visor, converter para float e dividir por 100.',
      solutionCode: `def porcentagem():
    try:
        valor = float(visor_var.get())
        resultado = valor / 100
        # Se for inteiro, limpa o .0
        if resultado.is_integer():
            resultado = int(resultado)
        visor_var.set(str(resultado))
    except ValueError:
        visor_var.set("Erro")

# Adicione o botão na lista de botões:
# ('%', 1, 1, '#64748B', porcentagem)`,
      explanation:
        'A porcentagem é simplesmente uma divisão por 100. Criando uma função dedicada, você pode converter instantaneamente qualquer valor digitado antes de somar ou multiplicar.'
    },
    {
      id: 'desafio-4',
      title: 'Adicionar Histórico de Contas Realizadas',
      level: 'Avançado',
      question: 'Como guardar as últimas 5 contas calculadas e exibi-las em uma lista lateral ou arquivo de texto?',
      hint: 'Você pode usar uma lista comum do Python (historico = []) e dar append() dentro da função calcular().',
      solutionCode: `historico_calculos = []

def calcular_com_historico():
    expressao = visor_var.get()
    try:
        resultado = eval(expressao.replace('×', '*').replace('÷', '/'))
        # Salva no histórico:
        historico_calculos.append(f"{expressao} = {resultado}")
        print("Histórico Atualizado:", historico_calculos[-5:]) # Mostra os últimos 5
        visor_var.set(str(resultado))
    except Exception:
        visor_var.set("Erro")`,
      explanation:
        'Usando listas (`list`) em Python, podemos acumular cada operação bem-sucedida. Mais tarde, você pode inclusive salvar esse histórico em um arquivo `.txt` com `with open("historico.txt", "a") as arq:`!'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Desafios Práticos para Você Evoluir na Programação
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Ideias de melhorias reais para você praticar no seu código Python e aprender mais rápido.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {challenges.map(ch => {
          const isExpanded = expandedId === ch.id;
          return (
            <div
              key={ch.id}
              className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all shadow-md hover:border-slate-700"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : ch.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      ch.level === 'Fácil'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : ch.level === 'Médio'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {ch.level}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">
                    {ch.title}
                  </span>
                </div>
                <div className="text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 flex flex-col gap-3 border-t border-slate-800/80 bg-slate-950/40">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white">Desafio: </strong>
                    {ch.question}
                  </p>

                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
                    <span className="font-semibold text-amber-300">💡 Dica: </span>
                    {ch.hint}
                  </div>

                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-sky-200 overflow-x-auto">
                    <pre>{ch.solutionCode}</pre>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Como funciona: </strong>
                    {ch.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
