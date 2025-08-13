const API_URL = import.meta.env.VITE_API_URL;

export async function fetchSampleData() {
  const response = await fetch(`${API_URL}/sample-endpoint`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
} 