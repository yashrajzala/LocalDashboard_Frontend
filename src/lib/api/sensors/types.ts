export type GreenhouseID = `greenhouse${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;

export interface SensorData {
	[key: string]: number;
}

export interface CombinedSensorData {
	raw: SensorData;
	calculated: SensorData;
}
