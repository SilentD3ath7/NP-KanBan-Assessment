import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
    const { theme } = useTheme();

    const style = theme === "dark" ? "bg-transparent border-gray-700 text-white" : "bg-white border-gray-300 text-black";
    return (
        <div className="relative">
            <IoSearch className="absolute text-2xl left-3 top-2 text-gray-400"/>
            <Input
                className={`${style} border rounded-3xl h-10 pl-11 shadow-none focus-visible:ring-1 focus-visible:ring-gray-400`}
                placeholder="Search..."/>
        </div>
    );
}