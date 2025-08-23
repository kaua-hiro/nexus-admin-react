export const initialEvents = [
  {
    id: 'event1',
    title: 'Reunião de Lançamento Q3',
    start: new Date().toISOString().split('T')[0] // Hoje
  },
  {
    id: 'event2',
    title: 'Workshop de Design System',
    start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0],
    end: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0],
    color: '#38BDF8' // Cor do tema (azul claro)
  },
  {
    id: 'event3',
    title: 'Happy Hour da Equipa',
    start: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0] + 'T17:30:00',
    color: '#fbb900' 
  }
];