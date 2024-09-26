import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function LoadingButton({ loading, disabled, className, ...props }) {
  return (
    <Button
      className={cn("flex items-center justify-center", className)}
      disabled={loading || disabled}
      {...props}>
        {loading && <Loader2 className="animate-spin size-5" /> }
        {props.children}
      </Button>
  );
}

export default LoadingButton;
