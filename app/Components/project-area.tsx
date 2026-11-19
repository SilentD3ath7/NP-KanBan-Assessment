import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineSortByAlpha } from "react-icons/md";
import { SortingDropDown } from "./drop-downs/sorting-drop-down";
import { useTheme } from "next-themes";
import { ColumnsState, ColumnKey, TaskItem } from "./types";

type ProjectsAreaProps = {
        columns: ColumnsState;
        setColumns: React.Dispatch<React.SetStateAction<ColumnsState>>;
    };

export default function ProjectsArea({ columns, setColumns }: ProjectsAreaProps) {
    
    type DraggedItem = {
            columnId: ColumnKey;
            item: TaskItem;
    }

    const [newTask, setNewTask] = useState("");
    const [activeColumns, setActiveColumns] = useState<ColumnKey>("toDo");
    const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

    const { theme } = useTheme();
    const bgColor = theme === "dark" ? "bg-black" : "bg-gray-100";
    const columnStyles = {
        toDo: {
            header: "bg-gradient-to-r from-blue-600 to-blue-400",
            border: "border-blue-400"
        },
        inProgress: {
            header: "bg-gradient-to-r from-yellow-600 to-yellow-400",
            border: "border-yellow-400"
        },
        inReview: {
            header: "bg-gradient-to-r from-orange-600 to-orange-400",
            border: "border-orange-400"
        },
        done: {
            header: "bg-gradient-to-r from-green-600 to-green-400",
            border: "border-green-400"
        },
    }

    const addNewTask = () => {
        // If task empty, return nothing
        if(newTask.trim() === "") return;

        const updatedColumns = {...columns};

        updatedColumns[activeColumns].items.push({
            id: Date.now().toString(),
            content: newTask,
        });

        setColumns(updatedColumns);
        setNewTask("");
    };

    const removeTask = (columnId: ColumnKey, taskId: string) => {
        const updatedColumns = {...columns};

        updatedColumns[columnId].items = updatedColumns[columnId].items.filter((item) => item.id !== taskId);

        setColumns(updatedColumns);
    };

    const handleDragStart = (columnId: ColumnKey, item: TaskItem) => {
        setDraggedItem({columnId, item});
    };

    const handleDragover = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: ColumnKey) => {
        e.preventDefault();

        if(!draggedItem) return;

        const {columnId: sourceColumnId, item} = draggedItem;

        // Prevents duplicate
        if(sourceColumnId === columnId) return;

        const updatedColumns = {...columns}

        updatedColumns[sourceColumnId].items = 
        updatedColumns[sourceColumnId].items.filter((i) => i.id != item.id);

        updatedColumns[columnId].items.push(item);

        setColumns(updatedColumns);
        setDraggedItem(null);
    };

    return (
        <Card className="shadow-none p-7 rounded-3xl px-7 flex flex-col gap-8">

            {/* Header */}
            <div className="relative flex justify-between items-center w-full">

                <div className="flex gap-3 items-center justify-start">
                    <span className="text-2xl font-bold">Projects</span>
                </div>

                {/* Input to add a task */}
                <div className="absolute left-1/2 -translate-x-1/2 mb-8 flex w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
                    
                    {/* Typebar */}
                    <input type="text" value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a New Task..."
                    className="flex-grow p-3 bg-primary text-white"
                    onKeyDown={(e) => e.key === "Enter" && addNewTask()}/>

                    {/* Where should the task be created */}
                    <select value={activeColumns}
                    onChange={(e) => setActiveColumns(e.target.value as ColumnKey)}
                    className={`p-3 ${columnStyles[activeColumns].header} bg-zinc-700 text-white border border-black`}>
                        {(Object.keys(columns) as ColumnKey[]).map((columnId) => (
                            <option value={columnId} key={columnId}>
                                {columns[columnId].name}
                            </option>
                        ))}
                    </select>

                    {/* Add button */}
                    <button onClick={addNewTask}
                    className="px-6 bg-primary text-white font-md 
                    transition-all duration-200 cursor-pointer">Add</button>
                </div>    

                {/* Sort label and icon */} 
                {/* <div className="flex items-center gap-1">
                    <MdOutlineSortByAlpha className="text-xl text-gray-500"/>
                    <span className="text-gray-500 text-sm">Sort</span>
                </div> */}
                {/* Sorting drop down */}
                <div className="flex items-center gap-2">
                    <SortingDropDown />
                </div>
            </div>

            {/* Task board */}
            <div className="flex gap-6 overflow-x-auto pb-6 w-full h-full">
                {(Object.keys(columns) as ColumnKey[]).map((columnId) => (
                    
                    // Parent container for the columns
                    <div key={columnId}
                    className={`w-full h-full border p-4 rounded-2xl ${bgColor} shadow-xl`}
                    onDragOver={(e) => handleDragover(e)}
                    onDrop={(e) => handleDrop(e, columnId)}>
                        
                        {/* Task Header */}
                        <CardHeader className={`flex justify-between ${columnStyles[columnId].header} p-4 rounded-lg items-center`}>
                            <span className="font-medium text-md">{columns[columnId].name}</span>
                            <span className="size-6 rounded-full bg-primary text-white flex items-center justify-center">{columns[columnId].items.length}</span>
                        </CardHeader>

                        {/* Tasks container */}
                        <CardContent className="p-3 min-h-64">
                        {columns[columnId].items.length === 0 ? (
                            <div className="text-center py-35 text-zinc-500 text-sm">Drop tasks here</div>
                        ) : (
                            columns[columnId].items.map((item) => (
                                <div key={item.id} className="p-4 mb-3 bg-zinc-700 text-white rounded-lg
                                shadow-md cursor-move flex items-center justify-between transform
                                transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                draggable
                                onDragStart={() => handleDragStart(columnId, item)}>
                                    <span>{item.content}</span>
                                    <Button onClick={() => removeTask(columnId, item.id)}
                                        className="text-zinc-400 hover:text-red-400 transition-colors duration-200 w-6
                                        h-6 flex items-center justify-center rounded-full hover:bg-white bg-transparent">
                                            <span className="text-lg cursor-pointer">x</span>
                                    </Button>
                                </div>
                            ))
                        )}
                        </CardContent>
                    </div>
                ))}
            </div>
        </Card>
    );
}