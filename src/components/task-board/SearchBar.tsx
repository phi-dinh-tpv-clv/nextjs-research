import React, { useState } from "react";
import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_ALL_TASKS } from "@/utils/common/constants";
import { useGeneralStore } from "@/stores/useGeneralStore";

const SearchBar = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const { setTaskKeyword } = useGeneralStore();

  const onSearchKeyword = () => {
    setTaskKeyword(search);
    queryClient.removeQueries({ queryKey: QUERY_ALL_TASKS });
    queryClient.invalidateQueries({ queryKey: QUERY_ALL_TASKS });
  };

  return (
    <div className="relative flex-1 py-3 pl-12">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearchKeyword();
          }
        }}
      />
      <MagnifyingGlassIcon
        onClick={onSearchKeyword}
        className="absolute bottom-0 right-3 top-0 my-auto h-6 w-6 cursor-pointer text-gray-500 hover:text-blue-600"
      />
    </div>
  );
};

export default SearchBar;
