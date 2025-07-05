// FILE: src/components/SearchBar.tsx
"use client";
import { useEffect, useState, useRef, useMemo } from "react"; // Added useMemo for fuse
import Fuse from "fuse.js";
import searchData from "@/../public/searchIndex.json"; // Assuming this path is correct
import Link from "next/link";
import { FiX } from "react-icons/fi"; // Added FiX for close button

interface SearchBarProps {
  onClose: () => void;
}

interface SearchResult {
  url: string;
  title: string;
  description?: string;
}

const SearchBar = ({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchBarContentRef = useRef<HTMLDivElement>(null); // Ref for the actual search input/results container

  // Fuse.js setup - use useMemo to ensure fuse object is stable and only re-created if searchData changes
  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ["title", "description"],
      threshold: 0.3,
    });
  }, []); // Dependency on searchData, which is imported and should be stable

  // Handle search query changes
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const searchResults = fuse.search(query).map((r) => r.item as SearchResult);
      setResults(searchResults);
    }
  }, [query, fuse]); // <--- ADDED 'fuse' HERE to resolve the warning

  // Handle clicks outside the search bar content to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarContentRef.current &&
        !searchBarContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // Re-run if onClose function changes

  // Optional: close search on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    // This outer div now acts as the full-screen overlay backdrop
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"> {/* Higher z-index to be on top */}
      {/* This inner div is the actual search bar content, centered on the screen */}
      <div
        ref={searchBarContentRef} // Attach ref to the content container
        className="relative mx-auto mt-20 w-11/12 max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-lg p-5" // Adjusted width and centering
        // Important: Stop propagation for clicks within this content area
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Close search"
        >
          <FiX className="text-2xl" />
        </button>

        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Search the site..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus // Automatically focus the input when the search bar opens
        />
        <ul className="mt-4 max-h-80 overflow-y-auto custom-scrollbar"> {/* Increased max-height, added custom-scrollbar (needs Tailwind config) */}
          {results.map((item, index) => (
            <li key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <Link
                href={item.url}
                className="block px-3 py-2 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                onClick={onClose} // Close search bar when a result link is clicked
              >
                <h3 className="font-medium text-blue-600 dark:text-blue-400">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{item.description}</p>
                )}
              </Link>
            </li>
          ))}
          {query && results.length === 0 && (
            <li className="text-sm text-gray-500 px-3 py-2">No results found for &quot;{query}&quot;.</li>
          )}
          {!query && results.length === 0 && (
            <li className="text-sm text-gray-500 px-3 py-2">Start typing to search...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
