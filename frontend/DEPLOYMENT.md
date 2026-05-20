# Frontend Deployment Guide

## Overview

This frontend is now fully integrated with the production backend API at `https://lead-web.onrender.com/api`.

## Environment Configuration

The application uses environment variables to configure the API endpoint. The following files have been created:

- `.env` - Production environment (used for builds)
- `.env.development` - Development environment (used when running `npm start`)

Both files contain:
```
REACT_APP_API_URL=https://lead-web.onrender.com/api
```

## API Integration

### Updated Files

1. **`src/api/client.ts`** - Axios client configured to use production API
2. **`src/services/api.ts`** - Service API instance configured to use production API

### API Endpoints

The frontend communicates with the following backend endpoints:

- **Authentication**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration

- **Leads**
  - `GET /api/leads` - Get all leads (with pagination, filtering, sorting)
  - `GET /api/leads/:id` - Get single lead
  - `POST /api/leads` - Create new lead
  - `PUT /api/leads/:id` - Update lead
  - `DELETE /api/leads/:id` - Delete lead
  - `GET /api/leads/export` - Export leads as CSV

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000` and will automatically connect to the production API.

## Production Build

### Build for Production

```bash
npm run build
```

The optimized production build will be created in the `build/` folder.

### Deploy to Static Host

The `build/` folder can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the build folder
- **AWS S3 + CloudFront**: Upload to S3 bucket
- **GitHub Pages**: Use `gh-pages` package

## Testing the Integration

### Manual Testing

1. Start the development server: `npm start`
2. Navigate to `http://localhost:3000`
3. Register a new account
4. Login with your credentials
5. Test CRUD operations on leads

### API Testing

You can test the API directly using curl or tools like Postman:

```bash
# Test login endpoint
curl -X POST https://lead-web.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test leads endpoint (requires authentication)
curl -X GET https://lead-web.onrender.com/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### CORS Issues

If you encounter CORS errors during development, ensure:
1. The backend API allows requests from your development origin (`http://localhost:3000`)
2. Your browser extensions aren't blocking requests

### Authentication Issues

If authentication fails:
1. Verify the API endpoint is correct
2. Check browser console for error messages
3. Ensure the backend is running and accessible

### Build Failures

If the build fails:
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Check for TypeScript errors: `npm run build` will show detailed errors
3. Ensure all environment variables are properly set

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `https://lead-web.onrender.com/api` |

## Key Features

✅ **Fully Integrated** - Connected to production backend API  
✅ **Environment Configuration** - Separate configs for dev/prod  
✅ **Error Handling** - Proper error messages and user feedback  
✅ **Authentication** - JWT-based authentication with token refresh  
✅ **TypeScript** - Full type safety  
✅ **Responsive Design** - Works on all device sizes  
✅ **Production Ready** - Optimized build and deployment ready  

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify backend API is accessible
3. Review network requests in browser DevTools
4. Check backend logs if available