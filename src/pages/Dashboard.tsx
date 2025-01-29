import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import DataShowCard from '@/components/ui/DataShowCard';

import PieAnimation from '@/components/ui/pieChart';
import AreaChart from '@/components/ui/areaChart';
const Dashboard: React.FC = () => {
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stateDistribution, setStateDistribution] = useState<{ name: string; value: number }[]>([]);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = querySnapshot.docs.map(doc => doc.data());

    const maleCount = students.filter(student => student.gender === 'male').length;
    const femaleCount = students.filter(student => student.gender === 'female').length;

    setTotalMale(maleCount);
    setTotalFemale(femaleCount);

    // State Distribution
    const stateCounts = students.reduce((acc: { [key: string]: number }, student: any) => {
      const state = student.state; // Assuming state is a string
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});
    setStateDistribution(Object.entries(stateCounts).map(([name, value]) => ({ name, value })));

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>

          <div className="mt-4">
            <div className="flex  justify-around items-center py-2">
              <AreaChart data={stateDistribution.map(item => item.value)} labels={stateDistribution.map(item => item.name)} title='State Distribution'/> 
              <PieAnimation maleCount={totalMale} femaleCount={totalFemale} /> 
            </div>
          </div>

          <div className='mt-4 mx-14'>
              <DataShowCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;