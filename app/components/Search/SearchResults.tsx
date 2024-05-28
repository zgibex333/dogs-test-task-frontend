import { Text } from '@/components/Text/Text';
import styles from './SearchResults.module.scss';
import { useQuery } from '@apollo/client';
import { GET_DOGS_QUERY } from '@/lib/queries';
import { type Dispatch, type SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchResults = ({ searchValue, setSearchValue }: Props) => {
  const { data, loading } = useQuery(GET_DOGS_QUERY, {
    variables: {
      name: searchValue,
    },
  });

  const router = useRouter();

  const handleSearchItemClick = (dogname: string) => () => {
    setSearchValue('');
    router.replace(`/info/${dogname}`);
  };

  if (!searchValue) return null;

  const searchContent = data?.dogs.length ? (
    data.dogs.map((dog) => (
      <li
        key={dog.dogName}
        className={styles.searchItem}
        onClick={handleSearchItemClick(dog.dogName)}
      >
        <Text as="span" fontFamily="cormorant">
          {dog.dogName}
        </Text>
      </li>
    ))
  ) : (
    <Text as="span" fontFamily="cormorant">
      No Results Found
    </Text>
  );

  const listContent = loading ? <li>Loading...</li> : searchContent;

  const content = <ul className={styles.searchDropdown}>{listContent}</ul>;

  return content;
};
