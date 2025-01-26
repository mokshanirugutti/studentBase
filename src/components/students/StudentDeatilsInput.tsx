import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import LoadingButton from '@/components/ui/LoadingButton';

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

interface StudentDetailsInputProps {
  onStudentAdded: () => void; // Callback to refresh the student list
}

export default function StudentDetailsInput({ onStudentAdded }: StudentDetailsInputProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    fatherName: "",
    phone: "",
    fatherPhone: "",
    email: "",
    city: "",
    state: "",
    country: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await addDoc(collection(db, "students"), studentData);
      setIsOpen(false); // Close the dialog after successful submission
      setStudentData({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "",
        fatherName: "",
        phone: "",
        fatherPhone: "",
        email: "",
        city: "",
        state: "",
        country: "",
      }); // Reset form fields
      onStudentAdded(); // Trigger the callback to refresh the student list
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="aspect-square max-sm:p-0 bg-black hover:bg-black/85 hover:text-white text-white"
        >
          <Plus
            className="opacity-60 sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">Add Student</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50rem]">
        <div className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle className="text-left">Fill Student Details</DialogTitle>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleAddStudent}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* FIRST NAME */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`firstName-${id}`}>First Name</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`firstName-${id}`}
                name="firstName"
                value={studentData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* MIDDLE NAME */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`middleName-${id}`}>Middle Name</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`middleName-${id}`}
                name="middleName"
                value={studentData.middleName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* LAST NAME */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`lastName-${id}`}>Last Name</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`lastName-${id}`}
                name="lastName"
                value={studentData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* DATE OF BIRTH */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`dob-${id}`}>Date of Birth</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                type="date"
                id={`dob-${id}`}
                name="dob"
                value={studentData.dob}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* GENDER */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor={`gender-${id}`}>Gender</Label>
              <div className="flex space-x-4">
                <div>
                  <input
                    type="radio"
                    id={`gender-male-${id}`}
                    name="gender"
                    value="male"
                    className="hidden peer"
                    onChange={handleInputChange}
                    required
                  />
                  <Label
                    htmlFor={`gender-male-${id}`}
                    className="cursor-pointer inline-flex items-center p-2 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:text-white"
                  >
                    Male
                  </Label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`gender-female-${id}`}
                    name="gender"
                    value="female"
                    className="hidden peer"
                    onChange={handleInputChange}
                    required
                  />
                  <Label
                    htmlFor={`gender-female-${id}`}
                    className="cursor-pointer inline-flex items-center p-2 border border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:text-white"
                  >
                    Female
                  </Label>
                </div>
              </div>
            </div>

            {/* FATHER NAME */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`fatherName-${id}`}>Father's Name</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`fatherName-${id}`}
                name="fatherName"
                value={studentData.fatherName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* PHONE NUMBER */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`phone-${id}`}>Phone No</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                type="tel"
                id={`phone-${id}`}
                name="phone"
                value={studentData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* FATHER PHONE NUMBER */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`fatherPhone-${id}`}>Father's Phone No</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                type="tel"
                id={`fatherPhone-${id}`}
                name="fatherPhone"
                value={studentData.fatherPhone}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`email-${id}`}>Email</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                type="email"
                id={`email-${id}`}
                name="email"
                value={studentData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* CITY */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`city-${id}`}>City</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`city-${id}`}
                name="city"
                value={studentData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* STATE */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`state-${id}`}>State</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`state-${id}`}
                name="state"
                value={studentData.state}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* COUNTRY */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`country-${id}`}>Country</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`country-${id}`}
                name="country"
                value={studentData.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full">
            <LoadingButton title="Add Student"  className="w-full " />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}