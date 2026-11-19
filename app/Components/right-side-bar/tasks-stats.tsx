import { Separator } from "@base-ui/react";
import { RightSideBarProps } from "../types"

type TaskCard = {
    label: string;
    value: number;
};

export default function TasksStats({notStarted, inProgressAndReview, completedTasks, totalTasks} : RightSideBarProps) {

    // Statistic cards array
    const statisticCards: TaskCard[] = [
        { label: "not started", value: notStarted },
        { label: "in progress/review", value: inProgressAndReview },
        { label: "completed", value: completedTasks},
        { label: "total", value: totalTasks },
    ];

    // JSX
    return (
        <div className="flex flex-col gap-2">
            
            {/* Tasks label */}
            <span className="font-bold text-xl">Tasks</span>

            {/* Mapping the array */}
            <div className="grid grid-cols-2 gap-3 mt-3">
                {statisticCards.map((statCard, index) => (<SingleCard key={index} statCard={statCard}/>))}
            </div>
        </div>
    );
}

function SingleCard({ statCard }: {statCard: TaskCard}) {
    return (
        <div className={`p-3 dark:bg-black rounded-xl`}>

            {/* Label of each stat card */}
            <span className="text-gray-600 text-[12px]">{statCard.label.toUpperCase()}</span>

            {/* Vertical line and the number value */}
            <div className="flex gap-2 mt-1 items-center">
                <Separator className={"w-1 h-4 bg-primary"} orientation={"vertical"}/>
                <span className="font-bold text-lg">{statCard.value}</span>
            </div>
        </div>
    );
}