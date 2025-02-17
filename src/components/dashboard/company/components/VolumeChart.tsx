import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar } from 'lucide-react';

interface VolumeChartProps {
  data?: any[];
  title?: string;
  className?: string;
}

const VolumeChart = ({ data: propData, title = 'Volume Trends', className = '' }: VolumeChartProps) => {
  // Sample data if none provided
  const sampleData = [
    { month: 'Jan', volume: 4500 },
    { month: 'Feb', volume: 5200 },
    { month: 'Mar', volume: 4800 },
    { month: 'Apr', volume: 6000 },
    { month: 'May', volume: 5500 },
    { month: 'Jun', volume: 6500 },
  ];

  const [timeframe, setTimeframe] = useState('6M');
  const [chartData] = useState(propData || sampleData);

  const formatVolume = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K L`;
    }
    return `${value} L`;
  };

  const timeframes = [
    { label: '1M', name: '1 Month' },
    { label: '3M', name: '3 Months' },
    { label: '6M', name: '6 Months' },
    { label: '1Y', name: '1 Year' },
  ];

  return (
    <div className={`bg-white rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Track your oil collection volume over time</p>
        </div>
        <div className="flex items-center gap-2">
          {timeframes.map(({ label }) => (
            <button
              key={label}
              onClick={() => setTimeframe(label)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                timeframe === label
                  ? 'bg-[#5F7053] text-white'
                  : 'text-gray-600 hover:bg-[#5F7053]/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={formatVolume}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              formatter={(value: number) => [`${formatVolume(value)}`, 'Volume']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#5F7053"
              strokeWidth={2}
              dot={{ fill: '#5F7053', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-500">
            <Calendar className="inline-block w-4 h-4 mr-1" />
            Last updated: Today
          </div>
          <button className="text-[#5F7053] hover:text-[#5F7053]/80 font-medium">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolumeChart;