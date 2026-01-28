// import { useState, useRef } from 'react';
// import { FiSearch, FiX } from 'react-icons/fi';
// // import { useTranslation } from 'next-i18next';

// interface Props {
//   onSearch: (value: string) => void;
// }

// export const Search = ({ onSearch }: Props) => {
//   const [value, setValue] = useState('');
//   const inputRef = useRef<HTMLInputElement>(null);
//   // const { t } = useTranslation('common');

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (value) onSearch(value);
//   };

//   const handleClearInput = () => {
//     setValue('');
//     if (inputRef.current) inputRef.current.focus();
//   };

//   const showClearButton = !!value;

//   return (
//     <form
//       className="relative flex h-10 max-w-[200px] content-between items-center"
//       onSubmit={handleSubmit}
//     >
//       <input
//         className="h-full w-full rounded-lg border border-solid border-transparent bg-neutral-100 p-2.5 pr-9 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-violet-500"
//         type="text"
//         name="search"
//         id="search"
//         placeholder={`${('Search')}`}
//         aria-label="Search"
//         value={value}
//         ref={inputRef}
//         onChange={e => setValue(e.target.value)}
//       />
//       {showClearButton ? (
//         <button
//           type="button"
//           className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
//           aria-label="Clear search input"
//           onClick={handleClearInput}
//         >
//           <FiX size="1.25rem" />
//         </button>
//       ) : (
//         <button
//           type="submit"
//           className="absolute right-0 h-full w-[30px] cursor-pointer pr-2.5 text-neutral-500"
//           aria-label="Submit search"
//         >
//           <FiSearch size="1.25rem" />
//         </button>
//       )}
//     </form>
//   );
// };

"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

const SEARCH_KEY = "search_history";

type Props = {
  user?: { id: number } | null;
};

type SearchResults = {
  products: { id: number; title: string }[];
  categories: { id: number; name: string }[];
};

export default function Search({ user }: Props) {
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    products: [],
    categories: [],
  });

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    const q = debouncedQuery.trim();

    // ❌ hide results for empty or "0"
    if (!q || q === "0") {
      setResults({ products: [], categories: [] });
      return;
    }

    const search = async () => {
      const res = await axios.get(`/api/search?q=${encodeURIComponent(q)}`);
      setResults(res.data);
      saveHistory(q);
    };

    search();
  }, [debouncedQuery]);

  const saveHistory = async (text: string) => {
    if (user?.id) {
      await axios.post("/api/search/history", { query: text });
    } else {
      const history = JSON.parse(localStorage.getItem(SEARCH_KEY) || "[]");

      const updated = [
        text,
        ...history.filter((q: string) => q !== text),
      ].slice(0, 10);

      localStorage.setItem(SEARCH_KEY, JSON.stringify(updated));
    }
  };

  const closeSearch = () => {
    setQuery("");
    setResults({ products: [], categories: [] });
  };

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="h-full w-full rounded-lg border border-solid border-transparent bg-neutral-100 p-2.5 pr-9 text-neutral-900 placeholder-neutral-500 outline-none transition-colors focus:border-violet-500"
      />
      {!query && (
        <FiSearch
          className="pointer-events-none absolute right-3 top-1/2
               -translate-y-1/2 text-neutral-500"
          onClick={() => searchRef.current?.querySelector("input")?.focus()}
          size={18}
        />
      )}

      {query && (
        <button
          onClick={closeSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2
               text-neutral-500 hover:text-red-500"
        >
          ✕
        </button>
      )}
      {results.products.length > 0 && (
        <div className="absolute bg-white w-full rounded border py-2 shadow">
          <h4 className="font-bold px-1">Products</h4>
          {results.products.map((p: any) => {
            console.log(p.category.slug);
            return (
              <div className="px-2 py-1 text-sm hover:bg-gray-200" key={p.id}>
                <Link
                  className="block"
                  href={`/${p.category.slug}/${p.title}`}
                  onClick={closeSearch}
                >
                  {p.title}
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {results.categories.length > 0 && (
        <div className="absolute bg-white w-full rounded border py-2 shadow">
          <h4 className="font-bold px-1">Categories</h4>
          {results.categories.map((c: any) => (
            <div className="px-2 py-1 text-sm hover:bg-gray-200" key={c.id}>
              <Link className="block" href={`/${c.slug}`} onClick={closeSearch}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
