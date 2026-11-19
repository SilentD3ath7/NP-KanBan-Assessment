"using client";

import { Button } from "@/components/ui/button"
import { 
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FaMobileRetro } from "react-icons/fa6";
import { IconType } from "react-icons/lib";
import { FaFlagCheckered } from "react-icons/fa6";
import ProjectCommandItems from "./project-command-items";
import { useState } from "react";
import { useTheme } from "next-themes";

export type Project = {
    id: string;
    name: string;
    icon: IconType;
    createdAt: Date;
    tasks: string[];
};

export const projects: Project[] = [
    {
        id: "1",
        name: "Project 1",
        icon: FaMobileRetro,
        createdAt: new Date(),
        tasks: [],
    },
    {
        id: "2",
        name: "Project 2",
        icon: FaFlagCheckered,
        createdAt: new Date(),
        tasks: [],
    },
];

export default function ProjectSelectionDropDown() {

    const { theme } = useTheme();
    const bgColor = theme === "dark" ? "bg-gray-600" : "bg-gray-100";

    // Selected project state
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0])

    console.log(selectedProject)

    // JSX
    return (
        <Popover>
            <PopoverTrigger render={<Button variant="ghost" className={`w-full flex justify-between py-9 rounded-xl ${bgColor}`}/>}>

                {/* Show the name of the selected project state */}
                <div className="flex items-start flex-col text-[16px] gap-1">
                    <p className="text-[13px] text-slate-500">PROJECT</p>
                    <p className="font-bold">{selectedProject.name}</p>
                </div>

                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-2xl text-white">
                    {/* Render the icon of selected project */}
                    <selectedProject.icon/>
                </div>
            </PopoverTrigger>

            <PopoverContent className="p-2 shantellSans rounded-xl">
                <ProjectCommandItems
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}/>
            </PopoverContent>
        </Popover>
    );
}