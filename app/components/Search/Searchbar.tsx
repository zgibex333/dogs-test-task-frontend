'use client';
import { useState } from 'react';
import styles from './Searchbar.module.scss';
import { Input } from '@/components/Input/Input';
import { useDebounce } from '@/lib/hooks';
import { SearchResults } from '@/components/Search/SearchResults';

export const Searchbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  const showDropdown = !!debouncedSearchValue;

  return (
    <div className={styles.searchInputWithDropdown}>
      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        iconPath="/icons/search.svg"
      />
      {showDropdown && <SearchResults searchValue={debouncedSearchValue} />}
    </div>
  );
};
