import * as React from "react";
import { wmkClass } from "../../logic";
import CSS from "csstype";

interface SearchSliderOpenProps {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children: React.ReactNode;
  style?: CSS.StandardProperties;
}

export const SearchSliderOpen = ({
  isSearchOpen,
  setIsSearchOpen,
  className,
  children,
  style
}: SearchSliderOpenProps) => {
  const handleFocus = () => {
    setIsSearchOpen(true);
  };
  const _className = [];
  _className.push(isSearchOpen ? "search-open" : "search-closed");
  _className.push(className);

  return (
    <button
      className={wmkClass("open", "search", _className.join(" "))}
      onClick={handleFocus}
      style={style ? style : undefined}>
      {children}
    </button>
  );
};