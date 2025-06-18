import ChartCarousel from './components/ChartCarousel';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 60 },
  { name: 'Mar', value: 45 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 20 },
];

const SampleLineChart = (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#00bcd4" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

const App = () => {
  const slides = [
    {
      id: '1',
      chart: SampleLineChart,
      description: 'Line chart showing monthly values over 5 months.',
    },
    {
      id: '2',
      chart: <div className="text-white">📊 Insert another chart here</div>,
      description: 'This could be a bar chart or pie chart with monthly breakdown.',
    },
    {
      id: '3',
      chart: <div className="text-white">📈 Custom chart here</div>,
      description: 'Final chart with performance analytics.',
    },
  ];

  return (
    <div className="bg-black min-h-screen py-10">
      <ChartCarousel slides={slides} />
    </div>
  );
};

export default App;
