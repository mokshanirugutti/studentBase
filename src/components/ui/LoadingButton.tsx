import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface LoadingButtonProps {
  title: string;
  className?: string; 
}

export default function LoadingButton({ title, className }: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      data-loading={isLoading}
      className={`group relative disabled:opacity-100 ${className || ""}`} 
    >
      <span className="group-data-[loading=true]:text-transparent">{title}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle
            className="animate-spin"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      )}
    </Button>
  );
}
