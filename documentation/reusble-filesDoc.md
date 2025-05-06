# Project Reusable Components Documentation

## Table of Contents

* [Overview](#overview)
* [Core Components](#core-components)
  * [File Upload & Processing](#file-upload--processing)
  * [CRUD Factory Handlers](#crud-factory-handlers)
  * [Error Handling](#error-handling)
  * [API Response](#api-response)
  * [API Features](#api-features)
  * [Email Service](#email-service)
* [Usage Examples](#usage-examples)
* [Best Practices](#best-practices)

## Overview

This documentation describes the reusable components in your Node.js project. These components handle common functionality including file uploads, database operations, error handling, API responses, query features, and email services.

## Core Components

### File Upload & Processing

**Location**: `utils/fileUpload.js`

**Purpose**: Handles file uploads and image processing using multer and sharp.

#### Features:
- Memory storage for uploaded files
- Image type validation
- Support for single and multiple file uploads
- Image resizing and format conversion
- Automatic filename generation

#### Configuration Options:
- `multerStorage`: Memory storage configuration
- `multerFilter`: Validates only image files
- `upload`: Multer instance with storage and filter

#### Methods:
1. **uploadTourImages**
   - Handles multiple image uploads for tours
   - Fields: `imageCover` (1 file) and `images` (up to 3 files)

2. **resizeTourImages**
   - Processes tour images:
     - Cover image: 2000x1333, JPEG, 90% quality
     - Gallery images: same specs with sequential numbering

3. **uploadUserPhoto**
   - Handles single photo upload for users

4. **resizeUserPhoto**
   - Processes user photos: 500x500, JPEG, 90% quality

### CRUD Factory Handlers

**Location**: `utils/handlerFactory.js`

**Purpose**: Provides reusable CRUD operation handlers.

#### Methods:
1. **deleteOne(Model)**
   - Deletes document by ID
   - Returns 204 on success

2. **updateOne(Model)**
   - Updates document by ID
   - Returns updated document

3. **createOne(Model)**
   - Creates new document
   - Returns created document

4. **getOne(Model, populateOpt)**
   - Gets single document by ID
   - Supports document population

### Error Handling

**Location**: `utils/appError.js`

**Purpose**: Custom error class for operational errors.

#### Features:
- Extends native Error class
- Automatic status code classification (4xx = fail, 5xx = error)
- Operational flag for error handling
- Stack trace capture

### API Response

**Location**: `utils/apiResponse.js`

**Purpose**: Standardizes API responses.

#### Methods:
1. **success(res, data, statusCode, message, additionalData)**
   - Standard success response

2. **fail(res, data, message)**
   - Client error response (400)

3. **error(res, message, data)**
   - Server error response (500)

### API Features

**Location**: `utils/apiFeatures.js`

**Purpose**: Enhances MongoDB queries with filtering, sorting, pagination, etc.

#### Methods:
1. **filter()**
   - Processes query parameters
   - Supports MongoDB operators (gte, gt, lte, lt)

2. **sort()**
   - Handles sorting (default: -createdAt _id)

3. **limitFields()**
   - Controls field selection

4. **pagination()**
   - Implements pagination (default: page 1, limit 100)

5. **search()**
   - Basic text search on name and description fields

### Email Service

**Location**: `utils/email.js`

**Purpose**: Handles email sending with template support.

#### Features:
- Pug template rendering
- Development and production transports
- HTML to text conversion

#### Methods:
1. **sendWelcome()**
   - Sends welcome email

2. **sendPasswordReset()**
   - Sends password reset email

## Usage Examples

### File Upload in Routes
```javascript
router.post(
  '/tours/:id/images',
  uploadTourImages,
  resizeTourImages,
  updateTour
);

router.patch(
  '/users/updateMe',
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe
);
```

### Factory Handlers
```javascript
router.delete('/tours/:id', deleteOne(Tour));
router.patch('/tours/:id', updateOne(Tour));
router.post('/tours', createOne(Tour));
router.get('/tours/:id', getOne(Tour, 'reviews'));
```

### API Features
```javascript
const features = new APIFeatures(Tour.find(), req.query)
  .filter()
  .sort()
  .limitFields()
  .pagination()
  .search();

const tours = await features.query;
```

### Email Service
```javascript
const email = new Email(user, resetUrl);
await email.sendPasswordReset();
```

## Best Practices

1. **File Uploads**:
   - Always validate file types
   - Process images in memory for better performance
   - Use consistent naming conventions

2. **Error Handling**:
   - Use AppError for all operational errors
   - Distinguish between client and server errors

3. **API Responses**:
   - Maintain consistent response format
   - Use appropriate HTTP status codes

4. **Factory Handlers**:
   - Use for standard CRUD operations
   - Write custom controllers for complex logic

5. **Query Building**:
   - Use APIFeatures for complex queries
   - Implement proper pagination

6. **Email Service**:
   - Use templates for consistent emails
   - Implement both HTML and text versions
   - Handle email sending errors gracefully