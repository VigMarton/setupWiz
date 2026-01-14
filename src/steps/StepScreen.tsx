import { useState, useEffect, useRef } from 'react';
import { Step, StepStatus } from '../data/steps';
import Modal from '../components/Modal';

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
  const [isBitwardenModalOpen, setIsBitwardenModalOpen] = useState(false);
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Reset state when step changes
  useEffect(() => {
    setIsCompleted(status === 'completed');
    setIsSkipped(status === 'skipped');
    setSkipConfirmed(false);
    setInstructionsExpanded(false);
    setIsBitwardenModalOpen(false);
    
    // Scroll to top when step changes
    const scrollToTop = () => {
      // Find and scroll the main content container
      const mainContent = stepContentRef.current?.closest('.main-content') as HTMLElement;
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
      // Also scroll window as fallback
      window.scrollTo(0, 0);
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Delayed scrolls to ensure it works
    const timeout1 = setTimeout(scrollToTop, 10);
    const timeout2 = setTimeout(scrollToTop, 100);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
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

        {step.id === 'browser-setup-extensions' && (
          <div
            className="microcopy-link"
            role="button"
            tabIndex={0}
            onClick={() => setIsBitwardenModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsBitwardenModalOpen(true);
            }}
          >
            <span className="microcopy-icon" aria-hidden="true">
              i
            </span>
            What is Bitwarden and how should I use it?
          </div>
        )}
      </div>

      <Modal
        isOpen={isBitwardenModalOpen}
        title="Bitwarden (Password Manager) — What it is and how to use it"
        onClose={() => setIsBitwardenModalOpen(false)}
      >
        <p>
          Bitwarden is a password manager that stores your logins in an encrypted “vault” and can
          auto-fill them in your browser. It helps you use strong, unique passwords for every site
          without needing to remember them all.
        </p>

        <p style={{ marginTop: '12px', fontWeight: 600 }}>Why it’s worth using</p>
        <ul style={{ marginLeft: '18px', marginTop: '6px' }}>
          <li>
            <strong>Strong unique passwords</strong>: reduces risk from password reuse.
          </li>
          <li>
            <strong>Auto-fill</strong>: faster logins with fewer typing mistakes.
          </li>
          <li>
            <strong>Cross-device sync</strong>: your vault is available on desktop + mobile.
          </li>
          <li>
            <strong>Secure notes</strong>: store recovery codes, license keys, Wi‑Fi passwords, etc.
          </li>
        </ul>

        <p style={{ marginTop: '12px', fontWeight: 600 }}>Recommended setup (5–10 minutes)</p>
        <ol style={{ marginLeft: '18px', marginTop: '6px' }}>
          <li>
            Create an account on <a href="https://bitwarden.com/" target="_blank" rel="noreferrer">bitwarden.com</a>.
          </li>
          <li>
            Choose a <strong>long master password</strong> (a passphrase is ideal). This is the one
            password you must remember.
          </li>
          <li>
            Install the browser extension (already linked in this step) and log in.
          </li>
          <li>
            Turn on <strong>2FA</strong> for your Bitwarden account (authenticator app or security key).
          </li>
          <li>
            Import passwords (optional) or start saving logins as you sign in.
          </li>
        </ol>

        <p style={{ marginTop: '12px', fontWeight: 600 }}>Everyday workflow</p>
        <ul style={{ marginLeft: '18px', marginTop: '6px' }}>
          <li>
            When you create a new account, use Bitwarden’s <strong>password generator</strong>.
          </li>
          <li>
            Save the login when prompted (or add it manually if a site is unusual).
          </li>
          <li>
            Use auto-fill (or click the extension icon) to log in quickly and safely.
          </li>
          <li>
            Store <strong>account recovery codes</strong> and <strong>2FA backup codes</strong> in a secure note.
          </li>
        </ul>

        <p style={{ marginTop: '12px', fontWeight: 600 }}>Good security habits</p>
        <ul style={{ marginLeft: '18px', marginTop: '6px' }}>
          <li>
            Don’t reuse passwords. Let Bitwarden generate them.
          </li>
          <li>
            Enable 2FA on important sites (email, banking, password manager).
          </li>
          <li>
            Keep your recovery codes somewhere safe (Bitwarden secure note + an offline backup if you prefer).
          </li>
        </ul>

        <p style={{ marginTop: '12px' }}>
          Learn more: <a href="https://bitwarden.com/help/" target="_blank" rel="noreferrer">Bitwarden Help Center</a>
        </p>
      </Modal>

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

