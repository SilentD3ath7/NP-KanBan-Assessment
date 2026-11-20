import { Card } from "@/components/ui/card";
import { RightSideBarProps } from "../types"
import CircularProgress from "./circular-progress";
import TasksStats from "./tasks-stats";
import ProjectSelectionDropDown from "../drop-downs/project-selection/project-selection"

export default function RightSideBar({notStarted, inProgressAndReview, completedTasks, totalTasks} : RightSideBarProps) {
    return (
        <Card className="shadow-none p-6 rounded-3xl max-h-[640px] bg-[color-mix(in_oklab,ButtonFace_75%,transparent)]">
            <div className="flex flex-col gap-0">
                <ProjectSelectionDropDown/>
                <CircularProgress notStarted={NaN} inProgressAndReview={NaN} completedTasks={completedTasks} totalTasks={totalTasks}/>
                <TasksStats notStarted={notStarted} inProgressAndReview={inProgressAndReview} completedTasks={completedTasks} totalTasks={totalTasks}/>
            </div>
        </Card>
    );
}