"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { SortableItem } from "./sortable-item";

export default function TimeRanges({ timestampsWithIndex, setTimestampsWithIndex }) {


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = timestampsWithIndex?.findIndex((item) => item.id === active.id);
      const newIndex = timestampsWithIndex?.findIndex((item) => item.id === over.id);

      setTimestampsWithIndex((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  const onDelete = (id) => {
    setTimestampsWithIndex((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={timestampsWithIndex?.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {timestampsWithIndex?.map((timestamp) => (
              <SortableItem
                key={timestamp.id}
                id={timestamp.id}
                timestamp={timestamp}
                onDelete={onDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
