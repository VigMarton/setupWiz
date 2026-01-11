import { Step, StepStatus } from '../data/steps';

interface StepSidebarProps {
  steps: Step[];
  currentStepIndex: number;
  stepStatuses: StepStatus[];
  onStepClick: (index: number) => void;
}

const getStatusIcon = (status: StepStatus): string => {
  switch (status) {
    case 'completed':
      return '🟢';
    case 'skipped':
      return '🟡';
    default:
      return '⭕';
  }
};

export default function StepSidebar({
  steps,
  currentStepIndex,
  stepStatuses,
  onStepClick,
}: StepSidebarProps) {
  return (
    <div className="sidebar">
      <h2>Setup Steps</h2>
      <ul className="step-list">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`step-item ${index === currentStepIndex ? 'active' : ''}`}
            onClick={() => onStepClick(index)}
          >
            <span className="step-number">{index + 1}</span>
            <span className="step-title">{step.title}</span>
            <span className="step-status-icon">
              {getStatusIcon(stepStatuses[index])}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

