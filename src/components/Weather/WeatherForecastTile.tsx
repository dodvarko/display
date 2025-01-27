import { WeatherForecast } from '../../types/weather.ts';

type WeatherForecastTileProps = {
  forecast: WeatherForecast;
}

const conditionToIcon = (condition: string) => {
  switch (condition) {
    case 'clear-night':
      return '🌙';
    case 'cloudy':
      return '☁️';
    case 'fog':
      return '🌫️';
    case 'hail':
      return '🌨️';
    case 'lightning':
      return '⛈️';
    case 'lightning-rainy':
      return '⛈️';
    case 'partlycloudy':
      return '⛅';
    case 'pouring':
      return '🌧️';
    case 'rainy':
      return '🌧️';
    case 'snowy':
      return '❄️';
    case 'snowy-rainy':
      return '❄️';
    case 'sunny':
      return '☀️';
    case 'windy':
      return '🌬';
    case 'windy-variant':
      return '🌬️';
    case 'exceptional':
      return '🤯';
    default:
      return '🤷';
  }
};

const WeatherForecastTile = ({ forecast }: WeatherForecastTileProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-7xl gap-3">
      { conditionToIcon(forecast.condition) }
      <h2>{ forecast.temperature } <span className="text-5xl"> °C</span>
      </h2>
    </div>
  );
};

export default WeatherForecastTile;

