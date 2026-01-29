# FounderStack: Exclusive SaaS Deals Platform

A full-stack, premium platform for startups to explore and claim exclusive SaaS deals. Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Node.js/Express**.

## End-to-End Application Flow

1.  **Landing Page**: Users land on a high-performance, animated landing page featuring an immersive **3D Star Field** hero element (built with custom Three.js logic). They can view the value proposition and "Explore Deals".
2.  **Browse Deals**: The `/deals` page lists all available deals with:
    *   **Liquid Glass UI**: Cards feature advanced glassmorphism with dynamic lighting.
    *   **Filtering & Search**: Users can filter by category or search by name.
    *   **Access Levels**: Deals are clearly marked as "Locked" (Gold) or "Public" (Green).
3.  **Authentication**: To claim a deal, users must be logged in.
    *   **Security**: Authentication uses **JWT (JSON Web Tokens)**.
    *   **Registration**: New users can register at `/register`.
4.  **Deal Details & Claiming**:
    *   **Public Deals**: Can be claimed immediately by logged-in users.
    *   **Locked Deals**: Require the user to be "Verified" (verified account status).
    *   **Claim Action**: Integrating a seamless claiming flow that updates the user's dashboard.
5.  **Dashboard**: A premium user area featuring:
    *   **Profile Stats**: Visualized with rich gradients and glass effects.
    *   **Claim History**: A tracked list of all claimed deals with real-time status updates (Approved/Pending).

## Authentication & Authorization Strategy

*   **JWT Strategy**: Upon login/registration, a JWT is signed and issued.
*   **Token Storage**: The token is stored in the frontend and attached to the `Authorization` header (`Bearer <token>`) for all protected API requests.
*   **Middleware Protection**: A custom `authMiddleware` on the backend validates the token signature and expiration before processing requests.
*   **Role-Based Access**: Specialized logic prevents unverified users from claiming "Locked" premium deals, ensuring tier-based access control.

## Internal Flow of Claiming a Deal

1.  **User Action**: User clicks "Claim Deal" on a specific deal page.
2.  **API Request**: A `POST` request is sent to `/api/claims` with the `dealId`.
3.  **Backend Verification Loop**:
    *   **Auth Check**: Is the JWT valid?
    *   **Availability**: Is the deal active?
    *   **Eligibility**: If the deal is "locked", is the `user.isVerified` flag true?
    *   **Duplication**: Has this user already claimed this specific deal?
4.  **Transaction**: If checks pass, a `Claim` record is created in MongoDB.
5.  **Response**: The frontend receives the success signal and redirects the user to the Dashboard to view their new asset.

## Setup & Running

**Prerequisites**: Node.js, MongoDB URI.

1.  **Clone Repository**
2.  **Backend Setup**:
    ```bash
    cd server
    npm install
    # Create .env file with:
    # MONGO_URI=your_mongodb_uri
    # JWT_SECRET=your_jwt_secret
    # PORT=5001
    npm run dev
    ```
    *Seeding Data*: `node seeder.js` (Run this to populate initial deals).

3.  **Frontend Setup**:
    ```bash
    cd client
    npm install
    npm run dev
    ```
    Access at `http://localhost:3000`.

## Tech Stack & Design Decisions

*   **Next.js 15 (App Router)**: Chosen for its robust routing and server-side rendering capabilities.
*   **Tailwind CSS & Liquid Glass**: Custom `glass-liquid` utility classes were created to achieve a high-end, tactile feel with advanced backdrop blurs and borders.
*   **Framer Motion**: Used extensively for stagger animations, page transitions, and micro-interactions to create a "living" UI.
*   **Three.js (R3F)**: A custom particle system was built for the Hero background to provide depth without the performance overhead of heavy libraries.
*   **Node/Express & MongoDB**: A flexible, scalable backend architecture perfect for rapid iteration and document storage.

## Known Limitations & Future Improvements

*   **Auth Storage**: Currently using LocalStorage for simplicity in this demo environment. Production builds should migrate to HttpOnly cookies to prevent XSS.
*   **Email Integration**: A real-world version would trigger transactional emails (via SendGrid/Resend) upon successful claims.
*   **Verification Flow**: Currently manual/mocked. A production version would integrate with APIs like Stripe Identity or LinkedIn for automated verification.
