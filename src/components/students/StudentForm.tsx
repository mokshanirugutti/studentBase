import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import StudentDetailsInput from "./StudentDeatilsInput";
import DisplayDataTable from "./DisplayDataTable";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
  dob: string;
  phone: string;
  city: string;
  country: string;
}

const StudentForm: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    setStudents(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[]
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStudentAdded = () => {
    fetchStudents(); // Refresh the student list after a new student is added
  };

  return (
    <div>
      <ul className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Student List</h2>
            <DisplayDataTable onStudentAdded={handleStudentAdded}/>
          </div>
        )}
      </ul>
    </div>
  );
};

export default StudentForm;