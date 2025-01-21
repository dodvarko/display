import { useData } from '../../providers/data.provider.tsx';
import { useMemo } from 'react';
import { Sensor } from './index.ts';
import { extractSensorData } from '../../utils/sensors.ts';

const Sensors = () => {
  const { data } = useData();
  const sensors = useMemo(() => {
    return extractSensorData(data);
  }, [data]);

  return (
    <>
      {
        sensors.map((sensor) => <Sensor sensor={ sensor }
                                        key={ sensor.valueKey }/>)
      }
    </>

  );
};

export default Sensors;
