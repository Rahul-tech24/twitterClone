# Twitter Clone - Frontend 🎨

A modern, responsive Twitter clone frontend built with React, Vite, TailwindCSS, and React Query.

## 🌟 Features

- **Authentication**
  - User signup and login
  - Auto-login after signup
  - Persistent authentication with JWT
  - Secure logout

- **User Profiles**
  - Customizable profile with bio and links
  - Profile and cover image upload
  - Edit profile modal
  - View followers and following lists
  - Follow/Unfollow users

- **Posts & Feed**
  - Create posts with text and images
  - Like and comment on posts
  - Delete own posts
  - View all posts, following feed, or user posts
  - Click posts to view in detail
  - Real-time post interactions

- **Post Detail Page**
  - Full post view with all comments
  - Add comments with Enter key support
  - Like/Unlike functionality
  - Navigate to user profiles from comments

- **Notifications**
  - Real-time notifications
  - Mark as read
  - Delete notifications

- **UI/UX**
  - Responsive design (mobile, tablet, desktop)
  - Dark theme with DaisyUI
  - Loading states and skeletons
  - Toast notifications
  - Professional Twitter-like interface

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS + DaisyUI
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM v7
- **HTTP Client:** Fetch API
- **Icons:** React Icons
- **Notifications:** React Hot Toast

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/twitter-clone-frontend.git
cd twitter-clone-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
# For development, Vite proxy is used (no need to set this)
# For production, set this to your backend URL
VITE_API_URL=https://your-backend-url.com
```

**Note:** In development, the Vite proxy automatically forwards `/api` requests to `http://localhost:8000`

### 4. Run the Application

**Development Mode:**
```bash
npm run dev
```

The app will start on `http://localhost:3000`

**Build for Production:**
```bash
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
│   └── avatar-placeholder.png
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── common/     # Common components
│   │   │   ├── Post.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── RightPanel.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── FollowersFollowingModal.jsx
│   │   └── skeletons/  # Loading skeletons
│   ├── hooks/          # Custom React hooks
│   │   ├── useFollow.jsx
│   │   └── useUpdateUserProfile.jsx
│   ├── pages/          # Page components
│   │   ├── auth/       # Authentication pages
│   │   ├── home/       # Home feed
│   │   ├── profile/    # User profile
│   │   ├── post/       # Post detail page
│   │   └── notification/ # Notifications
│   ├── utils/          # Utility functions
│   │   └── date.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── style.css       # Global styles
├── .env                # Environment variables (not in git)
├── .env.example        # Example environment variables
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## 🎨 Key Components

### Pages
- **LoginPage** - User authentication
- **SignupPage** - New user registration
- **HomePage** - Main feed with posts
- **ProfilePage** - User profile with posts
- **PostDetailPage** - Single post view with comments
- **NotificationPage** - User notifications

### Common Components
- **Sidebar** - Navigation and user menu
- **RightPanel** - Suggested users and trending
- **Post** - Individual post card
- **Posts** - Post list container
- **LoadingSpinner** - Loading indicator
- **FollowersFollowingModal** - Followers/Following list

### Custom Hooks
- **useFollow** - Handle follow/unfollow logic
- **useUpdateUserProfile** - Profile update with cache management

## 🔧 Configuration

### Vite Proxy (Development)

The `vite.config.js` file includes a proxy configuration:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    }
  }
}
```

This allows you to make API calls to `/api/...` which will be proxied to your backend.

### TailwindCSS & DaisyUI

The project uses TailwindCSS for styling and DaisyUI for pre-built components.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add environment variable:
   - `VITE_API_URL` = Your backend URL
6. Deploy!

**Vercel Configuration File:**

Create `vercel.json` in the root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Configure:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
5. Add environment variable:
   - `VITE_API_URL` = Your backend URL
6. Add `_redirects` file in `public/`:
```
/*    /index.html   200
```
7. Deploy!

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rahul**
- GitHub: [@Rahul-tech24](https://github.com/Rahul-tech24)

---

Made with ❤️ by Rahul
