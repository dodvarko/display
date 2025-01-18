import { useEffect, useRef, useState } from 'react';
import {
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
  UnsubscribeFunc
} from 'home-assistant-js-websocket';
import { SensorWithValue } from './types/sensors.ts';
import { Sensors } from './const/sensors.tsx';
import Sensor from './components/Sensor.tsx';

function App() {
  const [data, setData] = useState<SensorWithValue[]>([]);
  const unsubscribeRef = useRef<UnsubscribeFunc>();


  useEffect(() => {
    const connectToHomeAssistant = async () => {
      try {

        const auth = createLongLivedTokenAuth(
          import.meta.env.VITE_HA_URL,
          import.meta.env.VITE_HA_TOKEN,
        );

        const connection = await createConnection({ auth });
        unsubscribeRef.current = subscribeEntities(connection, (entities) => {
          const sensors = [
            'sensor.time',
            'sensor.teplomer_balkon_temperature',
            'sensor.teplomer_obyvak_temperature',
            'sensor.teplomer_obyvak_humidity',
            'sensor.pracka_remaining_time',
          ];

          const data = Object.entries(entities).filter(([entityId, _]) => {
            return sensors.includes(entityId);
          });

          const sensorsWithValues: SensorWithValue[] = Sensors.map(sensor => {
            return {
              ...sensor,
              value: data.find(([entityId, _]) => entityId === sensor.valueKey)?.[1].state
            };
          });
          setData(sensorsWithValues);
        });
      } catch (error) {
        console.error('Error connecting to Home Assistant:', error);
      }
    };

    if (!unsubscribeRef.current) {
      void connectToHomeAssistant();
    }

    return (() => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = undefined;
      }
    });
  }, []);


  return (
    <section className="flex justify-between">
      {
        data.map(sensor => <Sensor sensor={ sensor }
                                   key={ sensor.valueKey }/>)
      }
    </section>
  );
}

export default App;
