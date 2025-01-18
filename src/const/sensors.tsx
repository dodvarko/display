import { Sensor } from '../types/sensors.ts';
import { LuWashingMachine } from 'react-icons/lu';
import { MdBalcony } from 'react-icons/md';
import { IoTimeOutline } from 'react-icons/io5';
import { PiCouch } from 'react-icons/pi';
import { WiHumidity } from 'react-icons/wi';
import { TbTemperatureCelsius } from 'react-icons/tb';

export const Sensors: Sensor[] = [
  {
    valueKey: 'sensor.time',
    icon: <IoTimeOutline/>,
    type: 'string'
  },
  {
    valueKey: 'sensor.teplomer_obyvak_temperature',
    icon: <div className="flex flex-row"><TbTemperatureCelsius/><PiCouch/></div>,
    type: 'temperature'
  },
  {
    valueKey: 'sensor.teplomer_obyvak_humidity',
    icon: <WiHumidity/>,
    type: 'humidity'
  },
  {
    valueKey: 'sensor.teplomer_balkon_temperature',
    icon: <div className="flex flex-row"><TbTemperatureCelsius/><MdBalcony/></div>,
    type: 'temperature'
  },
  {
    valueKey: 'sensor.pracka_remaining_time',
    icon: <LuWashingMachine/>,
    type: 'string'
  },
];