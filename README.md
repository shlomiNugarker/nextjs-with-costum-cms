# Haginabapardes Project

## Overview

Haginabapardes is a dynamic web application built for an organic farm and nursery. The platform allows users to explore the various products, get in touch with the farm, and place orders for nursery and weekly produce. This project includes an admin panel that allows the client to manage products, blog posts, pages, and other dynamic content.

## Features

- **Dynamic Content Management**: Admin can edit pages, blogs, nursery products, and weekly products via a custom CMS.
- **Authentication System**: User authentication is handled via NextAuth, allowing secure access to protected routes and the admin panel.
- **Custom UI Components**: A set of reusable UI components, such as Blog Cards, Product Cards, and Forms.
- **Responsive Design**: The site is fully responsive, ensuring a seamless experience across different devices.
- **Delivery System**: A page for delivery information is available for customers.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, NextAuth for authentication, API Routes
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## Project Structure

```
Haginabapardes-main/
  ├── public/                  # Static assets (images, icons)
  ├── src/
  │   ├── app/                 # Main app pages and routes
  │   ├── api/                 # API routes for blog, products, etc.
  │   ├── cmps/                # Reusable components (BlogCard, Footer, etc.)
  │   ├── services/            # Configuration, database setup, and services
  │   ├── services/db/seed/    # Initial data (blogs, products, pages)
  ├── .eslintrc.json           # Linting configuration
  ├── next.config.js           # Next.js configuration
  ├── tailwind.config.ts       # Tailwind configuration
  ├── tsconfig.json            # TypeScript configuration
  ├── package.json             # Project dependencies
  ├── README.md                # Project documentation
```

## Installation

To get started with the Haginabapardes project, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/shlomiNugarker/Haginabapardes.git
   cd Haginabapardes-main
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   - Create a `.env` file based on `env.example` and fill in the necessary values.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The app should be available at [http://localhost:3000](http://localhost:3000).

## Deployment

The project is set up to be deployed on Vercel. To deploy:

- Push changes to your GitHub repository.
- Connect your GitHub repository to Vercel.
- Follow Vercel's deployment process.

## Admin Panel

The admin panel is accessible at `/admin`. From here, admins can manage:

- **Blog Posts**: Add, edit, and delete blog posts.
- **Products**: Manage nursery and weekly products.
- **Site Info**: Update general site information.

## Acknowledgments

- Built using the amazing tools from Next.js, Tailwind CSS, and PostgreSQL.
- Hosted on Vercel for easy and scalable deployment.

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

## Contact

For any inquiries, please contact [Shlomi](mailto:shlomin1231@gmail.com).

---

Thank you for visiting the Haginabapardes project! 🌱
