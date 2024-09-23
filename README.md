# Aplicação de Monitoramento de Equipamentos

## Introdução

Esta documentação fornece informações sobre a aplicação de monitoramento de equipamentos em operações florestais. O foco principal é descrever as decisões tomadas durante o desenvolvimento, especificar os componentes da aplicação e fornecer instruções de uso.

### Estrutura da Aplicação

- **Componentização**: A aplicação foi desenvolvida utilizando componentes reutilizáveis, o que facilita a manutenção e escalabilidade. Cada componente possui uma responsabilidade clara e é facilmente testável.
- **Gerenciamento de Estado**: Utilizamos a biblioteca Zustand para gerenciar o estado da aplicação. Essa escolha foi feita devido à sua simplicidade e leveza, permitindo um fluxo de dados claro e eficiente.

### Tecnologias Utilizadas

- **React**: Para a construção da interface do usuário.
- **Next.js**: Para a renderização do lado do client e servidor, melhorando a performance.
- **TypeScript**: Para garantir a tipagem estática, evitando erros em tempo de execução.
- **Mapbox**: Para visualização de dados geoespaciais dos equipamentos.
- **Tailwind CSS**: Para estilização da aplicação, permitindo um design responsivo e moderno.
- **Zustand**: Para controle de estados.

## Componentes Desenvolvidos

### 1. **Modal**

- **Descrição**: Componente que exibe informações detalhadas sobre o equipamento selecionado.
- **Propriedades**:
  - `isOpen`: Controla a visibilidade do modal.
  - `onClose`: Função chamada ao fechar o modal.
  - `equipment`: Objeto do equipamento selecionado.
  - `equipmentModel`: Modelo do equipamento.
  - `equipmentStateHistory`: Histórico de estados do equipamento.
  - `equipmentStates`: Lista de estados possíveis do equipamento.

### 2. **MapView**

- **Descrição**: Componente que renderiza um mapa utilizando Mapbox, mostrando a localização dos equipamentos.
- **Funcionalidades**: Permite interação com marcadores que exibem informações detalhadas sobre cada equipamento.

### 3. **Sidebar**

- **Descrição**: Componente que contém filtros para filtrar os equipamentos exibidos no mapa e na lista.
- **Funcionalidades**: Permite filtrar por estado atual e modelo do equipamento.

## Instruções de Uso

1. **Instalação**:

    Faça o clone do repositório:
    ```bash
        git clone https://github.com/diegomontec/teste-aiko-diego-monte-catharin
    ```
    Acesse a pasta do projeto:
    ```bash
        cd teste-aiko-diego-monte-catharin
    ```
    Instale as dependencias:
    ```bash
        npm install
    ```

2. **Acessando a Aplicação**:
   Após a instalação, inicie o servidor com `npm run dev`

3. **Interagindo com a Aplicação**:
   - **Visualização de Equipamentos**: Os equipamentos são exibidos no mapa. Clique nos marcadores para abrir o modal e ver detalhes.
   - **Filtros**: Use a sidebar para aplicar filtros aos equipamentos exibidos.

## Considerações Finais

A aplicação foi projetada para ser intuitiva e fácil de usar, permitindo que os gestores visualizem rapidamente informações essenciais sobre seus equipamentos.

## Agradecimentos

Agradeço a todos do time Aiko por esta oportunidade.