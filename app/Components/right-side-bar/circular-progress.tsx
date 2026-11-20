import { CircularProgressbar } from "react-circular-progressbar";
import { RightSideBarProps } from "../types"
import "react-circular-progressbar/dist/styles.css";

export default function CircularProgress({completedTasks, totalTasks,} : RightSideBarProps) {

    const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    const primaryColor = "#22c55e";

    return (
        <CircularProgressbar
        className="text-primary size-52 my-10"
        value={percentage}
        styles={{
            // Customize the progress bar (path)
            path:
            {
                stroke: primaryColor, // Change the progress bar color
                strokeLinecap: "round", // Rounded edges
                transition: "stroke-dashoffset 0.5s ease 0s", // Smooth transition
            },
            // Customize the background (trail)
            trail:
            {
                stroke: "#e2e8f0", // Change the color of the background
            },
            // Customize the text
            text:
            {
                fill: primaryColor, // Change the text color
                fontSize: "16px", // Change the font size
            },
        }}
        text={`${percentage}%`}/>
    );
}