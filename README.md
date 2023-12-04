# Problem Statement

In our busy lives, it's hard to keep track of everything we need to do. Current methods, such as handwritten notes or generic to-do apps, lack the features needed for  daily task management. I've developed a user-friendly task management website inspired by Trello, designed specifically for individuals. It allows easy organization of tasks with customizable boards.

## Target Users

This site is built for all se­eking a simple and spee­dy way to monitor routine responsibilities. If you're­ aiming to stay orderly and get things done, this application is made­ just for you!

## Demo

URL - https://trello-two-iota.vercel.app/

## Project summary

In building this task management website, creating smooth drag-and-drop task functionality with React Beautiful DND was a bit tricky. Another exciting challenge was integrating Google OAuth for secure user logins, involving navigation through Google Cloud Console and implementing Google Login securely.

## Component Tree Diagram
![Untitled-2023-12-04-1110](https://github.com/Hukumchand-Narwre/SnapList/assets/85044429/2cb54993-d5e9-4f8c-bca5-1a87673c7d1c)


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
git clone [https://github.com/Hukumchand-Narwre/trello.git](https://github.com/Hukumchand-Narwre/SnapList.git)
```
- **2. Navigate to project directory**
```bash
cd snapList
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
