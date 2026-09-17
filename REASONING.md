# Reasoning

## Project Overview

This project is a tiffin subscription management system designed primarily for the tiffin owner.

The owner can:
- Register and log in
- Add and manage customers
- Create subscriptions
- Pause and resume subscriptions
- Search customers
- View customer subscription details
- View prorated bills based on actual weekday service days

Customers do not need to create accounts or log in.

## Technology Choices

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication

### Frontend
- React
- Vite
- Axios
- React Router

## Database Design

The application uses separate collections for:
- Owners
- Customers
- Subscriptions

Customers are associated with an owner using `ownerId`.

Subscriptions are associated with customers using `customerId`.

Pause periods are stored inside the subscription because they are directly related to that subscription.

## Billing Approach

The bill is calculated dynamically rather than storing a final bill amount.

The calculation considers:
1. Number of weekdays in the billing month
2. Subscription start date
3. Paused weekdays
4. Actual weekdays on which service was delivered
5. Monthly subscription price

The daily rate is calculated from the monthly plan price and the number of eligible weekdays in the billing month.

The final bill is based on the number of weekdays for which service was actually provided.

## Development Approach

The project is being developed incrementally.

Each major backend feature is tested before moving to the next feature. This helps identify database, API, authentication, and business-logic issues early.