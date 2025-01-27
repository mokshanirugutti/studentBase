// src/components/StudentForm.tsx
import React, { useState, useEffect } from "react";
import { fetchStudents } from "../../services/studentService"; // Import the service
import DisplayDataTable from "./DisplayDataTable";
import { Student } from '@/types'

const StudentForm: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const loadStudents = async () => {
    setLoading(true);
    const studentsData = await fetchStudents();
    setStudents(studentsData);
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleStudentAdded = () => {
    loadStudents(); // Refresh the student list after a new student is added
  };

  return (
    <div>
      <ul className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Student List</h2>
            <DisplayDataTable onStudentAdded={handleStudentAdded} data={students} />
          </div>
        )}
      </ul>
    </div>
  );
};

export default StudentForm;