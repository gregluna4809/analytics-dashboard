const API_BASE_URL = 'https://5bdlur57z0.execute-api.us-east-1.amazonaws.com/dev';

export async function fetchEntries() {
  const response = await fetch(`${API_BASE_URL}/api/entries`, {
    headers: {
      'x-user-id': 'demo-user-1',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch entries');
  return response.json();
}

export async function createEntry(entry) {
  const response = await fetch(`${API_BASE_URL}/api/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': 'demo-user-1',
    },
    body: JSON.stringify(entry),
  });
  if (!response.ok) throw new Error('Failed to create entry');
  return response.json();
}