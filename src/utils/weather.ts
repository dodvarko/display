import { EntityData } from '../types/sensors.ts';
import { WeatherForecast, WeatherSensor } from '../types/weather.ts';

export const extractWeatherForecastData = (data: EntityData): WeatherForecast[] => {
  const weatherSensor = data.find(([entityId, _]) => entityId === 'sensor.weather_forecast_next_5_hours');
  const weatherSensorAttributes = weatherSensor ? weatherSensor[1].attributes as WeatherSensor : undefined;
  return weatherSensorAttributes ? [
    {
      hour: 'Now',
      temperature: weatherSensorAttributes.hour_1_temperature,
      condition: weatherSensorAttributes.hour_1_condition
    },
    {
      hour: '1h',
      temperature: weatherSensorAttributes.hour_2_temperature,
      condition: weatherSensorAttributes.hour_2_condition
    },
    {
      hour: '2h',
      temperature: weatherSensorAttributes.hour_3_temperature,
      condition: weatherSensorAttributes.hour_3_condition
    },
    {
      hour: '3h',
      temperature: weatherSensorAttributes.hour_4_temperature,
      condition: weatherSensorAttributes.hour_4_condition
    },
    {
      hour: '4h',
      temperature: weatherSensorAttributes.hour_5_temperature,
      condition: weatherSensorAttributes.hour_5_condition
    }
  ] : [];
};