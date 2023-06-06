"use client";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

import React, { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import Modal from "./Modal";
const Board = () => {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragend = (result: DropResult) => {
    const { source, destination, type } = result;
    //check if user drag outside of  board
    if (!destination) return;

    // handle column drag

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    //Handle card drag
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const lastColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const lastCol: Column = {
      id: lastColIndex[0],
      todos: lastColIndex[1].todos,
    };

    if (!startCol || !lastCol) return;

    if (source.index === destination.index && startCol === lastCol) return;

    const newTodos = startCol.todos;
    const [todomoved] = newTodos.splice(source.index, 1);
    if (startCol.id === lastCol.id) {
      //drag & drop in same column
      newTodos.splice(destination.index, 0, todomoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColmns = new Map(board.columns);
      newColmns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColmns });
    } else {
      //drag and drop in different column
      const finishedTodos = Array.from(lastCol.todos);
      finishedTodos.splice(destination.index, 0, todomoved);
      const newColmns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      newColmns.set(startCol.id, newCol);
      newColmns.set(lastCol.id, {
        id: lastCol.id,
        todos: finishedTodos,
      });

      //update in DB
      updateTodoInDB(todomoved, lastCol.id);
      setBoardState({ ...board, columns: newColmns });
    }
  };

  return (
    <>
      <Modal />
      <DragDropContext onDragEnd={handleOnDragend}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Array.from(board.columns.entries()).map(
                ([id, columns], index) => (
                  <Column
                    key={id}
                    id={id}
                    todos={columns.todos}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
