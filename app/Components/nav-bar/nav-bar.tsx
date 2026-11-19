"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/app/mode-toggle";
import SearchBar from "./search-bar";
import AppNameAndLogo from "./logo-app";

export default function Navbar() {
    return (
        <div className="shantellSans p-6 flex justify-between items-center">
            <div className="flex items-center gap-16">
                <AppNameAndLogo/>
                <SearchBar/>
            </div>
            <div className="flex items-center gap-5">
                {/* Toggle for dark or light mode */}
                <ModeToggle/>
                <Separator orientation="vertical" className="h-5 !w-[2px] my-auto bg-gray-500"/>

                {/* Create project button WIP*/}
                <Button className="rounded-3xl h-10 shadow-none">
                    Add New Project
                </Button>
            </div>
        </div>
    );
}