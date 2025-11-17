# CardDemo Admin Frontend

A comprehensive administrative frontend for the CardDemo mainframe credit card processing system. This modern web application provides full administrative capabilities for managing all entities in the CardDemo system.

## Overview

This admin frontend is built based on the CardDemo Entity-Relationship Diagram (ERD) and provides complete CRUD operations for all system entities. It's designed to modernize the mainframe COBOL/CICS/VSAM system with a contemporary web interface.

## Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite 7
- **Routing:** React Router v6
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Mock Data:** In-memory API service layer

## Features

### Core Management Modules

1. **User Management**
   - View all system users (administrators, customer service, supervisors)
   - Track user login history and account status
   - Manage user roles and permissions
   - Location: `/users`

2. **Customer Management**
   - Complete customer profile management
   - View customer information (name, contact, address)
   - Track credit ratings and account history
   - Location: `/customers`

3. **Account Management**
   - Manage credit and debit accounts
   - View account balances, credit limits, and available credit
   - Monitor account status (Active/Closed/Suspended)
   - Track past due amounts and days past due
   - Location: `/accounts`

4. **Card Management**
   - Issue and manage credit/debit cards
   - Support for Visa, Mastercard, Amex, and Discover
   - Card blocking and status management
   - Track card expiration and usage
   - Location: `/cards`

### Operations

5. **Transaction Management**
   - View all transactions with filtering capabilities
   - Filter by status (Posted/Pending/Declined)
   - Search by transaction ID, account, or merchant
   - Export transaction data
   - Location: `/transactions`

### Reference Data

6. **Disclosure Groups**
   - Manage terms and conditions groups
   - Edit disclosure text and legal terms
   - Associate accounts with disclosure groups
   - Location: `/disclosure-groups`

7. **Transaction Types**
   - Manage transaction type codes
   - Define debit/credit indicators
   - Set default categories for transaction types
   - Location: `/transaction-types`

8. **Transaction Categories**
   - Organize categories by group (Shopping, Food & Drink, Travel, etc.)
   - Manage category codes and descriptions
   - Location: `/transaction-categories`

### Analytics

9. **Reports & Analytics**
   - View category balance summaries
   - Analyze transaction patterns
   - Monitor account balances by category
   - Track min/max/average transaction amounts
   - Location: `/reports`

10. **Dashboard**
    - System-wide statistics and metrics
    - Quick action buttons
    - Active accounts and pending transactions overview
    - Total balance and transaction summaries
    - Location: `/`

## Data Model

The application manages the following entities based on the CardDemo ERD:

- **USER** - System administrators and employees
- **CUSTOMER** - Credit card customers
- **ACCOUNT** - Customer accounts with credit limits
- **CARD** - Physical/virtual cards linked to accounts
- **CARDXREF** - Card cross-reference for quick lookups
- **TRANSACTION** - All financial transactions
- **DISCGRP** - Disclosure groups for terms & conditions
- **TRANTYPE** - Transaction type reference data
- **TRANCATG** - Transaction category reference data
- **TCATBALF** - Category balance aggregations

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview Production Build

```bash
# Preview the production build
npm run preview
```

## Project Structure

```
admin-frontend/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Header.tsx       # Top navigation header
│   │       ├── Sidebar.tsx      # Left sidebar navigation
│   │       └── Layout.tsx       # Main layout wrapper
│   ├── pages/
│   │   ├── Dashboard.tsx        # Dashboard overview
│   │   ├── Users.tsx            # User management
│   │   ├── Customers.tsx        # Customer management
│   │   ├── Accounts.tsx         # Account management
│   │   ├── Cards.tsx            # Card management
│   │   ├── Transactions.tsx     # Transaction viewer
│   │   ├── DisclosureGroups.tsx # Disclosure groups
│   │   ├── TransactionTypes.tsx # Transaction types
│   │   ├── TransactionCategories.tsx # Transaction categories
│   │   └── Reports.tsx          # Analytics and reports
│   ├── services/
│   │   ├── api.ts              # API service layer
│   │   └── mockData.ts         # Mock data for development
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── postcss.config.js         # PostCSS configuration
```

## API Integration

The application currently uses a mock API service layer (`src/services/api.ts`) that simulates backend operations with in-memory data. To integrate with a real backend:

1. Update the API service to make HTTP requests to your backend endpoints
2. Replace mock data with actual API calls
3. Add authentication/authorization headers
4. Implement error handling and loading states

Example integration:

```typescript
// Replace mockData import with actual API calls
async getAll(): Promise<T[]> {
  const response = await fetch('/api/users');
  return response.json();
}
```

## Future Enhancements

- [ ] Add authentication and authorization
- [ ] Implement real-time updates via WebSockets
- [ ] Add data export functionality (CSV, Excel, PDF)
- [ ] Implement advanced filtering and sorting
- [ ] Add data visualization charts
- [ ] Implement form validation
- [ ] Add batch operations
- [ ] Implement audit logging
- [ ] Add multi-language support
- [ ] Implement dark mode theme

## Mainframe Integration

This frontend is designed to integrate with the CardDemo mainframe system:

- **Current Backend:** COBOL programs running on CICS with VSAM files
- **Integration Path:** Create REST API middleware to bridge mainframe and web
- **Suggested Approach:**
  - Use IBM z/OS Connect or similar to expose COBOL programs as REST APIs
  - Implement an API gateway for security and rate limiting
  - Add caching layer for frequently accessed data

## License

This project is part of the CardDemo modernization initiative.

## Related Documentation

- [CardDemo ERD](../CARDDEMO_ERD.md) - Complete data model documentation
- [CardDemo Architecture](../CARDDEMO_ARCHITECTURE.md) - System architecture overview
