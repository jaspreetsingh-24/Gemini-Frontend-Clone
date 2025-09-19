
# Gemini Frontend Clone

This project is a frontend clone of a Gemini-style conversational AI chat application, built as an assignment for the Frontend Developer role at Kuvaka Tech.

The application is built using **React + Vite**, with **Zustand** for state management and **Tailwind CSS** for styling.

**Live Demo:** [https://gemini-frontend-clone-j2a7giys6-jaspreeth-singh-rajs-projects.vercel.app/]


## Pages Description

The application consists of two main screens:

### 1\. Login Page

This is the entry point of the application. The user is presented with a form to:

1.  Select a country code from a dropdown.
2.  Enter their phone number.
3.  Clicking the "Send OTP" button triggers a toast notification to confirm the action. After a short delay (simulated using `setTimeout`), an OTP input field appears.
4.  The user can enter the hardcoded OTP, which is **`123456`**, to successfully log in and be redirected to the dashboard.

### 2\. Dashboard Page

After successful authentication, the user lands on the dashboard. This page is designed to serve as the main hub where a list of the user's chatrooms is displayed.

-----

##   Tech Stack

  * **Framework:** React (with Vite)
  * **State Management:** Zustand
  * **Styling:** Tailwind CSS

-----

## \#\# Getting Started


### Prerequisites

You need to have Node.js and npm.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/jaspreetsingh-24/Gemini-Frontend-Clone.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Gemini-Frontend-Clone 
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```

open `http://localhost:5173` in browser.


-----

## \#\# Issues

  * **Dark Mode Toggle:** The dark mode toggle feature is included in the UI but is currently not functional. I plan to fix this in a future update.
