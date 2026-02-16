// components/LoadingScreen.jsx
export default function LoadingScreen({ progress }) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-lg">Loading... {Math.round(progress)}%</p>
      </div>
    </div>
  );
}
