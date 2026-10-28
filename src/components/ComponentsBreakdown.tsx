import React, { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Variable, 
  Grid, 
  ShieldAlert, 
  RefreshCw, 
  ChevronRight, 
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export const ComponentsBreakdown: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const components = [
    {
      id: 'operacoes',
      icon: Calculator,
      title: 'As 4 Operações Básicas',
      badge: 'Lógica Matemática',
      color: 'emerald',
      summary: 'Como o Python calcula +, -, * e / de forma segura.',
      explanation:
        'Em computação e no Python, os operadores matemáticos são ligeiramente diferentes dos símbolos usados no caderno: usamos * para multiplicação e / para divisão. Uma das regras de ouro é nunca dividir por zero, pois a matemática não define essa operação.',
      pythonSnippet: `# No Python:
soma = 10 + 5          # 15
subtracao = 20 - 8     # 12
multiplicacao = 4 * 6  # 24 (usamos * em vez de ×)
divisao = 50 / 2       # 25.0 (usamos / em vez de ÷)

# Divisão por zero causa ZeroDivisionError no Python!
# Por isso sempre protegemos com try/except.`,
      keyConcepts: [
        'Adição (+): junta valores numéricos.',
        'Subtração (-): calcula a diferença.',
        'Multiplicação (*): no teclado do computador usamos o asterisco.',
        'Divisão (/): a barra inclinada gera um número float (com casa decimal).'
      ]
    },
    {
      id: 'janela',
      icon: Layers,
      title: 'A Janela Principal (tk.Tk)',
      badge: 'Estrutura Desktop',
      color: 'sky',
      summary: 'O contêiner raiz onde todos os elementos são posicionados.',
      explanation:
        'Todo aplicativo com interface gráfica em Python começa instanciando a classe `tk.Tk()`. Essa linha cria a janela no Windows, macOS ou Linux. A partir daí, podemos definir o título da barra superior, o tamanho inicial em pixels e a cor de fundo.',
      pythonSnippet: `import tkinter as tk

# Inicializa o motor gráfico e cria a janela
janela = tk.Tk()

# Configurações essenciais da janela
janela.title("Calculadora Python")
janela.geometry("320x420")        # 320px de largura x 420px de altura
janela.resizable(False, False)    # Bloqueia redimensionamento para manter o design
janela.configure(bg="#1E293B")    # Cor de fundo moderna`,
      keyConcepts: [
        'tk.Tk(): cria a janela mestre da aplicação.',
        '.title(): define o nome que aparece na barra do Windows/Mac.',
        '.geometry("LARGURAxALTURA"): define o tamanho exato em pixels.',
        '.resizable(False, False): evita que botões fiquem desalinhados.'
      ]
    },
    {
      id: 'visor',
      icon: Variable,
      title: 'O Visor Reativo (StringVar + Entry)',
      badge: 'Estado & Visualização',
      color: 'amber',
      summary: 'Como o texto muda na tela automaticamente quando você digita.',
      explanation:
        'No Tkinter, para ligar uma variável ao que o usuário vê na tela, usamos um `StringVar()`. Quando o código chama `visor_var.set("42")`, a caixa de texto `Entry` atualiza imediatamente sem você precisar redesenhar nada.',
      pythonSnippet: `# 1. Cria a variável especial do Tkinter
visor_var = tk.StringVar()

# 2. Cria a caixa de texto vinculada à variável
visor = tk.Entry(
    janela,
    textvariable=visor_var,        # Ligação direta com o estado
    font=("Segoe UI", 22, "bold"),
    justify="right"                # Números alinhados à direita
)

# Para ler o que está no visor:
texto = visor_var.get()

# Para alterar o visor:
visor_var.set("123")`,
      keyConcepts: [
        'StringVar(): armazena o texto atual do visor.',
        'textvariable: conecta a caixa visual (Entry) à variável interna.',
        '.get(): método para ler o conteúdo atual.',
        '.set(novo_valor): método para mudar o texto na tela.'
      ]
    },
    {
      id: 'grid',
      icon: Grid,
      title: 'Sistema de Grid (Linhas e Colunas)',
      badge: 'Design & Alinhamento',
      color: 'indigo',
      summary: 'Organizando os botões em formato de tabela perfeita.',
      explanation:
        'O Tkinter possui 3 formas de posicionar elementos: pack, place e grid. O `grid` é o mais recomendado para calculadoras, pois divide a janela em linhas (rows) e colunas (columns), igualzinho a uma planilha do Excel.',
      pythonSnippet: `# Posicionando o botão '7' na linha 2, coluna 0:
btn_sete = tk.Button(janela, text="7", command=lambda: ao_clicar("7"))
btn_sete.grid(row=2, column=0, padx=4, pady=4, sticky="nsew")

# Posicionando o botão '=' na linha 4, coluna 3:
btn_igual = tk.Button(janela, text="=", command=calcular)
btn_igual.grid(row=4, column=3, padx=4, pady=4, sticky="nsew")

# O botão '0' pode se esticar por duas colunas com columnspan:
btn_zero.grid(row=5, column=0, columnspan=2, sticky="nsew")`,
      keyConcepts: [
        'row e column: determinam a coordenada do botão na matriz.',
        'columnspan: permite que um botão ocupe 2 ou mais colunas (ex: o zero).',
        'sticky="nsew": faz o botão se expandir em todas as 4 direções (Norte, Sul, Leste, Oeste).',
        'padx e pady: adicionam espaçamento interno para os botões não colarem.'
      ]
    },
    {
      id: 'tratamento',
      icon: ShieldAlert,
      title: 'Tratamento de Erros (try / except)',
      badge: 'Boas Práticas & Segurança',
      color: 'rose',
      summary: 'Como impedir que o programa trave quando o usuário erra a conta.',
      explanation:
        'Se o usuário tentar dividir 10 por 0, ou clicar em duas operações seguidas sem número (ex: 5 ++), o Python normalmente geraria um erro fatal e fecharia a janela. Com `try` e `except`, capturamos a falha e escrevemos amigavelmente "Erro" no visor.',
      pythonSnippet: `def calcular():
    expressao = visor_var.get()
    
    try:
        # Tenta calcular a conta
        resultado = eval(expressao)
        visor_var.set(str(resultado))
        
    except ZeroDivisionError:
        # Se tentou dividir por zero, cai aqui:
        visor_var.set("Erro: Divisão por 0")
        
    except Exception:
        # Se digitou expressão com sintaxe inválida:
        visor_var.set("Erro")`,
      keyConcepts: [
        'try: executa o bloco que pode ter risco de falha.',
        'except ZeroDivisionError: captura especificamente divisões por zero.',
        'except Exception: captura qualquer outro erro de sintaxe.',
        'Experiência do Usuário: seu app nunca fecha de repente!'
      ]
    },
    {
      id: 'loop',
      icon: RefreshCw,
      title: 'O Loop Principal (mainloop)',
      badge: 'Ciclo de Vida do App',
      color: 'purple',
      summary: 'A última linha obrigatória que mantém seu programa vivo.',
      explanation:
        'Em programas comuns de terminal, o Python executa linha por linha de cima até o fim e encerra. Mas num aplicativo gráfico, ele precisa ficar aberto 24 horas aguardando o usuário mexer o mouse ou clicar. É isso que o `janela.mainloop()` faz.',
      pythonSnippet: `# Todo o código da interface é montado antes...

# A ÚLTIMA LINHA DO SEU ARQUIVO PYTHON:
janela.mainloop()

# O que acontece aqui:
# 1. O Python abre a janela.
# 2. Fica escutando eventos (cliques, teclado, fechar).
# 3. Só passa dessa linha quando você clica no 'X' para fechar.`,
      keyConcepts: [
        'Event-Driven (Orientado a Eventos): o programa reage às ações do usuário.',
        'Loop Infinito Otimizado: consome quase 0% de CPU enquanto você não clica.',
        'Última Instrução: nenhum código visual depois do mainloop() executa até a janela fechar.'
      ]
    }
  ];

  const current = components[activeTab];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            Anatomia dos Componentes do Código Python
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Clique em cada componente para entender a função de cada parte da sua calculadora.
          </p>
        </div>
      </div>

      {/* Grade de Navegação dos Componentes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {components.map((comp, idx) => {
          const Icon = comp.icon;
          const isSelected = activeTab === idx;
          return (
            <button
              key={comp.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-xl border flex flex-col items-start gap-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-sky-500 shadow-md shadow-sky-950/40 translate-y-[-2px]'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  isSelected ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Parte {idx + 1}
                </span>
                <span
                  className={`text-xs font-semibold line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}
                >
                  {comp.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Painel do Componente Selecionado */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl flex flex-col lg:flex-row gap-6">
        {/* Lado Esquerdo: Conceito e Explicação */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">Componente {activeTab + 1} de 6</span>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white">{current.title}</h4>
            <p className="text-sm text-sky-300/90 font-medium mt-1">
              {current.summary}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {current.explanation}
          </p>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Pontos-Chave para Lembrar:
            </span>
            <ul className="grid grid-cols-1 gap-1.5">
              {current.keyConcepts.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lado Direito: Trecho de Código em Python Explicado */}
        <div className="flex-1 flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300 font-mono font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Código Python Deste Componente
            </span>
            <span className="text-[11px] text-slate-500">Python 3</span>
          </div>
          <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
            <pre className="text-sky-200">{current.pythonSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
