# 🧮 Calculadora com Interface Gráfica em Python (Tkinter)

Uma calculadora simples, moderna e organizada desenvolvida em **Python 3** com interface gráfica nativa (**Tkinter**), acompanhada de uma aplicação web interativa em **React + TypeScript + Tailwind CSS** para estudantes e iniciantes em programação.

---

## 📋 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Explicação Detalhada das Funções](#-explicação-detalhada-das-funções)
- [Componentes da Interface Gráfica (Tkinter)](#-componentes-da-interface-gráfica-tkinter)
- [Como Rodar a Calculadora no Computador](#-como-rodar-a-calculadora-no-computador)
- [Como Rodar a Aplicação Web Localmente](#-como-rodar-a-aplicação-web-localmente)
- [Deploy no Vercel](#-deploy-no-vercel)
- [Estrutura de Pastas](#-estrutura-de-pastas)

---

## 🌟 Sobre o Projeto

Este projeto foi desenhado especialmente para quem está dando os primeiros passos na programação. Ele demonstra:
1. Como aplicar a lógica das **quatro operações matemáticas básicas** (+, -, ×, ÷).
2. Como criar janelas, botões e visores usando a biblioteca oficial do Python (**Tkinter**), sem necessidade de instalar pacotes externos via `pip`.
3. Boas práticas de programação: funções com responsabilidade única, código limpo e tratamento de exceções com `try / except`.

---

## ✨ Funcionalidades

- **4 Operações Matemáticas Básicas**:
  - Adição (`+`)
  - Subtração (`-`)
  - Multiplicação (`*` representado visualmente por `×`)
  - Divisão (`/` representado visualmente por `÷`)
- **Limpeza Rápida (`C`)**: Apaga todo o visor em um clique.
- **Backspace (`⌫`)**: Remove o último dígito inserido utilizando fatiamento de strings (`[:-1]`).
- **Ponto Decimal (`.`)**: Suporte a números com casas decimais (números de ponto flutuante).
- **Tratamento de Erros Seguro**:
  - Proteção contra **divisão por zero** com aviso amigável (`Erro: Divisão por 0`) em vez de travar o programa.
  - Proteção contra erros de sintaxe (ex: clicar em operadores repetidos).
- **Formatação Inteligente**: Se o resultado for inteiro (ex: `5.0`), o `.0` é removido e exibido apenas como `5`.

---

## 🔍 Explicação Detalhada das Funções

O script Python é dividido em 4 funções essenciais:

### 1. `ao_clicar(caractere)`
```python
def ao_clicar(caractere):
    texto_atual = visor_var.get()
    if texto_atual.startswith("Erro"):
        visor_var.set(caractere)
    else:
        visor_var.set(texto_atual + str(caractere))
```
- **O que faz**: É disparada sempre que o usuário aperta um botão numérico (0-9) ou de operador (+, -, ×, ÷, .).
- **Como funciona**: Lê o texto atual do visor com `.get()`. Se havia uma mensagem de erro na tela, ela é descartada e o novo dígito é colocado. Caso contrário, junta (concatena) o caractere clicado ao final do texto atual.

---

### 2. `limpar()`
```python
def limpar():
    visor_var.set("")
```
- **O que faz**: Zera o visor da calculadora.
- **Como funciona**: Atribui uma string vazia `""` à variável do visor com `.set("")`, deixando o campo em branco.

---

### 3. `apagar_ultimo()`
```python
def apagar_ultimo():
    texto_atual = visor_var.get()
    visor_var.set(texto_atual[:-1])
```
- **O que faz**: Funciona como a tecla Backspace, removendo apenas o último caractere digitado.
- **Como funciona**: Utiliza o fatiamento (slice) clássico do Python `[:-1]`, que seleciona todos os caracteres da string do início até o penúltimo, descartando o último caractere da direita.

---

### 4. `calcular()`
```python
def calcular():
    expressao = visor_var.get()
    if not expressao:
        return
        
    try:
        # Substitui os símbolos amigáveis pelos operadores reais do Python
        expressao_formatada = expressao.replace('×', '*').replace('÷', '/')
        resultado = eval(expressao_formatada)
        
        # Limpa o .0 de resultados inteiros (ex: 4.0 vira 4)
        if isinstance(resultado, float) and resultado.is_integer():
            resultado = int(resultado)
            
        visor_var.set(str(resultado))
        
    except ZeroDivisionError:
        visor_var.set("Erro: Divisão por 0")
    except Exception:
        visor_var.set("Erro")
```
- **O que faz**: Avalia a expressão digitada e exibe o resultado final no visor.
- **Como funciona**:
  1. Converte `×` em `*` e `÷` em `/`, pois o interpretador Python requer esses símbolos.
  2. Resolve a expressão matemática com a função `eval()`.
  3. Formata o número (se `resultado.is_integer()` for verdadeiro, converte para `int`).
  4. **Tratamento de Exceções**:
     - `ZeroDivisionError`: Captura especificamente qualquer tentativa de dividir por 0 e escreve `Erro: Divisão por 0`.
     - `Exception`: Captura erros de expressões incompletas ou inválidas e exibe `Erro` sem fechar a janela.

---

## 🖥️ Componentes da Interface Gráfica (Tkinter)

| Componente | Código | Descrição |
| :--- | :--- | :--- |
| **Janela Raiz** | `janela = tk.Tk()` | Cria a janela desktop principal do sistema operacional. |
| **Dimensões** | `janela.geometry("320x420")` | Define a largura e altura da janela em pixels. |
| **Trava de Tamanho** | `janela.resizable(False, False)` | Evita que o usuário distorça a disposição dos botões. |
| **Estado Reativo** | `visor_var = tk.StringVar()` | Objeto especial que sincroniza dados em tempo real com a tela. |
| **Visor** | `tk.Entry(..., textvariable=visor_var)` | Campo de texto alinhado à direita para exibir a conta. |
| **Grade (Grid)** | `.grid(row=X, column=Y)` | Gerenciador de layout baseado em matriz de linhas e colunas. |
| **Loop Principal** | `janela.mainloop()` | Mantém o programa rodando e aguardando eventos do mouse e teclado. |

---

## 🚀 Como Rodar a Calculadora no Computador

### Pré-requisitos
Ter o **Python 3** instalado em sua máquina ([Download oficial no python.org](https://www.python.org/downloads/)).
> **Dica para Windows:** Ao instalar o Python, marque a caixinha **"Add python.exe to PATH"**.

---

### Passo 1: Salvar o código
Crie um arquivo chamado `calculadora_gui.py` no seu computador e cole o código Python fornecido no projeto (ou clique no botão **"Baixar calculadora.py"** na aplicação web).

---

### Passo 2: Executar pelo Terminal

#### 🪟 Windows (Prompt de Comando ou PowerShell):
```bash
python calculadora_gui.py
```

#### 🍎 macOS (Terminal):
```bash
python3 calculadora_gui.py
```

#### 🐧 Linux (Ubuntu, Debian, Fedora):
Geralmente o Tkinter pode ser instalado separadamente com:
```bash
sudo apt update && sudo apt install python3-tk -y
python3 calculadora_gui.py
```

Pronto! A janela gráfica da calculadora será aberta nativamente na sua tela.

---

## 💻 Como Rodar a Aplicação Web Localmente

Se você quiser rodar a plataforma web de aprendizado interativo deste repositório:

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. Abra o navegador no endereço: `http://localhost:3000`

4. **Gerar versão de produção:**
   ```bash
   npm run build
   ```

---

## ☁️ Deploy no Vercel

O projeto já conta com o arquivo `.npmrc` (`legacy-peer-deps=true`) e `vercel.json` pré-configurados para evitar conflitos de versão entre plugins do Vite e dependências:

1. Conecte o repositório ao painel da [Vercel](https://vercel.com).
2. O framework preset será detectado automaticamente como **Vite**.
3. A pasta de saída configurada é `dist`.
4. Clique em **Deploy**!

---

## 📁 Estrutura de Pastas

```text
├── calculadora_gui.py            # Código Python da calculadora com Tkinter
├── index.html                    # Ponto de entrada HTML da aplicação web
├── package.json                  # Dependências do projeto (Vite, React, Tailwind)
├── vercel.json                   # Configurações de deploy para o Vercel
├── .npmrc                        # Configuração de peer dependencies
├── src/
│   ├── App.tsx                   # Interface e painel principal do laboratório
│   ├── main.tsx                  # Ponto de montagem React
│   ├── index.css                 # Estilos globais Tailwind CSS v4
│   ├── data/
│   │   └── pythonCodes.ts        # Códigos fontes e explicações linha por linha
│   └── components/
│       ├── TkinterSimulator.tsx  # Simulador interativo da janela Tkinter
│       ├── CodeViewer.tsx        # Visualizador de código com highlight e download
│       ├── ComponentsBreakdown.tsx # Explicações conceituais dos 6 componentes
│       ├── TerminalRunner.tsx    # Console interativo para testar contas
│       ├── HowToRunGuide.tsx     # Guia passo a passo por sistema operacional
│       └── ChallengesSection.tsx # Desafios e exercícios práticos para iniciantes
└── README.md                     # Documentação completa do projeto
```

---

## 🎓 Bons Estudos!
Este projeto foi construído para servir de trampolim no seu aprendizado de programação e desenvolvimento de software com Python! Sinta-se à vontade para expandir o código adicionando novas operações (como porcentagem, raiz quadrada e exponenciação).
