import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  Download,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useOrders } from '@/context/OrdersContext';

const Analytics = () => {
  const { orders } = useOrders();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [chartType, setChartType] = useState<'volume' | 'cost'>('volume');

  // Process orders data for metrics
  const calculateMetrics = () => {
    const totalVolume = orders.reduce((sum, order) => {
      return sum + parseInt(order.volume.replace('L', ''));
    }, 0);

    const completedOrders = orders.filter(order => order.status === 'completed');
    const efficiency = orders.length ? (completedOrders.length / orders.length * 100) : 0;

    return {
      totalVolume: totalVolume.toLocaleString() + 'L',
      efficiency: efficiency.toFixed(1) + '%',
      trend: totalVolume > 5000 ? 'up' : 'down'
    };
  };

  // Sample data for charts
  const chartData = [
    { date: '01/02', volume: 2400, cost: 4000 },
    { date: '02/02', volume: 1398, cost: 3000 },
    { date: '03/02', volume: 9800, cost: 2000 },
    { date: '04/02', volume: 3908, cost: 2780 },
    { date: '05/02', volume: 4800, cost: 1890 },
    { date: '06/02', volume: 3800, cost: 2390 },
    { date: '07/02', volume: 4300, cost: 3490 },
  ];

  const metrics = calculateMetrics();

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-1 text-gray-500">Track your collection performance</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#5F7053] 
                       border-2 border-[#5F7053] rounded-lg hover:bg-[#5F7053]/5 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {/* Total Volume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white shadow-sm rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Volume</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{metrics.totalVolume}</h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-[#5F7053]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className={metrics.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {metrics.trend === 'up' ? (
                  <ArrowUp className="inline w-4 h-4" />
                ) : (
                  <ArrowDown className="inline w-4 h-4" />
                )}
                12.5%
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </motion.div>

          {/* Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white shadow-sm rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">$12,580</h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#5F7053]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className="text-green-500">
                <ArrowUp className="inline w-4 h-4" />
                8.2%
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </motion.div>

          {/* Efficiency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white shadow-sm rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Efficiency Rate</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{metrics.efficiency}</h3>
              </div>
              <div className="w-12 h-12 rounded-lg bg-[#5F7053]/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#5F7053]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <span className="text-green-500">
                <ArrowUp className="inline w-4 h-4" />
                4.5%
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </motion.div>
        </div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 mb-8 bg-white shadow-sm rounded-xl"
        >
          {/* Chart Controls */}
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChartType('volume')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chartType === 'volume'
                    ? 'bg-[#5F7053] text-white'
                    : 'bg-[#5F7053]/10 text-[#5F7053]'
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setChartType('cost')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  chartType === 'cost'
                    ? 'bg-[#5F7053] text-white'
                    : 'bg-[#5F7053]/10 text-[#5F7053]'
                }`}
              >
                Cost
              </button>
            </div>
            <div className="flex items-center gap-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as typeof timeRange)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-[#5F7053] text-white'
                      : 'bg-[#5F7053]/10 text-[#5F7053]'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'volume' ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5F7053" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#5F7053" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#eee' }}
                  />
                  <YAxis
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#eee' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#5F7053"
                    strokeWidth={2}
                    fill="url(#colorVolume)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#eee' }}
                  />
                  <YAxis
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#eee' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="cost" 
                    fill="#5F7053" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;