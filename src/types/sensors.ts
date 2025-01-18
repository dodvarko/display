import { ReactElement } from 'react';


export type Sensor = {
  icon: ReactElement;
  valueKey: string;
  type: string;
}

export type SensorWithValue  = Sensor & {
  value?: string;
}