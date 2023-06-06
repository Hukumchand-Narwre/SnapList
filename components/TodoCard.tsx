"use client";
import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = ({
  todo,
  index,
  id,
  dragHandleProps,
  draggableProps,
  innerRef,
}: Props) => {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask]);
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md "
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5  ">
        <p>{todo.title}</p>
        <button
          onClick={() => deleteTask(index, todo, id)}
          className=" text-red-500 hover:text-red-600 "
        >
          <XCircleIcon className="h-8 w-8 ml-5 " />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
