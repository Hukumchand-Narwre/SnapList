interface Board {
  columns: Map<TypedColumn, Column>;
}
type TypedColumn = "todo" | "inProgress" | "done";

interface Column {
  id: TypedColumn;
  todos: Todo[];
}

interface Todo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  images?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
