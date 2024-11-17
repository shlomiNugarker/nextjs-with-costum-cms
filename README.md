# Haginabapardes Project

## Overview

Haginabapardes is a dynamic web application designed for an organic farm and nursery. The platform allows users to explore a variety of organic products, connect with the farm, and place orders for nursery items and weekly produce. It also includes an admin panel that enables the farm's administrators to manage products, blog posts, pages, and other dynamic content seamlessly.

## Features

- **Dynamic Content Management**: The custom CMS allows admins to easily manage pages, blog posts, nursery products, and weekly produce. Updates are directly reflected on the website.
- **User Authentication System**: Using NextAuth for secure user authentication, the app ensures safe access to protected routes and the admin panel.
- **Custom UI Components**: A collection of reusable UI components, including Blog Cards, Product Cards, and Forms, ensure consistency and scalability.
- **Responsive Design**: The site is fully responsive, providing a smooth and consistent user experience across different device sizes.
- **Delivery Information**: A dedicated page displays detailed delivery information to customers for convenient access.
- **Admin Panel**: An admin panel that provides full control over the website’s content, such as adding, updating, and deleting information about products, blog posts, and general site details.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, NextAuth for authentication, API Routes for data handling
- **Database**: PostgreSQL for secure and efficient data storage
- **Styling**: Tailwind CSS for a modern and consistent look across the application
- **Hosting**: Vercel for seamless deployment and hosting

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

   The app should now be accessible at [http://localhost:3000](http://localhost:3000).

## Deployment

The project is configured for deployment on Vercel. To deploy:

- Push your changes to your GitHub repository.
- Connect your GitHub repository to Vercel.
- Follow Vercel's deployment steps to get the site live.

## Admin Panel

The admin panel can be accessed at `/admin`. Features of the admin panel include:

- **Blog Posts**: Adding, editing, and deleting blog posts.
- **Product Management**: Adding and managing nursery and weekly products.
- **Site Information**: Updating general information about the site.

## Acknowledgments

- Developed with the powerful tools provided by Next.js, Tailwind CSS, and PostgreSQL.
- Hosted on Vercel for efficient, scalable, and reliable deployment.

## Contributing

Contributions are always welcome! Feel free to fork the repository and submit pull requests for improvements and feature additions.

## Contact

For inquiries, please contact [Shlomi](mailto:shlomin1231@gmail.com).

---

Thank you for exploring the Haginabapardes project! 🌱
