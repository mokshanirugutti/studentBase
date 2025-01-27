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
import { useId, useState, useEffect } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import LoadingButton from '@/components/ui/LoadingButton';
import { Student } from '@/types'
import DatePickerInput from "../ui/DatePickerInput";
import PhoneNumberInput from "../ui/PhoneNumberInput";

interface StudentDetailsInputProps {
  onStudentAdded: (newStudent: Omit<Student, "id">) => void;
  editingStudent?: Partial<Student> | null;
}

export default function StudentDetailsInput({ onStudentAdded, editingStudent }: StudentDetailsInputProps) {
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
    mail: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setIsOpen(true);
      setStudentData(prev => ({
        ...prev,
        ...editingStudent
      }));
    }
  }, [editingStudent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentData({ ...studentData, dob: e.target.value });
  };

  const handlePhoneChange = (value: string | undefined) => {
    setStudentData({ ...studentData, phone: value || "" });
  };

  const handleFatherPhoneChange = (value: string | undefined) => {
    setStudentData({ ...studentData, fatherPhone: value || "" });
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
        mail: "",
        city: "",
        state: "",
        country: "",
      }); // Reset form fields
      onStudentAdded(studentData); // Trigger the callback to refresh the student list
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

            {/* DOB */}
            <div className="flex flex-col space-y-2">
              <DatePickerInput
                id={`dob-${id}`}
                name="dob"
                title="Date of Birth"
                value={studentData.dob}
                onChange={handleDateChange}
              />
            </div>

            {/* GENDER */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`gender-${id}`}>Gender</Label>
                <span className="text-red-600">*</span>
              </div>
              <div className="flex gap-4">
                {/* Male Radio Button */}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`gender-male-${id}`}
                    name="gender"
                    value="male"
                    checked={studentData.gender === "male"}
                    onChange={handleInputChange}
                    required
                  />
                  <span>Male</span>
                </label>
                {/* Female Radio Button */}
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`gender-female-${id}`}
                    name="gender"
                    value="female"
                    checked={studentData.gender === "female"}
                    onChange={handleInputChange}
                    required
                  />
                  <span>Female</span>
                </label>
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

            {/* PHONE */}
            <div className="flex flex-col space-y-2">
              <PhoneNumberInput
                id={`phone-${id}`}
                title ="Phone No:"
                value={studentData.phone}
                onChange={handlePhoneChange}
              />
            </div>

            {/* FATHER PHONE */}
            <div className="flex flex-col space-y-2">
              <PhoneNumberInput
                id={`fatherPhone-${id}`}
                title="Father phone: "
                value={studentData.fatherPhone}
                onChange={handleFatherPhoneChange}
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col space-y-2">
              <div className="flex gap-2">
                <Label htmlFor={`mail-${id}`}>Email</Label>
                <span className="text-red-600">*</span>
              </div>
              <Input
                className="[direction:inherit]"
                id={`mail-${id}`}
                name="mail"
                value={studentData.mail}
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

          <div className="flex justify-end">
            <button type="submit">
              <LoadingButton title="Add Student" />
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}