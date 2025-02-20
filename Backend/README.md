# User and Captain Authentication API Documentation

## User Authentication API

### 1. Register User

**Description:**
This endpoint allows new users to create an account by providing their full name, email, and password. Upon successful registration, the API returns a unique authentication token and user details.

**Response Body:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Example Usage:**
To register a user, send a `POST` request to `/users/register` with the required user details in the request body.

---

### 2. Login User

**Description:**
This endpoint enables registered users to log in using their email and password. If authenticated successfully, the API returns a unique authentication token along with user details.

**Response Body:**

```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Example Usage:**
To log in, send a `POST` request to `/users/login` with valid email and password.

---

### 3. Get User Profile

**Description:**
This endpoint retrieves the profile details of an authenticated user. A valid authorization token must be included in the request header to access this information.

**Response Body:**

```json
{
  "_id": "user_id_here",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

**Example Usage:**
To get user profile details, send a `GET` request to `/users/profile` with a valid authorization token.

---

### 4. Logout User

**Description:**
This endpoint allows a logged-in user to log out by invalidating their authentication token. A valid token must be provided in the request header.

**Response Body:**

```json
{
  "message": "Logged out"
}
```

**Example Usage:**
To log out, send a `POST` request to `/users/logout` with a valid authorization token.

---

## Captain Authentication API

### 1. Register Captain

**Description:**
This endpoint allows captains (drivers) to create an account by providing their full name, email, password, and vehicle details. Upon successful registration, the API returns an authentication token and the captain's details, including vehicle information.

**Response Body:**

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

**Example Usage:**
To register a captain, send a `POST` request to `/captains/register` with the required details.

---

### 2. Login Captain

**Description:**
This endpoint allows registered captains to log in using their email and password. Upon successful authentication, a unique authentication token is returned along with captain details.

**Response Body:**

```json
{
  "token": "jwt_token_here",
  "captain": {
    "_id": "captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com"
  }
}
```

**Example Usage:**
To log in as a captain, send a `POST` request to `/captains/login` with valid credentials.

---

### 3. Logout Captain

**Description:**
This endpoint enables a logged-in captain to log out, invalidating their authentication token. A valid token must be included in the request header.

**Response Body:**

```json
{
  "message": "Logged out"
}
```

**Example Usage:**
To log out as a captain, send a `POST` request to `/captains/logout` with a valid authorization token.

---

## Authentication and Security

- All API endpoints requiring authentication must include a valid JWT token in the `Authorization` header.
- Passwords are securely stored using encryption techniques.
- Access to user and captain profiles is restricted to authenticated users only.

---

## Additional Notes

- The API follows RESTful principles to ensure efficient and scalable communication.
- Error handling includes appropriate HTTP status codes and descriptive messages.
- Data validation is enforced to ensure security and consistency in user input.
