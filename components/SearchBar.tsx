export default function SearchBar({
  searchValue,
  setSearchValue,
  placeholder,
}: //   onSubmit,
{
  searchValue: string;
  setSearchValue: (query: string) => void;
  placeholder: string;
  //   onSubmit: () => void;
}) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchValue(searchValue);
    // onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} role="form">
      <div className="flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="rounded-lg p-1 mr-2 bg-gray-700 text-md"
        />
        <button
          type="submit"
          className="text-xs bg-blue-700 rounded-md px-2 h-8"
        >
          Search
        </button>
      </div>
    </form>
  );
}
