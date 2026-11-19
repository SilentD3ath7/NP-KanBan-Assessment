import { CommandItem } from "@/components/ui/command";
import { Project, projects } from "./project-selection";
import { IoMdCheckmark } from "react-icons/io";

export function SingleProjectCommandItem({
    project,
    isSelected,
    onSelectedItem,
}:
{
    project: Project;
    isSelected: boolean;
    onSelectedItem: (project: Project) => void;
})
{
    // Destructure the project object
    const { name: projectName, tasks, icon: ProjectIcon } = project;

    // JSX
    return (
        <CommandItem
        value={projectName}

        // When the user selected the project
        onSelect={(value: string) => {
            // Find the project using find
            const findProject = projects.find((proj) => proj.name === value);

            // If it finds project, update the parent component "onSelectedProject"
            if (findProject) { onSelectedItem(findProject); }
        }} className="cursor-pointer hover:bg-gray-100 rounded-lg p-2">

            <div className="flex items-center justify-between w-full">

                {/* Container for project icon and name */}
                <div className="flex items-center gap-3">

                    {/* Project icon */}
                    <div className="size-8 bg-primary flex items-center justify-center rounded-md text-white">
                        <ProjectIcon/>
                    </div>

                    {/* Project name and task number */}
                    <div className="flex flex-col">
                        <span className="font-medium">{projectName}</span>
                        <span className="text-[12px] text-gray-500">{tasks.length} Tasks</span>
                    </div>
                </div>

                {/* Checkmark for selected project */}
                {isSelected && (<div className="text-primary"><IoMdCheckmark size={12}/></div>)}
            </div>
        </CommandItem>
    );
}