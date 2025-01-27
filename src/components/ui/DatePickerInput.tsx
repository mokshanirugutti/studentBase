"use client";
import { DateField, DateInput } from "@/components/ui/datefield-rac";
import {  DatePicker, Group, Label} from "react-aria-components";
import { DateValue, parseDate } from "@internationalized/date";

interface DatePickerInputProps {
  id: string;
  title: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePickerInput({id, name, title, value, onChange}: DatePickerInputProps) {
  return (
    <DatePicker 
      className="space-y-2"
      value={value ? parseDate(value) : undefined}
      onChange={(date: DateValue | null) => {
        if (date) {
          onChange({
            target: {
              name,
              value: date.toString()
            }
          } as any);
        }
      }}
    >
      <div className="flex gap-2">
        <Label htmlFor={id}>{title}</Label>
        <span className="text-red-600">*</span>
      </div>
      <div className="flex">
        <Group className="w-full">
          <DateField className="pe-9">
            <DateInput />
          </DateField>
        </Group>

      </div>
      
    </DatePicker>
  );
}
