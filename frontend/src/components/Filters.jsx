import { FaSearch, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Filters = ({ query, clearSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSearch = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = () => {
        query(inputValue);
    };
    return (
        <div className="flex gap-2 w-full flex-1 justify-between">
            <div className="flex gap-2 w-full">
                <input type="text" placeholder="Search by title" value={inputValue} onChange={handleSearch} className="w-full flex-1 rounded-md hover:cursor-pointer border border-accent/10 focus:ring-0 focus:outline-none p-2 bg-secondary/50 focus:bg-secondary transition-all duration-300 text-white placeholder:text-white/50"/>
                {inputValue.length > 0 && <button className="bg-accent text-primary p-2 rounded-md flex gap-2 items-center" onClick={() => {
                    clearSearch();
                    setInputValue("");
                }}><FaTimes className="text-xl" /> Clear</button>}
            </div>
            <button className="bg-accent text-primary p-2 rounded-md flex gap-2 items-center disabled:bg-accent/90 disabled:text-primary/50 disabled:cursor-not-allowed" onClick={handleSearchClick} disabled={inputValue.length === 0} onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}><FaSearch className="text-xl" /> Search</button>
        </div>
    );
};

export default Filters;