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
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const keywordMatch = columns.some((col) =>
        String(row[col]).toLowerCase().includes(search.toLowerCase())
      );
      const filterMatch = Object.entries(filters).every(
        ([key, value]) => value === '' || String(row[key]).toLowerCase().includes(value.toLowerCase())
      );
      return keywordMatch && filterMatch;
    });
  }, [search, data, columns, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="w-full  rounded-xl shadow-md bg-white text-black">
      {/* Search + Filter Toggle */}
      <div className="flex flex-wrap justify-between items-center gap-2 p-4 border-b">
        {/* <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 border border-gray-300 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-black"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        /> */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white cursor-pointer"
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter UI */}
      {showFilter && (
        <div className="p-4 border-b font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {columns.map((col) => (
              <div key={col} className="flex flex-col gap-1">
                <label className="text-sm font-medium">{col}</label>
                <input
                  type="text"
                  value={filters[col] || ''}
                  onChange={(e) => handleFilterChange(col, e.target.value)}
                  placeholder={`Filter by ${col}`}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B7B7B7]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

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
                className={`text-sm ${rowClassFn(row, rowIndex)} transition hover:bg-gray-100`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 border border-gray-200 whitespace-pre-wrap break-words align-middle ${cellClassFn(
                      row,
                      col,
                      rowIndex,
                      colIndex
                    )}`}
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
      <div className="flex justify-center items-center gap-2 p-4 border-t">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
