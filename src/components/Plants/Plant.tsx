import { useMemo } from 'react';
import { PlantSensor } from '../../types/plant.ts';

type PlantProps = {
  plant: PlantSensor;
}

const Plant = ({ plant: { daysSinceLastWatering, plant } }: PlantProps) => {
  const percentage = useMemo(() => {
    if (daysSinceLastWatering === 0 || daysSinceLastWatering === -1 || daysSinceLastWatering > 7) {
      return 100;
    }

    return (100 - 100 * (daysSinceLastWatering / 7))

  }, [daysSinceLastWatering]);

  const bg = useMemo(() => {
    if (daysSinceLastWatering === -1 || daysSinceLastWatering > 7) {
      return `opacity-50 bg-gradient-to-t from-red-500 to-red-900`;
    }

    return 'opacity-50 bg-gradient-to-t from-green-900 to-green-500';

  }, [daysSinceLastWatering]);


  const img = `url('/plants/${ plant }.jpg')`;
  return (
    <div className="relative h-[350px] w-[350px] m-auto flex bg-center bg-contain flex-col justify-center items-center text-7xl  rounded-full border-2 border-white overflow-hidden opacity-60"
         style={ { backgroundImage: img } }>
      <div className={ `${ bg } absolute  h-full w-full` }
           style={ { top: `${ 100 - percentage }%` } }></div>
    </div>
  );
};

export default Plant;

