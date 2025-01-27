// src/components/StudentForm.tsx
import React, { useState, useEffect } from "react";
import { fetchStudents } from "../../services/studentService"; // Import the service
import DisplayDataTable from "./DisplayDataTable";
import { Student } from '@/types'
import StudentDetailsInput from "./StudentDeatilsInput";

const StudentForm: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [editingStudent, setEditingStudent] = useState<Partial<Student> | null>(null);

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
    loadStudents();
    setEditingStudent(null);
  };

  const handleEditStudent = (student: Partial<Student>) => {
    setEditingStudent(student);
  };

  return (
    <div>
      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Student List</h2>
              <StudentDetailsInput onStudentAdded={handleStudentAdded} editingStudent={editingStudent} />
            </div>
            <DisplayDataTable 
              onEditStudent={handleEditStudent}
              onStudentDeleted={loadStudents}
              data={students} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentForm;