import { useData } from '../../providers/data.provider.tsx';
import { useMemo } from 'react';
import { WeatherForecastTile } from './index.ts';
import { extractWeatherForecastData } from '../../utils/weather.ts';

const Weather = () => {
  const { data } = useData();
  const weatherForecast = useMemo(() => {
    return extractWeatherForecastData(data);
  }, [data]);

  return (
    <>
      {
        weatherForecast.map((forecast) =>
          <WeatherForecastTile forecast={ forecast }
                               key={ forecast.hour }/>)
      }
    </>

  );
};

export default Weather;
