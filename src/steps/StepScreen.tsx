import { useState, useEffect, useRef } from 'react';
import { Step, StepStatus } from '../data/steps';

interface StepScreenProps {
  step: Step;
  status: StepStatus;
  stepNumber: number;
  totalSteps: number;
  onComplete: () => void;
  onSkip: () => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepScreen({
  step,
  status,
  stepNumber,
  totalSteps,
  onComplete,
  onSkip,
  onBack,
  onNext,
}: StepScreenProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [skipConfirmed, setSkipConfirmed] = useState(false);
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Reset state when step changes
  useEffect(() => {
    setIsCompleted(status === 'completed');
    setIsSkipped(status === 'skipped');
    setSkipConfirmed(false);
    setInstructionsExpanded(false);
    
    // Scroll to top when step changes
    const scrollToTop = () => {
      // Try to scroll the main content container (parent)
      const mainContent = stepContentRef.current?.closest('.main-content') as HTMLElement;
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
      // Also try window scroll as fallback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
  }, [step.id, status]);

  const canProceed = isCompleted || (isSkipped && skipConfirmed);

  const handleCompleteChange = (checked: boolean) => {
    setIsCompleted(checked);
    if (checked) {
      setIsSkipped(false);
      setSkipConfirmed(false);
    }
  };

  const handleSkipChange = (checked: boolean) => {
    setIsSkipped(checked);
    if (checked) {
      setIsCompleted(false);
    } else {
      setSkipConfirmed(false);
    }
  };

  const handleNext = () => {
    if (isCompleted) {
      onComplete();
    } else if (isSkipped && skipConfirmed) {
      onSkip();
    }
    onNext();
  };

  return (
    <div className="step-content" ref={stepContentRef}>
      <div className="progress-indicator">
        Step {stepNumber} of {totalSteps} – {step.title}
      </div>

      <div className="step-header">
        <h1>{step.title}</h1>
        <p className="step-description">{step.shortDescription}</p>
        <p className="step-why">{step.whyItMatters}</p>
        {step.estimatedTime && (
          <p className="step-time">Estimated time: {step.estimatedTime}</p>
        )}
      </div>

      {step.warningText && (
        <div className="warning-box">
          {step.warningText}
        </div>
      )}

      <div className="instructions-section">
        <button
          className="instructions-toggle"
          onClick={() => setInstructionsExpanded(!instructionsExpanded)}
          type="button"
        >
          <span>Detailed Instructions</span>
          <span>{instructionsExpanded ? '▼' : '▶'}</span>
        </button>
        {instructionsExpanded && (
          <div className="instructions-content">
            {step.detailedInstructions}
          </div>
        )}
      </div>

      <div className="controls-section">
        <div className="control-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="completed"
              checked={isCompleted}
              onChange={(e) => handleCompleteChange(e.target.checked)}
              disabled={isSkipped}
            />
            <label htmlFor="completed">I have completed this step</label>
          </div>

          {step.skipAllowed ? (
            <>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="skip"
                  checked={isSkipped}
                  onChange={(e) => handleSkipChange(e.target.checked)}
                  disabled={isCompleted}
                />
                <label htmlFor="skip">I want to skip this step</label>
              </div>

              {isSkipped && (
                <div className="skip-confirmation">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="skip-confirm"
                      checked={skipConfirmed}
                      onChange={(e) => setSkipConfirmed(e.target.checked)}
                    />
                    <label htmlFor="skip-confirm">
                      I understand the risks of skipping this step
                    </label>
                  </div>
                  {step.skipWhen && (
                    <p style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                      Skip when: {step.skipWhen}
                    </p>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="no-skip-message">
              This step is required and cannot be skipped.
            </p>
          )}
        </div>

        <div className="button-group">
          {stepNumber > 1 && (
            <button className="button button-secondary" onClick={onBack}>
              Back
            </button>
          )}
          <button
            className="button button-primary"
            onClick={handleNext}
            disabled={!canProceed}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

