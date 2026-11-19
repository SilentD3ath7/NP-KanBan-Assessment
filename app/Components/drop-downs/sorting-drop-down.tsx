"use client";

import * as React from "react"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDown } from "react-icons/io";
import { IoMdArrowUp } from "react-icons/io";

const options = ["A-Z", "Z-A"];

export function SortingDropDown() {
    const [selectedOption, setSelectedOption] = React.useState("A-Z");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost"/>}>
                <span className="font-medium text-sm">{selectedOption}</span>
                    
                {/* Changes arrow icon based on selected option */}
                {selectedOption === "A-Z" ? <IoMdArrowDown className="text-sm"/> : <IoMdArrowUp className="text-sm"/>}
            </DropdownMenuTrigger>

            {/* Drop down content */}
            <DropdownMenuContent className="w-20 shantellSans">
                {options.map((option, index) => (
                    <DropdownMenuCheckboxItem
                    key={index}
                    className="h-9"
                    // Adds a check to the selected option
                    checked={selectedOption === option}
                    // When user clicks on the option, update the selected option with the item clicked
                    onCheckedChange={() => setSelectedOption(option)}>{option}</DropdownMenuCheckboxItem>))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}