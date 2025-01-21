import { SensorWithValue } from '../../types/sensors.ts';

type SensorProps = {
  sensor: SensorWithValue;
}

const Sensor = ({ sensor }: SensorProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-7xl gap-3">
      { sensor.icon }
      <h2>{ sensor.value }
      </h2>
    </div>
  );
};

export default Sensor;

