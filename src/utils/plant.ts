import { EntityData } from '../types/sensors.ts';
import { PlantSensor } from '../types/plant.ts';

export const extractPlantData = (data: EntityData): PlantSensor[] => {
  const plants = data.filter(([entityId, _]) => entityId.startsWith('plant'));
  return plants.map(([entityId, entity]) => {
    return {
      id: entityId,
      plant: entityId.split('.')[1],
      moisture: entity.attributes.moisture as number
    };
  });
};