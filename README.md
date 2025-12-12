# ArticleBlock 📝✨

A full-stack blogging platform built with React and Node.js that allows users to create, read, update, and delete articles with authentication and commenting features.

## 🚀 Features

### 👤 User Management
- 🔐 **User Registration & Authentication**: Secure user signup and login with JWT-based authentication
- 🔒 **Password Encryption**: Passwords are hashed using bcrypt for security
- 🛡️ **Protected Routes**: Authenticated access to create and manage articles

### 📰 Article Management
- ✍️ **Create Articles**: Rich text editor (TinyMCE) for creating formatted articles
- 👀 **View Articles**: Browse all published articles
- ✏️ **Edit Articles**: Update your own articles
- 🗑️ **Delete Articles**: Remove articles you've created
- 🔗 **Slug-based URLs**: SEO-friendly article URLs

### 💬 Comments System
- ➕ **Add Comments**: Users can comment on articles
- 👁️ **View Comments**: Read discussions on articles
- 🔧 **Comment Management**: Edit and delete your own comments

### 🎨 Modern UI/UX
- 📱 **Responsive Design**: Built with Tailwind CSS
- 🧭 **React Router**: Smooth client-side navigation
- ⏳ **Loading States**: User-friendly loading indicators
- ✅ **Form Validation**: React Hook Form for robust form handling

## 🛠️ Tech Stack

### 💻 Frontend
- ⚛️ **React 19** - UI library
- ⚡ **Vite** - Build tool and dev server
- 🧭 **React Router DOM** - Client-side routing
- 🔄 **Redux Toolkit** - State management
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📝 **TinyMCE** - Rich text editor
- 🌐 **Axios** - HTTP client
- 📋 **React Hook Form** - Form validation

### 🖥️ Backend
- 🟢 **Node.js** - Runtime environment
- 🚂 **Express.js** - Web framework
- 🍃 **MongoDB** - NoSQL database
- 🦫 **Mongoose** - MongoDB ODM
- 🔑 **JWT** - JSON Web Tokens for authentication
- 🔐 **Bcrypt** - Password hashing
- ✔️ **Zod** - Schema validation
- 🌍 **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- 🟢 **Node.js** (v14 or higher)
- 📦 **npm** or **yarn**
- 🍃 **MongoDB** (local or MongoDB Atlas account)
- 🔧 **Git**

## ⚙️ Environment Setup

### 🖥️ Backend Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database Configuration
MONGO_ID=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Example:
# PORT=4000
# MONGO_ID=mongodb+srv://username:password@cluster.mongodb.net/articleblock?retryWrites=true&w=majority
# JWT_SECRET=your_super_secret_key_here_make_it_long_and_random
```

### 💻 Frontend Environment Variables

Create a `.env` file in the `Frontend` directory (if needed):

```env
# API Base URL
VITE_API_URL=http://localhost:4000/api

# TinyMCE API Key (Get from https://www.tiny.cloud/)
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mayankkr2705/ArticleBlock.git
cd ArticleBlock
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file and add your environment variables
# (See Environment Setup section above)

# Start development server
npm run dev

# Or start production server
npm start
```

The backend server will run on `http://localhost:4000` (or your specified PORT)

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd Frontend

# Install dependencies
npm install

# Create .env file and add your environment variables
# (See Environment Setup section above)

# Start development server
npm run dev
```

The frontend application will run on `http://localhost:5173`

## 🗂️ Project Structure

```
ArticleBlock/
├── Backend/
│   ├── Controllers/
│   │   ├── article.controller.js    # Article CRUD operations
│   │   ├── auth.controller.js       # Authentication logic
│   │   └── comments.controller.js   # Comments management
│   ├── Middleware/
│   │   ├── Auth.js                  # JWT authentication middleware
│   │   ├── comment.js               # Comment validation
│   │   └── Ownership.js             # Resource ownership verification
│   ├── Model/
│   │   ├── Article.js               # Article schema
│   │   ├── Comments.js              # Comments schema
│   │   └── User.js                  # User schema
│   ├── Routes/
│   │   ├── Articleroutes.js         # Article endpoints
│   │   ├── commentsroutes.js        # Comments endpoints
│   │   └── usersroutes.js           # Auth endpoints
│   ├── app.js                       # Express app configuration
│   ├── server.js                    # Server entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── Components/
    │   │   ├── Header/              # Navigation header
    │   │   ├── Footer/              # Footer component
    │   │   ├── Container/           # Layout container
    │   │   ├── AuthLayout.jsx       # Protected route wrapper
    │   │   ├── Button.jsx           # Reusable button
    │   │   ├── Input.jsx            # Form input component
    │   │   ├── Login.jsx            # Login form
    │   │   ├── Signup.jsx           # Signup form
    │   │   ├── PostCard.jsx         # Article preview card
    │   │   ├── Postform.jsx         # Article creation/edit form
    │   │   ├── RTE.jsx              # Rich text editor wrapper
    │   │   └── Select.jsx           # Select dropdown
    │   ├── Pages/
    │   │   ├── Home.jsx             # Homepage
    │   │   ├── Allpost.jsx          # All articles listing
    │   │   ├── Addpost.jsx          # Create article page
    │   │   ├── Editpost.jsx         # Edit article page
    │   │   ├── Post.jsx             # Single article view
    │   │   ├── Login.jsx            # Login page
    │   │   └── Signup.jsx           # Signup page
    │   ├── api/
    │   │   └── api.js               # API client configuration
    │   ├── context/
    │   │   └── AuthContext.jsx      # Authentication context
    │   ├── App.jsx                  # Main app component
    │   ├── main.jsx                 # Entry point
    │   └── index.css                # Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔌 API Endpoints

### 🔐 Authentication
- 📝 `POST /api/auth/register` - Register a new user
- 🔑 `POST /api/auth/login` - Login user
- 👤 `GET /api/auth/profile` - Get user profile (protected)

### 📰 Articles
- 📋 `GET /api/articles` - Get all articles
- 🔍 `GET /api/articles/:slug` - Get article by slug
- ➕ `POST /api/articles` - Create new article (protected)
- ✏️ `PUT /api/articles/:slug` - Update article (protected, owner only)
- ❌ `DELETE /api/articles/:slug` - Delete article (protected, owner only)

### 💬 Comments
- 👁️ `GET /api/comments/:articleId` - Get comments for an article
- ➕ `POST /api/comments` - Create a comment (protected)
- ✏️ `PUT /api/comments/:id` - Update comment (protected, owner only)
- ❌ `DELETE /api/comments/:id` - Delete comment (protected, owner only)

## 🚀 Deployment

### 🖥️ Backend Deployment (Railway/Render/Heroku)

1. ⚙️ Set up environment variables in your hosting platform
2. 📤 Deploy the `Backend` directory
3. 🔗 Ensure MongoDB connection string is configured
4. 🌍 Update CORS settings in `app.js` to include your frontend URL

### 💻 Frontend Deployment (Vercel/Netlify)

1. 🔨 Build the project: `npm run build`
2. 📤 Deploy the `dist` folder
3. ⚙️ Configure environment variables
4. 🔗 Update API base URL to point to your backend server

## 🔒 Security Features

- 🔐 **Password Hashing**: Uses bcrypt with salt rounds
- 🔑 **JWT Authentication**: Secure token-based authentication
- 🛡️ **Protected Routes**: Middleware to verify authentication
- ✅ **Ownership Verification**: Users can only edit/delete their own content
- 🌍 **CORS Configuration**: Controlled cross-origin access
- 📝 **Input Validation**: Zod schema validation on backend

## 🧪 Development Scripts

### 🖥️ Backend
```bash
npm start        # 🚀 Start production server
npm run dev      # 🔥 Start development server with nodemon
```

### 💻 Frontend
```bash
npm run dev      # 🔥 Start development server
npm run build    # 🔨 Build for production
npm run preview  # 👀 Preview production build
npm run lint     # 🔍 Run ESLint
```

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔀 Open a Pull Request

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👨‍💻 Author

**Mayank Kumar**
- GitHub: [@Mayankkr2705](https://github.com/Mayankkr2705)

## 🙏 Acknowledgments

- ⚛️ React team for the amazing framework
- 🍃 MongoDB team for the database
- 📝 TinyMCE for the rich text editor
- 🎨 Tailwind CSS for the styling framework

## 📧 Contact

For any queries or suggestions, please feel free to reach out or open an issue in the repository.

---

Made with ❤️ by Mayank Kumar
