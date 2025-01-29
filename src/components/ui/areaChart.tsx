import { LineChart,lineElementClasses } from '@mui/x-charts/LineChart';

interface AreaChartProps {
  data: number[];
  labels: string[];
  title:string;
}

export default function AreaChart({ data, labels,title }: AreaChartProps) {
    
  return (
    <div className='border rounded-md  shadow-lg'>

        <LineChart
      width={500}
      height={300}
      series={[{ data: data, label: title, area: true, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: labels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: 'none',
        },
    }}
    />
    </div>
  );
}
