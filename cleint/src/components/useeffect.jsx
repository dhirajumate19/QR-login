import { useEffect, useState } from "react";

export const UseEffectDemo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const getFetch = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      const data = await response.json();
      setData(data);
      setLoading(false);
    };
    getFetch();
  }, []);
  if (loading) {
    return <div>loading...</div>;
  }
  const AddTask = () => {
    const newTask = {
      id: data.length + 1,
      title: newTodo,
      completed: false,
      userId: Math.random(),
    };
    setData([newTask, ...data]);
    setNewTodo("");
  };

  return (
    <div>
      {" "}
      <input
        type=" text"
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={AddTask}>Add Todo</button>
      <ul>
        {data.map((item) => {
          return <li key={data.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};
