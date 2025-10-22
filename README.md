# 🐦 Twitter Clone

A full-stack Twitter clone built with modern web technologies, featuring real-time interactions, image uploads, user authentication, and a responsive design.

![Twitter Clone](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Registration & Login** with JWT tokens
- **Password encryption** using bcryptjs
- **Protected routes** and session management
- **User profiles** with customizable bio, links, and images

### 📝 Posts & Interactions
- **Create posts** with text and images
- **Like and unlike** posts with real-time updates
- **Comment** on posts with threaded discussions
- **Delete posts** (own posts only)
- **Image uploads** via Cloudinary integration

### 👥 Social Features
- **Follow/Unfollow** users
- **Followers and Following** counts and lists
- **Suggested users** discovery
- **User search** and profile browsing
- **Feed customization** (All posts, Following only, Liked posts)

### 🎨 User Experience
- **Responsive design** optimized for all devices
- **Real-time notifications** for likes and follows
- **Optimistic UI updates** for instant feedback
- **Image preview** and upload with drag-and-drop
- **Modern UI** with Tailwind CSS and DaisyUI components

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication and authorization
- **Cloudinary** - Image storage and optimization
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - UI library with latest features
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Hot Toast** - Notifications

### Deployment & DevOps
- **Render** - Cloud hosting platform
- **GitHub** - Version control and CI/CD
- **Environment variables** - Secure configuration management

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** database (local or cloud)
- **Cloudinary** account for image uploads

### 1. Clone the Repository
```bash
git clone https://github.com/Rahul-tech24/twitterClone.git
cd twitterClone
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Environment Configuration
Create a `.env` file in the `backend` folder:

```env
# Database
MONGO_URI=mongodb://localhost:27017/twitter-clone
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/twitter-clone

# Authentication
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Server
PORT=8000
NODE_ENV=development
```

### 4. Start Development Servers

#### Option A: Run Both Servers Separately
```bash
# Terminal 1: Start backend server
npm run dev

# Terminal 2: Start frontend server
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📁 Project Structure

```
twitter-clone/
├── backend/                    # Backend server code
│   ├── controllers/           # Route controllers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   └── notification.controller.js
│   ├── models/               # MongoDB models
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── notification.model.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   └── notification.routes.js
│   ├── middleware/           # Custom middleware
│   │   └── protectRoute.js
│   ├── lib/                  # Utility functions
│   │   └── utils/
│   │       └── generateToken.js
│   ├── db/                   # Database configuration
│   │   └── db.js
│   ├── .env.example         # Environment variables template
│   └── server.js            # Main server file
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── assets/          # Static assets
│   │   ├── App.jsx          # Main App component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Public static files
│   ├── index.html           # HTML template
│   └── vite.config.js       # Vite configuration
├── render.yaml              # Render deployment configuration
├── package.json             # Root package configuration
└── README.md               # Project documentation
```

## 🚀 Deployment

### Deploy to Render

This project is configured for easy deployment on Render using the included `render.yaml` blueprint.

#### 1. Prepare for Deployment
```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Blueprint**
3. Connect your GitHub repository
4. Select this repository and the `render.yaml` file
5. Click **Apply**

#### 3. Set Environment Variables
In your Render service dashboard, go to **Environment** and add:

```env
NODE_ENV=production
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

#### 4. Deploy
Render will automatically build and deploy your application. The build process:
1. Installs backend dependencies
2. Installs frontend dependencies (including devDependencies)
3. Builds the frontend for production
4. Serves both frontend and API from the same domain

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | ✅ | `mongodb://localhost:27017/twitter-clone` |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ | `your-super-secret-key-here` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ | `your-api-secret` |
| `PORT` | Server port | ❌ | `8000` (default) |
| `NODE_ENV` | Environment mode | ❌ | `development` or `production` |

### Frontend Configuration
The frontend automatically detects the environment:
- **Development**: Uses Vite proxy to connect to `localhost:8000`
- **Production**: Uses relative paths (same domain as backend)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/user` - Get current user

### Users
- `GET /api/users/profile/:username` - Get user profile
- `POST /api/users/update` - Update user profile
- `POST /api/users/follow/:id` - Follow/unfollow user
- `GET /api/users/suggested` - Get suggested users
- `GET /api/users/followers/:username` - Get user followers
- `GET /api/users/following/:username` - Get user following

### Posts
- `GET /api/posts/all` - Get all posts
- `GET /api/posts/following` - Get posts from followed users
- `GET /api/posts/user/:username` - Get user's posts
- `GET /api/posts/likes/:id` - Get user's liked posts
- `POST /api/posts/create` - Create new post
- `DELETE /api/posts/delete/:id` - Delete post
- `POST /api/posts/like/:id` - Like/unlike post
- `POST /api/posts/comment/:id` - Comment on post

### Notifications
- `GET /api/notifications` - Get user notifications
- `DELETE /api/notifications` - Delete all notifications

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Profile image and cover image upload
- [ ] Create posts with and without images
- [ ] Like and comment on posts
- [ ] Follow and unfollow users
- [ ] View different feed types
- [ ] Responsive design on mobile devices

## 🐛 Troubleshooting

### Common Issues

#### 1. Image Uploads Failing
**Symptoms**: "Profile image upload failed" or "Image upload failed"
**Solution**: 
- Verify Cloudinary environment variables are set correctly
- Check Render logs for specific error messages
- Ensure images are under 15MB

#### 2. Database Connection Issues
**Symptoms**: "MongoServerError" or connection timeouts
**Solution**:
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network access settings
- Ensure database credentials are valid

#### 3. Authentication Problems
**Symptoms**: "Unauthorized" errors or redirect loops
**Solution**:
- Verify `JWT_SECRET` is set and consistent
- Clear browser cookies and localStorage
- Check that cookies are being sent with requests

#### 4. Build Failures on Render
**Symptoms**: Build process fails during deployment
**Solution**:
- Check that all dependencies are in `package.json`
- Verify frontend build script works locally
- Review Render build logs for specific errors

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

This will show detailed logs including:
- Cloudinary configuration status
- Database connection status
- Detailed error messages

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow JavaScript/React best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MongoDB** for the robust database solution
- **Cloudinary** for image storage and optimization
- **Render** for reliable hosting platform
- **Tailwind CSS** and **DaisyUI** for beautiful UI components
- **React Query** for excellent data fetching capabilities

## 🔗 Links

- **Live Demo**: [Your Render URL]
- **Repository**: [GitHub Repository](https://github.com/Rahul-tech24/twitterClone)
- **Issues**: [GitHub Issues](https://github.com/Rahul-tech24/twitterClone/issues)

---

**Built with ❤️ by [Rahul](https://github.com/Rahul-tech24)**

For questions or support, please [open an issue](https://github.com/Rahul-tech24/twitterClone/issues) or contact the maintainer.
