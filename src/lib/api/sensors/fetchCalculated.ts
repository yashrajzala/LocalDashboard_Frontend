export async function fetchCalculatedValues(greenhouseId: string): Promise<Record<string, number>> {
	try {
		const res = await fetch(`http://localhost:3000/api/${greenhouseId}/calculated`);
		if (!res.ok) throw new Error(`Status: ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error('fetchCalculatedValues failed:', error);
		return {};
	}
}
