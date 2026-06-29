export interface LeadStatusStepperProps {
  currentStatusIndex: number;
  onStatusStepChange: (step: number) => void;
}
