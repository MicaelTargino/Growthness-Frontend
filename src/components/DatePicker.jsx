"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

export function DatePickerDemo({
  placeholder,
  description,
  selectedDate,
  onDateChange,
}) {
  const [date, setDate] = React.useState();
  const [year, setYear] = React.useState(new Date().getFullYear()); // State for the year

  // Handle year change
  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setYear(newYear);
    const newDate = new Date(selectedDate || new Date());
    newDate.setFullYear(newYear);
    onDateChange(newDate); // Update the selected date with the new year
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            <p>
              {description}: {format(selectedDate, "dd/MM/yyyy")}
            </p>
          ) : (
            <p>{placeholder}</p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-slate-900">
        {/* Add a year selector */}
        <div className="p-2">
          <label htmlFor="year-select" className="block text-white mb-2">
            Select Year:
          </label>
          <select
            id="year-select"
            value={year}
            onChange={handleYearChange}
            className="mb-2 p-2 border"
          >
            {/* Dynamically generate year options */}
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate || date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
