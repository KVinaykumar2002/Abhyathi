# Abhyathi API

Express + MongoDB API for product catalog and admin uploads.

## Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and ADMIN_API_KEY
npm install
npm run seed        # seeds catalog if collection is empty (skips if products exist)
npm run seed:force  # replaces all products; images stored as base64 in MongoDB
npm run seed:admin  # creates/updates admin login from ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev
```

Server runs at `http://localhost:5000`.

## Environment

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string (include database name, e.g. `/abhyathi`) |
| `JWT_SECRET` | Secret for admin login tokens (32+ random characters) |
| `ADMIN_EMAIL` | Admin login email (create with `npm run seed:admin`) |
| `ADMIN_PASSWORD` | Admin login password |
| `ADMIN_NAME` | Optional display name for admin |
| `PORT` | API port (default `5000`) |
| `CLIENT_ORIGIN` | `*` = any origin; or comma-separated frontend URLs for production |

## Endpoints

### Public

- `GET /api/products` — list products (`?category=Containers` optional)
- `GET /api/products/:id` — single product
- `GET /api/media/:fileId` — legacy GridFS images (new products use base64 in `image`)
- `GET /api/health` — health check

### Auth

- `POST /api/auth/login` — body `{ "email", "password" }` → `{ token, admin }`
- `GET /api/auth/me` — header `Authorization: Bearer <token>`

### Admin (header: `Authorization: Bearer <token>`)

- `POST /api/admin/products` — create product (JSON or `multipart/form-data` with `imageFile`)
- `PUT /api/admin/products/:id` — update product
- `DELETE /api/admin/products/:id` — delete product

### Create product body

```json
{
  "name": "Biodegradable Meal Containers",
  "price": 42.99,
  "category": "Containers",
  "description": "Sturdy clamshell containers...",
  "image": "https://example.com/photo.jpg",
  "soldOut": false
}
```

Categories: `Containers`, `Bags & Wraps`, `Cups & Lids`, `Eco-Friendly`.
