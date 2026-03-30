# Blogg App Assessment

## ⚡ Tech Stack
* **Backend:** PayloadCMS
* **Database:** MongoDB
* **Frontend:** Next.js 

---

## 🔧 Setup Instructions

### Local Development
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run PayloadCMS:**
    ```bash
    npm run dev
    ```

### Required Environment Variables
Create a `.env` file in your root directory:
* `MONGODB_URL`: Your MongoDB connection string.
* `PAYLOAD_SECRET`: A secure string for sessions.
* `NEXT_PUBLIC_SERVER_URL`: `http://localhost:3000` (Local) or your live Backend URL.

---

## 🔑 Authentication Flow
The application uses PayloadCMS’s built-in authentication system:

* **Sign Up/Login:** Users create accounts via the Next.js frontend, which communicates with the Payload `/api/users` endpoint. If they already have an account they can just login

* **Session Management:** Upon successful login, a JWT (JSON Web Token) is generated to manage the user's session. After a while of inacivity the user is logout 

* **Access Control:** Only authenticated users can access the dashboard, after accessing the dashboard the user can see post from other user, create post and see the posts they publish.

---

## 🖼 Frontend Integration
* **The Request:** When a user opens the blog, Next.js sends a "Get" request to the PayloadCMS API (e.g., /api/posts).

* **The Content:** PayloadCMS sends back the blog data in a structured format called JSON. This includes the title, the body text, and information about the author.

* **The Relationship:** Because the Posts and Users collections are linked, Payload automatically includes the Author's name in the data so the frontend can display it immediately.

* **Live Updates:** Since the frontend is connected to the live Payload API, any post created in the Admin Dashboard appears on the website instantly.

---

## ☁️ Deployment
* **Frontend:** Hosted on **Vercel**, linked directly to the GitHub repository for CI/CD.
* **Backend:** 
* **Database:** MongoDB Atlas.

---

## 📖 Usage
1.  Open the web app
2.  **Sign Up** for a new account
3.  **Log In** to access the dashboard
4.  **Create a Post** by filling out the title, category and content.
5.  View your post on the home feed, where your **Author Name** will be automatically displayed.
