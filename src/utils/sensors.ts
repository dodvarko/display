import { Sensors } from '../const/sensors.tsx';
import { EntityData, SensorWithValue } from '../types/sensors.ts';

export const extractSensorData = (data: EntityData): SensorWithValue[] => {
  return Sensors.map(sensor => {
    return {
      ...sensor,
      value: data.find(([entityId, _]) => entityId === sensor.valueKey)?.[1].state
    };
  });
};