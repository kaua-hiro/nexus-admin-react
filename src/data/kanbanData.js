// src/data/kanbanData.js
export const initialKanbanData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Configurar o ambiente de desenvolvimento' },
    'task-2': { id: 'task-2', content: 'Criar os mockups da interface' },
    'task-3': { id: 'task-3', content: 'Desenvolver o componente de login' },
    'task-4': { id: 'task-4', content: 'Implementar a lógica de autenticação' },
    'task-5': { id: 'task-5', content: 'Revisar o código do dashboard' },
    'task-6': { id: 'task-6', content: 'Fazer o deploy da primeira versão' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'A Fazer',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Em Progresso',
      taskIds: ['task-3', 'task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Concluído',
      taskIds: ['task-5', 'task-6'],
    },
  },
  // Para facilitar a renderização, mantemos a ordem das colunas
  columnOrder: ['column-1', 'column-2', 'column-3'],
};