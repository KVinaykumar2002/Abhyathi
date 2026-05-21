# Abhyathi API

Express + MongoDB API for product catalog and admin uploads.

## Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and ADMIN_API_KEY
npm install
npm run seed   # optional: adds sample products if collection is empty
npm run dev
```

Server runs at `http://localhost:5000`.

## Environment

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string (include database name, e.g. `/abhyathi`) |
| `ADMIN_API_KEY` | Secret sent as `x-admin-key` header for admin routes |
| `PORT` | API port (default `5000`) |
| `CLIENT_ORIGIN` | Frontend URL for CORS (default `http://localhost:4000`) |

## Endpoints

### Public

- `GET /api/products` — list products (`?category=Containers` optional)
- `GET /api/products/:id` — single product
- `GET /api/health` — health check

### Admin (header: `x-admin-key: <ADMIN_API_KEY>`)

- `POST /api/admin/products` — create product
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
