import React, { useState, useMemo } from 'react';

interface Props {
  columns: string[];
  data: Record<string, any>[];
  headerClass?: string;
  rowClassFn?: (row: Record<string, any>, index: number) => string;
  cellClassFn?: (row: Record<string, any>, col: string, rowIndex: number, colIndex: number) => string;
  rowsPerPage?: number;
}

const Table: React.FC<Props> = ({
  columns,
  data,
  headerClass = '',
  rowClassFn = () => '',
  cellClassFn = () => '',
  rowsPerPage = 5,
}) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col]).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data, columns]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-full  rounded-sm shadow-md bg-white text-black font-mono">
      {/* Search Bar */}
      {/* <div className="flex justify-between items-center p-4 border-b">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border border-gray-300 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
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
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`text-sm ${rowClassFn(row, rowIndex)} `}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 border border-gray-200 whitespace-pre-wrap break-words align-middle ${cellClassFn(
                      row,
                      col,
                      rowIndex,
                      colIndex
                    )} transition hover:bg-[#E5E3D4]`}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 p-4 ">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded-sm disabled:opacity-50 hover:bg-gray-200 cursor-pointer"
        >
          Prev
        </button>
        <span className="text-sm">
          {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded-sm disabled:opacity-50 hover:bg-gray-200 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
