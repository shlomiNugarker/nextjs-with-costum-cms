# 📂 Haginabapardes - Database Overview

This document provides an overview of the **database** structure used in the **Haginabapardes** project. Below is a brief explanation of each key file and folder, along with instructions to use Drizzle Kit for generating and applying migrations.

## 🗃️ Folder Structure

```
services/db/
├── initializeDatabase.ts   # Initializes the database and sets up tables
├── migrations/             # Database schema migration files
├── repositories/           # Data access (CRUD operations)
├── schema.ts               # Database schema definitions
└── seed/                   # Initial seed data for populating the database
```

### Key Components

- **initializeDatabase.ts**: Initializes the database, setting up tables if they don't already exist.
- **migrations/**: Contains migration files for modifying the database schema over time.
- **repositories/**: Handles data access operations, keeping business logic separate from database logic.
- **schema.ts**: Defines the structure of the database, including tables, columns, data types, and relationships. This file is crucial as it serves as the single source of truth for the database structure. Any changes to the database—such as adding new tables or modifying existing ones—should first be made in `schema.ts`. Once updated, the `schema.ts` file can be used to generate new migration files, ensuring the database schema matches the needs of the application.
- **seed/**: Contains initial data scripts to populate the database for development or testing.

## 🔄 Using Drizzle Kit

To manage migrations with **Drizzle Kit**, follow these steps:

1. **Generate a Migration**:

   ```bash
   npx drizzle-kit generate
   ```

   This command will generate a new migration file based on changes in `schema.ts`. It's important to keep `schema.ts` up to date, as this is what Drizzle Kit uses to determine what changes need to be applied to the database.

2. **Apply Migrations**:
   ```bash
   npx drizzle-kit migrate
   ```
   This command will apply all pending migrations to bring your database schema up to date. By following this process, any changes defined in `schema.ts` will be reflected in the actual database, ensuring consistency between your application code and the database.

Feel free to update this README as you make modifications to the database structure or add new features. This will ensure that everyone working on the project is up-to-date with the latest changes.

---

If you have questions or need further clarification, feel free to reach out! 🚀
