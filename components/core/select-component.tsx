"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const sports = [
  {
    value: "soccer",
    label: "Soccer",
  },
  {
    value: "basketball",
    label: "Basketball",
  },
  {
    value: "tennis",
    label: "Tennis",
  },
  {
    value: "cricket",
    label: "Cricket",
  },
  {
    value: "baseball",
    label: "Baseball",
  },
];

export function SelectComponent() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[14rem] justify-between rounded-[2rem]"
        >
          {value
            ? sports.find((sport) => sport.value === value)?.label
            : "All Sport"}
          <ChevronDown className="ml-2 h-4 w-4 text-[#000]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="All Sport" />
          <CommandList>
            <CommandEmpty>No Sport found.</CommandEmpty>
            <CommandGroup>
              {sports.map((sport) => (
                <CommandItem
                  key={sport.value}
                  value={sport.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === sport.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {sport.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
