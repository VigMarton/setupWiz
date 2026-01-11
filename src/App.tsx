import { useState, useEffect, useRef } from 'react';
import { steps, StepStatus } from './data/steps';
import StepSidebar from './components/StepSidebar';
import StepScreen from './steps/StepScreen';
import SummaryStep from './components/SummaryStep';
import './App.css';

const STORAGE_KEY = 'setupWizardState';

interface WizardState {
  currentStepIndex: number;
  stepStatuses: StepStatus[];
  skipReasons: Record<number, string>;
}

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>(
    new Array(steps.length).fill('not_started' as StepStatus)
  );
  const [skipReasons, setSkipReasons] = useState<Record<number, string>>({});
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed: WizardState = JSON.parse(savedState);
        setCurrentStepIndex(parsed.currentStepIndex ?? 0);
        setStepStatuses(parsed.stepStatuses ?? stepStatuses);
        setSkipReasons(parsed.skipReasons ?? {});
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state: WizardState = {
      currentStepIndex,
      stepStatuses,
      skipReasons,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [currentStepIndex, stepStatuses, skipReasons]);

  // Scroll to top when step changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure scroll happens after DOM updates
    const scrollToTop = () => {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    // Double RAF to ensure it runs after React's render cycle
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
  }, [currentStepIndex]);

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handleComplete = () => {
    const newStatuses = [...stepStatuses];
    newStatuses[currentStepIndex] = 'completed';
    setStepStatuses(newStatuses);
  };

  const handleSkip = () => {
    const newStatuses = [...stepStatuses];
    newStatuses[currentStepIndex] = 'skipped';
    setStepStatuses(newStatuses);
    
    const step = steps[currentStepIndex];
    const newSkipReasons = { ...skipReasons };
    newSkipReasons[currentStepIndex] = step.skipWhen || 'User chose to skip';
    setSkipReasons(newSkipReasons);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const currentStep = steps[currentStepIndex];
  const isSummaryStep = currentStep.id === 'completion-summary';

  return (
    <div className="app-container">
      <StepSidebar
        steps={steps}
        currentStepIndex={currentStepIndex}
        stepStatuses={stepStatuses}
        onStepClick={handleStepClick}
      />
      <div className="main-content" ref={mainContentRef}>
        {isSummaryStep ? (
          <SummaryStep
            steps={steps}
            stepStatuses={stepStatuses}
            skipReasons={skipReasons}
          />
        ) : (
          <StepScreen
            step={currentStep}
            status={stepStatuses[currentStepIndex]}
            stepNumber={currentStepIndex + 1}
            totalSteps={steps.length}
            onComplete={handleComplete}
            onSkip={handleSkip}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}

export default App;

