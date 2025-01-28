import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import StatisticsChart from '../components/Dashboard/StatisticsChart';
import DataShowCard from '@/components/ui/DataShowCard';
import { IoMdMale,IoMdFemale } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
const Dashboard: React.FC = () => {
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ageDistribution, setAgeDistribution] = useState<{ name: string; value: number }[]>([]);
  const [stateDistribution, setStateDistribution] = useState<{ name: string; value: number }[]>([]);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = querySnapshot.docs.map(doc => doc.data());

    const maleCount = students.filter(student => student.gender === 'male').length;
    const femaleCount = students.filter(student => student.gender === 'female').length;

    setTotalMale(maleCount);
    setTotalFemale(femaleCount);

    // Age Distribution
    const ageCounts = students.reduce((acc: { [key: string]: number }, student: any) => {
      const dob = new Date(student.dob);
      const age = new Date().getFullYear() - dob.getFullYear();
      const ageGroup = `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`; // Grouping by decade
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
      return acc;
    }, {});
    setAgeDistribution(Object.entries(ageCounts).map(([name, value]) => ({ name, value })));

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
      <div className='flex gap-3 justify-around'>
          <DataShowCard title="Male Students" value={totalMale} icon={IoMdMale} />
          <DataShowCard title="Female Students" value={totalFemale} icon={IoMdFemale}/>
          <DataShowCard title="Selected " value={20} icon={MdVerified}/>
          <DataShowCard title="Unselected " value={30} icon={GoUnverified}/>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <StatisticsChart data={[{ name: 'Male', value: totalMale }, { name: 'Female', value: totalFemale }]} title="Gender Distribution" />
            <StatisticsChart data={ageDistribution} title="Age Distribution" isBarChart={true} />
            <StatisticsChart data={stateDistribution} title="State Distribution" isBarChart={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;