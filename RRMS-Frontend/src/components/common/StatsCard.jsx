import "../../assets/css/statsCardCss.css";

function StatsCard({
  title,
  value,
  icon,
  color = "primary",
}) {
  return (
    <div className="stats-card h-100">
      <div className="stats-card-body">

        <div>

          <p className="stats-title mb-1">
            {title}
          </p>

          <h2 className="stats-value">
            {value}
          </h2>

        </div>

        <div
          className={`stats-icon bg-${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatsCard;