# **Natours - Tours Booking Website**

**Natours** is a tours booking website built with the following technologies:
- **Node.js**: Runtime environment for executing JavaScript.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing and retrieving data.
- **Mongoose**: ODM for MongoDB, providing a schema-based solution to model data.
- **Pug**: Template engine for rendering HTML.

---

## **Features**
Natours offers a robust set of features, including:

### 1. **User Authentication and Authorization**
   - **Sign up**: Users can register for an account.
   - **Login**: Registered users can log in with email and password.
   - **Forgot and Reset Password**: Users can reset their passwords if forgotten.

### 2. **User Profile Management**
   - Users can manage their profiles and view bookings.

### 3. **Tour Booking and Management**
   - Users can book tours and manage bookings.
   - Admins can manage tour listings, including CRUD operations.

### 4. **Credit Card Payments with Stripe**
   - Secure payment integration using **Stripe** for tour bookings.

### 5. **CRUD Operations**
   - Perform Create, Read, Update, and Delete operations on the following models:
     - **Tours**: For managing available tours.
     - **Users**: For managing user data.
     - **Reviews**: For users to add reviews for tours.
     - **Bookings**: For managing bookings made by users.

### 6. **Advanced Data Querying**
   - **Aggregation Pipelines**: Used for complex data queries.
   - **Geospatial Queries**: Allows querying tours based on user location.

### 7. **API Features**
   - **Filtering**: Allows filtering data based on user preferences (e.g., tour duration, price).
   - **Sorting**: Enables sorting tours by various attributes (e.g., price, rating).
   - **Limiting Fields**: Limits the number of fields returned in responses.
   - **Pagination**: Enables fetching data in chunks.

### 8. **Error Handling**
   - Complex error handling mechanism for capturing and displaying errors.

### 9. **Email Handling**
   - Complex email handling system for sending confirmation, notification, and password reset emails.

### 10. **Maps Integration**
   - Maps are integrated to show tour locations.

### 11. **MVC Architecture**
   - The application follows the **Model-View-Controller (MVC)** architecture for better separation of concerns.

---

## **Technologies Used**
- **Node.js**: Backend JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **Pug**: Template engine for rendering views.

---

## **Getting Started**

To get started with the Natours project, follow these steps:

### 1. **Clone the repository**
```bash
git clone https://github.com/farahmahfouz/Booking-App.git
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up environment variables**
   - Configure environment variables like MongoDB URI, JWT secret, etc. You can use a `.env` file for this purpose.

### 4. **Run the server**
```bash
npm start
```

The server will start, and the application will be accessible at `http://localhost:3000`.

---

## **API Documentation**
For detailed documentation of the available API endpoints, refer to the following:

- **API Documentation**: [Postman API Documentation](https://documenter.getpostman.com/view/37612905/2sB2j7cp24)

This documentation covers:
- Authentication (login, signup, password reset)
- Tour CRUD operations
- User profile management
- Booking management
- Advanced data querying (filtering, sorting, pagination)
- Geospatial queries

---

## **Contributors**
- **Farah Mahfouz** (@farahmahfouz): Main contributor and developer.

---

## **License**
This project is part of **Jonas Schmedtmann's** course **"Node.js, Express, MongoDB & More: The Complete Bootcamp 2024"** on Udemy.

---

Let me know if you need any further adjustments!
