# Login Information

## Demo Login Credentials

**Username:** `admin`  
**Password:** `admin123`

## How to Access

1. Navigate to `/login` or the root path `/`
2. Enter the credentials above
3. Click "ورود" (Login)
4. You'll be redirected to the dashboard at `/mantine/dashboard`

## Features

- ✅ **Theme Switching**: Toggle between light and dark modes
- ✅ **Persian RTL Support**: Full right-to-left text support
- ✅ **Responsive Design**: Works on all device sizes
- ✅ **Simple Authentication**: Frontend-only validation for demo purposes
- ✅ **Logout Functionality**: Logout button in dashboard sidebar

## Security Note

⚠️ **This is a demo application with hardcoded credentials.**  
In a production environment, you should implement proper backend authentication with secure password hashing and session management.

## File Structure

- `src/app/login/page.tsx` - Login page component
- `src/app/page.tsx` - Root redirect to login
- `src/components/dashboard/DashboardLayout.tsx` - Dashboard with logout functionality
