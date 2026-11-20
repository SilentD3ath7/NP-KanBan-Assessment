"use client";

import { useState } from "react";
import { ColumnsState } from "./Components/types";
import Navbar from "./Components/nav-bar/nav-bar";
import ProjectsArea from "./Components/project-area";
import RightSideBar from "./Components/right-side-bar/right-side-bar";

export default function Home() {
  const [columns, setColumns] = useState<ColumnsState>({
    toDo:
      {
        name: "To Do",
        items:
          [
            {id: "1", content: "Market research"},
            {id: "2", content: "Write projects"},
          ],
      },
    inProgress:
      {
        name: "In Progress",
        items: [{id: "3", content: "Design UI mockups"}],
      },
    inReview:
      {
        name: "In Review",
        items: [{id: "4", content: "Pizza party"}],
      },
    done:
      {
        name: "Done",
        items: [{id: "5", content: "Set up repository"}],
      }
  });

  // Adds up total number of tasks
  const totalTasks = Object.values(columns).reduce(
    (sum, column) => sum + column.items.length, 0
  );
  
  const notStarted = columns.toDo.items.length;
  const inProgressAndReview = columns.inProgress.items.length + columns.inReview.items.length;
  const completedTasks = columns.done.items.length;

  return (
    <div className={`bg-[length:100%_100%] min-h-screen w-full`} style={{ backgroundImage: "url('/hero.jpg')" }}>
      <Navbar/>
      <div className="grid grid-cols-[3fr_1fr] px-6 mt-8 shantellSans gap-4">
        <ProjectsArea columns={columns} setColumns={setColumns}/>
        <RightSideBar notStarted={notStarted} inProgressAndReview={inProgressAndReview} completedTasks={completedTasks} totalTasks={totalTasks} />
      </div>
    </div>
  );
}
