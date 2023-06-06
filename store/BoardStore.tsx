import { databases, storage, ID } from "@/appwrite";
import { getTodosGroupedByColumns } from "@/utils/getTodosGroupedByColumns";
import { todo } from "node:test";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columID: TypedColumn) => void;
  searchString: string;
  newTaskInput: string;
  newTaskType: TypedColumn;
  credentials: string;
  setCredentials: (credentials: string) => void;
  // modalnewTaskInput: string;
  // setModalnewTaskInput: (input: string) => void;
  // image: File | null;
  // setImage: (image: File | null) => void;
  setSearchString: (searchString: string) => void;
  setNewTaskInput: (input: string) => void;
  setNewTaskType: (input: TypedColumn) => void;
  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
  addTask: (todo: string, columId: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumns();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  searchString: "",
  newTaskInput: "",
  // modalnewTaskInput: "",
  newTaskType: "todo",
  credentials: "",
  setCredentials: (credentials) => set({ credentials }),
  //image: null,
  //setImage: (image: File | null) => set({ image }),
  setSearchString: (searchString) => set({ searchString }),
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  // setModalnewTaskInput: (input: string) => set({ modalnewTaskInput: input }),
  setNewTaskType: (input: TypedColumn) => set({ newTaskType: input }),
  updateTodoInDB: async (todo, columID) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columID,
      }
    );
  },
  deleteTask: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.images) {
      await storage.deleteFile(todo.images.bucketId, todo.images.fileId);
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo.$id
    );
  },
  addTask: async (todo: string, columId: TypedColumn) => {
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columId,
      }
    );
    set({ newTaskInput: "" });
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columId,
      };
      const column = newColumns.get(columId);
      if (!column) {
        newColumns.set(columId, {
          id: columId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columId)?.todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));
