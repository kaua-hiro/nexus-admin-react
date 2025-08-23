import React, { useState } from 'react';
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { initialKanbanData } from '../data/kanbanData';
import { Column } from '../components/kanban/Column';
import '../assets/styles/Projetos.css';

const Projetos = () => {
  const [data, setData] = useState(initialKanbanData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const findContainer = (id) => {
    if (id in data.columns) {
      return id;
    }
    return Object.keys(data.columns).find((key) => data.columns[key].taskIds.includes(id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (!activeContainerId || !overContainerId || activeContainerId !== overContainerId) {
      return; // Por agora, só permitimos mover dentro da mesma coluna
    }

    setData((prevData) => {
      const activeColumn = prevData.columns[activeContainerId];
      const oldIndex = activeColumn.taskIds.indexOf(activeId);
      const newIndex = activeColumn.taskIds.indexOf(overId);
      const newTaskIds = arrayMove(activeColumn.taskIds, oldIndex, newIndex);

      return {
        ...prevData,
        columns: {
          ...prevData.columns,
          [activeContainerId]: {
            ...activeColumn,
            taskIds: newTaskIds,
          },
        },
      };
    });
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) {
      return;
    }

    setData((prevData) => {
        const activeColumn = prevData.columns[activeContainerId];
        const overColumn = prevData.columns[overContainerId];
        const activeIndex = activeColumn.taskIds.indexOf(activeId);
        const overIndex = overId in prevData.tasks ? overColumn.taskIds.indexOf(overId) : overColumn.taskIds.length;

        const newActiveTaskIds = [...activeColumn.taskIds];
        newActiveTaskIds.splice(activeIndex, 1);

        const newOverTaskIds = [...overColumn.taskIds];
        newOverTaskIds.splice(overIndex, 0, activeId);

        return {
            ...prevData,
            columns: {
                ...prevData.columns,
                [activeContainerId]: {
                    ...activeColumn,
                    taskIds: newActiveTaskIds
                },
                [overContainerId]: {
                    ...overColumn,
                    taskIds: newOverTaskIds
                }
            }
        }
    });
  }

  return (
    <div>
      <h1 className="page-title">Quadro de Projetos</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="kanban-board">
          {data.columnOrder.map(columnId => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map(taskId => data.tasks[taskId]);
            return <Column key={column.id} id={column.id} title={column.title} tasks={tasks} />;
          })}
        </div>
      </DndContext>
    </div>
  );
};

export default Projetos;