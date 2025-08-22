import { FaSearch } from "react-icons/fa";

const Filters = () => {
    return (
        <div className="flex gap-2 w-full flex-1 justify-between">
            <div className="flex gap-2 w-full">
                <input type="text" placeholder="Search by title" className="w-full flex-1 rounded-md hover:cursor-pointer border border-accent/10 focus:ring-0 focus:outline-none p-2 bg-secondary/50 focus:bg-secondary transition-all duration-300 text-white placeholder:text-white/50"/>
            </div>
            <button className="bg-accent text-primary p-2 rounded-md flex gap-2 items-center disabled:bg-accent/30 disabled:text-primary/50 disabled:cursor-not-allowed"><FaSearch className="text-xl" /> Search</button>
        </div>
    );
};

export default Filters;