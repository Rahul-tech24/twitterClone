# 🚀 Deployment Guide - Twitter Clone

## 📋 Pre-Deployment Checklist

✅ All critical bugs have been fixed
✅ Environment variables are ready
✅ MongoDB Atlas account created
✅ Cloudinary account created
✅ GitHub repository is up to date

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (Free tier - M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with `twitter-clone`

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/twitter-clone?retryWrites=true&w=majority
```

---

## 📸 Step 2: Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Go to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret

---

## 🔧 Step 3: Deploy Backend (Render.com)

### Option A: Using Render Dashboard

1. **Sign up at [Render.com](https://render.com/)**

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: twitter-clone-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   PORT=8000
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the URL (e.g., `https://twitter-clone-backend.onrender.com`)

### Option B: Using Render Blueprint (render.yaml)

Create `render.yaml` in project root:
```yaml
services:
  - type: web
    name: twitter-clone-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 8000
```

---

## 🌐 Step 4: Deploy Frontend (Vercel)

1. **Sign up at [Vercel](https://vercel.com/)**

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`

5. **Update API Calls for Production**
   
   Edit `frontend/vite.config.js`:
   ```javascript
   export default defineConfig({
     plugins: [react(), tailwindcss()],
     server: {
       port: 3000,
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:8000',
           changeOrigin: true,
         }
       }
     }
   })
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Copy the URL (e.g., `https://twitter-clone-abc123.vercel.app`)

7. **Update Backend CORS**
   - Go back to Render
   - Update `CLIENT_URL` environment variable with your Vercel URL
   - Redeploy backend

---

## 🔄 Step 5: Update CORS in Backend

After you have your frontend URL, update the backend:

1. Go to Render Dashboard
2. Select your backend service
3. Go to "Environment"
4. Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
5. Click "Save Changes"
6. Service will auto-redeploy

---

## ✅ Step 6: Test Your Deployment

### Test Backend Health
```bash
curl https://your-backend-url.onrender.com/health
```

### Test Frontend
1. Open your Vercel URL
2. Try to sign up
3. Try to log in
4. Create a post
5. Upload an image
6. Follow a user
7. Check notifications

---

## 🐛 Troubleshooting

### Issue: "Network Error" or "Failed to fetch"

**Solution:** Check CORS settings
- Make sure `CLIENT_URL` in backend matches your frontend URL exactly
- Check browser console for CORS errors
- Verify both frontend and backend are using HTTPS

### Issue: "Cannot connect to database"

**Solution:** Check MongoDB connection
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for now)
- Check connection string is correct
- Ensure password doesn't have special characters (or encode them)

### Issue: "Images not uploading"

**Solution:** Check Cloudinary settings
- Verify API credentials are correct
- Check Cloudinary dashboard for upload limits
- Ensure upload preset is correct

### Issue: "JWT errors"

**Solution:** Check JWT_SECRET
- Must be at least 32 characters long
- Must be the same on all backend instances
- Should be randomly generated

### Issue: Backend sleeps (Render free tier)

**Solution:** 
- Render free tier sleeps after 15 minutes of inactivity
- First request will be slow (~30 seconds)
- Consider upgrading to paid tier for production
- Or use Railway.app which has better free tier

---

## 🔐 Security Best Practices

### 1. Environment Variables
✅ Never commit `.env` files
✅ Use strong, random JWT_SECRET
✅ Use different secrets for development and production

### 2. MongoDB
✅ Create a separate user for your application
✅ Use strong passwords
✅ Enable IP whitelisting (production only)

### 3. Cloudinary
✅ Set upload presets
✅ Enable signed uploads for sensitive media
✅ Set file size limits

### 4. Backend
✅ Add helmet.js for security headers
✅ Add rate limiting
✅ Add input validation
✅ Keep dependencies updated

---

## 📊 Monitoring & Maintenance

### 1. Set Up Error Tracking
- Use [Sentry](https://sentry.io/) for error tracking
- Monitor backend logs in Render dashboard
- Set up uptime monitoring

### 2. Database Backups
- MongoDB Atlas automatic backups (enabled by default)
- Download manual backups regularly

### 3. Performance Monitoring
- Monitor response times
- Check database query performance
- Optimize slow endpoints

---

## 🚀 Alternative Deployment Options

### Backend Alternatives:
1. **Railway.app** - Better free tier than Render
2. **Fly.io** - Global edge deployment
3. **Heroku** - Classic PaaS (paid only now)
4. **AWS Elastic Beanstalk** - More complex but powerful
5. **DigitalOcean App Platform** - Good for scaling

### Frontend Alternatives:
1. **Netlify** - Similar to Vercel
2. **Cloudflare Pages** - Fast global CDN
3. **GitHub Pages** - Free but limited
4. **AWS Amplify** - AWS ecosystem

### Database Alternatives:
1. **MongoDB Atlas** - Recommended (what we're using)
2. **Railway.app Postgres** - If you prefer SQL
3. **Supabase** - PostgreSQL with built-in auth
4. **PlanetScale** - MySQL-compatible

---

## 📝 Post-Deployment Checklist

- [ ] All features work correctly
- [ ] Images upload successfully
- [ ] Authentication works (signup, login, logout)
- [ ] Posts can be created, liked, deleted
- [ ] Following/unfollowing works
- [ ] Notifications appear correctly
- [ ] Profile updates work
- [ ] Mobile responsive
- [ ] Performance is acceptable
- [ ] Error logging is set up
- [ ] Backups are configured
- [ ] Custom domain (optional)
- [ ] SSL certificate (auto with Vercel/Render)

---

## 🎉 You're Live!

Congratulations! Your Twitter clone is now deployed and accessible to the world! 🚀

**Share your links:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-api.onrender.com`

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:
- Push to `main` branch → Auto-deploy
- Pull requests → Preview deployments
- Rollback to previous versions if needed

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Render | Yes | 750 hours/month, sleeps after 15min |
| Vercel | Yes | 100GB bandwidth/month |
| MongoDB Atlas | Yes | 512MB storage |
| Cloudinary | Yes | 25GB storage, 25GB bandwidth |

**Total Cost:** $0/month (with limitations)

**Upgrade costs:** ~$7-20/month for production-ready hosting

---

## 📞 Need Help?

- Check Render logs for backend issues
- Check Vercel logs for frontend issues
- Check browser console for client errors
- Review MongoDB Atlas metrics
- Contact support for hosting issues

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Happy Deploying! 🚀**
