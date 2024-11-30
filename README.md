#  Next.js Application with Content Management System

 a comprehensive platform designed to manage and promote our organic farm. Built with modern web technologies, it provides detailed product information, ordering options, and effective content management for administrators. Built with **Next.js**, **TypeScript**, and **PostgreSQL**, this project aims to provide visitors with detailed information about the farm, an extensive product catalog, and easy ways to get in touch. Below, you will find all the essential information needed to run and understand the features of this project.

## 🛠️ Overview

Haginabapardes is a dynamic web application designed for an organic farm and nursery. It allows users to explore a wide variety of organic products, get in touch with the farm, and even place orders for nursery items and weekly produce. The platform also includes an admin panel, enabling the farm administrators to manage products, blog posts, pages, and other dynamic content seamlessly.

## 🛍️ Key Features

- **Dynamic Content Management**: A custom CMS enables admins to easily manage pages, blog posts, nursery products, and weekly produce. All updates are instantly reflected on the website.
- **User Authentication**: Utilizes **NextAuth** for secure user authentication, ensuring safe access to protected routes and the admin panel.
- **Custom UI Components**: Reusable components like Blog Cards, Product Cards, and Forms ensure consistency and improve scalability.
- **Responsive Design**: The website is fully responsive, providing a smooth user experience across different devices.
- **Delivery Information**: A dedicated page provides detailed delivery information for customer convenience.
- **Admin Panel**: The admin panel provides complete control over the website's content, making it easy to add, update, or delete information about products, blog posts, and general site details.

## 🏗️ Project Structure

The project is organized as follows:

```
Haginabapardes-main/
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Main app pages and routes
│   ├── api/                 # API routes for blogs, products, etc.
│   ├── cmps/                # Reusable components (BlogCard, Footer, etc.)
│   ├── services/            # Configuration, database setup, and services
│   └── services/db/seed/    # Initial data (blogs, products, pages)
├── .eslintrc.json           # Linting configuration
├── Dockerfile               # Docker configuration for containerization
├── docker-compose.yml       # Docker Compose for multi-container setup
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## 🗃️ Database Schema

- **User**: Stores user details, including roles for managing admin access.
- **Product**: Contains information on products, including both nursery and weekly produce.
- **Content Blocks**: Manages the dynamic content across various pages of the site.
- **Contact Messages**: Stores messages from users submitted through the contact form.
- **Page**: Manages details about different pages, including metadata and content configurations.

The database uses **PostgreSQL** and includes migration and seeding scripts to help get started easily.

## 🚀 Technologies Used

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, NextAuth for authentication, API Routes for data handling
- **Database**: PostgreSQL for secure and efficient data management
- **Styling**: Tailwind CSS for a modern, consistent look throughout the application
- **Hosting**: Deployed on Vercel for smooth and hassle-free hosting
- **Containerization**: Docker and Docker Compose for development and production consistency

## 🛠️ Installation Instructions

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

   - Create a `.env` file based on `env.example` and provide the necessary values.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The app should now be accessible at [http://localhost:3000](http://localhost:3000).

## 🌐 Running in Production

To build and run the application in production:

```bash
npm run build
npm run start
```

Ensure that your `.env` file is configured correctly with production settings.

## 🚀 Deployment

The project is pre-configured for deployment on Vercel. To deploy:

- Push your changes to the GitHub repository.
- Connect your repository to Vercel.
- Follow Vercel's deployment steps to get the site live.

## 🔑 Admin Panel

The admin panel is accessible at `/admin`. Features include:

- **Blog Management**: Add, edit, and delete blog posts.
- **Product Management**: Add and manage nursery and weekly produce.
- **Page Management**: Edit and manage the content for various pages.
- **General Site Information**: Update details such as site metadata and general content.

## 💬 Contact Information

If you have questions or suggestions, feel free to reach out to [Shlomi](mailto:shlomin1231@gmail.com).

## 🛡 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.

## 💡 Additional Notes

- **Authentication**: Middleware is implemented to protect sensitive routes, especially admin-related actions.
- **CMS Functionalities**: The admin panel allows dynamic management of pages like `Delivery` and `Contact Us`, providing easy content customization.
- **Docker Support**: Docker and Docker Compose are included to facilitate development and ensure a consistent environment for deployment.

Feel free to contribute, open issues, or suggest improvements!

---

Thank you for exploring the Next.js Application with Content Management System project! 🌿

