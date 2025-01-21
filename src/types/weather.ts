export type WeatherSensor = {
  hour_1_temperature: number;
  hour_1_condition: string;
  hour_2_temperature: number;
  hour_2_condition: string;
  hour_3_temperature: number;
  hour_3_condition: string;
  hour_4_temperature: number;
  hour_4_condition: string;
  hour_5_temperature: number;
  hour_5_condition: string;
}
export type WeatherForecast = {
  hour: string;
  temperature: number;
  condition: string;
}