import { FaPlus, FaSpinner } from "react-icons/fa6";
import { LuListTodo } from "react-icons/lu";
import { AddTodo, Filters, TodoItem } from "./components";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([...todos]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);
  useEffect(() => {

    axios.get("http://localhost:5000/todos")
      .then(response => {
        setTodos(response.data);
        setFilteredTodos(response.data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleReload = () => {
    axios.get("http://localhost:5000/todos")
      .then(response => {
        setTodos(response.data);
        setFilteredTodos(response.data);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const handleAddTodo = (todo) => {
    axios.post("http://localhost:5000/todos", todo)
      .then(response => {
        setTodos([...todos, response.data]);
        setFilteredTodos([...filteredTodos, response.data]);
      })
      .catch(error => setError(error));
  };

  const handleUpdateTodo = (todo) => {
    axios.put(`http://localhost:5000/todos/${todo.id}`, todo)
      .then(response => {
        setTodos(todos.map(t => t.id === todo.id ? response.data : t));
        setFilteredTodos(todos.map(t => t.id === todo.id ? response.data : t));
        setTodoToEdit(null);
        setShowAddTodo(false);
      })
      .catch(error => setError(error));
  };

  const handleCompleteTodo = (todo) => {
    axios.put(`http://localhost:5000/todos/${todo.id}`, { ...todo, completed: true })
      .then(response => {
        setTodos(todos.map(t => t.id === todo.id ? response.data : t));
        setFilteredTodos(filteredTodos.map(t => t.id === todo.id ? response.data : t));
      })
      .catch(error => setError(error));
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        setFilteredTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => setError(error));
  };

  const handleEditTodo = (todo) => {
    setShowAddTodo(true);
    setTodoToEdit(todo);
  };


  const query = (query) => {
    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    setFilteredTodos(filteredTodos || todos);
  };

  const clearSearch = () => {
    setFilteredTodos(todos);
  };
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex gap-4 border-0 p-4  h-full w-full justify-between border-b border-accent border-dashed">
          <h1 className="text-3xl font-bold text-center text-accent flex items-center gap-2"><LuListTodo className="text-4xl" />Todos</h1>
          <div className="flex gap-2">
            <button className="bg-accent text-primary p-2 rounded-md font-lato-regular flex items-center gap-2 group" onClick={handleReload}><FaSpinner className="text-xl group-hover:rotate-360 transition-all duration-300" />Reload</button>
            <button className="bg-accent text-primary p-2 rounded-md font-lato-regular flex items-center gap-2 group" onClick={() => setShowAddTodo(!showAddTodo)}><FaPlus className="text-xl transition-all duration-300 group-hover:rotate-90" />Add Todo</button>
          </div>
        </div>
        <div>
          {error && (
            <div className="flex flex-col gap-2 bg-secondary/50 p-4 rounded-md w-full border border-accent/10 my-4">
              <p className="text-white text-md font-bold text-center">Error: {error.message}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 border-0 p-4  h-full w-full">
          {
            loading ? (
              <div className="flex flex-col gap-2 bg-secondary/50 p-4 rounded-md w-full border border-accent/10">
                <p className="text-white text-md font-bold text-center">Loading...</p>
              </div>
            ) : (
              <>
                <Filters query={query} clearSearch={clearSearch} />
                {showAddTodo && <AddTodo onAddTodo={handleAddTodo} setShowAddTodo={setShowAddTodo} todoToEdit={todoToEdit} onUpdateTodo={handleUpdateTodo} />}
                {filteredTodos.length === 0 ? (
                  <div className="flex flex-col gap-2 bg-secondary/50 p-4 rounded-md w-full border border-accent/10">
                    <p className="text-white text-md font-bold text-center">No todos found</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {filteredTodos.map((todo, index) => (
                      <TodoItem key={index} todo={todo} onUpdateTodo={handleUpdateTodo} onDeleteTodo={handleDeleteTodo} onEditTodo={handleEditTodo} onCompleteTodo={handleCompleteTodo} />
                    ))}
                  </div>
                )}
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
