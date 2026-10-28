export interface CodeLineExplanation {
  lineStart: number;
  lineEnd: number;
  title: string;
  category: 'import' | 'window' | 'state' | 'logic' | 'ui' | 'loop';
  explanation: string;
  beginnerTip: string;
}

export const TKINTER_CODE = `# ==========================================
# CALCULADORA SIMPLES COM INTERFACE GRÁFICA
# Linguagem: Python 3
# Biblioteca: Tkinter (Padrão do Python)
# ==========================================

import tkinter as tk
from tkinter import messagebox

# 1. FUNÇÕES DE LÓGICA DA CALCULADORA
def ao_clicar(caractere):
    """Adiciona números ou operadores ao visor."""
    texto_atual = visor_var.get()
    
    # Se o visor estiver com 'Erro', limpa antes de digitar novo número
    if texto_atual == "Erro":
        visor_var.set(caractere)
    else:
        visor_var.set(texto_atual + str(caractere))

def limpar():
    """Limpa todo o conteúdo do visor."""
    visor_var.set("")

def apagar_ultimo():
    """Apaga o último dígito inserido (Backspace)."""
    texto_atual = visor_var.get()
    visor_var.set(texto_atual[:-1])

def calcular():
    """Avalia a expressão matemática e mostra o resultado."""
    expressao = visor_var.get()
    
    if not expressao:
        return
        
    try:
        # Substitui os símbolos visuais pelos operadores aceitos pelo Python
        expressao_formatada = expressao.replace('×', '*').replace('÷', '/')
        
        # Realiza o cálculo matemático
        resultado = eval(expressao_formatada)
        
        # Se for um número inteiro (ex: 5.0), exibe apenas 5
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
            
        visor_var.set(str(resultado))
        
    except ZeroDivisionError:
        visor_var.set("Erro: Divisão por 0")
    except Exception:
        visor_var.set("Erro")

# 2. CRIAÇÃO DA JANELA PRINCIPAL
janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("320x420")
janela.resizable(False, False)
janela.configure(bg="#1E293B")  # Fundo escuro moderno

# 3. VARIÁVEL DE ESTADO DO VISOR
# StringVar é uma variável especial do Tkinter que atualiza o visor automaticamente
visor_var = tk.StringVar()

# 4. CAMPO DE TEXTO DO VISOR (ENTRY)
visor = tk.Entry(
    janela,
    textvariable=visor_var,
    font=("Segoe UI", 22, "bold"),
    bg="#0F172A",
    fg="#38BDF8",
    bd=0,
    justify="right"
)
visor.grid(row=0, column=0, columnspan=4, padx=14, pady=(20, 14), ipady=12, sticky="nsew")

# 5. LISTA COM O MAPA DE TODOS OS BOTÕES
# Organizados exatamente em formato de matriz (linhas e colunas)
botoes = [
    ('C', 1, 0, '#EF4444', limpar),
    ('⌫', 1, 1, '#64748B', apagar_ultimo),
    ('÷', 1, 2, '#F59E0B', lambda: ao_clicar('÷')),
    ('×', 1, 3, '#F59E0B', lambda: ao_clicar('×')),
    
    ('7', 2, 0, '#334155', lambda: ao_clicar('7')),
    ('8', 2, 1, '#334155', lambda: ao_clicar('8')),
    ('9', 2, 2, '#334155', lambda: ao_clicar('9')),
    ('-', 2, 3, '#F59E0B', lambda: ao_clicar('-')),
    
    ('4', 3, 0, '#334155', lambda: ao_clicar('4')),
    ('5', 3, 1, '#334155', lambda: ao_clicar('5')),
    ('6', 3, 2, '#334155', lambda: ao_clicar('6')),
    ('+', 3, 3, '#F59E0B', lambda: ao_clicar('+')),
    
    ('1', 4, 0, '#334155', lambda: ao_clicar('1')),
    ('2', 4, 1, '#334155', lambda: ao_clicar('2')),
    ('3', 4, 2, '#334155', lambda: ao_clicar('3')),
    ('=', 4, 3, '#10B981', calcular),
    
    ('0', 5, 0, '#334155', lambda: ao_clicar('0'), 2), # Ocupa 2 colunas
    ('.', 5, 2, '#334155', lambda: ao_clicar('.')),
]

# 6. CRIAÇÃO E POSICIONAMENTO DINÂMICO DOS BOTÕES NO GRID
for item in botoes:
    texto = item[0]
    linha = item[1]
    coluna = item[2]
    cor_fundo = item[3]
    comando = item[4]
    largura_coluna = item[5] if len(item) > 5 else 1
    
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
        columnspan=largura_coluna,
        padx=4,
        pady=4,
        sticky="nsew"
    )

# 7. AJUSTE DE REDIMENSIONAMENTO DO GRID
for r in range(6):
    janela.grid_rowconfigure(r, weight=1)
for c in range(4):
    janela.grid_columnconfigure(c, weight=1)

# 8. INICIA O LOOP PRINCIPAL DA INTERFACE
# Mantém a janela aberta respondendo aos cliques do usuário
janela.mainloop()
`;

export const CONSOLE_CODE = `# ==========================================
# CALCULADORA BÁSICA EM PYTHON (TERMINAL)
# Ideal para entender a lógica das 4 operações
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

def calculadora():
    print("=== CALCULADORA SIMPLES EM PYTHON ===")
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("0. Sair")
    
    while True:
        opcao = input("\\nEscolha a operação (0-4): ").strip()
        
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
        else:
            print("Opção inválida! Escolha entre 1, 2, 3, 4 ou 0.")

if __name__ == "__main__":
    calculadora()
`;

export const CODE_EXPLANATIONS: CodeLineExplanation[] = [
  {
    lineStart: 7,
    lineEnd: 8,
    title: "Importação do Tkinter",
    category: "import",
    explanation: "O Tkinter é o pacote gráfico oficial embutido no Python. O 'as tk' é um apelido para não precisarmos digitar 'tkinter' por extenso toda hora. O 'messagebox' permite mostrar caixas de diálogo e alertas se necessário.",
    beginnerTip: "Você não precisa instalar nada com 'pip install'! O Tkinter já vem instalado junto com o Python em 99% dos computadores."
  },
  {
    lineStart: 11,
    lineEnd: 19,
    title: "Função ao_clicar(caractere)",
    category: "logic",
    explanation: "Sempre que você aperta um número (ex: '7') ou operador (ex: '+'), essa função lê o que já está escrito no visor e concatena (junta) o novo caractere ao final. Se o visor estiver mostrando 'Erro', ela limpa primeiro.",
    beginnerTip: "Em Python, juntar textos é feito simplesmente com o sinal de mais: '12' + '3' vira '123' (concatenação de strings)."
  },
  {
    lineStart: 21,
    lineEnd: 29,
    title: "Funções limpar() e apagar_ultimo()",
    category: "logic",
    explanation: "A função limpar() redefine a variável do visor para uma string vazia (''). A função apagar_ultimo() usa a técnica de fatiamento de strings de Python (slice: [:-1]), que remove exatamente o último caractere da direita.",
    beginnerTip: "O slice [:-1] é um dos recursos mais elegantes do Python: significa 'pegue do início até o penúltimo caractere'."
  },
  {
    lineStart: 31,
    lineEnd: 52,
    title: "Função calcular() e Tratamento de Erros",
    category: "logic",
    explanation: "Substitui os símbolos visuais '×' e '÷' pelos símbolos reais do Python ('*' e '/'). Em seguida, utiliza o 'eval()' para resolver a expressão matemática. Envolvemos tudo em 'try / except' para capturar divisão por zero (ZeroDivisionError) ou erros de sintaxe (como clicar '++').",
    beginnerTip: "O 'try / except' é fundamental em programação: ele impede que seu programa trave e feche de repente se o usuário fizer uma conta inválida."
  },
  {
    lineStart: 54,
    lineEnd: 59,
    title: "Criação da Janela Principal (tk.Tk)",
    category: "window",
    explanation: "tk.Tk() inicializa a aplicação desktop e cria a janela base do sistema operacional. Com .title() definimos o título, .geometry('320x420') define largura x altura em pixels, .resizable(False, False) impede distorção do layout, e .configure(bg=...) define a cor de fundo.",
    beginnerTip: "Pense na janela como uma tela em branco onde vamos 'desenhar' e fixar nossos componentes (visor e botões)."
  },
  {
    lineStart: 61,
    lineEnd: 63,
    title: "Variável Reativa (StringVar)",
    category: "state",
    explanation: "Um 'StringVar()' é um tipo especial de objeto do Tkinter. Quando você altera o valor dele com '.set('10')', qualquer elemento visual conectado a ele (como o nosso Entry) se atualiza instantaneamente na tela.",
    beginnerTip: "Em vez de atualizar o texto do visor manualmente pixel a pixel, o Tkinter observa o StringVar e faz a atualização sozinho."
  },
  {
    lineStart: 65,
    lineEnd: 76,
    title: "Visor da Calculadora (Entry)",
    category: "ui",
    explanation: "O 'tk.Entry' é uma caixa de texto. Vinculamos ele ao nosso 'visor_var' usando 'textvariable'. Ajustamos o tamanho da fonte, alinhamos o texto à direita (justify='right') e posicionamos ele no topo usando .grid().",
    beginnerTip: "'columnspan=4' faz o visor se esticar pelas 4 colunas da calculadora, ocupando a largura total perfeitamente."
  },
  {
    lineStart: 78,
    lineEnd: 104,
    title: "Mapa de Botões (Matriz Linha x Coluna)",
    category: "ui",
    explanation: "Em vez de escrever 16 vezes o mesmo código para cada botão, criamos uma lista organizada contendo: texto, linha do grid, coluna do grid, cor e a função a ser executada. Usamos funções 'lambda' para passar o valor específico de cada botão.",
    beginnerTip: "O 'lambda' em Python cria uma pequena função anônima inline. É muito usado no Tkinter para passar parâmetros para a função 'command=' do botão."
  },
  {
    lineStart: 106,
    lineEnd: 139,
    title: "Gerenciador de Layout (Grid) e mainloop()",
    category: "loop",
    explanation: "O laço 'for' percorre cada botão da lista e o posiciona no grid. O 'grid_rowconfigure' e 'grid_columnconfigure' distribuem o espaço uniformemente. Por fim, 'janela.mainloop()' inicia o motor do programa que escuta cliques do mouse e teclado.",
    beginnerTip: "Sem o 'mainloop()', a janela abriria e fecharia em uma fração de segundo! É ele quem mantém o programa rodando."
  }
];
