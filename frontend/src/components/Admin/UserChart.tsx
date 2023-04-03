import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'User Registered Each Month Chart',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
function UserChart({ data }: any) {
  const initialData = new Array(11).fill(0);

  for (let [key, val] of Object.entries(data)) {
    const findIdx = labels.findIndex((label) => key === label);
    initialData[findIdx] = val;
  }

  console.log('initial data', initialData);
  return (
    <div className="max-w-4xl mt-12 mx-auto">
      <Bar
        datasetIdKey="user-chart"
        data={{
          labels,
          datasets: [
            {
              label: 'User Registered',
              data: initialData,
              borderColor: '#8ad85c',
              backgroundColor: '#8ad85c',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

export default UserChart;
