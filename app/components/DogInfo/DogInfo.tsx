import { GET_DOGS_QUERY } from '@/lib/queries';
import styles from './DogInfo.module.scss';
import Image from 'next/image';
import { Text } from '@/components/Text/Text';
import { getClient } from '@/lib/client';

interface Props {
  name: string;
}

export const DogInfo = async ({ name }: Props) => {
  console.log(name);
  const { data } = await getClient().query({
    query: GET_DOGS_QUERY,
    variables: {
      name,
    },
  });

  if (!data?.dogs[0]) return null;

  const {
    dogName,
    goodWithOtherDogs,
    goodWithStrangers,
    imageLink,
    minLifeExpectancy,
  } = data?.dogs[0] ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.titleWithPicture}>
        <div className={styles.imageContainer}>
          <Image src={imageLink} alt={dogName} fill className={styles.img} />
        </div>
        <Text as="h2" fontFamily="cormorant">
          {dogName}
        </Text>
      </div>

      <Text as="p" fontFamily="cormorant">
        Good with other dogs : {goodWithOtherDogs}
      </Text>
      <Text as="p" fontFamily="cormorant">
        Good with strangers : {goodWithStrangers}
      </Text>
      <Text as="p" fontFamily="cormorant">
        Minimum life expectancy : {minLifeExpectancy}
      </Text>
    </div>
  );
};
