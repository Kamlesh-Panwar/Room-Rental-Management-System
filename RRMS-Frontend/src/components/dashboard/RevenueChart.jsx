import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale,LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function RevenueChart({ agreements }) {

  const monthlyRevenue = Array(12).fill(0);

  agreements.forEach((agreement) => {

    const month = new Date(
      agreement.startDate
    ).getMonth();

    monthlyRevenue[month] += agreement.rentPerMonth;
  });

  const data = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],

    datasets: [
      {
        label: "Revenue",
        data: monthlyRevenue,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="fw-bold mb-3">
          Revenue Analytics
        </h5>

        <Line data={data} />
      </div>
    </div>
  );
}

export default RevenueChart;