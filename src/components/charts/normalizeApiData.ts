type ApiResponse = any;
interface TransformedData {
  label: string;
  value: number;
}

// Converts camelCase or snake_case to "Label Name"
function formatKeyName(key: string): string {
  const spaced = key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase → space
    .replace(/_/g, ' '); // snake_case → space
  return spaced
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Converts label like txn_001 → Txn 001
function formatValueLabel(value: any): string {
  if (typeof value !== 'string') return String(value);
  return formatKeyName(value);
}

export function normalizeApiData(response: ApiResponse): TransformedData[] {
  if (!response || typeof response !== 'object') return [];

  let data: any[] = [];

  // 🔹 Case 2: Array of objects
  if (Array.isArray(response)) {
    data = response.filter(
      (item) => typeof item === 'object' && !Array.isArray(item)
    );
  }

  // 🔹 Case 3: Array of arrays like [[label, value]]
  else if (Array.isArray(Object.values(response)[0])) {
    const firstKey = Object.keys(response)[0];
    const array = response[firstKey];
    if (Array.isArray(array) && Array.isArray(array[0])) {
      return array.map((pair: any[]) => ({
        label: formatValueLabel(pair[0]),
        value: Number(pair[pair.length - 1]),
      }));
    }
  }

  // 🔹 Case 4: Object of objects
  else if (typeof response === 'object') {
    const values = Object.values(response);
    if (
      values.length > 0 &&
      typeof values[0] === 'object' &&
      !Array.isArray(values[0])
    ) {
      data = values as Record<string, any>[];
    }

    // 🔹 Case 1: Single object
    else if (
      Object.keys(response).length >= 2 &&
      typeof Object.values(response)[0] !== 'object'

      
    ) {
        const keys = Object.keys(response);
      return [
        {
          label: formatValueLabel(response[Object.keys(response)[0]]),
          value: Number(response[keys[keys.length - 1]]),
        },
      ];
    }
  }

  // 🔹 Case 2: Mapped array of objects
  if (data.length > 0) {
    return data.map((item) => {
      const keys = Object.keys(item);
      if (keys.length < 2) return null;

      const labelKey = keys[0];
      const valueKey = keys[keys.length - 1];

      return {
        label: formatValueLabel(item[labelKey]),
        value: Number(item[valueKey]),
      } as TransformedData;
    }).filter((item): item is TransformedData => item !== null);
  }

  // 🔹 Case 3 fallback: Array of arrays
  if (Array.isArray(response) && Array.isArray(response[0])) {
    return (response as any[][]).map((pair) => ({
      label: formatValueLabel(pair[0]),
      value: Number(pair[pair.length - 1]),
    }));
  }

  // 🔹 Invalid or unknown
  return [];
}
