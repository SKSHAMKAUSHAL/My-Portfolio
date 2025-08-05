export const NotDeployedYet = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-yellow-400/30 bg-yellow-100/10 rounded-2xl shadow-lg text-center backdrop-blur-md">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
        🚧 Not Deployed Yet
      </h2>
      <p className="text-gray-300 text-sm mb-4">
        This project is still under development or hasn't been deployed yet. Stay tuned for updates!
      </p>
      <div className="text-yellow-300 animate-pulse text-lg font-medium">
        Coming Soon...
      </div>
    </div>
  );
};
