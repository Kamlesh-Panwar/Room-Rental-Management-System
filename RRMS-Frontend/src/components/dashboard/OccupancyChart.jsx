import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function OccupancyChart({
  occupied,
  available
}) {

  const data = {
    labels: [
      "Occupied",
      "Available"
    ],

    datasets: [
      {
        data: [
          occupied,
          available
        ]
      }
    ]
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">

        <h5 className="fw-bold mb-3">
          Occupancy Status
        </h5>

        <Doughnut data={data} />

      </div>
    </div>
  );
}

export default OccupancyChart;