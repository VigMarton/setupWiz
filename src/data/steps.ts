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
    detailedInstructions: `VERIFY WINDOWS ACTIVATION:
1. Press Windows key + I to open Settings
2. Click on "System" (or search for "Activation" in the search bar)
3. In the left sidebar, click "Activation"
4. Verify that it shows "Windows is activated with a digital license" or similar
5. If not activated, click "Troubleshoot" and follow the prompts

REMOVE UNNECESSARY USER ACCOUNTS:
1. In Settings, click "Accounts" (or search for "Accounts")
2. Click "Other users" or "Family & other users" in the left sidebar
3. Review the list of accounts
4. For each account that shouldn't be there:
   - Click on the account name
   - Click "Remove" button
   - Confirm removal if prompted

RENAME THE PC:
1. In Settings, go to "System" → "About" (or search "Rename PC")
2. Scroll down to "Rename this PC" section
3. Click "Rename" button
4. Enter the desired computer name (use letters, numbers, and hyphens only)
5. Click "Next" and restart when prompted

VERIFY TIME ZONE AND REGION:
1. In Settings, go to "Time & Language" → "Date & time"
2. Verify "Time zone" is set correctly for your location
3. Toggle "Set time automatically" to ON if not already
4. Go to "Region" in the left sidebar
5. Verify "Country or region" matches your location
6. Verify "Regional format" is appropriate`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'windows-update',
    title: 'Windows Update',
    shortDescription: 'Bring Windows fully up to date.',
    whyItMatters: 'Updates fix security holes, driver bugs, and stability issues.',
    skipAllowed: false,
    detailedInstructions: `OPEN WINDOWS UPDATE:
1. Press Windows key + I to open Settings
2. Click "Windows Update" in the left sidebar (or search for "Windows Update")
3. Click "Check for updates" button
4. Wait for Windows to search for available updates

INSTALL ALL UPDATES:
1. If updates are found, click "Download" or "Install now"
2. For optional updates:
   - Click "Advanced options" or "Optional updates" link
   - Review the list of optional updates
   - Select all optional updates you want (drivers, feature updates, etc.)
   - Click "Download and install"
3. Wait for all updates to download and install
4. Do NOT interrupt the update process

RESTART AND VERIFY:
1. When prompted, click "Restart now" (or schedule restart)
2. After restart, log back in
3. Return to Settings → Windows Update
4. Click "Check for updates" again
5. Repeat this process until you see "You're up to date" or "No updates available"
6. This may require multiple restarts - be patient

VERIFY UPDATE STATUS:
1. In Windows Update settings, check that it shows "You're up to date"
2. If there are pending restarts, restart the computer
3. After final restart, verify no more updates are available`,
    estimatedTime: '10-30 minutes'
  },
  {
    id: 'dell-updates-firmware',
    title: 'Dell Updates & Firmware',
    shortDescription: 'Install Dell-specific drivers, firmware, and BIOS updates.',
    whyItMatters: 'Latitudes rely heavily on correct firmware for battery, thermals, and stability.',
    skipAllowed: true,
    skipWhen: 'Not a Dell machine',
    detailedInstructions: `DOWNLOAD DELL COMMAND | UPDATE:
1. Open your web browser
2. Navigate to: https://www.dell.com/support/kb/article/en-us/sln305843/dell-command-update
   OR search "Dell Command Update download" in your browser
3. Click the download link for Dell Command | Update
4. Choose the appropriate version (usually the latest)
5. Save the installer file (usually named something like "Dell-Command-Update-Application_XXXXX.exe")

INSTALL DELL COMMAND | UPDATE:
1. Locate the downloaded installer file (usually in Downloads folder)
2. Double-click the installer file
3. If prompted by User Account Control, click "Yes"
4. Follow the installation wizard:
   - Click "Next" on the welcome screen
   - Accept the license agreement
   - Choose installation location (default is fine)
   - Click "Install"
5. Wait for installation to complete
6. Click "Finish" when done

RUN DELL COMMAND | UPDATE:
1. Open Start menu and search for "Dell Command Update"
2. Click on "Dell Command | Update" to launch it
3. The application will automatically scan for available updates
4. Wait for the scan to complete

INSTALL RECOMMENDED UPDATES:
1. Review the list of available updates (drivers, BIOS, firmware)
2. Check the boxes for all recommended updates (or click "Select All")
3. Click "Install" or "Install All" button
4. Read any warnings carefully (especially for BIOS updates)
5. Click "Yes" or "Continue" to proceed
6. DO NOT close the application or turn off the computer during updates
7. Wait for all updates to download and install

REBOOT IF PROMPTED:
1. If the application prompts you to restart, click "Restart Now"
2. After restart, Dell Command | Update may run again automatically
3. Check if any additional updates are available
4. Repeat until no more updates are found`,
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
    detailedInstructions: `ENTER BIOS SETUP:
1. Save all your work and close all applications
2. Click Start menu → Power button
3. Hold Shift key and click "Restart"
4. Wait for the blue "Choose an option" screen
5. Click "Troubleshoot" → "Advanced options" → "UEFI Firmware Settings"
6. Click "Restart"
   OR
   Alternative method: Restart the computer and immediately press F2 repeatedly (or F12, Delete, or Esc depending on your Dell model) until BIOS screen appears

NAVIGATE BIOS MENU:
1. Use arrow keys to navigate menus
2. Use Enter to select items
3. Use Esc to go back

VERIFY UEFI MODE:
1. Look for "Boot" or "Boot Mode" section
2. Verify it shows "UEFI" (not "Legacy" or "CSM")
3. If it shows Legacy/CSM:
   - Change it to "UEFI"
   - Save changes (usually F10)
   - Restart and return to BIOS

VERIFY SECURE BOOT:
1. Navigate to "Security" or "Boot" section
2. Find "Secure Boot" option
3. Verify it is set to "Enabled"
4. If disabled:
   - Select "Secure Boot"
   - Change to "Enabled"
   - Press Enter to confirm

VERIFY TPM:
1. Navigate to "Security" section
2. Look for "TPM" or "Trusted Platform Module" or "PTT"
3. Verify it shows "Enabled" or "Available"
4. If disabled:
   - Select the TPM option
   - Change to "Enabled"
   - Press Enter to confirm

CHECK BATTERY HEALTH (if available):
1. Look for "Power" or "Battery" section
2. Check battery status/health percentage
3. Note any warnings or low health indicators

SAVE AND EXIT:
1. Press F10 to save changes and exit
2. Or navigate to "Exit" → "Save Changes and Exit"
3. Confirm "Yes" if prompted
4. Computer will restart`,
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
    detailedInstructions: `ENABLE BITLOCKER:
1. Press Windows key + I to open Settings
2. Search for "BitLocker" in the search bar
3. Click "Manage BitLocker" or "Device encryption"
4. Under "Operating system drive", click "Turn on BitLocker"
5. Choose how to unlock your drive:
   - Select "Enter a password" (recommended)
   - Enter a strong password (at least 8 characters, mix of letters, numbers, symbols)
   - Confirm the password
   - Click "Next"
6. Choose how to backup your recovery key:
   - Select "Save to your Microsoft account" (if you have one)
   - OR "Save to a file" (save to USB drive or external drive)
   - OR "Print the recovery key"
   - Click "Next"
7. Choose encryption mode:
   - Select "New encryption mode" (recommended for new drives)
   - Click "Next"
8. Choose "Run BitLocker system check" (recommended)
9. Click "Continue" and restart when prompted
10. After restart, BitLocker will begin encrypting (this can take hours - let it run)

VERIFY WINDOWS DEFENDER:
1. Press Windows key + I → "Privacy & Security" → "Windows Security"
2. Or search for "Windows Security" in Start menu
3. Click "Open Windows Security"
4. Verify all protection areas show green checkmarks:
   - Virus & threat protection: "No action needed"
   - Account protection: "Protected"
   - Firewall & network protection: "Active"
   - App & browser control: "Protected"
5. If any show warnings, click on them and follow the prompts to fix

VERIFY FIREWALL:
1. In Windows Security, click "Firewall & network protection"
2. Verify all networks show "Active":
   - Domain network: Active
   - Private network: Active
   - Public network: Active
3. If any show "Inactive", click on it and toggle "Windows Defender Firewall" to ON

VERIFY SMARTScreen:
1. In Windows Security, click "App & browser control"
2. Scroll down to "Reputation-based protection"
3. Verify these are all set to "On":
   - "Check apps and files" = On
   - "SmartScreen for Microsoft Edge" = On
   - "SmartScreen for Microsoft Store apps" = On
4. If any are Off, click "Reputation-based protection settings" and toggle them On

SAVE RECOVERY KEY SECURELY:
1. Make sure you saved the BitLocker recovery key from step 6 above
2. Store it in a safe place:
   - Print it and store in a secure location
   - Save to a USB drive kept in a safe place
   - Save to your password manager
   - DO NOT store it only on the encrypted drive`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'account-access-setup',
    title: 'Account & Access Setup',
    shortDescription: 'Configure user accounts and login methods.',
    whyItMatters: 'Prevents misuse and ensures clean access control.',
    skipAllowed: true,
    skipWhen: 'Using preconfigured domain accounts (enterprise)',
    detailedInstructions: `CREATE USER ACCOUNT:
1. Press Windows key + I to open Settings
2. Click "Accounts" (or search for "Accounts")
3. Click "Other users" or "Family & other users" in the left sidebar
4. Click "Add account" or "Add someone else to this PC"
5. Choose account type:
   - If adding Microsoft account: Enter email address and click "Next"
   - If adding local account: Click "I don't have this person's sign-in information" → "Add a user without a Microsoft account"
6. Enter username, password, and password hint
7. Click "Next" to create the account
8. The new account will appear in the list

SET STRONG PASSWORD FOR CURRENT ACCOUNT:
1. In Settings → Accounts, click "Sign-in options"
2. Under "Password", click "Change"
3. Enter your current password
4. Enter a new strong password:
   - At least 8 characters (12+ recommended)
   - Mix of uppercase and lowercase letters
   - Include numbers and symbols
   - Avoid common words or personal information
5. Confirm the new password
6. Enter a password hint (optional but helpful)
7. Click "Next" and "Finish"

SET UP PIN:
1. In Settings → Accounts → "Sign-in options"
2. Under "PIN (Windows Hello)", click "Add" or "Change"
3. Enter your account password to verify
4. Enter a new PIN (4-6 digits)
5. Confirm the PIN
6. Click "OK"
7. You can now use PIN to sign in (faster than password)

ENABLE WINDOWS HELLO (if hardware supports it):
1. In Settings → Accounts → "Sign-in options"
2. Look for "Windows Hello" section:
   - "Face" (for facial recognition)
   - "Fingerprint" (for fingerprint reader)
   - "PIN" (already set up above)
3. If "Face" is available:
   - Click "Set up" under Face
   - Click "Get started"
   - Look at the camera until it recognizes you
   - Follow the on-screen instructions
4. If "Fingerprint" is available:
   - Click "Set up" under Fingerprint
   - Click "Get started"
   - Place your finger on the fingerprint reader repeatedly
   - Follow the on-screen instructions until setup is complete
5. After setup, you can use face or fingerprint to sign in`,
    estimatedTime: '3-5 minutes'
  },
  {
    id: 'power-performance',
    title: 'Power & Performance Settings',
    shortDescription: 'Optimize power mode for usability and battery life.',
    whyItMatters: 'Default settings are often conservative and feel slow.',
    skipAllowed: true,
    skipWhen: 'Desktop PC (if you adapt wizard later)',
    detailedInstructions: `OPEN POWER SETTINGS:
1. Press Windows key + I to open Settings
2. Click "System" → "Power & battery" (or search for "Power" in Settings)

SET POWER MODE:
1. In Power & battery settings, find "Power mode" section
2. Click the dropdown menu (currently shows "Balanced", "Best power efficiency", or "Best performance")
3. Select your preferred mode:
   - "Best performance" - Maximum speed, shorter battery life
   - "Balanced" - Good balance of performance and battery (recommended)
   - "Best power efficiency" - Longer battery, slower performance
4. The change takes effect immediately

ADJUST SCREEN TIMEOUT:
1. In Power & battery settings, scroll to "Screen and sleep" section
2. For "When plugged in":
   - Set "Turn off screen after" to your preference (e.g., "15 minutes" or "Never")
   - Set "Put device to sleep after" to your preference (e.g., "30 minutes" or "Never")
3. For "When on battery power":
   - Set "Turn off screen after" (e.g., "5 minutes")
   - Set "Put device to sleep after" (e.g., "15 minutes")

ADJUST ADDITIONAL POWER SETTINGS (optional):
1. Click "Additional power settings" link at the bottom
2. This opens the classic Power Options control panel
3. You can:
   - Choose a power plan (Balanced, Power saver, High performance)
   - Click "Change plan settings" to customize when to turn off display and put computer to sleep
   - Click "Change advanced power settings" for more detailed options
4. Click "OK" to save changes`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'remove-bloatware',
    title: 'Remove Bloatware',
    shortDescription: 'Uninstall unnecessary, trial, or unwanted software.',
    whyItMatters: 'Reduces clutter, improves performance, avoids conflicts.',
    skipAllowed: true,
    skipWhen: 'Clean corporate image with no bloat',
    detailedInstructions: `OPEN INSTALLED APPS:
1. Press Windows key + I to open Settings
2. Click "Apps" → "Installed apps" (or search for "Installed apps")

IDENTIFY BLOATWARE:
Look for these common unwanted apps:
- Trial antivirus software (McAfee, Norton, AVG trials, etc.)
- Manufacturer promotional apps (Dell apps you don't need, HP apps, etc.)
- Game launchers you won't use
- Social media apps you don't need
- Shopping apps (Amazon, eBay, etc.)
- News/weather apps you don't want
- Manufacturer bloatware (Dell SupportAssist if not needed, etc.)

REMOVE UNWANTED APPS:
1. Scroll through the list or use the search box to find specific apps
2. For each unwanted app:
   - Click on the app name
   - Click the "Uninstall" button (or three dots menu → Uninstall)
   - If prompted, click "Uninstall" again to confirm
   - Wait for the uninstall process to complete
3. Some apps may require restart - restart if prompted

REMOVE MICROSOFT STORE APPS:
1. In Installed apps, you can filter by "Microsoft Store" apps
2. Review these apps and remove any you don't need:
   - Unnecessary games
   - Trial software
   - Promotional apps
3. Click on the app → "Uninstall"

VERIFY REMOVAL:
1. After uninstalling, verify the apps are gone from the list
2. Check Start menu to ensure shortcuts are removed
3. Restart computer if you removed many apps to clean up`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'essential-software',
    title: 'Essential Software',
    shortDescription: 'Install core utilities needed on every machine.',
    whyItMatters: 'Standardizes environment and saves time later.',
    skipAllowed: true,
    skipWhen: 'Using automated deployment (rare in your case)',
    detailedInstructions: `INSTALL 7-ZIP (File Archiver):
1. Open your web browser
2. Go to: https://www.7-zip.org/download.html
3. Download the latest version (64-bit x64 for most modern computers)
4. Run the installer (7zXXXX-x64.exe)
5. Click "Install" (default location is fine)
6. Wait for installation to complete
7. Click "Close"
8. Verify: Right-click any file → you should see "7-Zip" in the context menu

INSTALL VLC MEDIA PLAYER:
1. Open your web browser
2. Go to: https://www.videolan.org/vlc/
3. Click "Download VLC" button
4. The download should start automatically
5. Run the installer (vlc-X.X.X-win64.exe)
6. Click "Next" → "Next" → "Install"
7. Wait for installation
8. Uncheck "Run VLC media player" if you don't want to launch it now
9. Click "Finish"
10. Verify: Search "VLC" in Start menu - it should appear

INSTALL SUMATRAPDF (PDF Reader):
1. Open your web browser
2. Go to: https://www.sumatrapdfreader.org/download-free-pdf-viewer
3. Click "Download SumatraPDF" (or direct link: https://www.sumatrapdfreader.org/download-free-pdf-viewer)
4. Download the 64-bit installer
5. Run the installer (SumatraPDF-X.X.X-64-install.exe)
6. Click "Install" (or customize installation location)
7. Wait for installation
8. Click "Finish"
9. Verify: Open any PDF file - it should open in SumatraPDF

INSTALL MICROSOFT POWERTOY:
1. Open your web browser
2. Go to: https://github.com/microsoft/PowerToys/releases/latest
   OR go to Microsoft Store and search "PowerToys"
3. If using GitHub:
   - Scroll to "Assets" section
   - Download "PowerToysSetup-X.X.X-x64.exe" (the .exe installer)
4. Run the installer
5. If prompted by Windows SmartScreen, click "More info" → "Run anyway"
6. Follow the installation wizard:
   - Accept the license agreement
   - Choose installation location (default is fine)
   - Click "Install"
7. Wait for installation to complete
8. Click "Launch PowerToys" or "Finish"
9. PowerToys will run in the background (check system tray)
10. Verify: Right-click PowerToys icon in system tray → "Settings" to configure

INSTALL EVERYTHING (File Search Tool):
1. Open your web browser
2. Go to: https://www.voidtools.com/downloads/
3. Click "Download Installer" (64-bit version)
4. Run the installer (Everything-X.X.X.x64-Setup.exe)
5. Click "Next" → "I accept the agreement" → "Next"
6. Choose installation location (default is fine) → "Next"
7. Click "Install"
8. Wait for installation
9. Uncheck "Run Everything" if you don't want to launch now
10. Click "Finish"
11. Verify: Search "Everything" in Start menu and launch it - it should index your files quickly`,
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'browser-setup-extensions',
    title: 'Browser Setup & Extensions',
    shortDescription: 'Harden the browser for safety and usability.',
    whyItMatters: 'Most risk comes from the browser.',
    skipAllowed: true,
    skipWhen: 'Browser will be managed by policy (enterprise)',
    detailedInstructions: `INSTALL BROWSER (if not already installed):
For Chrome:
1. Open your web browser (Edge comes with Windows)
2. Go to: https://www.google.com/chrome/
3. Click "Download Chrome" button
4. Click "Accept and Install"
5. Run the downloaded installer (ChromeSetup.exe)
6. Chrome will install and launch automatically
7. Set Chrome as default browser if prompted

For Firefox:
1. Go to: https://www.mozilla.org/firefox/
2. Click "Download Firefox" button
3. Run the installer (Firefox Setup.exe)
4. Follow the installation wizard
5. Launch Firefox when installation completes

INSTALL UBLOCK ORIGIN EXTENSION:
For Chrome/Edge:
1. Open Chrome or Edge browser
2. Go to: https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm
   OR search "uBlock Origin" in Chrome Web Store
3. Click "Add to Chrome" button
4. Click "Add extension" in the confirmation popup
5. Wait for installation
6. Verify: You should see the uBlock Origin icon (red shield) in your browser toolbar

For Firefox:
1. Open Firefox browser
2. Go to: https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/
   OR search "uBlock Origin" in Firefox Add-ons
3. Click "Add to Firefox" button
4. Click "Add" in the confirmation popup
5. Wait for installation
6. Verify: You should see the uBlock Origin icon in your browser toolbar

INSTALL BITWARDEN EXTENSION:
For Chrome/Edge:
1. Open Chrome or Edge browser
2. Go to: https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb
   OR search "Bitwarden" in Chrome Web Store
3. Click "Add to Chrome" button
4. Click "Add extension" in the confirmation popup
5. Click the Bitwarden icon in toolbar to set up:
   - Create a free account OR log in to existing account
   - Follow the setup wizard
6. Verify: Bitwarden icon should appear in toolbar

For Firefox:
1. Open Firefox browser
2. Go to: https://addons.mozilla.org/en-US/firefox/addon/bitwarden-password-manager/
   OR search "Bitwarden" in Firefox Add-ons
3. Click "Add to Firefox" button
4. Click "Add" in the confirmation popup
5. Set up Bitwarden account as above

INSTALL DARK READER (Optional):
For Chrome/Edge:
1. Go to: https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh
2. Click "Add to Chrome" → "Add extension"
3. Dark Reader will automatically enable dark mode on websites
4. Click the icon to adjust settings if needed

For Firefox:
1. Go to: https://addons.mozilla.org/en-US/firefox/addon/darkreader/
2. Click "Add to Firefox" → "Add"

INSTALL ONETAB (Optional):
For Chrome/Edge:
1. Go to: https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall
2. Click "Add to Chrome" → "Add extension"
3. OneTab helps manage multiple tabs - click the icon to collapse all tabs

For Firefox:
1. Go to: https://addons.mozilla.org/en-US/firefox/addon/onetab/
2. Click "Add to Firefox" → "Add"`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'design-work-tools',
    title: 'Design / Work Tools',
    shortDescription: 'Install tools for image editing and light design.',
    whyItMatters: 'Tailors the machine to its actual use case.',
    skipAllowed: true,
    skipWhen: 'Machine is for non-design users',
    detailedInstructions: `INSTALL GIMP (Image Editor):
1. Open your web browser
2. Go to: https://www.gimp.org/downloads/
3. Click "Download GIMP X.X.X" button (latest version)
4. The download should start automatically
5. Run the installer (gimp-X.X.X-setup.exe)
6. Click "Install" (or customize installation location)
7. Wait for installation to complete (this may take several minutes)
8. Click "Finish"
9. Verify: Search "GIMP" in Start menu - it should appear

INSTALL PAINT.NET:
1. Open your web browser
2. Go to: https://www.getpaint.net/download.html
3. Scroll down and click the download link for the latest version
4. OR get it from Microsoft Store: Search "Paint.NET" in Microsoft Store
5. If downloading installer:
   - Run the installer (paint.net.X.X.X.install.exe)
   - Follow installation wizard
   - Click "Install"
6. If using Microsoft Store:
   - Click "Get" or "Install" button
   - Wait for installation
7. Verify: Search "Paint.NET" in Start menu

INSTALL INKSCAPE (Vector Graphics):
1. Open your web browser
2. Go to: https://inkscape.org/release/
3. Click "Download" button for the latest stable version
4. Choose "Windows 64-bit" installer
5. Download the installer (inkscape-X.X.X-x64.exe)
6. Run the installer
7. Click "Next" → "I Agree" → "Next"
8. Choose installation location (default is fine) → "Next"
9. Click "Install"
10. Wait for installation (may take a few minutes)
11. Click "Finish"
12. Verify: Search "Inkscape" in Start menu

CREATE CANVA WEB SHORTCUT:
1. Open your web browser
2. Go to: https://www.canva.com/
3. Sign up for a free account if you don't have one:
   - Enter your email
   - Create a password
   - Follow the signup process
4. Once logged in, create a desktop shortcut:
   For Chrome/Edge:
   - Click the three dots menu (⋮) in the top right
   - Hover over "More tools"
   - Click "Create shortcut"
   - Check "Open as window" (optional)
   - Click "Create"
   For Firefox:
   - Right-click on the Canva page
   - Select "Create Shortcut" or use browser menu
5. The shortcut will appear on your desktop
6. Double-click it to open Canva in a browser window`,
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'privacy-system-settings',
    title: 'Privacy & System Settings',
    shortDescription: 'Disable tracking, ads, and unnecessary data sharing.',
    whyItMatters: 'Improves privacy and reduces noise.',
    skipAllowed: true,
    skipWhen: 'Organization requires default telemetry (rare)',
    detailedInstructions: `DISABLE ADVERTISING ID:
1. Press Windows key + I to open Settings
2. Click "Privacy & Security" → "General" (or search for "Advertising ID")
3. Scroll down to "Advertising ID" section
4. Toggle "Let apps use my advertising ID" to OFF
5. This prevents apps from using your advertising ID to show personalized ads

SET DIAGNOSTICS TO REQUIRED ONLY:
1. In Settings → Privacy & Security, click "Diagnostics & feedback"
2. Under "Diagnostic data", select "Required diagnostic data" (not "Optional diagnostic data")
3. Scroll down to "Improve inking and typing"
4. Toggle "Improve inking & typing recognition" to OFF (optional but recommended)
5. Scroll to "Tailored experiences"
6. Toggle "Let Microsoft provide you with tailored experiences" to OFF

REVIEW APP PERMISSIONS:
1. In Settings → Privacy & Security, review each category:

LOCATION:
- Click "Location" in left sidebar
- Toggle "Location service" to OFF (unless you need it)
- Review which apps have location access and disable unnecessary ones

CAMERA:
- Click "Camera"
- Toggle "Camera access" to OFF (unless needed)
- Review app-specific permissions below and disable unnecessary access

MICROPHONE:
- Click "Microphone"
- Toggle "Microphone access" to OFF (unless needed)
- Review and disable app-specific access as needed

NOTIFICATIONS:
- Click "Notifications"
- Review which apps can send notifications
- Toggle OFF any apps you don't want notifications from

ACCOUNT INFO:
- Click "Account info"
- Review which apps can access your account information
- Disable access for apps that don't need it

CONTACTS, CALENDAR, CALL HISTORY:
- Review each section and disable access for apps that don't need it

OTHER DEVICES:
- Click "Other devices"
- Review and adjust settings for app access to other devices`,
    estimatedTime: '3-5 minutes'
  },
  {
    id: 'startup-optimization',
    title: 'Startup Optimization',
    shortDescription: 'Disable unnecessary startup apps.',
    whyItMatters: 'Improves boot speed and reduces background load.',
    skipAllowed: true,
    skipWhen: 'Very minimal system',
    detailedInstructions: `OPEN STARTUP SETTINGS:
1. Press Windows key + I to open Settings
2. Click "Apps" → "Startup" (or search for "Startup" in Settings)
3. You'll see a list of apps that start automatically when Windows boots

REVIEW STARTUP APPS:
Look through the list and identify which apps you need at startup:
- Essential: Windows Security, Windows Update, audio drivers
- Usually unnecessary: Game launchers, chat apps, cloud storage (unless you need instant sync), media players, etc.

DISABLE NON-ESSENTIAL APPS:
1. For each app you don't need at startup:
   - Toggle the switch to OFF (it will turn gray)
   - The app will no longer start automatically
2. Common apps to disable:
   - Steam, Epic Games Launcher (unless you want them running)
   - Discord, Slack (unless you need them immediately)
   - Spotify, iTunes (unless you want them running)
   - Adobe Creative Cloud (can start manually when needed)
   - Various manufacturer utilities (Dell, HP apps you don't use)
   - Cloud storage apps (OneDrive, Dropbox can sync without starting)

VERIFY CHANGES:
1. After making changes, the list will update immediately
2. Restart your computer to test
3. Check Task Manager (Ctrl+Shift+Esc) → "Startup" tab to see what's running
4. If something important didn't start, you can re-enable it

USE TASK MANAGER FOR MORE CONTROL (Advanced):
1. Press Ctrl+Shift+Esc to open Task Manager
2. Click "Startup" tab
3. Right-click any app → "Disable" or "Enable"
4. You can see "Startup impact" (High, Medium, Low) to help decide`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'backup-setup',
    title: 'Backup Setup',
    shortDescription: 'Ensure user data will be backed up.',
    whyItMatters: 'Prevents data loss disasters.',
    skipAllowed: true,
    skipWhen: 'Device is disposable / kiosk (unlikely)',
    detailedInstructions: `OPTION 1: CONFIGURE ONEDRIVE (Cloud Backup):
1. Click the OneDrive icon in the system tray (cloud icon)
   - If you don't see it, search "OneDrive" in Start menu and open it
2. Sign in with your Microsoft account (or create one if needed)
3. Follow the OneDrive setup wizard:
   - Choose folders to sync (Desktop, Documents, Pictures)
   - Click "Next" through the setup
4. OneDrive will start syncing your files automatically
5. Verify sync status:
   - Click OneDrive icon in system tray
   - Check that files are syncing (you'll see sync progress)
6. Access files online: Go to https://onedrive.live.com to see your files

OPTION 2: EXTERNAL DRIVE BACKUP:
1. Connect an external hard drive or USB drive to your computer
2. Wait for Windows to recognize it (you'll see a notification)
3. Open File Explorer (Windows key + E)
4. Navigate to the external drive
5. Create a backup folder:
   - Right-click in the drive → "New" → "Folder"
   - Name it "Backup [Date]" (e.g., "Backup 2026-01-15")
6. Copy important files:
   - Navigate to folders you want to backup (Documents, Pictures, Desktop, etc.)
   - Select files/folders (Ctrl+A to select all)
   - Right-click → "Copy"
   - Go to your backup folder → Right-click → "Paste"
7. Wait for files to copy (this may take a while)
8. Verify backup: Check that files are in the backup folder
9. Eject the drive safely:
   - Right-click the drive in File Explorer → "Eject"
   - Wait for "Safe to Remove" message

SET UP WINDOWS FILE HISTORY (Automatic Backup):
1. Connect external drive (as above)
2. Press Windows key + I → "Privacy & Security" → "Windows Backup"
3. Or search "File History" in Settings
4. Click "Add a drive" under "Back up using File History"
5. Select your external drive
6. Toggle "Automatically back up my files" to ON
7. Click "More options" to customize:
   - How often to backup (every hour, daily, etc.)
   - How long to keep backups
   - Which folders to backup
8. File History will now automatically backup your files

RECOMMENDATION:
- Use OneDrive for automatic cloud backup (convenient, always available)
- Use external drive backup for important files (local copy, works offline)
- Consider using both for maximum protection`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'system-restore-point',
    title: 'System Restore Point',
    shortDescription: 'Create a recovery snapshot.',
    whyItMatters: 'Allows rollback if something breaks.',
    skipAllowed: true,
    skipWhen: 'Using immutable images (rare)',
    detailedInstructions: `ENABLE SYSTEM RESTORE:
1. Press Windows key + R to open Run dialog
2. Type: sysdm.cpl and press Enter
3. This opens "System Properties" window
4. Click the "System Protection" tab
5. Under "Protection Settings", select your main drive (usually "C:")
6. Click "Configure" button
7. Select "Turn on system protection"
8. Adjust "Max Usage" slider:
   - Recommended: 5-10% of drive space (e.g., 5-10 GB for a 100GB drive)
   - This determines how many restore points Windows keeps
9. Click "OK"
10. You should now see "Protection: On" next to your drive

CREATE RESTORE POINT:
1. In the same "System Properties" → "System Protection" tab
2. With your drive selected (showing "Protection: On")
3. Click "Create" button
4. Enter a description for the restore point:
   - Example: "Before software installation - 2026-01-15"
   - Or: "Clean setup - Post Windows Update"
5. Click "Create"
6. Wait for Windows to create the restore point (may take a few minutes)
7. You'll see "The restore point was created successfully" message
8. Click "Close"

VERIFY RESTORE POINT WAS CREATED:
1. Click "System Restore" button in System Properties
2. Click "Next" (don't actually restore, just verify)
3. You should see your newly created restore point in the list
4. Click "Cancel" to exit

USING SYSTEM RESTORE (if needed later):
1. If something goes wrong, you can restore:
   - Open System Properties → System Protection → System Restore
   - Select a restore point
   - Click "Next" → "Finish"
   - Warning: This will undo system changes made after the restore point
   - Your personal files (Documents, Pictures) are NOT affected`,
    estimatedTime: '2-3 minutes'
  },
  {
    id: 'final-health-check',
    title: 'Final Health Check',
    shortDescription: 'Verify hardware and system health.',
    whyItMatters: 'Catches issues before user receives machine.',
    skipAllowed: false,
    detailedInstructions: `TEST WI-FI CONNECTION:
1. Click the Wi-Fi icon in the system tray (bottom right)
2. Verify you can see available networks
3. Connect to a network if not already connected
4. Open a web browser and visit a website (e.g., google.com)
5. Verify the page loads correctly
6. Check connection speed: Right-click Wi-Fi icon → "Open Network & Internet settings" → Check connection status

TEST BLUETOOTH:
1. Click the Bluetooth icon in system tray (or search "Bluetooth" in Settings)
2. Open Settings → "Bluetooth & devices"
3. Toggle Bluetooth to ON if not already on
4. Verify Bluetooth is discoverable
5. Try pairing a device:
   - Click "Add device" → "Bluetooth"
   - Put your Bluetooth device in pairing mode
   - Select the device from the list
   - Complete pairing process
6. Test audio (if headphones/speakers): Play a video or music to verify audio works

TEST CAMERA:
1. Open Start menu and search "Camera"
2. Click the Camera app
3. Verify the camera view appears
4. Take a test photo by clicking the capture button
5. Verify the photo was saved
6. Test front and rear cameras if available (switch camera button)

TEST MICROPHONE:
1. Press Windows key + I → "Privacy & Security" → "Microphone"
2. Verify "Microphone access" is ON
3. Open Start menu and search "Voice Recorder"
4. Click "Voice Recorder" app
5. Click the record button (red circle)
6. Speak into the microphone for a few seconds
7. Click stop button
8. Play back the recording to verify audio was captured
9. You should hear your voice clearly

TEST USB PORTS:
1. Get a USB device (flash drive, mouse, keyboard, etc.)
2. Test each USB port on the laptop:
   - Insert the USB device
   - Wait a few seconds
   - Check if Windows recognizes it (you'll hear a sound, see a notification)
   - For flash drives: Check File Explorer - the drive should appear
   - For mice/keyboards: Verify they work immediately
3. Test both USB-A and USB-C ports if available
4. Try removing and reinserting to verify ports are stable

TEST AUDIO PORTS (if available):
1. Plug in headphones or speakers to the audio jack
2. Play a video or music
3. Verify audio plays through the connected device
4. Adjust volume using volume buttons or Windows volume control

CHECK DEVICE MANAGER:
1. Press Windows key + X
2. Click "Device Manager" from the menu
3. Review all device categories:
   - Look for any devices with yellow warning triangles (⚠) or red X marks
   - These indicate driver problems
4. Expand each category and check:
   - Display adapters - Should show your graphics card
   - Network adapters - Should show Wi-Fi and Ethernet adapters
   - Audio inputs and outputs - Should show audio devices
   - Cameras - Should show webcam
   - Human Interface Devices - Should show keyboard, mouse, touchpad
   - Universal Serial Bus controllers - Should show USB controllers
5. If you see any problems:
   - Right-click the device → "Update driver"
   - Or "Uninstall device" then restart (Windows will reinstall)
   - Or check manufacturer website for drivers

VERIFY ALL HARDWARE WORKS:
1. Test keyboard: Open Notepad and type - all keys should work
2. Test touchpad/mouse: Move cursor, click, right-click, scroll
3. Test screen brightness: Use function keys to adjust brightness
4. Test function keys: Volume up/down, brightness, etc.
5. Check battery: Click battery icon in system tray - should show charge percentage
6. Test charging: Plug in charger - battery icon should show "plugged in"`,
    estimatedTime: '5-10 minutes'
  },
  {
    id: 'optional-enhancements',
    title: 'Optional Enhancements',
    shortDescription: 'Quality-of-life tools and accessories.',
    whyItMatters: 'Improves comfort and productivity.',
    skipAllowed: true,
    skipWhen: 'Strict minimal deployment',
    detailedInstructions: `ENABLE DARK MODE:
1. Press Windows key + I to open Settings
2. Click "Personalization" → "Colors" (or search "Dark mode")
3. Under "Choose your mode", select "Dark"
   - This changes Windows interface to dark theme
4. Under "Choose your app mode", select "Dark" (optional)
   - This makes apps use dark theme when available
5. Changes take effect immediately

ENABLE NIGHT LIGHT:
1. In Settings → "System" → "Display" (or search "Night light")
2. Scroll down to "Brightness & color" section
3. Toggle "Night light" to ON
4. Click "Night light settings" to customize:
   - Set "Schedule" to "Sunset to sunrise" (automatic) OR "Set hours" (manual)
   - Adjust "Color temperature at night" slider (warmer = less blue light)
5. Night light will automatically reduce blue light in the evening

ENABLE CLIPBOARD HISTORY:
1. Press Windows key + V (this opens clipboard history)
2. If prompted, click "Turn on" to enable clipboard history
3. Now you can:
   - Copy multiple items (text, images)
   - Press Windows key + V to see clipboard history
   - Click any item to paste it
4. To manage clipboard:
   - Press Windows key + I → "System" → "Clipboard"
   - Toggle "Clipboard history" to ON/OFF
   - Toggle "Sync across devices" if you want clipboard synced to other Windows devices
   - Click "Clear" to clear clipboard data

ADDITIONAL ENHANCEMENTS:

ENABLE SNAP LAYOUTS (Window Management):
1. Hover over the maximize button (square icon) in any window
2. You'll see layout options appear
3. Click a layout to snap windows automatically
4. To customize: Settings → "System" → "Multitasking" → "Snap windows"

ENABLE VIRTUAL DESKTOPS:
1. Press Windows key + Tab to open Task View
2. Click "New desktop" button (top left)
3. Switch between desktops: Windows key + Ctrl + Left/Right arrow
4. Useful for organizing different work sessions

ENABLE FOCUS ASSIST (Do Not Disturb):
1. Settings → "System" → "Focus assist"
2. Choose when to enable:
   - "Off" - Always show notifications
   - "Priority only" - Show only priority notifications
   - "Alarms only" - Show only alarms
3. Click "Automatic rules" to set schedules

CUSTOMIZE START MENU:
1. Right-click Start button → "Settings"
2. Or: Settings → "Personalization" → "Start"
3. Customize:
   - Toggle "Show recently added apps"
   - Toggle "Show most used apps"
   - Toggle "Show recently opened items"
   - Choose folders to show in Start menu

GADGETS RECOMMENDATIONS:
Consider installing these useful tools:
- Rainmeter (desktop customization): https://www.rainmeter.net/
- Fences (desktop organization): https://www.stardock.com/products/fences/
- ShareX (screenshot tool): https://getsharex.com/
- QuickLook (preview files): https://www.microsoft.com/store/productId/9NV4BS3L1H4S`,
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

