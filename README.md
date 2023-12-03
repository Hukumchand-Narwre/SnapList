# Problem Statement

In our busy lives, it's hard to keep track of everything we need to do. Current methods, such as handwritten notes or generic to-do apps, lack the features needed for  daily task management. I've developed a user-friendly task management website inspired by Trello, designed specifically for individuals. It allows easy organization of tasks with customizable boards.

## Target Users

This site is built for all se­eking a simple and spee­dy way to monitor routine responsibilities. If you're­ aiming to stay orderly and get things done, this application is made­ just for you!

## Demo

URL - https://trello-two-iota.vercel.app/

## Project summary

Implementing dynamic drag-and-drop functionality for tasks and columns using react-beautiful-dnd posed a challenge. I needed to ensure a smooth user experience while handling state changes

Integrating Google OAuth for user authentication was a new and exciting challenge. Navigating through the Google Cloud Console, understanding OAuth flows, and securely implementing Google Login

# Technologies Used

- **Next.js:** The project is built on Next.js
  
- **Zustand:** Zustand is used for state management, offering a simple and efficient solution to handle application state.

- **Tailwind CSS:** Tailwind CSS is employed for styling, allowing for rapid development and easy customization with utility-first classes.

- **React Beautiful DND:** React Beautiful DND is used to implement dynamic drag-and-drop functionality

- **Appwrite:** Appwrite is a no-code database service that provides a simple and powerful way for developers to build custom database solutions

- **@react-oauth/google:** React OAuth Google is a library that allows developers to create applications that integrate with the Google OAuth2 API using the React JavaScript library
  
- **Vercel:** Project is deployed on vercel

## Local Installation Guide

Follow these steps to set up the project on your local machine:

- **Prerequisites -**
Ensure you have Node.js installed:

You can download and install Node.js from https://nodejs.org/

**Installation steps**
- **1. Clone the repository**
```bash
git clone https://github.com/Hukumchand-Narwre/trello.git
```
- **2. Navigate to project directory**
```bash
cd trello
```
- **3. Install dependencies**
```bash
npm install
```
- **4. Configure environment variables:**
Create the .env.local file in root directory of the project  and create the following variables.
```bash
NEXT_PUBLIC_APPWRITE_PROJECT_ID
NEXT_PUBLIC_DATABASE_ID
NEXT_PUBLIC_COLLECTION_ID
NEXT_PUBLIC_GOOGLEAUTH_ID
```
Update the variables with your configuration.
- **5. Run the project**
```bash
 npm run dev
```
