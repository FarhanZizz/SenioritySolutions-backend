# SenioritySolutions — Backend

REST API for the SenioritySolutions senior care service booking platform. Built with **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## Tech Stack

| Layer      | Technology   |
| ---------- | ------------ |
| Runtime    | Node.js      |
| Framework  | Express.js   |
| Language   | TypeScript   |
| ORM        | Prisma       |
| Database   | PostgreSQL   |
| Auth       | JWT + bcrypt |
| Validation | Zod          |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/FarhanZizz/SenioritySolutions-backend.git
cd SenioritySolutions-backend
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_EXPIRES_IN=30d
```

### 3. Run database migrations

```bash
npx prisma migrate deploy
```

### 4. Start the development server

```bash
npm start
```

The API will be available at `http://localhost:5000`.

---

## API Overview

All endpoints are prefixed with `/api/v1`.

### Auth & Users

| Method | Endpoint          | Access      | Description           |
| ------ | ----------------- | ----------- | --------------------- |
| POST   | `/auth/signup`    | Public      | Register a new user   |
| POST   | `/auth/signin`    | Public      | Login and receive JWT |
| GET    | `/profile`        | Auth        | Get own profile       |
| PATCH  | `/profile`        | Auth        | Update own profile    |
| GET    | `/users`          | Admin       | List all users        |
| GET    | `/users/:id`      | Admin       | Get single user       |
| PATCH  | `/users/:id`      | Admin       | Update a user         |
| PATCH  | `/users/:id/role` | Super Admin | Change user role      |
| DELETE | `/users/:id`      | Admin       | Delete a user         |

### Services

| Method | Endpoint          | Access | Description                      |
| ------ | ----------------- | ------ | -------------------------------- |
| GET    | `/service`        | Public | List all services (with filters) |
| GET    | `/service/:id`    | Public | Get single service with reviews  |
| POST   | `/service/create` | Admin  | Create a service                 |
| PATCH  | `/service/:id`    | Admin  | Update a service                 |
| DELETE | `/service/:id`    | Admin  | Delete a service                 |
| POST   | `/review/:id`     | Auth   | Post a review for a service      |

#### Service query parameters

| Param       | Type    | Description                                                                 |
| ----------- | ------- | --------------------------------------------------------------------------- |
| `search`    | string  | Search name, category, location, description                                |
| `category`  | string  | `COMPANIONSHIP`, `PERSONAL_CARE`, `MEAL_PREPARATION`, `HOUSEHOLD_CHORES`    |
| `location`  | string  | `CHITTAGONG`, `DHAKA`, `SYLHET`, `RAJSHAHI`, `RANGPUR`, `BARISAL`, `KHULNA` |
| `minPrice`  | number  | Filter by minimum price                                                     |
| `maxPrice`  | number  | Filter by maximum price                                                     |
| `available` | boolean | `true` or `false`                                                           |
| `page`      | number  | Page number (default: 1)                                                    |
| `size`      | number  | Results per page (default: 10)                                              |
| `sortBy`    | string  | Field to sort by (e.g. `price`, `createdAt`)                                |
| `sortOrder` | string  | `asc` or `desc`                                                             |

### Bookings

| Method | Endpoint              | Access | Description           |
| ------ | --------------------- | ------ | --------------------- |
| POST   | `/booking/create`     | Auth   | Create a booking      |
| GET    | `/user-booking`       | Auth   | Get own bookings      |
| GET    | `/all-booking`        | Admin  | Get all bookings      |
| PATCH  | `/booking/:id`        | Admin  | Update booking status |
| PATCH  | `/booking/:id/cancel` | Auth   | Cancel own booking    |
| DELETE | `/booking/:id`        | Admin  | Delete a booking      |

### Content

| Method | Endpoint        | Access | Description          |
| ------ | --------------- | ------ | -------------------- |
| GET    | `/blogpost`     | Public | List all blog posts  |
| GET    | `/blogpost/:id` | Public | Get single blog post |
| POST   | `/blogpost`     | Admin  | Create a blog post   |
| PATCH  | `/blogpost/:id` | Admin  | Update a blog post   |
| DELETE | `/blogpost/:id` | Admin  | Delete a blog post   |
| GET    | `/faq`          | Public | List all FAQs        |
| POST   | `/faq`          | Admin  | Create a FAQ         |
| PATCH  | `/faq/:id`      | Admin  | Update a FAQ         |
| DELETE | `/faq/:id`      | Admin  | Delete a FAQ         |

### Feedback

| Method | Endpoint        | Access | Description             |
| ------ | --------------- | ------ | ----------------------- |
| POST   | `/feedback`     | Public | Submit feedback         |
| GET    | `/feedback`     | Admin  | List all feedback       |
| DELETE | `/feedback/:id` | Admin  | Delete a feedback entry |

---

## Project Structure

```
src/
├── app.ts                  # Express app, middleware, route registration
├── server.ts               # Server bootstrap
├── config/
│   └── index.ts            # Environment config
├── enums/
│   └── user.ts             # Role enum (user, admin, super_admin)
├── errors/
│   ├── ApiError.ts
│   └── handleZodError.ts
├── helpers/
│   ├── jwtHelpers.ts
│   ├── paginationHelper.ts
│   └── pick.ts
├── interfaces/
│   ├── common.ts
│   ├── error.ts
│   ├── index.d.ts          # Express Request augmentation
│   └── pagination.ts
├── app/
│   └── middlewares/
│       ├── auth.ts         # JWT verification + role guard
│       ├── globalErrorHandler.ts
│       └── validateRequest.ts
└── modules/
    ├── user/
    ├── service/
    ├── booking/
    ├── content/
    └── feedback/
```

---

## Roles

| Role          | Permissions                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| `user`        | Book services, cancel own bookings, post reviews, update own profile, submit feedback |
| `admin`       | Everything above + manage services, manage all bookings, manage users, manage content |
| `super_admin` | Everything above + change any user's role                                             |
