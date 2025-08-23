import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { initialEvents } from '../data/eventData';
import '../assets/styles/Calendario.css'; // Vamos criar este CSS

const Calendario = () => {
  return (
    <div>
      <h1 className="page-title">Calendário de Eventos</h1>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth" // Visão inicial será o mês
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Botões para mudar de visão
          }}
          events={initialEvents}
          editable={true} // Permite arrastar e redimensionar eventos
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
        />
      </div>
    </div>
  );
};

export default Calendario;