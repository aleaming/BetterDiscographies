export function MusicPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">Now Playing</h3>
            <p className="text-xs text-gray-500">Artist - Album</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Previous</span>
            {/* Add Previous icon */}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Play</span>
            {/* Add Play icon */}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Next</span>
            {/* Add Next icon */}
          </button>
        </div>
        <div className="w-48">
          <div className="h-1 bg-gray-200 rounded">
            <div className="h-full w-1/3 bg-indigo-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}