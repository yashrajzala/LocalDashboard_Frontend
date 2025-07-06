export async function fetchRawSensorData(greenhouseId: string): Promise<Record<string, number>> {
	try {
		const res = await fetch(`http://localhost:3000/api/${greenhouseId}/raw`);
		if (!res.ok) throw new Error(`Status: ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error('fetchRawSensorData failed:', error);
		return {};
	}
}
