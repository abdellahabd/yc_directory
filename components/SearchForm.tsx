import React from "react";
import Form from "next/form";
import SearchFormRest from "./SearchFormRest";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchFrom = ({ query }: { query?: string }) => {
  // const search_input=document.querySelector(".search-input")

  return (
    <Form action="/" className="search-form" scroll={false}>
      <input
        className="search-input"
        type="text"
        defaultValue={query}
        name="query"
        placeholder="Search Startup"
      />
      <div className="flex gap-2">
        {query && <SearchFormRest />}
        <Button type="submit" className="text-white search-btn">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchFrom;
