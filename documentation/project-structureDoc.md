# Natours API Project Structure Documentation

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Core Components](#core-components)
  - [Controllers](#controllers)
  - [Models](#models)
  - [Routes](#routes)
  - [Views](#views)
  - [Utils](#utils)
- [Static Assets](#static-assets)
- [Development Data](#development-data)
- [Documentation](#documentation)

## Overview

This document provides a comprehensive overview of the Natours API project structure. The application follows the MVC (Model-View-Controller) architectural pattern, with clear separation of concerns between data models, business logic, and presentation layers.

## Directory Structure

```
Natours/
├── controllers/                 # Request handlers for different resources
├── dev-data/                    # Development data resources
│   ├── data/                    # Sample data for development
│   ├── img/                     # Development images
│   └── templates/               # Development templates
├── documentation/               # Project documentation files
│   └── modelsDoc.md             # Documentation for database models
├── models/                      # Database models
│   ├── userModel.js             # User model definition
│   ├── tourModel.js             # Tour model definition
│   ├── reviewModel.js           # Review model definition
│   └── bookingModel.js          # Booking model definition
├── node_modules/                # Third-party dependencies
├── public/                      # Static assets
│   ├── css/                     # CSS stylesheets
│   ├── img/                     # Image resources
│   └── js/                      # Client-side JavaScript
├── routes/                      # API route definitions
├── utils/                       # Utility functions and helpers
├── views/                       # Pug templates for server-side rendering
│   ├── email/                   # Email templates
│   └── *.pug                    # Page templates
└── .env                         # Environment configuration file
```

## Core Components

### Controllers

Controllers handle incoming requests, interact with models, and send responses. Each controller is responsible for a specific resource or view.

| File Name             | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| bookingController.js  | Handles booking creation, retrieval, updates, and deletion |
| errorController.js    | Manages error handling and error responses                 |
| reviewController.js   | Manages tour reviews                                       |
| tourController.js     | Handles tour-related operations                            |
| userController.js     | Manages user accounts and authentication                   |
| viewController.js     | Renders server-side templates                              |

### Models

Models define the data structure and business logic for application entities.

| File Name        | Description                                        |
| ---------------- | -------------------------------------------------- |
| userModel.js     | User account data structure and methods            |
| tourModel.js     | Tour package data structure and methods            |
| reviewModel.js   | Tour reviews data structure and methods            |
| bookingModel.js  | Tour booking data structure and methods            |

### Routes

Routes define the API endpoints and map them to controller functions.

| Route Type      | Description                                       |
| --------------- | ------------------------------------------------- |
| Tour routes     | Endpoints for tour operations                     |
| User routes     | Endpoints for user management and authentication  |
| Review routes   | Endpoints for tour reviews                        |
| Booking routes  | Endpoints for tour bookings                       |
| View routes     | Endpoints for rendered views                      |

### Views

Views are Pug templates that render HTML for the client. The application uses server-side rendering for dynamic content.

| File Name         | Description                                          |
| ----------------- | ---------------------------------------------------- |
| _footer.pug       | Footer partial included in multiple pages            |
| _header.pug       | Header partial included in multiple pages            |
| _reviewCard.pug   | Reusable component for displaying reviews            |
| account.pug       | User account management page                         |
| base.pug          | Base template with common structure                  |
| error.pug         | Error display page                                   |
| login.pug         | User login page                                      |
| overview.pug      | Tours overview page                                  |
| tour.pug          | Individual tour details page                         |

#### Email Templates

The `views/email/` directory contains templates for transactional emails sent by the application.

### Utils

Utility functions and helpers that support the application's core functionality.

| File Name          | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| api-features.js    | Implements API features like filtering, sorting, pagination |
| api-response.js    | Standardized API response formatting                        |
| appError.js        | Custom error handling class                                 |
| catchAsync.js      | Async error handling wrapper                                |
| email.js           | Email sending functionality                                 |
| handleFactory.js   | Factory functions for CRUD operations                       |
| multer.js          | File upload handling                                        |

## Static Assets

The `public/` directory contains static assets served directly to clients.

| Directory | Description                        |
| --------- | ---------------------------------- |
| css/      | CSS stylesheets                    |
| img/      | Images for UI elements             |
| js/       | Client-side JavaScript             |

## Development Data

The `dev-data/` directory contains resources used during development and testing.

| Directory  | Description                        |
| ---------- | ---------------------------------- |
| data/      | Sample data for development        |
| img/       | Development images                 |
| templates/ | Development templates              |

## Documentation

The `documentation/` directory contains project documentation files.

| File Name      | Description                                |
| -------------- | ------------------------------------------ |
| modelsDoc.md   | Documentation for database models          |