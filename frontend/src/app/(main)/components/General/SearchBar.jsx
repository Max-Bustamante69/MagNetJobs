import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const inResults = useRef(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const hideResults = () => {
    if (!inResults.current) setShowResults(false);
  };

  useEffect(() => {
    if (search.length > 0) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/?search=${search}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setShowResults(true);
        });
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [search]);

  return (
    <div className="flex flex-col w-1/3 items-center justify-top relative z-50">
      <div
        id="search-bar"
        className="flex w-full items-center relative border border-white border-opacity-20 text-md font-bold p-1 rounded-lg transition duration-300 focus-within:border-opacity-80 hover:border-green-700">
        <Input
          className="border-none w-full"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          onFocus={() => setShowResults(true)}
          onBlur={hideResults}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 box p-2 box-content rounded-full transition duration-300 hover:stroke-black hover:bg-green-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      {results.length > 0 && showResults && (
        <ul
          className="absolute top-12 bg-black border-opacity-60 overflow-y-scroll max-h-64 px-4  w-full border border-white"
          onMouseEnter={() => (inResults.current = true)}
          onMouseLeave={() => (inResults.current = false)}
        >
          {results.map((result) => (
            <Link
              className=""
              href={`/profile/${result.username}`}
              onClick={() => setShowResults(false)}
              key={result.id}
            >
              <li className="flex my-4 items-center gap-4 cursor-pointer">
                <Avatar className="size-10">
                  <AvatarImage src="https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold text-md">{result.username}</p>
                  <p className="opacity-70 text-sm">{result.first_name}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
