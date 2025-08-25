import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo, onEditTodo, onCompleteTodo }) => {
  const { title, description, priority, completed, createdAt } = todo;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id);
    setDropdownOpen(false);
  };
  // Helper to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-600/90";
      case "medium":
        return "bg-orange-500/90";
      case "high":
        return "bg-red-500/90";
      default:
        return "bg-primary/20";
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <div className="flex flex-col gap-2 bg-secondary/50 p-4 rounded-md w-full relative group hover:bg-secondary transition-all duration-300 border border-accent/10 cursor-default">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={completed || false}
          className="aspect-square accent-accent checked:outline-2 checked:outline-accent h-5 w-5 mt-1"
          onChange={() => onCompleteTodo(todo)}
        />
        <div className="flex flex-col w-full">
          <span className={`text-white text-md font-bold ${completed ? "line-through decoration-2 decoration-primary" : ""}`}>{title}</span>
          <span className={`text-white text-sm font-lato-regular ${completed ? "line-through decoration-2 decoration-primary" : ""}`}>{description}</span>
          <div className="flex gap-2 mt-2 justify-between">
            <span
              className={`text-white rounded-lg px-2 py-1 text-xs font-semibold ${getPriorityColor(
                priority
              )}`}
            >
              {priority}
            </span>
            <span className={`text-white text-sm font-lato-regular ${completed ? "underline decoration-2 decoration-primary" : ""}`}>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div ref={dropdownRef} className="absolute top-4 right-4">
        <button
          className="text-white text-xl bg-transparent border-0 outline-none hover:bg-accent/30 h-8 w-8 flex items-center justify-center p-2 rounded-md hover:border-accent/10"
          onClick={() => setDropdownOpen((open) => !open)}
          type="button"
        >
          <BsThreeDotsVertical className="text-xl w-full h-full" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-10 top-0 mt-2 w-32 bg-primary text-white rounded-md shadow-lg z-10 flex flex-col py-1 border border-accent/10">
            <button className="px-4 py-2 text-left hover:bg-accent/30 w-full text-sm rounded-md" onClick={() => {
              onEditTodo(todo);
            }}>Edit</button>
            <hr className="border-accent/10 mx-1" />
            <button className="px-4 py-2 text-left hover:bg-accent/30 w-full text-sm rounded-md" onClick={handleDeleteTodo}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;