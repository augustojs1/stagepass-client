import { Search } from "lucide-react";

import { Button } from "./button";

export function SearchInput() {
  return (
    <div className="flex items-center w-full max-w-[600px] bg-white rounded-md shadow-sm border border-gray-200 py-[8px] pl-[12px] focus-within:ring-1 focus-within:ring-indigo-400">
      <Search className="text-primary mr-2" size={22} />
      <input
        type="text"
        placeholder="Find the event you're interested in"
        className="w-full placeholder-gray-1 text-[14px] text-gray-2 focus:outline-none"
      />
      <div className="border-l-1 border-gray-4 px-[25px]">
        <Button>Search</Button>
      </div>
    </div>
  );
}
