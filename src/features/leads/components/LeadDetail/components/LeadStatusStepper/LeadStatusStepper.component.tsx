import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { Check, Loader } from "lucide-react";
import { LeadStatuses } from "../../utils/leadStatus";
import { LeadStatusStepperProps } from "./LeadStatusStepper.types";

export const LeadStatusStepper = ({
  currentStatusIndex,
}: LeadStatusStepperProps) => {
  return (
    <div className="flex items-center gap-4">
      <Stepper
        className="w-full"
        value={currentStatusIndex}
        indicators={{
          completed: <Check className="size-3.5" />,
          loading: <Loader className="size-3.5 animate-spin" />,
        }}
      >
        <StepperNav>
          {LeadStatuses.map((step, index) => (
            <StepperItem
              key={step}
              step={index + 1}
              className="relative flex-1 items-start"
            >
              <StepperTrigger className="flex flex-col items-center gap-2.5">
                <StepperIndicator className="rounded-full">
                  {index + 1}
                </StepperIndicator>
                <StepperTitle className="text-xs capitalize md:text-sm">
                  {step}
                </StepperTitle>
              </StepperTrigger>

              {LeadStatuses.length > index + 1 && (
                <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
              )}
            </StepperItem>
          ))}
        </StepperNav>
      </Stepper>
    </div>
  );
};
