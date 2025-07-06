import { fetchRawSensorData } from '$lib/api/sensors/fetchRaw';
import { fetchCalculatedValues } from '$lib/api/sensors/fetchCalculated';
import type { CombinedSensorData } from '$lib/api/sensors/types';


export async function fetchAllSensorData(greenhouseId: string): Promise<CombinedSensorData> {
	try {
		const [raw, calculated] = await Promise.all([
			fetchRawSensorData(greenhouseId),
			fetchCalculatedValues(greenhouseId)
		]);
		return { raw, calculated };
	} catch (error) {
		console.error('fetchAllSensorData error:', error);
		return { raw: {}, calculated: {} };
	}
}
