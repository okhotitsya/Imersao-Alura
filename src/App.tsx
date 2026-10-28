/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Calculator, 
  Code2, 
  Laptop, 
  Terminal, 
  BookOpen, 
  Trophy, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Heart,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TkinterSimulator } from './components/TkinterSimulator';
import { CodeViewer } from './components/CodeViewer';
import { ComponentsBreakdown } from './components/ComponentsBreakdown';
import { TerminalRunner } from './components/TerminalRunner';
import { HowToRunGuide } from './components/HowToRunGuide';
import { ChallengesSection } from './components/ChallengesSection';
import { CodeLineExplanation, CODE_EXPLANATIONS, TKINTER_CODE } from './data/pythonCodes';

export default function App() {
  const [activeLineRange, setActiveLineRange] = useState<[number, number] | null>(null);
  const [activeSection, setActiveSection] = useState<'simulator' | 'components' | 'terminal' | 'guide' | 'challenges'>('simulator');

  const handleHighlightLine = (lineStart: number, lineEnd: number) => {
    setActiveLineRange([lineStart, lineEnd]);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([TKINTER_CODE], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculadora_gui.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Topo / Barra de Navegação */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 p-0.5 shadow-md shadow-sky-950/40">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Calculator className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base text-white tracking-tight">
                  Calculadora Python
                </h1>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
                  Tkinter GUI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Guia Interativo para Iniciantes em Programação
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadCode}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 border border-emerald-500/50 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar calculadora.py</span>
              <span className="sm:hidden">Baixar .py</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 flex flex-col gap-10">
        
        {/* Hero Banner Educativo */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-8 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs text-sky-300 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Código Simples, Organizado e 100% Funcional</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Sua Primeira Calculadora com <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300">Interface Gráfica em Python</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Bem-vindo ao mundo da programação! Criamos este código especialmente para você aprender as{' '}
              <strong className="text-white">quatro operações básicas (+, -, ×, ÷)</strong> utilizando o{' '}
              <strong className="text-sky-300">Tkinter</strong>, a biblioteca gráfica oficial do Python. Teste a calculadora interativa ao lado, inspecione cada linha de código e aprenda os conceitos fundamentais.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Sem Instalações Extras (Usa Python Padrão)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Tratamento de Divisão por Zero
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Layout em Grid Profissional
              </span>
            </div>
          </div>
        </div>

        {/* Abas Rápidas de Navegação das Seções */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800/80 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('simulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'simulator'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            1. Simulador & Código Interativo
          </button>
          <button
            onClick={() => setActiveSection('components')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'components'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            2. Anatomia dos Componentes
          </button>
          <button
            onClick={() => setActiveSection('terminal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'terminal'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            3. Console Math Sandbox
          </button>
          <button
            onClick={() => setActiveSection('guide')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'guide'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-4 h-4" />
            4. Como Rodar no seu Computador
          </button>
          <button
            onClick={() => setActiveSection('challenges')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'challenges'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            5. Desafios Práticos
          </button>
        </div>

        {/* SEÇÃO 1: Simulador ao Vivo + Código Python */}
        {activeSection === 'simulator' && (
          <section className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Coluna Esquerda: Simulador Tkinter Desktop Live (4 colunas no lg) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-emerald-400" />
                    Interface Gráfica Gerada pelo Python
                  </h3>
                  <span className="text-[11px] text-slate-400">Interativa</span>
                </div>
                <TkinterSimulator onHighlightLine={handleHighlightLine} />
              </div>

              {/* Coluna Direita: Visualizador de Código Python com Navegação (7 colunas no lg) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-400" />
                    Código Fonte Python Organizado
                  </h3>
                  <span className="text-[11px] text-slate-400">Pronto para copiar ou baixar</span>
                </div>
                <CodeViewer activeLineRange={activeLineRange} />
              </div>
            </div>

            {/* Chamada para próxima seção */}
            <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-sky-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Quer entender o que cada bloco do código faz por dentro?
                  </p>
                  <p className="text-xs text-slate-400">
                    Veja a anatomia dos 6 componentes fundamentais do aplicativo.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSection('components')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                <span>Ver Explicação dos Componentes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        )}

        {/* SEÇÃO 2: Anatomia dos Componentes */}
        {activeSection === 'components' && (
          <section>
            <ComponentsBreakdown />
          </section>
        )}

        {/* SEÇÃO 3: Math Sandbox / Terminal */}
        {activeSection === 'terminal' && (
          <section>
            <TerminalRunner />
          </section>
        )}

        {/* SEÇÃO 4: Guia de Execução no Computador */}
        {activeSection === 'guide' && (
          <section>
            <HowToRunGuide />
          </section>
        )}

        {/* SEÇÃO 5: Desafios Práticos */}
        {activeSection === 'challenges' && (
          <section>
            <ChallengesSection />
          </section>
        )}

        {/* Visão Rápida das Operações em Python (Card Resumo) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-400" />
            Resumo das Operações Matemáticas & Porcentagem no Python
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">1. Adição</span>
                <span className="text-base font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">+</span>
              </div>
              <p className="text-xs text-slate-400">Soma valores inteiros ou decimais.</p>
              <code className="text-[11px] font-mono text-emerald-300 mt-1">15 + 25  # 40</code>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">2. Subtração</span>
                <span className="text-base font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">-</span>
              </div>
              <p className="text-xs text-slate-400">Calcula a diferença entre números.</p>
              <code className="text-[11px] font-mono text-emerald-300 mt-1">50 - 18  # 32</code>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">3. Multiplicação</span>
                <span className="text-base font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">*</span>
              </div>
              <p className="text-xs text-slate-400">Usa o asterisco (*) para multiplicar.</p>
              <code className="text-[11px] font-mono text-emerald-300 mt-1">6 * 7    # 42</code>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">4. Divisão</span>
                <span className="text-base font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">/</span>
              </div>
              <p className="text-xs text-slate-400">Usa a barra (/) e gera float.</p>
              <code className="text-[11px] font-mono text-emerald-300 mt-1">80 / 4   # 20.0</code>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">5. Porcentagem</span>
                <span className="text-base font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">%</span>
              </div>
              <p className="text-xs text-slate-400">Fração de 100 ou taxa proporcional.</p>
              <code className="text-[11px] font-mono text-emerald-300 mt-1">200 + 15% # 230</code>
            </div>
          </div>
        </div>

      </main>

      {/* Rodapé Educacional */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-4 lg:px-8 py-6 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
        <p className="flex items-center gap-1.5">
          Desenvolvido para estudantes e iniciantes em programação Python
        </p>
        <p className="text-[11px] text-slate-600">
          Tkinter • Python 3 • GUI Desktop • 4 Operações Básicas
        </p>
      </footer>
    </div>
  );
}
