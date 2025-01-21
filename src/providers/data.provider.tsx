import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
  UnsubscribeFunc
} from 'home-assistant-js-websocket';
import { EntityData } from '../types/sensors.ts';


export type DataProviderState = {
  data: EntityData;
};

const DataProviderContext = createContext<DataProviderState>({
  data: [],
});

type DataProviderProps = {
  children: ReactNode;
};


export function DataProvider({
                               children
                             }: DataProviderProps) {
  const [data, setData] = useState<EntityData>([]);
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
          const whitelist = [
            'sensor.time',
            'sensor.teplomer_balkon_temperature',
            'sensor.teplomer_obyvak_temperature',
            'sensor.teplomer_obyvak_humidity',
            'sensor.pracka_remaining_time',
            'sensor.weather_forecast_next_5_hours',
            'plant.dryopteris_bushiana',
            'plant.fikus',
            'plant.hedera_helix',
            'plant.monstera_deliciosa',
            'plant.syngonium_podophyllum'
          ];

          const data = Object.entries(entities).filter(([entityId, _]) => {
            return whitelist.includes(entityId);
          });

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
    <DataProviderContext.Provider value={ { data } }>
      { children }
    </DataProviderContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataProviderContext);
  if (context === undefined) {
    throw new Error('useData must be within DataProvider');
  }

  return context;
};