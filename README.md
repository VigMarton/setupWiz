# Setup Wizard

A lightweight, personal-use web application setup wizard for Windows laptop provisioning. This wizard guides you through the essential steps of setting up a refurbished or new Windows laptop, from system checks to software installation.

## Features

- **18-step guided setup process** covering system checks, updates, security, software installation, and more
- **Skip logic** with explicit confirmation for optional steps
- **Progress tracking** with visual status indicators
- **Local storage persistence** - your progress is saved automatically
- **Clean, simple UI** optimized for personal use

## Project Structure

The step content and philosophy are defined in [`project-info/overview.md`](project-info/overview.md). This file contains the detailed breakdown of each step, including:
- Step descriptions and purposes
- Skip conditions
- Detailed instructions
- UX guidelines

## Getting Started

### Prerequisites

- Node.js (version 14.18+ or 16+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VigMarton/setupWiz.git
   cd setupWiz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open the provided local URL in your browser (typically `http://localhost:5173`).

### Build

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment to GitHub Pages

This project is configured for GitHub Pages deployment.

### Option 1: Using npm script

1. Install `gh-pages` (already included in devDependencies):
   ```bash
   npm install
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

This will build the project and push it to the `gh-pages` branch.

3. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select the `gh-pages` branch
   - Your app will be available at `https://vigmarton.github.io/setupWiz/`

### Option 2: Manual deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder contents to the `gh-pages` branch manually.

## Project Structure

```
setupWiz/
├── src/
│   ├── components/       # Reusable components
│   │   ├── StepSidebar.tsx
│   │   └── SummaryStep.tsx
│   ├── steps/            # Step-specific components
│   │   └── StepScreen.tsx
│   ├── data/             # Step data and types
│   │   └── steps.ts
│   ├── App.tsx          # Main application component
│   ├── main.tsx          # Entry point
│   ├── App.css           # Application styles
│   └── index.css         # Global styles
├── project-info/
│   └── overview.md       # Step definitions and UX guidelines
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Usage

1. Start the wizard by running `npm run dev`
2. Navigate through steps using the sidebar or Next/Back buttons
3. For each step:
   - Read the description and instructions
   - Complete the step manually on your Windows machine
   - Check "I have completed this step" when done
   - Or skip optional steps (with confirmation)
4. Review the completion summary at the end

## Notes

- This is a **personal-use tool** - no authentication, backend, or multi-user features
- Progress is saved to browser localStorage automatically
- The wizard does not perform actions automatically - it guides you through manual steps
- All step content can be customized by editing `src/data/steps.ts`

## License

Personal use only.

