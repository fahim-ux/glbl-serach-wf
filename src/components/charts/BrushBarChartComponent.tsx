import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Legend,
  Brush,
} from 'recharts';
import type { ChartDatum } from './types';

interface Props {
  data: ChartDatum[];
  title?: string;
}

const BrushBarChartComponent: React.FC<Props> = ({ data, title }) => {
  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  return (
    <div className="w-full h-[350px]">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" name="Value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
              />
            ))}
          </Bar>
          <Brush dataKey="label" height={25} stroke="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BrushBarChartComponent;
