# Training Fox 🦊

A cute and clever running training plan generator with a fox-inspired theme.

## Features

- Generate personalized running training plans
- Real API backend for data processing
- Fox-themed workout representation
- Beautiful orange and black color scheme
- Visual workout distribution charts
- Weekly training summary statistics
- Responsive design for all devices

## Tech Stack

### Frontend
- React
- Material-UI
- Chart.js

### Backend
- Node.js
- Express
- CSV Parsing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/training-app.git
cd training-app
```

2. Install all dependencies (frontend and backend)
```bash
npm run install-all
```

3. Start the development server (frontend + backend)
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## App Structure

- `/server` - Backend Express API
- `/src` - Frontend React app
  - `/components` - UI components
  - `/utils` - Utility functions
  - `/data` - Training data

## API Endpoints

- `GET /api/training-schedules` - Get all training schedules
- `POST /api/generate-plan` - Generate a personalized training plan

## Usage

1. Fill in your details:
   - Age
   - Weight
   - Gender
   - Current weekly mileage

2. Click "Generate My Training Plan!"

3. View your personalized 7-day training schedule with cute visualizations

4. Click "Create a New Plan" to start over

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Training schedules are designed for recreational runners
- All emoji art is included within the app 