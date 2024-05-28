import { DogInfo } from '@/components/DogInfo/DogInfo';

export default function page({ params }: { params: { dogName: string } }) {
  const name = decodeURIComponent(params.dogName);

  return <DogInfo name={name} />;
}
