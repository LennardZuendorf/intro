import * as React from "react";
import { Info } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface DisclaimerBannerProps {
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  className,
}) => {
  return (
    <Alert className={cn("border-dashed", className)}>
      <Info className="h-4 w-4" />
      <AlertDescription>
        I&apos;m currently working on a new, cool website. Not all content is up
        to date.
      </AlertDescription>
    </Alert>
  );
};
