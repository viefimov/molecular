import qs from 'qs';

export async function get<T>(url: string, query: object = {}): Promise<T> {
  const queryString = qs.stringify(query);
  const response = await fetch(url + '?' + queryString);
  const result = await response.json();
  if (!response.ok || result.error) {
    throw new Error(result.error);
  }

  return result;
}
