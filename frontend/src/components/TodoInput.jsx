import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const TodoInput = () => {
    const [priority, setPriority] = useState("none");
    const [selectedPriority, setSelectedPriority] = useState(null);

    const handlePriorityChange = (option) => {
        setPriority(option.value);
        setSelectedPriority(option);
    }

    const priorityOptions = [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" }
    ];

    return (
        <div className="flex flex-col gap-2 bg-secondary p-4  h-full w-full rounded-md border border-accent/10">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-4">
                <label htmlFor="isCompleted" name="isCompleted" className="h-full">
                    <input type="checkbox" id="isCompleted" className="aspect-square accent-accent checked:outline-2 checked:outline-accent h-5 w-5 mt-3" disabled/>
                </label>
                <div className="flex flex-col gap-1 w-full">
                    <input id="title" type="text" placeholder="Enter a title" className="w-full border-0 focus:border-0 focus:ring-0 focus:outline-none p-2 bg-secondary text-white text-md font-bold" />
                    <textarea id="description" placeholder="Enter a description" className="w-full border-0 focus:border-0 focus:ring-0 focus:outline-none p-2 bg-secondary text-white resize-none outline-auto outline-none text-sm font-lato-regular" />
                    <div className="flex gap-2 w-full justify-start">  
                        <div className="w-40">
                    <CustomDropdown
                        id="priority"
                        name="priority"
                        label="Priority"
                        options={priorityOptions}
                        value={selectedPriority}
                        onChange={handlePriorityChange}
                    />
                            </div>  
                    </div>
                <div className="flex gap-2 justify-end">
                    <button className="bg-accent/30 text-white p-2 rounded-md w-16">Cancel</button>
                    <button className="bg-accent text-primary p-2 rounded-md w-16">Save</button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default TodoInput;