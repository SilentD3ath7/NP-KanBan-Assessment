import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

// WIP
export default function SearchBar() {
    return (
        <div className="relative">
            <IoSearch className="absolute text-2xl left-3 top-2 text-gray-400"/>
            <Input
                className={`bg-transparent border-gray-700 text-white 
                border rounded-3xl h-10 pl-11 shadow-none focus-visible:ring-1 focus-visible:ring-gray-400 placeholder-white!`}
                placeholder="Search..."/>
        </div>
    );
}