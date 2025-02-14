import { useState } from "react";
import { Input } from "../components/ui/input";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Input
        type="text"
        placeholder="Search Items..."
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;