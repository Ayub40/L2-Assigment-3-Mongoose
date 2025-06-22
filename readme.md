# Library Management System API

A RESTful API for managing a library system, built using **Express.js**, **TypeScript**, **Mongoose**, and **MongoDB**.

---

## Features

- **Books Management**:
  - CRUD operations for books.
  - Automatic stock and availability updates.
  - Validation for genres, ISBN uniqueness, and stock levels.

- **Borrowing Management**:
  - Borrow books with dynamic stock deduction.
  - Availability status auto-updates based on stock.

- **Summary Reports**:
  - View borrowed books with total quantities using aggregation pipelines.

- **Error Handling**:
  - Comprehensive error responses for validation and system errors.

---

## Tech Stack

- **Backend**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **API Testing**: Postman

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ayub40/L2-Assigment-3-Mongoose.git
cd L2-Assigment-3-Mongoose
```

 ### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory with the following variables:

```bash
PORT=4000
DATABASE_URL=
```

### 4. Start the Application

For development mode:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

---

## API Endpoints

### Books API

| Method | Endpoint             | Description                             |
| ------ | ----------------     | --------------------------------------- |
| POST   | `/api/books`         | Create new book                         |
| GET    | `/api/books`         | Get all books                           |
| GET    | `/api/books/:bookId` | Get book by ID                          |
| PATCH  | `/api/books/:bookId` | Update book                             |
| DELETE | `/api/books/:bookId` | Delete book                             |

#### Query Example:

```bash
GET /api/books?filter=FANTASYY&sortBy=title&sort=asc&limit=5
```

---

### Borrow API

| Method | Endpoint      | Description                                        |
| ------ | ------------- | -------------------------------------------------- |
| POST   | `/api/borrow` | Borrow a book                                      |
| GET    | `/api/borrow` | View borrowed books summary                        |

---

### Project Structure

```bash
src/
├── app/
│   ├── controllers/
│   │   ├── book.controller.ts
│   │   ├── borrow.controller.ts
│   ├── interfaces/ 
│   │   ├── book.interface.ts
│   │   ├── borrowBook.interface.ts
│   ├── models/
│   │   ├── book.model.ts
│   │   ├── borrowBook.model.ts
│  
│── app.ts
│── server.ts
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

### Business Logic

  * Books can only be borrowed if sufficient stock is available.
  * Borrowing automatically deducts stock and updates the availability flag.
  * Aggregation pipelines are used to calculate borrowed book summaries.


### Future Enhancements

  * Add user authentication for secure API access.
  * Implement book reservation and late return penalties.
  * Add search and filtering capabilities for books.

  