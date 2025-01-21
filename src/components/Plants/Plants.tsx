import { useData } from '../../providers/data.provider.tsx';
import { useMemo } from 'react';
import { extractPlantData } from '../../utils/plant.ts';
import { Plant } from './index.ts';

const Plants = () => {
  const { data } = useData();
  const plants = useMemo(() => {
    return extractPlantData(data);
  }, [data]);

  return (
    <>
      {
        plants.map((plant) => <Plant plant={ plant }
                                     key={ plant.id }/>)
      }
    </>

  );
};

export default Plants;
