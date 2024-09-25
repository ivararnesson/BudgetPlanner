import { useEffect, useState } from "react";
import { baseUrl } from "./constants";

const TodoList = () => {
    const [state, setState] = useState([{ title: "test" }]);
  const [isOld, setIsOld] = useState(false)

  useEffect((a) => {
    console.log('using effects!');
    getData();
    return(cleanUp);
  }, [isOld]);

  const cleanUp = async () => {
    console.log('cleaning up stuff!');
  }
    const getData = async () => {
    const res = await fetch(`${baseUrl}/api/tasks`);
        const data = await res.json();

        setState(data);
    };

    console.log("Todo list rendered");

    return (
        <>
            <h1>Todo List</h1>
            {state.map((x) => (
                <div>
                    <h1>{x.title}</h1>
                    <p>{x.description}</p>
                </div>
            ))}
            <button onClick={() => setIsOld(current => !current)} >Hämta data</button>
        </>
    );
};

export default TodoList;