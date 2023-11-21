import React, { MutableRefObject, useState } from 'react'
import '../App.css'
import { DebouncedFunc } from 'lodash';

  interface SearchInputProps {
    onSearch: MutableRefObject<DebouncedFunc<(query: string) => void>>;
  }
  
  const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [copyButton, setCopyButton] = useState({title: 'Copy', disabled: false})

    const handleCopy = () => {
      navigator.clipboard.writeText(query)
      setCopyButton({title: 'Copied', disabled: true})
      setTimeout(() => {
        setCopyButton({title: 'Copy', disabled: false})
      }, 2000)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedQuery = e.target.value;
      setQuery(updatedQuery);
      onSearch.current(updatedQuery);
    };

    return (
      <div>
        <input type="text" value={query} onChange={handleChange} className='search-input'/>
        <button onClick={() => handleCopy()} disabled={copyButton.disabled}>{copyButton.title}</button>
      </div>
    );
  };

export default SearchInput
