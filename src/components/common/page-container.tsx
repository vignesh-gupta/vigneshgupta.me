import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const PageContainer = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <main
      className={cn(
        "container max-w-5xl p-4 pt-6 lg:px-8 lg:pt-16 mx-auto space-y-20 animate-fade-in",
        className
      )}
    >
      {children}
    </main>
  );
};

export default PageContainer;
