import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { Student } from '../types'

const studentsCollection = collection(db, "students");

export const fetchStudents = async (): Promise<Student[]> => {
  const querySnapshot = await getDocs(studentsCollection);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Student[];
};

export const addStudent = async (student: Omit<Student, "id">): Promise<void> => {
  await addDoc(studentsCollection, student);
};

export const updateStudent = async (id: string, updatedFields: Partial<Student>): Promise<void> => {
  const studentDoc = doc(db, "students", id);
  await updateDoc(studentDoc, updatedFields);
};

export const deleteStudent = async (id: string): Promise<void> => {
  const studentDoc = doc(db, "students", id);
  await deleteDoc(studentDoc);
};
