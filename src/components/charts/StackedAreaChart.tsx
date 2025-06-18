import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface StackedChartDatum {
  label: string;
  series1: number;
  series2: number;
  series3: number;
}

interface Props {
  data: StackedChartDatum[];
  title?: string;
}

const StackedAreaChartComponent: React.FC<Props> = ({ data, title }) => {
  return (
    <div className="w-full h-[350px]">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="series1"
            stackId="1"
            stroke="#60a5fa"
            fill="#bfdbfe"
          />
          <Area
            type="monotone"
            dataKey="series2"
            stackId="1"
            stroke="#34d399"
            fill="#bbf7d0"
          />
          <Area
            type="monotone"
            dataKey="series3"
            stackId="1"
            stroke="#f87171"
            fill="#fecaca"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaChartComponent;
