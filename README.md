# Mileage Tracker

A modern web application for tracking vehicle mileage and associated costs across a fleet of vehicles. Built with React, TypeScript, and Google Sheets as a backend.

## Features

- 🚗 Comprehensive vehicle management
- 📊 Mileage tracking and reporting
- 📱 Responsive, mobile-first design
- 🌙 Dark/light mode support
- 📈 Analytics and cost projections
- 🔐 Secure Google account integration
- 📑 Google Sheets integration for data storage

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - TailwindCSS
  - React Query
  - React Router
  - React Hook Form + Zod
  - Recharts

- **Backend:**
  - Google Sheets API
  - Google OAuth 2.0

## Prerequisites

Before you begin, ensure you have:

1. Node.js (v18 or higher)
2. npm or yarn
3. A Google Cloud Platform account
4. Google Sheets API enabled
5. OAuth 2.0 credentials configured

## Setup

### 1. Google Cloud Setup

1. Create a new project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the following APIs:
   - Google Sheets API
   - Google Drive API
3. Create OAuth 2.0 credentials:
   - Configure the OAuth consent screen
   - Create Web application credentials
   - Add authorized JavaScript origins and redirect URIs

### 2. Google Sheets Setup

1. Create a new Google Sheet
2. Set up the following sheets:
   - Vehicles
   - MileageEntries
   - MonthlyTransfers

### 3. Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/[username]/mileage-tracker.git
   cd mileage-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```

3. Create environment files:
   ```bash
   cp .env.example .env
   cd client
   cp .env.example .env.local
   ```

4. Configure environment variables:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id
   VITE_GOOGLE_SHEETS_ID=your-sheet-id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
mileage-tracker/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API and service layer
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   └── public/
└── docs/                 # Documentation
```

## Features in Detail

### Vehicle Management
- Add/edit vehicles
- Track status (active/inactive)
- Monitor current mileage
- Set cost per mile

### Mileage Entry
- Quick entry form
- Validation against previous entries
- Notes and date tracking
- Batch entry support

### Reporting
- Monthly summaries
- Vehicle breakdown
- Cost analysis
- Interactive charts
- Export capabilities

### Authentication
- Google account integration
- Role-based access
- Secure data access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or issues:
1. Check the [documentation](docs/)
2. Open an issue
3. Contact the maintainers