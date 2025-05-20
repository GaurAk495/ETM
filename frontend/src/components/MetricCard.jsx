// components/MetricCard.jsx
export default function MetricCard({ title, count, icon, color = "blue" }) {
  return (
    <div
      className={`bg-${color}-100 text-${color}-700 p-4 rounded-lg shadow-sm flex items-center gap-4`}
    >
      <div className={`p-2 bg-${color}-200 rounded-full`}>{icon}</div>
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}
