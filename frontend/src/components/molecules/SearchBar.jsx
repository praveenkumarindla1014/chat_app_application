import { Search, X } from "lucide-react";

/** Search bar with icon and clear button */
const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-colors">
        <Search className="size-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-base-200/60 border border-base-300 rounded-xl pl-9 pr-8 py-2.5 text-sm
          placeholder:text-base-content/30 focus:outline-none focus:ring-2 focus:ring-primary/20 
          focus:bg-base-100 transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/30 
            hover:text-error transition-colors"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
