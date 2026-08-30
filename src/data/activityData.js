export const initialActivity = [
  { id: 1, actor: 'Admin', action: 'atualizou o status de', target: 'Pamela Oliveira', category: 'members', time: '2026-08-30T14:22:00' },
  { id: 2, actor: 'Admin', action: 'adicionou o membro', target: 'Juliana Alves', category: 'members', time: '2026-08-30T11:05:00' },
  { id: 3, actor: 'João Guerra', action: 'moveu a tarefa', target: '"Revisar contrato" para Em Andamento', category: 'projects', time: '2026-08-29T18:40:00' },
  { id: 4, actor: 'Admin', action: 'exportou o relatório', target: 'Atividade — Agosto/2026', category: 'reports', time: '2026-08-29T09:12:00' },
  { id: 5, actor: 'Sistema', action: 'processou a fatura do', target: 'Plano Business', category: 'billing', time: '2026-08-28T00:00:00' },
  { id: 6, actor: 'Admin', action: 'convidou', target: 'Rafael Souza para a equipe', category: 'team', time: '2026-08-27T16:33:00' },
  { id: 7, actor: 'Admin', action: 'removeu o membro', target: 'Carlos Mendes', category: 'members', time: '2026-08-26T10:18:00' },
  { id: 8, actor: 'Admin', action: 'criou o evento', target: 'Reunião de Alinhamento — Q3', category: 'calendar', time: '2026-08-25T08:50:00' },
];

export const ACTIVITY_CATEGORIES = {
  members: { label: 'Membros', color: '#2563EB' },
  projects: { label: 'Projetos', color: '#8B5CF6' },
  reports: { label: 'Relatórios', color: '#F59E0B' },
  billing: { label: 'Faturamento', color: '#10B981' },
  team: { label: 'Equipe', color: '#EC4899' },
  calendar: { label: 'Calendário', color: '#0EA5E9' },
};
