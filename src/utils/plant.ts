import { EntityData } from '../types/sensors.ts';
import { PlantSensor } from '../types/plant.ts';

export const extractPlantData = (data: EntityData): PlantSensor[] => {
  const plants = data.filter(([entityId]) => entityId.startsWith('plant'));
  const lastWateredInfo = data.filter(([entityId]) => entityId.endsWith('days_since_watering'));
  return plants.map(([entityId]) => {
    const plant = entityId.split('.')[1];
    const plantLastWateredRecord = lastWateredInfo.find(([entityId]) => entityId.includes(plant));
    const daysSinceLastWatering = plantLastWateredRecord ? parseInt(plantLastWateredRecord[1].state) : -1;
    return {
      id: entityId,
      plant,
      daysSinceLastWatering,
    };
  });
};