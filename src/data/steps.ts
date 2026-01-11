export type StepStatus = 'not_started' | 'completed' | 'skipped';

export interface Step {
  id: string;
  title: string;
  shortDescription: string;
  whyItMatters: string;
  skipAllowed: boolean;
  skipWhen?: string;
  detailedInstructions: string;
  estimatedTime?: string;
  warningText?: string;
}

export const steps: Step[] = [
  {
    id: 'initial-system-checks',
    title: 'Initial System Checks',
    shortDescription: 'Verify system identity, activation, and that no previous user data exists.',
    whyItMatters: 'On refurbished machines, this prevents inheriting problems, accounts, or licensing issues.',
    skipAllowed: true,
    skipWhen: 'You are deploying brand new machines from factory image',
    detailedInstructions: `• Settings → System → Activation → confirm activated
• Settings → Accounts → Other users → remove any non-required accounts
• Rename PC (Settings → System → About → Rename this PC)
• Confirm correct time zone & region`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'windows-update',
    title: 'Windows Update',
    shortDescription: 'Bring Windows fully up to date.',
    whyItMatters: 'Updates fix security holes, driver bugs, and stability issues.',
    skipAllowed: false,
    detailedInstructions: `• Settings → Windows Update → Check for updates
• Install all updates (including optional)
• Restart and re-check until clean`,
    estimatedTime: '10-30 minutes'
  },
  {
    id: 'dell-updates-firmware',
    title: 'Dell Updates & Firmware',
    shortDescription: 'Install Dell-specific drivers, firmware, and BIOS updates.',
    whyItMatters: 'Latitudes rely heavily on correct firmware for battery, thermals, and stability.',
    skipAllowed: true,
    skipWhen: 'Not a Dell machine',
    detailedInstructions: `• Download & install Dell Command | Update
• Run it → install all recommended updates
• Reboot if prompted`,
    estimatedTime: '5-15 minutes',
    warningText: 'Do not interrupt firmware updates once started.'
  },
  {
    id: 'bios-hardware-verification',
    title: 'BIOS & Hardware Verification',
    shortDescription: 'Verify core firmware settings and hardware health.',
    whyItMatters: 'Catches issues early (TPM, Secure Boot, battery health).',
    skipAllowed: true,
    skipWhen: 'You trust a known-good corporate image (rare)',
    detailedInstructions: `• Reboot → F2 → enter BIOS
• Check:
  - UEFI mode
  - Secure Boot enabled
  - TPM enabled
  - Battery health (if shown)`,
    estimatedTime: '3-5 minutes',
    warningText: 'Do not interrupt BIOS updates once started.'
  },
  {
    id: 'security-setup',
    title: 'Security Setup',
    shortDescription: 'Enable disk encryption and core Windows protections.',
    whyItMatters: 'Protects data if the laptop is lost, stolen, or accessed.',
    skipAllowed: true,
    skipWhen: 'Device will never leave a secure location (rare for laptops)',
    detailedInstructions: `• Enable BitLocker
• Verify Windows Defender, Firewall, SmartScreen
• Save recovery key`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'account-access-setup',
    title: 'Account & Access Setup',
    shortDescription: 'Configure user accounts and login methods.',
    whyItMatters: 'Prevents misuse and ensures clean access control.',
    skipAllowed: true,
    skipWhen: 'Using preconfigured domain accounts (enterprise)',
    detailedInstructions: `• Create user account(s)
• Set strong password / PIN
• Enable Windows Hello if available`,
    estimatedTime: '3-5 minutes'
  },
  {
    id: 'power-performance',
    title: 'Power & Performance Settings',
    shortDescription: 'Optimize power mode for usability and battery life.',
    whyItMatters: 'Default settings are often conservative and feel slow.',
    skipAllowed: true,
    skipWhen: 'Desktop PC (if you adapt wizard later)',
    detailedInstructions: `• Settings → System → Power & Battery
• Set to Balanced or Best performance
• Adjust sleep / screen timeout`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'remove-bloatware',
    title: 'Remove Bloatware',
    shortDescription: 'Uninstall unnecessary, trial, or unwanted software.',
    whyItMatters: 'Reduces clutter, improves performance, avoids conflicts.',
    skipAllowed: true,
    skipWhen: 'Clean corporate image with no bloat',
    detailedInstructions: `• Settings → Apps → Installed apps
• Remove trial antivirus, promo apps, junk`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'essential-software',
    title: 'Essential Software',
    shortDescription: 'Install core utilities needed on every machine.',
    whyItMatters: 'Standardizes environment and saves time later.',
    skipAllowed: true,
    skipWhen: 'Using automated deployment (rare in your case)',
    detailedInstructions: `• 7-Zip
• VLC
• SumatraPDF
• PowerToys
• Everything`,
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'browser-setup-extensions',
    title: 'Browser Setup & Extensions',
    shortDescription: 'Harden the browser for safety and usability.',
    whyItMatters: 'Most risk comes from the browser.',
    skipAllowed: true,
    skipWhen: 'Browser will be managed by policy (enterprise)',
    detailedInstructions: `• Install browser
• Add uBlock Origin
• Add Bitwarden extension
• Optional: Dark Reader, OneTab`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'design-work-tools',
    title: 'Design / Work Tools',
    shortDescription: 'Install tools for image editing and light design.',
    whyItMatters: 'Tailors the machine to its actual use case.',
    skipAllowed: true,
    skipWhen: 'Machine is for non-design users',
    detailedInstructions: `• GIMP
• Paint.NET
• Inkscape
• Canva (web shortcut)`,
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'privacy-system-settings',
    title: 'Privacy & System Settings',
    shortDescription: 'Disable tracking, ads, and unnecessary data sharing.',
    whyItMatters: 'Improves privacy and reduces noise.',
    skipAllowed: true,
    skipWhen: 'Organization requires default telemetry (rare)',
    detailedInstructions: `• Advertising ID off
• Diagnostics = required only
• Review app permissions`,
    estimatedTime: '3-5 minutes'
  },
  {
    id: 'startup-optimization',
    title: 'Startup Optimization',
    shortDescription: 'Disable unnecessary startup apps.',
    whyItMatters: 'Improves boot speed and reduces background load.',
    skipAllowed: true,
    skipWhen: 'Very minimal system',
    detailedInstructions: `• Settings → Apps → Startup
• Disable non-essential entries`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'backup-setup',
    title: 'Backup Setup',
    shortDescription: 'Ensure user data will be backed up.',
    whyItMatters: 'Prevents data loss disasters.',
    skipAllowed: true,
    skipWhen: 'Device is disposable / kiosk (unlikely)',
    detailedInstructions: `• Configure OneDrive OR
• Explain external drive backup`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'system-restore-point',
    title: 'System Restore Point',
    shortDescription: 'Create a recovery snapshot.',
    whyItMatters: 'Allows rollback if something breaks.',
    skipAllowed: true,
    skipWhen: 'Using immutable images (rare)',
    detailedInstructions: `• Enable System Restore
• Create restore point`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'final-health-check',
    title: 'Final Health Check',
    shortDescription: 'Verify hardware and system health.',
    whyItMatters: 'Catches issues before user receives machine.',
    skipAllowed: false,
    detailedInstructions: `• Test Wi-Fi, Bluetooth, camera, mic, ports
• Check Device Manager`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'optional-enhancements',
    title: 'Optional Enhancements',
    shortDescription: 'Quality-of-life tools and accessories.',
    whyItMatters: 'Improves comfort and productivity.',
    skipAllowed: true,
    skipWhen: 'Strict minimal deployment',
    detailedInstructions: `• Dark mode
• Night Light
• Clipboard history
• Gadgets recommendations`,
    estimatedTime: '3-5 minutes'
  },
  {
    id: 'completion-summary',
    title: 'Completion Summary',
    shortDescription: 'Review what was done.',
    whyItMatters: 'Accountability + checklist confidence.',
    skipAllowed: false,
    detailedInstructions: 'Review all completed and skipped steps.',
    estimatedTime: '1 minute'
  }
];

