import * as React from 'react';
import './SearchBar.css';

export interface SearchBarProps {
  input: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchBar: React.SFC<SearchBarProps> = ({
  input,
  placeholder,
}: SearchBarProps) => {
  return (
    <input
      type="text"
      className="search-bar"
      onInput={input}
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
