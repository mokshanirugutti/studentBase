import { Card, CardFooter, Button } from "@heroui/react";
import React from "react";

interface DataShowCardProps {
  title: string;
  value: number;
  icon: React.ComponentType; // Corrected type for React components
}

export default function DataShowCard({ title, value, icon: Icon }: DataShowCardProps) {
  return (
    <Card isFooterBlurred className="border-none w-48 h-48 flex flex-col items-center justify-center bg-gradient-to-b from-[#cdb4db]  to-[#a2d2ff]" radius="lg">
      {/* Icon Section */}
      <div className="text-4xl text-black mb-4">
        <Icon />
      </div>

      {/* Title and Value */}
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-black/80">{title}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          {value}
        </Button>
      </CardFooter>
    </Card>
  );
}
