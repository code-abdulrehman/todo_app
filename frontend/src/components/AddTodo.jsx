import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";

const AddTodo = ({ onAddTodo, setShowAddTodo, todoToEdit, onUpdateTodo }) => {
    const [priorityOptions, setPriorityOptions] = useState([
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" }
    ]);
    const [selectedPriority, setSelectedPriority] = useState(priorityOptions.find(option => option.value === "low"));
    const [todo, setTodo] = useState({});

    const handlePriorityChange = (option) => setSelectedPriority(option);

    const handleAddTodo = async () => {
        try {
            await onAddTodo({
                title: todo.title,
                description: todo.description || "",
                priority: selectedPriority.value || "low",
                isCompleted: false,
                createdAt: new Date().toISOString()
            });
            setTodo({});
            setSelectedPriority(null);
            setShowAddTodo(false);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    const handleUpdateTodo = async () => {
        try {
            await onUpdateTodo(todo);
            setTodo({});
            setSelectedPriority(null);
            setShowAddTodo(false);
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    useEffect(() => {
        if (todoToEdit) {
            setTodo(todoToEdit);
            setSelectedPriority(priorityOptions.find(option => option.value === todoToEdit.priority));
        }
    }, [todoToEdit, setTodo, setSelectedPriority]);

    return (
        <div className="flex flex-col gap-2 bg-secondary p-4  h-full w-full rounded-md border border-accent/10">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
                <label htmlFor="isCompleted" name="isCompleted" className="h-full">
                    <input type="checkbox" id="isCompleted" className="aspect-square accent-accent checked:outline-2 checked:outline-accent h-5 w-5 mt-3" disabled/>
                </label>
                <div className="flex flex-col gap-1 w-full">
                    <input
                        id="title"
                        value={todo.title || ""}
                        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        type="text"
                        placeholder="Enter a title"
                        className="w-full border-0 focus:border-0 focus:ring-0 focus:outline-none p-2 bg-secondary text-white text-md font-bold"
                        required
                    />
                    <textarea
                        id="description"
                        value={todo.description || ""}
                        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                        placeholder="Enter a description"
                        className="w-full border-0 focus:border-0 focus:ring-0 focus:outline-none p-2 bg-secondary text-white resize-none outline-auto outline-none text-sm font-lato-regular"
                        required
                    />
                    <div className="flex gap-2 w-full justify-start">  
                        <div className="w-40">
                    <CustomDropdown
                        id="priority"
                        name="priority"
                        label="Priority"
                        options={priorityOptions}
                        value={selectedPriority}
                        onChange={handlePriorityChange}
                        required
                    />
                            </div>  
                    </div>
                <div className="flex gap-2 justify-end">
                    <button className="bg-accent/30 text-white p-2 rounded-md w-16" onClick={() => setShowAddTodo(false)}>Cancel</button>
                    <button className="bg-accent text-primary p-2 rounded-md w-16" onClick={todoToEdit ? handleUpdateTodo : handleAddTodo}>{todoToEdit ? "Update" : "Add"}</button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default AddTodo;