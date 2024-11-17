# 🌱 Haginabapardes - Organic Farm and Nursery Website

Welcome to **Haginabapardes**, an organic farm and nursery website. This project is built using **Next.js**, **TypeScript**, and **PostgreSQL**, and is aimed at providing users with information about the farm, a product catalog, and easy ways to get in touch. Below, you'll find all the essential information to get the project running and understand its features.

## 🛠️ Overview

Haginabapardes is a dynamic web application designed for an organic farm and nursery. The platform allows users to explore a variety of organic products, connect with the farm, and place orders for nursery items and weekly produce. It also includes an admin panel that enables the farm's administrators to manage products, blog posts, pages, and other dynamic content seamlessly.

## 🛍️ Features

- **Dynamic Content Management**: The custom CMS allows admins to easily manage pages, blog posts, nursery products, and weekly produce. Updates are directly reflected on the website.
- **User Authentication System**: Using NextAuth for secure user authentication, the app ensures safe access to protected routes and the admin panel.
- **Custom UI Components**: A collection of reusable UI components, including Blog Cards, Product Cards, and Forms, ensure consistency and scalability.
- **Responsive Design**: The site is fully responsive, providing a smooth and consistent user experience across different device sizes.
- **Delivery Information**: A dedicated page displays detailed delivery information to customers for convenient access.
- **Admin Panel**: An admin panel that provides full control over the website’s content, such as adding, updating, and deleting information about products, blog posts, and general site details.

## 🏰 Project Structure

The project is organized as follows:

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
└── README.md                # Project documentation
```

## 🛪️ Database Schema

- **User**: Stores user information including roles for managing admin access.
- **Product**: Contains details of products (both weekly and nursery products).
- **Content Blocks**: Manages the dynamic content on different pages of the site.
- **Contact Messages**: Stores messages from users sent via the contact form.
- **Page**: Stores details about different pages of the website, including metadata and content configuration.

The database setup uses PostgreSQL and includes migration and seeding scripts to help get started.

## 🚀 Technologies Used

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, NextAuth for authentication, API Routes for data handling
- **Database**: PostgreSQL for secure and efficient data storage
- **Styling**: Tailwind CSS for a modern and consistent look across the application
- **Hosting**: Vercel for seamless deployment and hosting

## 🔨 Installation

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

## 🔨 Running in Production

To build and run the application in production, execute the following:

```bash
npm run build
npm run start
```

Ensure that your `.env` file is configured correctly with production variables.

## 🚀 Deployment

The project is configured for deployment on Vercel. To deploy:

- Push your changes to your GitHub repository.
- Connect your GitHub repository to Vercel.
- Follow Vercel's deployment steps to get the site live.

## 🛠️ Admin Panel

The admin panel can be accessed at `/admin`. Features of the admin panel include:

- **Blog Posts**: Adding, editing, and deleting blog posts.
- **Product Management**: Adding and managing nursery and weekly products.
- **Page Management**: Editing and managing the content of various pages.
- **Site Information**: Updating general information about the site.

## 💬 Contact Information

If you have questions or suggestions, please contact [Shlomi](mailto:shlomin1231@gmail.com).

## 🛡 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## 💡 Additional Notes

- **Authentication**: Middleware is implemented to protect routes, especially for admin actions.
- **CMS Functionalities**: Dynamic page content allows for managing pages like `Delivery` and `Contact Us` easily through an admin panel.

Feel free to contribute or open issues if you encounter any bugs or have ideas for improvements.

---

Thank you for exploring the Haginabapardes project! 🌿
