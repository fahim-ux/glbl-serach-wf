import React from 'react';

interface Props {
  columns: string[];
  data: Record<string, any>[];
  headerClass?: string;
  rowClassFn?: (row: Record<string, any>, index: number) => string;
  cellClassFn?: (row: Record<string, any>, col: string, rowIndex: number, colIndex: number) => string;
}

const Table: React.FC<Props> = ({
  columns,
  data,
  headerClass = '',
  rowClassFn = () => '',
  cellClassFn = () => '',
}) => {
  return (
    <div className="overflow-x-auto w-full  rounded-sm shadow-md">
      <table className="table-auto w-full border-collapse text-center">
        <thead>
          <tr className={`text-sm font-semibold ${headerClass}`}>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 border border-gray-300 whitespace-pre-wrap break-words"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`text-sm ${rowClassFn(row, rowIndex)} `}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-1 border border-gray-200 whitespace-pre-wrap break-words align-middle ${cellClassFn(row, col, rowIndex, colIndex)} transition hover:bg-[#E5E3D4]`}
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
