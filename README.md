
# Social Media App

Description

Build a simple social media app using React. The app should allow users to create accounts, post updates, and follow other users. Users should also be able to see the updates of the users they follow.

# Table of Contents

- [Pre Requisites](#pre-requisites)
- [Presentation](#Presentation)
- [Solutions for the Social Media App](#Solutions-for-the-Social-Media-App)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Unit Testing](#unit-testing)
- [API Documentation](#api-documentation)
- [Screenshot](#screenshot)
- [App Flow](#app-flow)
- [HCI and KPI metrics](#HCI-and-KPI-metrics)

# Pre Requisites:

- Frontend: React.js, Context API
- Backend: Node.js
- Testinig: React Testing Library

# Presentation
https://docs.google.com/presentation/d/1-XNDArnDgHuctROszJysLdIaPnTMyZbX9XJxmoUcw8M/view

# Solutions for the Social Media App

**Frontend:**
- React.js for building the user interface due to its strong community support.
- Context API for state management, providing a centralized data store.
- React Router for different views, such as login, profile, and feed
- Responsive design with CSS and media queries.
- React Testing Library for testing the frontend components to ensure quality and reliability.

**Backend:**
- Node.js chosen for the backend.
- Express.js for RESTful API development.
- jwt-based authentication and authorization for security.

# Folder Structure
![FS](https://github.com/Mirza-Hassan/React_social_media_app/assets/17096257/9466d321-9c4e-4cac-ac22-277f72d3b019)

# Setup Instructions

Clone the repository
- Run `git clone https://github.com/Mirza-Hassan/React_social_media_app.git` 

1. Navigate to the `frontend` directory and install dependencies: `npm install`

2. Start the development server: ` npm start`

3. In the `backend` directory, install dependencies: `npm install`

4. Launch the backend application: `node server.js`

# Unit Testing

1. Install the required testing packages using npm:
```
npm install --save-dev jest @testing-library/react @testing-library/jest-dom react-router-dom
```
2. To run your tests, use Jest by running the following command:
```
npm test
```

![test](https://github.com/Mirza-Hassan/React_social_media_app-New/assets/17096257/9571ce90-1e3a-4792-ba09-08493aa19c94)

# API Documentation

## Register User

- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**: 
  - `username` (string): User's username
  - `password` (string): User's password
- **Response**: 
  - `200 OK` on successful registration
  - `400 Bad Request` if registration fails

## Login User

- **URL**: `/login`
- **Method`: `POST`
- **Description**: Logs in an existing user.
- **Request Body**: 
  - `username` (string): User's username
  - `password` (string): User's password
- **Response**: 
  - `200 OK` on successful login, with user authentication token
  - `401 Unauthorized` if login fails

## Create Post

- **URL**: `/posts`
- **Method**: `POST`
- **Description**: Creates a new post.
- **Request Body**: 
  - `content` (string): Content of the post
- **Response**: 
  - `201 Created` on successful post creation
  - `401 Unauthorized` if user is not logged in

## Update Post

- **URL**: `/posts/:id`
- **Method**: `PUT`
- **Description**: Updates an existing post.
- **Request Parameters**: 
  - `id` (string): Post ID
- **Request Body**: 
  - `content` (string): Updated content of the post
- **Response**: 
  - `200 OK` on successful update
  - `401 Unauthorized` if user is not the author of the post
  - `404 Not Found` if the post with the given ID doesn't exist

## Get All Posts

- **URL**: `/posts`
- **Method**: `GET`
- **Description**: Retrieves all posts.
- **Response**: 
  - `200 OK` with a list of posts

## Get All Users

- **URL**: `/allUsers`
- **Method**: `GET`
- **Description**: Retrieves all registered users.
- **Response**: 
  - `200 OK` with a list of users

## Follow/Unfollow User

- **URL**: `/followUnfollow`
- **Method**: `POST`
- **Description**: Follows or unfollows another user.
- **Request Body**: 
  - `userId` (string): ID of the user to follow/unfollow
  - `action` (string): 'follow' or 'unfollow'
- **Response**: 
  - `200 OK` on successful action
  - `401 Unauthorized` if user is not logged in

## Send Message

- **URL**: `/messages`
- **Method**: `POST`
- **Description**: Sends a message to another user.
- **Request Body**: 
  - `recipientId` (string): ID of the recipient user
  - `message` (string): Content of the message
- **Response**: 
  - `200 OK` on successful message sent
  - `401 Unauthorized` if user is not logged in

## Get Messages

- **URL**: `/messages/:userId1/:userId2`
- **Method**: `GET`
- **Description**: Retrieves messages between two users.
- **Request Parameters**: 
  - `userId1` (string): ID of the first user
  - `userId2` (string): ID of the second user
- **Response**: 
  - `200 OK` with a list of messages

# Screenshot

![RR](https://github.com/Mirza-Hassan/React_social_media_application/assets/17096257/da7c629a-574a-453a-90a6-1248b02c010b)
![RR1](https://github.com/Mirza-Hassan/React_social_media_application/assets/17096257/2aab5392-f337-475c-a0b9-7ab1cdc8031c)
![RR2](https://github.com/Mirza-Hassan/React_social_media_app/assets/17096257/249ac667-585d-422f-b100-8b8340fd01b5)

# App Flow
[app_flow.webm](https://github.com/Mirza-Hassan/React_social_media_app/assets/17096257/2f5bcd6d-77ff-438c-8773-51f0e48d96ac)

# HCI and KPI metrics 

1. User Satisfaction: Measured by System Usability Scale (SUS) for HCI and Customer Satisfaction Score (CSAT) for KPIs.

2. User Engagement: Measured by Time on Task (HCI) and Average Session Duration (KPI).

3. Conversion Rate: Assessing task success (HCI) and Conversion Rate (KPI).

4. Error Rates: Assessing user errors (HCI) and overall Error Rate (KPI).

5. Page Load Speed: Critical for both HCI and KPIs.

6. Accessibility: Ensuring accessibility is a shared concern for both HCI and KPI measurement.

7. Click-Through Rate (CTR): Relevant for both interface analysis (HCI) and digital marketing (KPI).

These metrics can be used to assess user experience, system performance, and the overall success of a tool or system in both HCI and KPI contexts.

HCI Metrics Tools: Google Analytics, UserZoom, Hotjar, SurveyMonkey, Typeform.

KPI Metrics Tools: Google Analytics, Tableau, Salesforce, Hootsuite, Trello.
