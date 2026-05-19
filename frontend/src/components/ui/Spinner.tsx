
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Spinner = ({ className }: { className?: string }) => {
  return <Loader2 className={cn("animate-spin text-primary", className)} />;
};

export const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner className="h-8 w-8" />
    </div>
  );
};
