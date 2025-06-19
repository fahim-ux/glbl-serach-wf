{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-xl p-6 w-full max-w-lg shadow-lg relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : modalData?.error ? (
        <div className="text-red-500 text-center">{modalData.error}</div>
      ) : (
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(modalData, null, 2)}
        </pre>
      )}
    </div>
  </div>
)}
