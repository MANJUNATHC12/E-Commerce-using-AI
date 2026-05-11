# Project Daily Changelog

This document summarizes the recent updates made to the project, detailing which pages were modified and the context behind the changes based on the repository's commit history.

## May 9, 2026: "added track order"
**Overview**: This update focused on implementing a new "Track Order" feature and refining the existing user interface and authentication endpoints.

**Pages & Files Updated**:
- `my-app/src/pages/TrackOrder.js` & `.css` (New): Added the new page to allow users to track their orders.
- `my-app/src/App.js`: Updated routing to include the new `/track-order` endpoint.
- `my-app/src/pages/Cart.js` & `.css`: Modified to likely link to the track order page or improve the post-purchase experience.
- `my-app/src/pages/Register.js`: Updated logic or styling for the user registration form.
- `my-app/src/Templates/Inputfield.js`, `formtemp.js`, `form.css`: Refined the reusable form templates and input fields.
- `my-app-api/Controllers/AuthController.cs`: Backend authentication controller was updated, possibly to support enhanced validation or order tracking associations.

## May 7, 2026: "added some forms"
**Overview**: A significant frontend update introducing forgot password functionality, a login popup, and updates across multiple product category pages.

**Pages & Files Updated**:
- `my-app/src/pages/ForgotPassword.js` (New): Added the Forgot Password page to complete the authentication flow.
- `my-app/src/Components/LoginPopup.js` & `.css` (New): Added a new interactive popup component for user login.
- `my-app/src/pages/Login.js`, `Register.js`, `Home.js`: Updated to integrate the new forms and overall logic.
- `my-app/src/pages/Shoes.js`, `SportWear.js`, `SummerWear.js`, `TraditionalWear.js`, `WinterWear.js`: The individual product category pages were modified, likely to improve layout or implement new styling designs.
- `my-app/src/pages/Cart.js` & `.css`: Cart experience enhancements.
- `my-app/src/App.js`, `navtemp.js`, `formtemp.js`: Core layout and routing updates to incorporate new pages.
- `my-app-api/Models/ForgotPasswordDto.cs` (New): Backend model to support the password reset request.
- `my-app-api/Models/LoginDto.cs`, `RegisterDto.cs`, `AuthController.cs`: Updated DTOs and endpoints for authentication requests.
- `my-app/image/qrscanner.jpg` (New): Added a QR scanner image resource.

## May 6, 2026: "added" (Initial Setup)
**Overview**: This represents the initial massive commit establishing the foundation of the project.

**Major Components Included**:
- **Backend (`my-app-api`)**: Set up the complete ASP.NET Core API with Entity Framework Core, PostgreSQL database configuration, AuthController, CartController, and corresponding models (User, CartItem, RegisterDto, LoginDto).
- **Frontend (`my-app`)**: Set up the React application including `react-router-dom`, reusable templates (navtemp, formtemp, card), UI components (Navbar, Eventcard), and the full suite of pages (`Home`, `About`, `Contact`, `Men`, `Shoes`, `Cart`, `Login`, `Register`, etc.).
