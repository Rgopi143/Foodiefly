# Foodiefly Deployment Guide

## Deploying to Render

This guide will help you deploy your Foodiefly application to Render.

### Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

#### Option 1: Using render.yaml (Recommended)

1. **Push your code to Git repository**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" and select "Blueprint"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` file and configure the deployment

3. **Environment Variables (if needed)**
   - In your Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add any environment variables your app needs

#### Option 2: Manual Setup

1. **Create a new Static Site**
   - Go to Render dashboard
   - Click "New +" and select "Static Site"
   - Connect your Git repository

2. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18.0.0

3. **Configure Routes**
   - Add a rewrite rule: `/*` → `/index.html` (for React Router)

### Important Notes

- Your Firebase configuration is already set up in `src/firebase.ts`
- The app uses React Router, so all routes need to be rewritten to `index.html`
- Make sure your repository is public or you have a paid Render plan for private repos

### Post-Deployment

1. **Test your application**
   - Visit your Render URL
   - Test all major features (authentication, ordering, etc.)

2. **Custom Domain (Optional)**
   - In Render dashboard, go to your service
   - Navigate to "Settings" → "Custom Domains"
   - Add your domain and configure DNS

### Troubleshooting

- **Build fails**: Check the build logs in Render dashboard
- **404 errors**: Ensure the rewrite rule is configured correctly
- **Firebase issues**: Verify your Firebase project settings allow your Render domain

### Environment Variables

If you need to add environment variables later:

1. Go to your Render service dashboard
2. Navigate to "Environment" tab
3. Add variables like:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc.

Remember to prefix with `VITE_` for Vite to expose them to your React app.
