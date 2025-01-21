import { useMemo } from 'react';
import { PlantSensor } from '../../types/plant.ts';

type PlantProps = {
  plant: PlantSensor;
}

const minMoisture = 15;
const maxMoisture = 60;

const Plant = ({ plant: { moisture, plant } }: PlantProps) => {
  const percentage = useMemo(() => {
    if (moisture > maxMoisture) {
      return 100;
    }

    if (moisture < minMoisture) {
      return Math.max(30, (100 / minMoisture) * moisture);
    }

    return Math.max(30, (100 / (maxMoisture - minMoisture)) * (moisture - minMoisture));
  }, [moisture]);

  const bg = useMemo(() => {
    if ((moisture < minMoisture) || (moisture > maxMoisture)) {
      return `opacity-50 bg-gradient-to-t from-red-500 to-red-900`;
    }

    return 'opacity-50 bg-gradient-to-t from-green-900 to-green-500';

  }, [moisture]);


  const img = `url('/plants/${ plant }.jpg')`;
  return (
    <div className="relative h-[230px] w-[230px] m-auto flex bg-center bg-contain flex-col justify-center items-center text-7xl  rounded-full border-2 border-white overflow-hidden opacity-60"
         style={ { backgroundImage: img } }>
      <div className={ `${ bg } absolute  h-full w-full` }
           style={ { top: `${ 100 - percentage }%` } }></div>
    </div>
  );
};

export default Plant;

