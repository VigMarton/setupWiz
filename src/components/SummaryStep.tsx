import { useEffect, useRef } from 'react';
import { Step, StepStatus } from '../data/steps';

interface SummaryStepProps {
  steps: Step[];
  stepStatuses: StepStatus[];
  skipReasons: Record<number, string>;
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

const getStatusLabel = (status: StepStatus): string => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'skipped':
      return 'Skipped';
    default:
      return 'Not Started';
  }
};

export default function SummaryStep({
  steps,
  stepStatuses,
  skipReasons,
}: SummaryStepProps) {
  const completedSteps = stepStatuses.filter((s) => s === 'completed').length;
  const skippedSteps = stepStatuses.filter((s) => s === 'skipped').length;
  const totalSteps = steps.length;
  const summaryRef = useRef<HTMLDivElement>(null);

  // Scroll to top when summary step loads
  useEffect(() => {
    const scrollToTop = () => {
      const mainContent = summaryRef.current?.closest('.main-content') as HTMLElement;
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
      window.scrollTo(0, 0);
    };
    
    scrollToTop();
    const timeout1 = setTimeout(scrollToTop, 10);
    const timeout2 = setTimeout(scrollToTop, 100);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <div className="step-content" ref={summaryRef}>
      <div className="progress-indicator">
        Step {totalSteps} of {totalSteps} – Completion Summary
      </div>

      <div className="summary-container">
        <div className="summary-section">
          <h2>Setup Summary</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            You have completed {completedSteps} out of {totalSteps} steps.
            {skippedSteps > 0 && ` ${skippedSteps} steps were skipped.`}
          </p>

          <ul className="summary-list">
            {steps.map((step, index) => {
              const status = stepStatuses[index];
              const skipReason = skipReasons[index];
              return (
                <li
                  key={step.id}
                  className={`summary-item ${status === 'completed' ? 'completed' : ''} ${status === 'skipped' ? 'skipped' : ''}`}
                >
                  <span>{getStatusIcon(status)}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>
                      {index + 1}. {step.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                      {getStatusLabel(status)}
                      {status === 'skipped' && skipReason && ` - ${skipReason}`}
                      {status === 'skipped' && step.skipWhen && ` (${step.skipWhen})`}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="completion-message">
          <h2>Setup Complete!</h2>
          <p>
            You have finished the setup wizard. Review the summary above to ensure all critical steps were completed.
          </p>
        </div>
      </div>
    </div>
  );
}

