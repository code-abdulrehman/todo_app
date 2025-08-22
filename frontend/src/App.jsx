import TodoInput from "./components/TodoInput";
import { FaPlus } from "react-icons/fa6";
import Filters from "./components/Filters";
import TodoItem from "./components/TodoItem";
import { LuListTodo } from "react-icons/lu";

function App() {


  const todos = [

    {
      title: "title",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      priority: "high",
      isCompleted: true,
      date: "2025-08-22"
    },
    {
      title: "title",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      priority: "medium",
      isCompleted: true,
      date: "2025-08-22"
    },
    {
      title: "title 21",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      priority: "low",
      isCompleted: false,
      date: "2025-08-22"
    }
  ]

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex gap-4 border-0 p-4  h-full w-full justify-between border-b border-accent border-dashed">
          <h1 className="text-3xl font-bold text-center text-accent flex items-center gap-2"><LuListTodo className="text-4xl" />Todos</h1>
          <button className="bg-accent text-primary p-2 rounded-md font-lato-regular flex items-center gap-2"><FaPlus className="text-xl" />Add Todo</button>
        </div>
        <div className="flex flex-col gap-4 border-0 p-4  h-full w-full">
          <Filters />
          <TodoInput />
            {todos.length === 0 ? (
              <div className="flex flex-col gap-2 bg-secondary/50 p-4 rounded-md w-full border border-accent/10">
                <p className="text-white text-md font-bold text-center">No todos found</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {todos.map((todo, index) => (
                  <TodoItem key={index} title={todo.title} description={todo.description} priority={todo.priority} isCompleted={todo.isCompleted} date={todo.date} />
                ))}
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default App
