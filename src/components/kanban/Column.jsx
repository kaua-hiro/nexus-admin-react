import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Task } from './Task';

export const Column = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="kanban-column">
      <h3 className="column-title">{title}</h3>
      <SortableContext
        id={id}
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="task-list">
          {tasks.map(task => (
            <Task key={task.id} id={task.id} content={task.content} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};