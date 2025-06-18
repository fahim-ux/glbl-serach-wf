const DashboardLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 animate-pulse">
      
      {/* Header or Title placeholder */}
      <div className="h-8 bg-zinc-700 rounded w-1/3 mb-6" />

      {/* Table skeleton */}
      <div className="bg-zinc-800 rounded shadow-lg overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4">
          {/* Header row */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-zinc-700 rounded" />
          ))}
          {/* 5 dummy rows */}
          {[...Array(5)].map((_, row) =>
            [...Array(6)].map((__, col) => (
              <div key={`${row}-${col}`} className="h-6 bg-zinc-700 rounded" />
            ))
          )}
        </div>
      </div>

      {/* Chart + Reasoning / Description boxes */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Chart placeholder */}
        <div className="flex-1 bg-zinc-800 rounded shadow-lg h-64" />

        {/* Description placeholder */}
        <div className="flex-1 bg-zinc-800 rounded shadow-lg p-6 space-y-4">
          <div className="h-6 bg-zinc-700 rounded w-3/4" />
          <div className="h-4 bg-zinc-700 rounded w-full" />
          <div className="h-4 bg-zinc-700 rounded w-full" />
          <div className="h-4 bg-zinc-700 rounded w-5/6" />
        </div>

      </div>
    </div>
  );
};

export default DashboardLoadingSkeleton;
