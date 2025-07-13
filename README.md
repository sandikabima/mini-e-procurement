# mini-e-procurement

## Fitur Utama
-Autentikasi JWT (Login, Register)
-CRUD
-Database: PostgreSQL

### Setup Environment Variables
Buat file `.env` di folder `mini-e-procurement/` dan isi seperti ini:

```env
PORT = 6000
DATABASE_URL=postgresql://postgres:inipassword@localhost:5432/mini_e_procurement
JWT_SECRET = secret_token_123
```

### SQL Setup Instructions
Buat Database untuk BE mini-e-procurement 

```sql
CREATE DATABASE mini_e_procurement

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

select uuid_generate_v4 ()

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20) NOT NULL CHECK (
        role in ('admin', 'vendor', 'user')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    vendor_id UUID REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE purchase_requests(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    status VARCHAR(20) NOT NULL CHECK (status in ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE purchase_request_item(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES purchase_requests(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0)
)
```

### Running Aplikasi 
open to terminal di folder mini-e-procurement

```bash
-npm install

start server
-npm run dev
```

Happy Coding ...