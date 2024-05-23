import { Text } from '@/components/Text/Text';
import styles from './SearchResults.module.scss';
import { useQuery } from '@apollo/client';
import { GET_DOGS_QUERY } from '@/lib/queries';

interface Props {
  searchValue: string;
}

export const SearchResults = ({ searchValue }: Props) => {
  const { data, loading } = useQuery(GET_DOGS_QUERY, {
    variables: {
      name: searchValue,
    },
  });

  const content = (
    <ul className={styles.searchDropdown}>
      {data?.dogs.length ? (
        data.dogs.map((dog) => (
          <li key={dog?.name} className={styles.searchItem}>
            <Text as="span" fontFamily="cormorant">
              {dog?.name}
            </Text>
          </li>
        ))
      ) : (
        <Text as="span" fontFamily="cormorant">
          No Results Found
        </Text>
      )}
    </ul>
  );

  return loading ? (
    <Text as="span" fontFamily="cormorant">
      Loading...
    </Text>
  ) : (
    content
  );
};
