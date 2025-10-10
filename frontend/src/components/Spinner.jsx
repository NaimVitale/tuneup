export default function Spinner({ size = 12, color = "border-purple-600" }) {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`w-${size} h-${size} border-4 border-t-transparent rounded-full animate-spin ${color}`}
      ></div>
    </div>
  );
}