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
  credentials: UserCredential;
  setCredentials: (credentials: UserCredential) => void;
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
  credentials: { name: "", email: "" },
  getBoard: async () => {
    console.log(get().credentials);
    const board = await getTodosGroupedByColumns(get().credentials);
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  searchString: "",
  newTaskInput: "",
  // modalnewTaskInput: "",
  newTaskType: "todo",
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
    const name = get().credentials;
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columId,
        name: name.email,
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
        name: state.credentials.email,
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
