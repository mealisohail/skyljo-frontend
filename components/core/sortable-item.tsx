"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";

interface SortableItemProps {
  id: string;
  timestamp: any;
  onDelete: (id: string) => void;
}

export function SortableItem({ id, timestamp, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  const handleButtonClick = () => {
    onDelete(id);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${sec < 10 ? "0" + sec : sec}`;
  };

  const isCursorGrabbing = attributes['aria-pressed'];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-sm border border-gray-200 bg-white p-2 px-3 shadow-sm  ${isCursorGrabbing ? "cursor-grabbing" : "group"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-medium">
          {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
        </span>
       <div className="flex gap-3 " >
       <button
          className="hidden group-hover:block"
          onClick={handleButtonClick}
        >
          <svg
            className="text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <button
          {...attributes}
          {...listeners}
          className={` ${isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`} 
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-5 w-5" />
        </button>
       </div>
      </div>
    </div>
  );
}
