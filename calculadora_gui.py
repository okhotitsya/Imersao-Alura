# ========================================================
# CALCULADORA SIMPLES COM INTERFACE GRÁFICA EM PYTHON
# Biblioteca: Tkinter (Padrão e nativa do Python 3)
# ========================================================

import tkinter as tk

# --------------------------------------------------------
# 1. FUNÇÕES DE LÓGICA E OPERAÇÕES
# --------------------------------------------------------

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

# --------------------------------------------------------
# 2. CRIAÇÃO DA JANELA PRINCIPAL
# --------------------------------------------------------
janela = tk.Tk()
janela.title("Calculadora Python")
janela.geometry("320x420")
janela.resizable(False, False)       # Trava o tamanho para manter o visual alinhado
janela.configure(bg="#1E293B")       # Cor de fundo escura moderna

# --------------------------------------------------------
# 3. VARIÁVEL DE ESTADO E VISOR (ENTRY)
# --------------------------------------------------------
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

# --------------------------------------------------------
# 4. MAPA DOS BOTÕES (LINHAS E COLUNAS)
# --------------------------------------------------------
botoes = [
    # (Texto, Linha, Coluna, Cor de Fundo, Comando)
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

# --------------------------------------------------------
# 5. POSICIONAMENTO DINÂMICO COM GRID
# --------------------------------------------------------
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

# Distribui o espaço entre as linhas e colunas uniformemente
for r in range(6):
    janela.grid_rowconfigure(r, weight=1)
for c in range(4):
    janela.grid_columnconfigure(c, weight=1)

# --------------------------------------------------------
# 6. LOOP PRINCIPAL DE EVENTOS
# --------------------------------------------------------
if __name__ == "__main__":
    janela.mainloop()
