import { Search } from "lucide-react";
import { Input } from "../ui/input";

export function SearchBar() {
  return (
    <>
      <div className="flex items-center space-x-2 bg-white rounded-[2rem] px-3 w-[30%]"  style={{outline:"0.5px solid #B1B1B1"}}>
        <Input
          type="text"
          placeholder="Search"
          className="border-none bg-transparent focus:ring-0 focus:border-none focus:outline-none p-0"
        />
        <Search className="text-[#111111] h-5 w-5" />
      </div>
    </>
  );
}
