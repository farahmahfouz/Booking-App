# Natours API Documentation

## Table of Contents
- [Introduction](#introduction)
- [API Response Format](#api-response-format)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [File Upload](#file-upload)
- [API Endpoints](#api-endpoints)
  - [Tours](#tours)
  - [Users](#users)
  - [Reviews](#reviews)
  - [Bookings](#bookings)
- [Query Parameters](#query-parameters)
  - [Filtering](#filtering)
  - [Sorting](#sorting)
  - [Pagination](#pagination)
  - [Field Limiting](#field-limiting)
  - [Search](#search)
- [Factory Handler Pattern](#factory-handler-pattern)

## Introduction
This documentation provides details about the RESTful API for the Natours tourism platform. The API follows a structured approach with standardized responses and error handling for managing tours, bookings, reviews, and users.

## API Response Format
All API responses follow a consistent format for predictable response handling:

### Success Response
```json
{
  "status": "success",
  "results": 10,  // Only when returning multiple documents
  "data": { ... },
  "message": "Optional success message"
}
```

### Fail Response (Client Error)
```json
{
  "status": "fail",
  "data": {
    "message": "Error message"
    // or validation errors
  }
}
```

### Error Response (Server Error)
```json
{
  "status": "error",
  "message": "Error message",
  "data": { ... } // Optional additional error data (development mode only)
}
```

## Error Handling
The API uses a global error handling middleware that processes all errors and returns standardized responses. In development mode, detailed error information is provided, while in production mode, only essential error information is returned.

## Authentication
Authentication is required for certain endpoints. The API uses JSON Web Tokens (JWT) for authentication.

- **Login**: POST `/api/v1/users/login`
- **Signup**: POST `/api/v1/users/signup`
- **Forgot Password**: POST `/api/v1/users/forgotPassword`
- **Reset Password**: PATCH `/api/v1/users/resetPassword/:token`
- **Update Password**: PATCH `/api/v1/users/updateMyPassword`

## File Upload
The API supports file uploads for tour images and user photos using multer middleware. Images are processed using Sharp for resizing and optimization.

### Upload Options
- **Storage Types**: Disk storage or memory storage
- **File Types**: Only image files are allowed
- **Image Processing**: Resize, format conversion, and quality optimization

## API Endpoints

### Tours

| Method | Endpoint | Description | Access |
|--------|----------|------------|--------|
| GET | `/api/v1/tours` | Get all tours with pagination | Public |
| GET | `/api/v1/tours/:id` | Get a specific tour by ID | Public |
| GET | `/api/v1/tours/top-5-cheap` | Get top 5 cheap tours | Public |
| GET | `/api/v1/tours/tour-stats` | Get tour statistics | Public |
| GET | `/api/v1/tours/monthly-plan/:year` | Get monthly tour plan for a specific year | Protected |
| GET | `/api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit` | Get tours within radius | Public |
| GET | `/api/v1/tours/distances/:latlng/unit/:unit` | Get distances to all tours | Public |
| POST | `/api/v1/tours` | Create a new tour | Admin/Guide |
| PATCH | `/api/v1/tours/:id` | Update an existing tour | Admin/Guide |
| DELETE | `/api/v1/tours/:id` | Delete a tour | Admin |

#### Tour Object
```json
{
  "_id": "60f7b0b9e8b4a43b3c3f9b1a",
  "name": "The Forest Hiker",
  "slug": "the-forest-hiker",
  "duration": 5,
  "maxGroupSize": 25,
  "difficulty": "easy",
  "ratingsAverage": 4.7,
  "ratingsQuantity": 37,
  "price": 497,
  "priceDiscount": 99,
  "summary": "Breathtaking hike through the Canadian Banff National Park",
  "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "imageCover": "tour-1-cover.jpg",
  "images": ["tour-1-1.jpg", "tour-1-2.jpg", "tour-1-3.jpg"],
  "startDates": [
    "2021-04-25T09:00:00.000Z",
    "2021-07-20T09:00:00.000Z",
    "2021-10-05T09:00:00.000Z"
  ],
  "secretTour": false,
  "guides": [
    "5c8a21d02f8fb814b56fa189",
    "5c8a201e2f8fb814b56fa186"
  ],
  "startLocation": {
    "type": "Point",
    "coordinates": [-116.214531, 51.417611],
    "address": "224 Banff Ave, Banff, AB, Canada",
    "description": "Banff National Park"
  },
  "locations": [
    {
      "type": "Point",
      "coordinates": [-116.214531, 51.417611],
      "description": "Banff National Park",
      "day": 1
    },
    {
      "type": "Point",
      "coordinates": [-118.076152, 52.875223],
      "description": "Jasper National Park",
      "day": 3
    },
    {
      "type": "Point",
      "coordinates": [-117.490309, 51.261937],
      "description": "Glacier National Park",
      "day": 5
    }
  ],
  "createdAt": "2021-07-21T12:00:00.000Z",
  "updatedAt": "2021-07-21T12:00:00.000Z"
}
```

### Users

| Method | Endpoint | Description | Access |
|--------|----------|------------|--------|
| GET | `/api/v1/users` | Get all users | Admin |
| GET | `/api/v1/users/:id` | Get a specific user | Admin |
| GET | `/api/v1/users/me` | Get current user profile | Protected |
| PATCH | `/api/v1/users/updateMe` | Update current user data | Protected |
| DELETE | `/api/v1/users/deleteMe` | Deactivate current user account | Protected |
| PATCH | `/api/v1/users/:id` | Update a user | Admin |
| DELETE | `/api/v1/users/:id` | Delete a user | Admin |

#### User Object
```json
{
  "_id": "60f7b0b9e8b4a43b3c3f9b1b",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "photo": "user-15.jpg",
  "password": "[ENCRYPTED]",
  "passwordConfirm": "[ENCRYPTED]",
  "passwordChangedAt": "2021-07-21T12:00:00.000Z",
  "passwordResetToken": "60f7b0b9e8b4a43b3c3f9b1c",
  "passwordResetExpires": "2021-07-21T12:00:00.000Z",
  "active": true,
  "createdAt": "2021-07-21T12:00:00.000Z",
  "updatedAt": "2021-07-21T12:00:00.000Z"
}
```

### Reviews

| Method | Endpoint | Description | Access |
|--------|----------|------------|--------|
| GET | `/api/v1/reviews` | Get all reviews | Public |
| GET | `/api/v1/reviews/:id` | Get a specific review | Public |
| GET | `/api/v1/tours/:tourId/reviews` | Get all reviews for a specific tour | Public |
| POST | `/api/v1/tours/:tourId/reviews` | Create a review for a specific tour | Protected |
| PATCH | `/api/v1/reviews/:id` | Update a review | User/Admin |
| DELETE | `/api/v1/reviews/:id` | Delete a review | User/Admin |

#### Review Object
```json
{
  "_id": "60f7b0b9e8b4a43b3c3f9b1d",
  "review": "Amazing experience!",
  "rating": 5,
  "tour": "60f7b0b9e8b4a43b3c3f9b1a",
  "user": "60f7b0b9e8b4a43b3c3f9b1b",
  "createdAt": "2021-07-21T12:00:00.000Z",
  "updatedAt": "2021-07-21T12:00:00.000Z"
}
```

### Bookings

| Method | Endpoint | Description | Access |
|--------|----------|------------|--------|
| GET | `/api/v1/bookings` | Get all bookings | Admin/Guide |
| GET | `/api/v1/bookings/:id` | Get a specific booking | Admin/Guide |
| GET | `/api/v1/users/my-tours` | Get current user's bookings | Protected |
| POST | `/api/v1/bookings` | Create a new booking | Admin |
| POST | `/api/v1/bookings/checkout-session/:tourId` | Create checkout session | Protected |
| PATCH | `/api/v1/bookings/:id` | Update a booking | Admin |
| DELETE | `/api/v1/bookings/:id` | Delete a booking | Admin |

#### Booking Object
```json
{
  "_id": "60f7b0b9e8b4a43b3c3f9b1e",
  "tour": "60f7b0b9e8b4a43b3c3f9b1a",
  "user": "60f7b0b9e8b4a43b3c3f9b1b",
  "price": 497,
  "paid": true,
  "createdAt": "2021-07-21T12:00:00.000Z",
  "updatedAt": "2021-07-21T12:00:00.000Z"
}
```

## Query Parameters
The API supports various query parameters for filtering, sorting, pagination, field limiting, and search.

### Filtering
You can filter results using comparison operators:

```
/api/v1/tours?duration[gte]=5&price[lt]=1000&difficulty=easy
```

#### Supported operators:
* `[eq]`: Equal (default when no operator is specified)
* `[ne]`: Not equal
* `[gt]`: Greater than
* `[gte]`: Greater than or equal
* `[lt]`: Less than
* `[lte]`: Less than or equal
* `[in]`: In array (comma-separated values)

#### Examples:
1. Get tours with duration greater than or equal to 5 days:
```
/api/v1/tours?duration[gte]=5
```

2. Get tours with price less than 1000:
```
/api/v1/tours?price[lt]=1000
```

3. Get tours with rating greater than 4.5:
```
/api/v1/tours?ratingsAverage[gt]=4.5
```

4. Get tours with difficulty level set to easy:
```
/api/v1/tours?difficulty=easy
```

5. Combining multiple filters:
```
/api/v1/tours?price[gte]=500&price[lte]=2000&ratingsAverage[gte]=4.7
```

### Sorting
Sort results by one or more fields:

```
/api/v1/tours?sort=price,-ratingsAverage
```

* Use comma-separated fields for multiple sort criteria
* Prefix field with `-` for descending order

#### Examples:
1. Sort by price (ascending):
```
/api/v1/tours?sort=price
```

2. Sort by ratings average (descending):
```
/api/v1/tours?sort=-ratingsAverage
```

3. Sort by ratings (descending) and then by price (ascending):
```
/api/v1/tours?sort=-ratingsAverage,price
```

### Pagination
Control the number of results per page and the current page:

```
/api/v1/tours?page=2&limit=10
```

* `page`: Page number (default: 1)
* `limit`: Number of results per page (default: 10)

The response includes pagination metadata:

```json
{
  "status": "success",
  "results": 10,
  "data": { ... },
  "totalCount": 100,
  "totalPages": 10,
  "currentPage": 2
}
```

### Field Limiting
Select specific fields to include in the response:

```
/api/v1/tours?fields=name,duration,difficulty,price
```

* Use comma-separated field names
* Prefix field with `-` to exclude fields:

```
/api/v1/tours?fields=-createdAt,-__v
```

### Search
Search tours by name:

```
/api/v1/tours?search=Sea
```

This will return tours whose names contain the specified search term.

## Factory Handler Pattern
The API uses a factory handler pattern to create reusable CRUD operations across different controllers:

* `getOne`: Retrieve a single document by ID
* `getAll`: Retrieve multiple documents with filtering, sorting, and pagination 
* `createOne`: Create a new document
* `updateOne`: Update an existing document
* `deleteOne`: Delete a document by ID

This pattern ensures consistent behavior and reduces code duplication across different resource controllers (tours, users, reviews, and bookings).