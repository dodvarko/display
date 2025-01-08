import { useEffect, useRef, useState } from 'react';
import {
  createConnection,
  createLongLivedTokenAuth,
  HassEntity,
  subscribeEntities,
  UnsubscribeFunc
} from 'home-assistant-js-websocket';

function App() {
  const [data, setData] = useState<HassEntity[]>([]);
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
            'sensor.pracka_remaining_time',
          ];

          const data = Object.entries(entities).filter(([entityId, _]) => {
            return sensors.includes(entityId);
          }).map(([_, entity]) => entity);
          setData(data);
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
        data.map(entity => {
          return (
            <div key={ entity.entity_id }>
              <h2>{ entity.attributes.friendly_name }</h2>
              <p>{ entity.state }</p>
            </div>
          );
        })
      }
    </section>
  );
}

export default App;
