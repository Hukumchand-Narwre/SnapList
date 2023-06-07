import { databases } from "@/appwrite";

export const getTodosGroupedByColumns = async (props: any) => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );
  const todos = data.documents.filter((todo) => todo.name === props.email);
  console.log(todos);
  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      name: todo.name,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });
    return acc;
  }, new Map<TypedColumn, Column>());

  // if columns doesn't have in progress, done todo add them with empty todod
  const columnTypes: TypedColumn[] = ["todo", "inProgress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  //finding correct user data
  const specificUserColumns = new Map<TypedColumn, Column>(
    Array.from(columns.entries()).filter(([key, value]) =>
      value.todos.map((todo) => todo.name === "hukum")
    )
  );
  // sort them in order todo,inProgress,done
  const sortedColumns = new Map<TypedColumn, Column>(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };
  return board;
};
