import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandList,
} from "@/components/ui/command";
import { Project, projects } from "./project-selection";
import { SingleProjectCommandItem } from "./single-project-item";
import { Dispatch, SetStateAction } from "react";

export default function ProjectCommandItems({
    selectedProject,
    setSelectedProject,
}:
{
    selectedProject: Project;
    setSelectedProject: Dispatch<SetStateAction<Project>>;
})
{
    function handleProjectSelect(project: Project) {setSelectedProject(project)};

    return (
        <Command>
            <CommandInput placeholder="Search a project..."/>
            <CommandList className="my-3"><CommandEmpty>No results found.</CommandEmpty></CommandList>

            {/* Map through each projects array and call the singleProject command item and pass the props */}
            <div className="flex flex-col gap-3">
                {projects.map((project, index) => (
                    <SingleProjectCommandItem
                    
                    // Project item
                    project={project}

                    // Key index
                    key={index}

                    // Callback function
                    onSelectedItem={handleProjectSelect}
                    
                    //Based on the condition of selected project name if equal to the name in array
                    isSelected={selectedProject.name === project.name}/>
                ))}
            </div>
        </Command>
    );
}