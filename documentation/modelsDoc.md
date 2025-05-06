# Natours API Models Documentation

## Table of Contents

- [Overview](#overview)
- [Database Schema](#database-schema)
- [Models](#models)
  - [User Model](#user-model)
  - [Tour Model](#tour-model)
  - [Review Model](#review-model)
  - [Booking Model](#booking-model)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Middleware & Hooks](#middleware--hooks)
- [Validation](#validation)

## Overview

This document provides detailed information about the database models used in the Natours tourism platform. The application uses MongoDB as its database with Mongoose as the ODM (Object Document Mapper).

## Database Schema

The database schema follows a relational structure using MongoDB's document references:

```
┌─────────────┐      ┌──────────────┐
│    User     │◄─────┤    Review    │─────►┌──────────┐
└─────────────┘      └──────────────┘      │   Tour   │
       ▲                    ▲              └──────────┘
       │                    │                   ▲
       │                    │                   │
       │                    └───────────────────┘
       │                                        │
┌─────────────┐                                 │
│   Booking   │─────────────────────────────────┘
└─────────────┘
```

## Models

### User Model

Represents users in the tourism platform, including regular users, guides, lead guides, and administrators.

#### Schema Definition

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  changePasswordAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
```

#### Fields

| Field                | Type    | Description                     | Validation                                     |
| -------------------- | ------- | ------------------------------- | ---------------------------------------------- |
| name                 | String  | User's full name                | Required                                       |
| email                | String  | User's email address            | Required, unique, validated using validator.js |
| photo                | String  | Profile photo filename          | Default: 'default.jpg'                         |
| role                 | String  | User's role in the system       | Enum: user, guide, lead-guide, admin           |
| password             | String  | Encrypted password              | Required, min length: 8, not returned in queries |
| passwordConfirm      | String  | Password confirmation           | Required, must match password                  |
| changePasswordAt     | Date    | Password change timestamp       | Set automatically when password changes        |
| passwordResetToken   | String  | Token for password reset        | Generated when user requests password reset    |
| passwordResetExpires | Date    | Reset token expiration time     | 10 minutes after token generation              |
| active               | Boolean | Account status                  | Default: true, not returned in queries         |

#### Methods

| Method                  | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| correctPassword         | Compares candidate password with stored password          |
| changedPasswordAfter    | Checks if password was changed after a given timestamp    |
| createPasswordResetToken | Generates a password reset token                         |

### Tour Model

Represents tours offered by the platform.

#### Schema Definition

```javascript
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      maxlength: [40, 'A tour must have less or equal then 40 characters'],
      minlength: [10, 'A tour must have less or equal then 10 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: ['easy', 'medium', 'difficult'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below the regular price',
      },
    },
    summary: {
      type: String,
      trim: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have an cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
```

#### Fields

| Field           | Type               | Description                       | Validation                                    |
| --------------- | ------------------ | --------------------------------- | --------------------------------------------- |
| name            | String             | Tour name                         | Required, unique, min: 10, max: 40 chars      |
| slug            | String             | URL-friendly name                 | Generated automatically from name             |
| duration        | Number             | Tour duration in days             | Required                                      |
| maxGroupSize    | Number             | Maximum participants              | Required                                      |
| difficulty      | String             | Tour difficulty level             | Required, enum: easy, medium, difficult       |
| ratingsAverage  | Number             | Average tour rating               | Default: 4.5, min: 1, max: 5                  |
| ratingsQuantity | Number             | Number of ratings                 | Default: 0                                    |
| price           | Number             | Tour price                        | Required                                      |
| priceDiscount   | Number             | Discounted price                  | Must be less than regular price               |
| summary         | String             | Brief tour description            | Required, whitespace trimmed                  |
| description     | String             | Detailed tour description         | Whitespace trimmed                            |
| imageCover      | String             | Main image filename               | Required                                      |
| images          | [String]           | Additional image filenames        | Optional                                      |
| createdAt       | Date               | Tour creation timestamp           | Default: current date, excluded from results  |
| startDates      | [Date]             | Available tour dates              | Optional                                      |
| secretTour      | Boolean            | Hidden from regular searches      | Default: false                                |
| startLocation   | GeoJSON Point      | Tour starting location            | Contains type, coordinates, address, description |
| locations       | [GeoJSON Point]    | Tour stops/waypoints              | Contains type, coordinates, address, description, day |
| guides          | [ObjectId]         | Tour guides                       | References to User model                      |

#### Virtual Fields

| Field          | Type     | Description                        |
| -------------- | -------- | ---------------------------------- |
| durationWeeks  | Number   | Tour duration in weeks             |
| reviews        | [Review] | Reviews associated with the tour   |

### Review Model

Represents reviews submitted by users for tours.

#### Schema Definition

```javascript
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
```

#### Fields

| Field      | Type       | Description                | Validation                               |
| ---------- | ---------- | -------------------------- | ---------------------------------------- |
| review     | String     | Review text                | Required                                 |
| rating     | Number     | Rating given by user       | Range: 1-5                               |
| createdAt  | Date       | Review creation timestamp  | Default: current date                    |
| user       | ObjectId   | User who wrote the review  | Required, references User model          |
| tour       | ObjectId   | Tour being reviewed        | Required, references Tour model          |

#### Static Methods

| Method             | Description                                               |
| ------------------ | --------------------------------------------------------- |
| calcAverageRatings | Calculates and updates average ratings for a tour         |

### Booking Model

Represents tour bookings made by users.

#### Schema Definition

```javascript
const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  price: {
    type: Number,
    required: [true, 'Booking musthave a Price!'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});
```

#### Fields

| Field      | Type       | Description               | Validation                              |
| ---------- | ---------- | ------------------------- | --------------------------------------- |
| tour       | ObjectId   | Booked tour               | Required, references Tour model         |
| user       | ObjectId   | User making booking       | Required, references User model         |
| price      | Number     | Price paid for booking    | Required                                |
| createdAt  | Date       | Booking timestamp         | Default: current date                   |
| paid       | Boolean    | Payment status            | Default: true                           |

## Relationships

- **User to Review**: One-to-Many (A user can write multiple reviews)
- **Tour to Review**: One-to-Many (A tour can have multiple reviews)
- **User to Booking**: One-to-Many (A user can make multiple bookings)
- **Tour to Booking**: One-to-Many (A tour can be booked multiple times)
- **User to Tour**: Many-to-Many via guides field (Users with guide roles can lead multiple tours)

## Indexes

The models use various indexes to improve query performance:

- **Tour**: Compound index on price (ascending) and ratingsAverage (descending)
- **Tour**: Geospatial index on startLocation
- **Review**: Compound unique index on tour and user to prevent duplicate reviews

## Middleware & Hooks

### User Model

- **Pre-save**: Updates changePasswordAt timestamp when password changes
- **Pre-save**: Hashes password and removes passwordConfirm field
- **Pre-find**: Excludes inactive users from query results

### Tour Model

- **Pre-save**: Creates a slug from the tour name
- **Pre-find**: Excludes secret tours from query results
- **Pre-find**: Populates tour guides information

### Review Model

- **Pre-find**: Populates user information
- **Post-save**: Recalculates and updates tour ratings
- **Pre-findOneAnd**: Stores current document for post processing
- **Post-findOneAnd**: Recalculates and updates tour ratings

### Booking Model

- **Pre-find**: Populates user and tour information

## Validation

Validation is implemented at multiple levels:

1. **Schema-level validation**: Using Mongoose schema validators
   - Field requirements (required: true)
   - String length limits (minlength, maxlength)
   - Number ranges (min, max)
   - Custom validators (e.g., password confirmation)

2. **External validation libraries**:
   - validator.js for email validation

3. **Custom validation functions**:
   - Price discount validation in Tour model
   - Password confirmation in User model

This multi-layered approach ensures data integrity throughout the application.