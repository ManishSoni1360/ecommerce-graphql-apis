# ecommerce-graphql-apis

This project is a GraphQL API for managing users, products, categories, and orders for e-commerce platform. It utilises Node.js, Apollo Server, PostgresSQL, and Prisma ORM.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ManishSoni1360/ecommerce-graphql-apis.git
cd ecommerce-graphql-apis
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create .env file and update .env file:
```bash
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/ecommerce?schema=public
JWT_SECRET=jwt_secret
```

### 4. Install Prisma and migrate
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Server
```bash
npm run dev
```


## API Documentation

### Register
```graphql
mutation {
  register(
    email: "manish.soni@gmail.com",
    password: "password123",
    firstName: "Manish",
    lastName: "Soni",
    role: ADMIN  # Optional: ADMIN or CUSTOMER
  ) {
    token
    user {
      id
      email
      role
    }
  }
}
```

### Login
```graphql
mutation {
  login(email: "manish.soni@gmail.com", password: "password123") {
    token
    user {
      id
      email
    }
  }
}
```

### Create Category
```graphql
mutation {
  createCategory(name: "Shoes", description: "Footwear collection") {
    id
    name
  }
}
```

### Get All Categories
```graphql
query {
  categories {
    id
    name
  }
}
```

### Get Category by ID
```graphql
query {
  category(id: "CATEGORY_ID") {
    id
    name
    description
  }
}
```

### Create Product (ADMIN only)
```graphql
mutation {
  createProduct(
    name: "Running Shoes",
    description: "Lightweight running shoes",
    price: 79.99,
    inventory: 50,
    categoryId: "CATEGORY_ID"
  ) {
    id
    name
  }
}
```

### Get All Products
``` graphql
query {
  products {
    id
    name
    price
  }
}
```

### Get Product by ID
```graphql
query {
  product(id: "PRODUCT_ID") {
    id
    name
    description
    price
    inventory
  }
}
```

### Create Order
``` graphql
mutation {
  createOrder(items: [
    { productId: "PRODUCT_ID", quantity: 2 }
  ]) {
    id
    status
    totalAmount
  }
}
```

### Get ALL Orders - ADMIN only
```graphql
query {
  orders {
    id
    totalAmount
    status
    user {
      email
    }
  }
}
```

### Update Order Status - ADMIN only
```graphql
mutation {
  updateOrderStatus(orderId: "ORDER_ID", status: SHIPPED) {
    id
    status
    updatedAt
  }
}
```
