import { ReactElement } from 'react';
import { HassEntity } from 'home-assistant-js-websocket';

export type EntityData = Array<[string, HassEntity]>;

export type Sensor = {
  icon: ReactElement;
  valueKey: string;
  type: string;
}

export type SensorWithValue = Sensor & {
  value?: string;
}

