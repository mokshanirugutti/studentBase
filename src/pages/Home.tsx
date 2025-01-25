import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { db } from "../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Modal from "../components/Modal";
import UserBadge from "@/components/userBadge";

interface Student {
  id: string;
  name: string;
  age: string;
  grade: string;
  // Add any additional fields here
}

const Home = () => {
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]); // Use Student type
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
    // Add additional fields
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleAddStudent = async () => {
    await addDoc(collection(db, "students"), studentData);
    fetchStudents();
    setIsModalOpen(false);
  };

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    setStudents(
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Student[]
    );
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
      <UserBadge/>
      <br />
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded my-10"
      >
        Add Student
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add Student</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={studentData.name}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={studentData.age}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={studentData.grade}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4 rounded"
        />
        {/* Add more input fields as needed */}
        <button
          onClick={handleAddStudent}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
      </Modal>
      <ul className="mt-4">
        {students.map((student) => (
          <li key={student.id} className="border-b py-2">
            {student.name} - {student.age}
          </li>
        ))}
      </ul>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
