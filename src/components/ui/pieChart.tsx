import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';

interface PieAnimationProps {
    maleCount: number;
    femaleCount: number;
  }

export default function PieAnimation({maleCount, femaleCount}:PieAnimationProps) {
  const radius = 40;
  const totalCount = maleCount + femaleCount;
  const data = [
    { label: 'Male', value: maleCount, color: '#3f51b5' },
    { label: 'Female', value: femaleCount, color: '#f50057' },
  ];
  

  return (
    <div className='border rounded-xl shadow-lg w-72 h-fit p-5 '>

    <Box sx={{ width: '100%', position: 'relative' ,marginLeft:5 }}>
      <PieChart
        height={200}
        series={[
          {
            data: data,
            innerRadius: radius,
            arcLabelMinAngle: 20,
            
          },
          
        ]}
        slotProps={{
            legend: { hidden: true },
          }}
        skipAnimation={false}
      />
    </Box>
    <div className='w-fit mx-auto  gap-2 flex flex-wrap items-center justify-center '>
        <span className='flex justify-center items-center gap-1'> <div className='h-2 w-2 bg-[#f50057]'/> Male: {maleCount} </span   >
        <span className='flex justify-center items-center gap-1'> <div className='h-2 w-2 bg-[#3f51b5]'/> Female: {femaleCount} </span   >
        <span className='flex justify-center items-center gap-1'> <div className='h-2 w-2 bg-[#7f26b6]'/> Total :  {totalCount} </span   >
      </div>
</div>
  );
}
