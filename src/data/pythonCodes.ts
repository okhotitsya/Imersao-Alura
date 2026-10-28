export interface CodeLineExplanation {
  lineStart: number;
  lineEnd: number;
  title: string;
  category: 'import' | 'window' | 'state' | 'logic' | 'ui' | 'loop';
  explanation: string;
  beginnerTip: string;
}

export const TKINTER_CODE = `# ========================================================
# CALCULADORA SIMPLES COM INTERFACE GRÁFICA EM PYTHON
# Biblioteca: Tkinter (Padrão e nativa do Python 3)
# ========================================================

import tkinter as tk
import re

# 1. FUNÇÕES DE LÓGICA E OPERAÇÕES
def ao_clicar(caractere):
    """Adiciona números ou operadores ao visor."""
    texto_atual = visor_var.get()
    
    # Se o visor estiver com erro, limpa antes de digitar
    if texto_atual.startswith("Erro"):
        visor_var.set(caractere)
    else:
        visor_var.set(texto_atual + str(caractere))

def limpar():
    """Limpa todo o visor (botão C)."""
    visor_var.set("")

def apagar_ultimo():
    """Apaga o último caractere digitado (Backspace)."""
    texto_atual = visor_var.get()
    visor_var.set(texto_atual[:-1])  # Usa fatia de string do Python

def porcentagem():
    """Calcula a porcentagem.
    - Se for número isolado (ex: 50%), converte para decimal: 0.5
    - Se for expressão composta (ex: 200 + 10%), calcula 10% de 200 = 20, resultando em 200 + 20."""
    expressao = visor_var.get()
    if not expressao or expressao.startswith("Erro"):
        return
        
    try:
        # Verifica se temos uma operação com número base e percentual (ex: 200 + 10)
        match = re.match(r'^(.+?)([\+\-\×\*\÷\/])(\d+(?:\.\d+)?)$', expressao)
        if match:
            base_expr, operador, porcentagem_val = match.groups()
            base_formatada = base_expr.replace('×', '*').replace('÷', '/')
            valor_base = eval(base_formatada)
            
            # Calcula o valor percentual sobre a base
            valor_percentual = (float(valor_base) * float(porcentagem_val)) / 100
            if isinstance(valor_percentual, float) and valor_percentual.is_integer():
                valor_percentual = int(valor_percentual)
                
            visor_var.set(f"{base_expr}{operador}{valor_percentual}")
        else:
            # Número simples (ex: 50 -> 0.5)
            expressao_formatada = expressao.replace('×', '*').replace('÷', '/')
            valor = eval(expressao_formatada)
            resultado = float(valor) / 100
            if isinstance(resultado, float) and resultado.is_integer():
                resultado = int(resultado)
            visor_var.set(str(resultado))
            
    except Exception:
        visor_var.set("Erro")

def calcular():
    """Calcula a expressão matemática das 4 operações."""
    expressao = visor_var.get()
    
    if not expressao:
        return
        
    try:
        # Troca os símbolos visuais pelos operadores matemáticos do Python
        expressao_formatada = expressao.replace('×', '*').replace('÷', '/')
        resultado = eval(expressao_formatada)
        
        # Se o resultado for inteiro (ex: 5.0), mostra apenas 5
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
            
        visor_var.set(str(resultado))
        
    except ZeroDivisionError:
        # Tratamento especial para divisão por zero
        visor_var.set("Erro: Divisão por 0")
    except Exception:
        # Qualquer outro erro de sintaxe (ex: dois sinais seguidos)
        visor_var.set("Erro")

# 2. CRIAÇÃO DA JANELA PRINCIPAL
janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("320x420")
janela.resizable(False, False)       # Trava o tamanho para manter o visual alinhado
janela.configure(bg="#1E293B")       # Cor de fundo escura moderna

# 3. VARIÁVEL DE ESTADO E VISOR (ENTRY)
visor_var = tk.StringVar()           # Variável reativa do Tkinter

visor = tk.Entry(
    janela,
    textvariable=visor_var,
    font=("Segoe UI", 22, "bold"),
    bg="#0F172A",
    fg="#38BDF8",
    bd=0,
    justify="right"                  # Números alinhados à direita
)
visor.grid(row=0, column=0, columnspan=4, padx=14, pady=(20, 14), ipady=12, sticky="nsew")

# 4. MAPA DOS BOTÕES (LINHAS E COLUNAS)
# Layout padronizado em 5 linhas x 4 colunas com Porcentagem (%)
botoes = [
    # (Texto, Linha, Coluna, Cor de Fundo, Comando)
    ('C', 1, 0, '#EF4444', limpar),
    ('⌫', 1, 1, '#64748B', apagar_ultimo),
    ('%', 1, 2, '#64748B', porcentagem),
    ('÷', 1, 3, '#F59E0B', lambda: ao_clicar('÷')),
    
    ('7', 2, 0, '#334155', lambda: ao_clicar('7')),
    ('8', 2, 1, '#334155', lambda: ao_clicar('8')),
    ('9', 2, 2, '#334155', lambda: ao_clicar('9')),
    ('×', 2, 3, '#F59E0B', lambda: ao_clicar('×')),
    
    ('4', 3, 0, '#334155', lambda: ao_clicar('4')),
    ('5', 3, 1, '#334155', lambda: ao_clicar('5')),
    ('6', 3, 2, '#334155', lambda: ao_clicar('6')),
    ('-', 3, 3, '#F59E0B', lambda: ao_clicar('-')),
    
    ('1', 4, 0, '#334155', lambda: ao_clicar('1')),
    ('2', 4, 1, '#334155', lambda: ao_clicar('2')),
    ('3', 4, 2, '#334155', lambda: ao_clicar('3')),
    ('+', 4, 3, '#F59E0B', lambda: ao_clicar('+')),
    
    ('0', 5, 0, '#334155', lambda: ao_clicar('0'), 2), # Ocupa 2 colunas
    ('.', 5, 2, '#334155', lambda: ao_clicar('.')),
    ('=', 5, 3, '#10B981', calcular),
]

# 5. POSICIONAMENTO DINÂMICO COM GRID
for item in botoes:
    texto = item[0]
    linha = item[1]
    coluna = item[2]
    cor_fundo = item[3]
    comando = item[4]
    largura = item[5] if len(item) > 5 else 1
    
    btn = tk.Button(
        janela,
        text=texto,
        font=("Segoe UI", 14, "bold"),
        bg=cor_fundo,
        fg="#FFFFFF",
        activebackground="#475569",
        activeforeground="#FFFFFF",
        relief="flat",
        cursor="hand2",
        command=comando
    )
    btn.grid(
        row=linha,
        column=coluna,
        columnspan=largura,
        padx=4,
        pady=4,
        sticky="nsew"
    )

# 6. DISTRIBUIÇÃO UNIFORME DO GRID
for r in range(6):
    janela.grid_rowconfigure(r, weight=1)
for c in range(4):
    janela.grid_columnconfigure(c, weight=1)

# 7. INICIA O LOOP PRINCIPAL DA INTERFACE
if __name__ == "__main__":
    janela.mainloop()
`;

export const CONSOLE_CODE = `# ==========================================
# CALCULADORA BÁSICA EM PYTHON (TERMINAL)
# Com as 4 operações e cálculo de porcentagem
# ==========================================

def adicao(a, b):
    return a + b

def subtracao(a, b):
    return a - b

def multiplicacao(a, b):
    return a * b

def divisao(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def porcentagem(valor, total=None):
    """Se total for informado, calcula valor% de total. Senão, divide por 100."""
    if total is not None:
        return (total * valor) / 100
    return valor / 100

def calculadora():
    print("=== CALCULADORA SIMPLES EM PYTHON ===")
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("0. Sair")
    
    while True:
        opcao = input("\\nEscolha a operação (0-5): ").strip()
        
        if opcao == '0':
            print("Encerrando a calculadora. Bons estudos de programação!")
            break
            
        if opcao in ['1', '2', '3', '4']:
            try:
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
            except ValueError:
                print("Erro: Por favor, digite números válidos!")
                continue
                
            if opcao == '1':
                resultado = adicao(num1, num2)
                simbolo = "+"
            elif opcao == '2':
                resultado = subtracao(num1, num2)
                simbolo = "-"
            elif opcao == '3':
                resultado = multiplicacao(num1, num2)
                simbolo = "*"
            elif opcao == '4':
                resultado = divisao(num1, num2)
                simbolo = "/"
                
            print(f"\\n>>> Resultado: {num1} {simbolo} {num2} = {resultado}")
            
        elif opcao == '5':
            try:
                base = float(input("Digite o valor base (ex: 200): "))
                taxa = float(input("Digite a porcentagem desejada (ex: 15 para 15%): "))
                valor_calculado = porcentagem(taxa, base)
                print(f"\\n>>> Resultado: {taxa}% de {base} = {valor_calculado}")
            except ValueError:
                print("Erro: Digite valores numéricos válidos!")
        else:
            print("Opção inválida! Escolha entre 1 a 5 ou 0 para sair.")

if __name__ == "__main__":
    calculadora()
`;

export const CODE_EXPLANATIONS: CodeLineExplanation[] = [
  {
    lineStart: 6,
    lineEnd: 7,
    title: "Importação do Tkinter e re (Expressões Regulares)",
    category: "import",
    explanation: "O Tkinter é o pacote gráfico oficial embutido no Python. O módulo 're' permite analisar o texto do visor para identificar expressões compostas como '200 + 10%' e calcular a porcentagem correspondente.",
    beginnerTip: "Ambos os módulos (tkinter e re) já fazem parte da biblioteca padrão do Python, sem necessidade de instalar pacotes externos."
  },
  {
    lineStart: 10,
    lineEnd: 19,
    title: "Função ao_clicar(caractere)",
    category: "logic",
    explanation: "Sempre que você aperta um número (ex: '7') ou operador (ex: '+'), essa função lê o que já está escrito no visor e concatena o novo caractere ao final. Se o visor estiver com erro, ela limpa primeiro.",
    beginnerTip: "Em Python, juntar textos é feito simplesmente com o sinal de mais: '12' + '3' vira '123' (concatenação de strings)."
  },
  {
    lineStart: 21,
    lineEnd: 29,
    title: "Funções limpar() e apagar_ultimo()",
    category: "logic",
    explanation: "A função limpar() redefine a variável do visor para uma string vazia (''). A função apagar_ultimo() usa o slice [:-1] do Python para remover exatamente o último caractere.",
    beginnerTip: "O slice [:-1] significa 'pegue do primeiro até o penúltimo caractere', perfeito para a função Backspace."
  },
  {
    lineStart: 31,
    lineEnd: 63,
    title: "Nova Função porcentagem() - Recurso Inteligente",
    category: "logic",
    explanation: "Calcula porcentagens de dois modos: 1) Se for um número isolado como 50%, converte para 0.5 (divide por 100). 2) Se for uma expressão em andamento como 200 + 10%, calcula 10% de 200 (= 20) e escreve '200 + 20', preparando para o botão de igual.",
    beginnerTip: "Em programação, a porcentagem é simplesmente uma fração de 100: (base * taxa) / 100."
  },
  {
    lineStart: 65,
    lineEnd: 90,
    title: "Função calcular() e Tratamento de Erros",
    category: "logic",
    explanation: "Substitui os símbolos visuais '×' e '÷' pelos operadores reais '*' e '/'. Resolve a expressão com eval() e captura erros com try/except, impedindo que divisões por zero travem o app.",
    beginnerTip: "O 'try / except' é fundamental em programação: ele protege a aplicação contra falhas inesperadas do usuário."
  },
  {
    lineStart: 92,
    lineEnd: 97,
    title: "Criação da Janela Principal (tk.Tk)",
    category: "window",
    explanation: "tk.Tk() inicializa a aplicação desktop e cria a janela base do sistema operacional. Com .title(), .geometry('320x420') e .resizable(False, False) garantimos dimensões fixas e modernas.",
    beginnerTip: "Pense na janela como a tela em branco onde todos os botões e visores serão montados."
  },
  {
    lineStart: 99,
    lineEnd: 115,
    title: "Variável Reativa e Visor (StringVar + Entry)",
    category: "ui",
    explanation: "O 'tk.StringVar' armazena o texto e o 'tk.Entry' o renderiza com alinhamento à direita (justify='right') e tamanho de fonte legível.",
    beginnerTip: "'columnspan=4' faz o visor ocupar toda a largura da calculadora sobre as 4 colunas."
  },
  {
    lineStart: 117,
    lineEnd: 150,
    title: "Mapa de Botões com Porcentagem e Layout 5x4",
    category: "ui",
    explanation: "Matriz balanceada com 5 linhas e 4 colunas contendo C, ⌫, %, ÷ na primeira linha, 7, 8, 9, × na segunda, 4, 5, 6, - na terceira, 1, 2, 3, + na quarta, e 0, ., = na quinta linha.",
    beginnerTip: "Esse é o formato canônico de calculadoras mundiais (como a calculadora do Windows, Android e iPhone)."
  },
  {
    lineStart: 152,
    lineEnd: 195,
    title: "Gerenciador de Layout (Grid) e mainloop()",
    category: "loop",
    explanation: "O laço 'for' posiciona todos os botões na grade com espaçamento uniforme. Ao final, 'janela.mainloop()' mantém o aplicativo desktop ativo escutando cliques.",
    beginnerTip: "Sem o 'mainloop()', a janela abriria e fecharia instantaneamente!"
  }
];
