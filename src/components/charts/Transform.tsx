type ApiResponse = Record<string, any> | Record<string, any>[] | any[][];

interface TransformedData {
  [key: string]: string | number;
}

// Utility to convert 'transactionId' => 'Transaction Id'
function formatKeyName(key: string): string {
  const spaced = key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase to space
    .replace(/_/g, ' ');                // snake_case to space

  return spaced
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function normalizeApiData(
  response: ApiResponse,
  labelKeyName = 'label',
  valueKeyName = 'value'
): TransformedData[] {
  let result: TransformedData[] = [];

  // Case 1: Single object
  if (!Array.isArray(response)) {
    const keys = Object.keys(response);
    if (keys.length >= 2) {
    const labelKey = keys[0];
      const valueKey = keys[keys.length - 1];
      result.push({
        [labelKeyName]: formatKeyName(String(response[labelKey])) ,
        [valueKeyName]: Number(response[valueKey]),
      } as TransformedData);
    }
  }

  // Case 2: Array of objects
  else if (Array.isArray(response) && typeof response[0] === 'object' && !Array.isArray(response[0])) {
    result = response.map((item) => {
      const keys = Object.keys(item);
      const labelKey = keys[0];
      const valueKey = keys[keys.length - 1];
      return {
        [labelKeyName]: formatKeyName(String(item[labelKey])),
        [valueKeyName]: Number(item[valueKey]),
      } as TransformedData;
    });
  }

  // Case 3: Array of arrays like [[label, value]]
  else if (Array.isArray(response) && Array.isArray(response[0])) {
    result = (response as any[][]).map((pair) => ({
      [labelKeyName]: formatKeyName(String(pair[0])),
      [valueKeyName]: Number(pair[pair.length - 1]),
    }));
  }

  return result;
}



const TransformApiData = () => {

    const api1 = { jan_2025: 120, Feb: 240 }; // Case 1
    const api2 = [{ month: 'Jan', views: 100 }, { month: 'Feb', views: 200 }]; // Case 2
    const api4 = [{ transactionId: 'txn_001', amountReceived: 200 },
  { transactionId: 'txn_002', amountReceived: 400 }]; // Case 2
    const api3 = [['Jan', 120], ['Feb', 150]]; // Case 3

    console.log(normalizeApiData(api1));
    // [{ label: 'Jan', value: 120 }, { label: 'Feb', value: 240 }]

    console.log(normalizeApiData(api2),'Company', 'Salary');
    // [{ label: 'Jan', value: 100 }, { label: 'Feb', value: 200 }]

    console.log(normalizeApiData(api3));
    // [{ label: 'Jan', value: 120 }, { label: 'Feb', value: 150 }]

    return (<>

    <div>
        <h1 className="text-2xl font-bold mb-4">Transformed API Data</h1>
        <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(normalizeApiData(api1), null, 2)}
        </pre>
        <pre className="bg-gray-100 p-4 rounded mt-4">
            {JSON.stringify(normalizeApiData(api2,'Company', 'Salary'), null, 2)}
        </pre>
        <pre className="bg-gray-100 p-4 rounded mt-4">
            {JSON.stringify(normalizeApiData(api3), null, 2)}
        </pre>
        <pre className="bg-gray-100 p-4 rounded mt-4">
            {JSON.stringify(normalizeApiData(api4), null, 2)}
        </pre>
    </div>

    </>)
}


export default TransformApiData;