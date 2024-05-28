'use client';
import { useState } from 'react';
import styles from './Searchbar.module.scss';
import { Input } from '@/components/Input/Input';
import { useDebounce } from '@/lib/hooks';
import { SearchResults } from '@/components/Search/SearchResults';

export const Searchbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  return (
    <div className={styles.searchInputWithDropdown}>
      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        iconPath="/icons/search.svg"
        data-testid="search-input"
      />
      {searchValue && (
        <SearchResults
          searchValue={debouncedSearchValue}
          setSearchValue={setSearchValue}
        />
      )}
    </div>
  );
};
