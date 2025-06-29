# BRIDGEB - Educational Research Platform

**"Bringing Research In Direct Grasp of Educators"**

BRIDGEB is a comprehensive full-stack web application designed to connect educational researchers and practitioners through collaborative research sharing, peer review, and knowledge discovery.

## 🌟 Features

### 🔐 Authentication & User Management
- Email/password registration and login
- JWT-based authentication with secure password hashing (bcrypt)
- Role-based access control (user/admin)
- User profile management with institution and bio information

### 📝 Rich Article Creation
- Advanced rich text editor with formatting options
- Support for headings, lists, links, images, and multimedia
- Article categorization and keyword tagging
- Abstract and full content submission

### 🔍 Article Discovery
- Public research articles page with search functionality
- Category-based filtering and pagination
- Detailed article view with author information
- View tracking and engagement metrics

### ⚡ Approval Workflow
- Article submission with pending status
- Admin dashboard for content moderation
- Approve/reject functionality with feedback
- Email notifications for status updates

### 👑 Admin Features
- Comprehensive admin dashboard with statistics
- User and article management
- Content moderation tools
- System analytics and reporting

### 🎨 Modern UI/UX
- Responsive design for all device sizes
- Dark/light mode with system preference detection
- Smooth animations and micro-interactions
- Professional color system and typography

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Quill** for rich text editing
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bridgeb-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/bridgeb
   
   # JWT Secret (use a strong, random string)
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Server Port
   PORT=3001
   
   # Node Environment
   NODE_ENV=development
   ```

4. **Start the Application**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   
   # Or start them separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api

## 👤 Default Admin Account

The system automatically creates an admin account on first startup:

- **Email:** admin@bridgeb.com
- **Password:** @dmin-0211
- **Role:** admin

## 📁 Project Structure

```
bridgeb-platform/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── ArticleCard.tsx
│   ├── contexts/                 # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/                    # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Articles.tsx
│   │   ├── ArticleDetail.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   └── App.tsx                   # Main application component
├── server/                       # Backend Node.js application
│   ├── models/                   # MongoDB models
│   │   ├── User.js
│   │   └── Article.js
│   ├── routes/                   # API routes
│   │   ├── auth.js
│   │   ├── articles.js
│   │   └── users.js
│   ├── middleware/               # Custom middleware
│   │   └── auth.js
│   ├── utils/                    # Utility functions
│   │   └── createAdmin.js
│   └── index.js                  # Server entry point
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment variables template
└── README.md                     # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Articles
- `GET /api/articles` - Get all approved articles (public)
- `GET /api/articles/:id` - Get single article
- `POST /api/articles` - Submit new article (authenticated)
- `GET /api/articles/user/mine` - Get user's articles
- `GET /api/articles/admin/pending` - Get pending articles (admin)
- `PUT /api/articles/:id/approve` - Approve article (admin)
- `PUT /api/articles/:id/reject` - Reject article (admin)
- `DELETE /api/articles/:id` - Delete article

### Users
- `GET /api/users/dashboard/stats` - Get dashboard statistics
- `GET /api/users` - Get all users (admin)

## 🎯 Key Features Explained

### Rich Text Editor
- Powered by React Quill with custom toolbar
- Supports formatting, lists, links, and media
- Dark mode compatible styling
- Auto-save functionality

### Article Approval Workflow
1. User submits article (status: "pending")
2. Admin reviews in admin dashboard
3. Admin approves (status: "approved") or rejects with reason
4. Approved articles appear in public listings

### Role-Based Access Control
- **Users:** Can create, edit, and delete their own articles
- **Admins:** Can manage all articles and users, access admin dashboard

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Touch-friendly interface elements

## 🔒 Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT tokens with expiration
- Protected API routes with authentication middleware
- Input validation and sanitization
- CORS configuration for secure cross-origin requests

## 🌙 Dark Mode Support

- System preference detection
- Manual toggle with localStorage persistence
- Comprehensive dark mode styling across all components
- Smooth transitions between themes

## 📱 Mobile Optimization

- Responsive navigation with hamburger menu
- Touch-optimized form controls
- Optimized typography and spacing for mobile
- Fast loading and smooth scrolling

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables for production

### Backend (Render/Railway/Heroku)
1. Set up MongoDB Atlas for production database
2. Configure environment variables
3. Deploy the server code
4. Update frontend API endpoints

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Configure network access and database users
3. Update MONGODB_URI in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

---

**BRIDGEB** - Empowering educators through collaborative research sharing.