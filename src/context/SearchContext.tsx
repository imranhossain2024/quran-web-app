"use client";

import React, { createContext, useContext, useState } from "react";
import SearchModal from "@/components/modules/quran/SearchModal";

interface SearchContextType {
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchContext.Provider value={{ openSearch: () => setIsOpen(true), closeSearch: () => setIsOpen(false) }}>
      {children}
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
