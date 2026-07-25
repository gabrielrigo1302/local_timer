# local_timer

## 1. Objetivo

Desenvolver um temporizador simples para rodar em desktop. O temporizador poder rodar múltiplas instâncias de temporizadores cada um com seu cíclo próprio.

## 2. Funcionalidades

O temporizador deve ter:
- Uma tela principal para ver um ou mais temporizadores;
    - Ver um ou mais instâncias de temporizador;
    - Opção para selecionar faixa ou conjunto de tempo;
    - Opção de iniciar;
    - Opção de pausar;
    - Opção de concluir;
        - Confirmar conclusão;
    - Opção para acessar tela de configuração;
    - Opção para estender o período de timer;
    - Todas essas operações devem ser persistidas para análises futuras;
- Uma tela de configuração para editar configurações do timer;
    - Criar faixas de tempo que podem ser nomeados;
    - Criar conjuntos de faixas de tempos que podem ser nomeados;
        - Esses conjuntos podem ser rodados em loop;
    - Persisitir essas informações
- Uma tela de segundo plano que deve sobrepor todas as telas que estão rodando mas sem atrapalhar elas;
- Quando uma instância de temporizador for concluída, indicar visualmente para o usuário que o tempo acabou.

## 3. Estrutura de dados

- Faixa de tempo: representa um período de tempo que queira ser estabelecido (por exemplo:  corrida - 20 minutos):
    - id: string
    - nome: string
    - faixa_tempo: time
    - data_criacao: datetime
    - data_edicao: datetime

- Conjunto de faixas de tempo: um conjunto de faixas de tempo para serem executados em sequência
    - id: string
    - nome: string
    - data_criacao: datetime
    - data_edicao: datetime

- Vínculo de conjunto e faixas de tempo: relação entre o conjunto e suas faixas de tempo
    - id: string
    - id_faixa_tempo: string
    - id_conjunto_faixa_tempo: string
    - ordem: inteiro
    - data_criacao: datetime
    - data_edicao: datetime

- Log de execução do temporizador: registrar todas as operações relativas à execuções do timer (pausas, inicializações, extensões)
    - id: string
    - id_faixa_tempo: string
    - id_conjunto_faixa_tempo: string
    - operacao: string (pausa / início / extensão / conclusão )
    - data_criacao: datetime

- Configuração do temporizador: configurações do timer
    - modo: string (light/dark)
    - intensidade_indicacao_visual: string (baixa / média / alta)

## 4. Bibliotecas

### 4.1. Frontend

- JS
    - Electron;
    - React;
    - Typescript;
    - Tailwind;
    - NPM;
    - Vite;
    - Vitest;
    - Prettier + ESLint;
- Docker;

### 4.2. Backend

- Rust / Go;
    - Conectar com banco SQL?
        - Neste caso SQLLite funciona bem
    - Criar uma API REST?
    - Testes unitário?
    - Build?
    - Lint/Formatter?
- Docker;

## 5 Dúvidas

Como hospedar?
Como fazer o CI/CD?
Eu devo deixar a instância do SQLLite dentro do projeto ou separado?
Quais bibliotecas usar no backend?