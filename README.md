# Ecommerce Backend - Sistema de Autenticación y Autorización

## Descripción

Proyecto backend de ecommerce con sistema completo de autenticación y autorización utilizando Passport y JWT.
Esta versión incluye mejoras de arquitectura (DAO, Repository, DTO), manejo de roles y sistema de recuperación de contraseña.

## Características

- CRUD de usuarios
- Autenticación con JWT
- Autorización basada en roles
- Encriptación de contraseñas con bcrypt
- Validación de sesiones
- Gestión de productos y carritos
- Lógica de compra con generación de tickets
- Sistema de recuperación de contraseña con token que expira en 1 hora

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` con tus credenciales de MongoDB y JWT secret.

4. Iniciar el servidor:
```bash
npm start
```

Para desarrollo con nodemon:
```bash
npm run dev
```

## Estructura del Proyecto

```
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── passport.config.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   ├── Ticket.js
│   │   └── PasswordResetToken.js
│   ├── dto/
│   │   └── UserDTO.js
│   ├── dao/
│   │   ├── base.dao.js
│   │   ├── UserDAO.js
│   │   ├── CartDAO.js
│   │   ├── ProductDAO.js
│   │   ├── TicketDAO.js
│   │   └── PasswordResetTokenDAO.js
│   ├── repositories/
│   │   ├── base.repository.js
│   │   ├── UserRepository.js
│   │   ├── CartRepository.js
│   │   ├── ProductRepository.js
│   │   ├── TicketRepository.js
│   │   └── PasswordResetTokenRepository.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── product.service.js
│   │   ├── cart.service.js
│   │   └── mail.service.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── sessions.routes.js
│   │   ├── products.routes.js
│   │   └── carts.routes.js
│   ├── controllers/
│   │   ├── sessions.controller.js
│   │   ├── products.controller.js
│   │   └── carts.controller.js
│   └── app.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```

## Endpoints

### Autenticación

- `POST /api/sessions/register` - Registrar nuevo usuario
- `POST /api/sessions/login` - Iniciar sesión
- `GET /api/sessions/current` - Obtener usuario actual (requiere token JWT)
- `POST /api/sessions/forgot-password` - Solicitar recuperación de contraseña (envía email con enlace)
- `POST /api/sessions/reset-password` - Restablecer contraseña usando token (no permite repetir la anterior)

### Productos

- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto por id
- `POST /api/products` - Crear producto (solo rol admin)
- `PUT /api/products/:id` - Actualizar producto (solo rol admin)
- `DELETE /api/products/:id` - Eliminar producto (solo rol admin)

### Carritos y compras

- `POST /api/carts/:cid/products/:pid` - Agregar producto al carrito (solo rol user, sobre su propio carrito)
- `POST /api/carts/:cid/purchase` - Realizar compra del carrito (solo rol user, genera Ticket y devuelve productos sin stock)

## Tecnologías

- Node.js
- Express
- MongoDB / Mongoose
- Passport.js
- JWT
- bcrypt
 - nodemailer

