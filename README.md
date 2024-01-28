# VidShare

VidShare is a video-sharing platform where users can seamlessly upload, share, and engage with a community of viewers. Similar to popular platforms like YouTube, VidShare allows users to upload their videos, receive comments, likes, and dislikes, and build a following. Whether you're a content creator looking to showcase your talent or a viewer exploring diverse content, VidShare provides a user-friendly and interactive experience for all. Join the VidShare community and start sharing your stories through the power of video.

## Table of Contents

- [VidShare](#vidshare)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [API Routes](#api-routes)
  - [Controllers](#controllers)
  - [Models](#models)
    - [User Model](#user-model)
    - [Video Model](#video-model)
    - [Comment Model](#comment-model)
  - [Environment Variables](#environment-variables)


## Prerequisites

Before getting started with VidShare, make sure you have the following prerequisites installed and configured:

1. Node.js and npm: Ensure Node.js is installed. You can download it from nodejs.org.
2. MongoDB: Install and set up MongoDB on your machine. Visit mongodb.com for installation instructions.
3. Git: Install Git for version control. You can find installation instructions at git-scm.com.
4. Environment Variables: Create a .env file in the project root with the following variables:
   - MONGO_URL: MongoDB connection URL.

## Installation

Follow these steps to set up VidShare on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/arunvbiradar/vidshare.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd vidshare
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Set Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables and replace `<your-mongo-url>` with your MongoDB connection URL:
     ```env
     MONGO_URL=<your-mongo-url>
     ```

5. **Run the Application:**
   ```bash
   npm start
   ```

6. **Access VidShare:**
   - Open your web browser and visit `http://localhost:8800`.


## API Routes

- `/api/auth`
  - `/api/auth/signup/` - Create new users; POST method
  - `/api/auth/signin/` - Login user using email; POST method
  - 
- `/api/users`
  - `/api/users/:id` - Update user; PUT method
  - `/api/users/:id` - Delete user; DELETE method
  - `/api/users/` - Fetch all users; GET method
  - `/api/users/:id` - Fetch single user detail; GET method
  - `/api/users/subscribe/:id` - Subscribe to a channel; PUT method
  - `/api/users/unsubscribe/:id` - Unsubscribe to a channel; PUT method
  - `/api/users/like/:videoId` - Like a video; PUT method
  - `/api/users/dislike/:videoId` - Dislike a video; PUT method
- `/api/videos`
  - `/api/videos/` - Add a video; POST method
  - `/api/videos/:id` - Delete a video; DELETE method
  - `/api/videos/:id` - Update a video; PUT method
  - `/api/videos/view/:id` - Update video view; PUT method
  - `/api/videos/` - Fetch all video; GET method
  - `/api/videos/find/:id` - Fetch a single video; GET method
  - `/api/videos/trending` - Fetch trending videos; GET method
  - `/api/videos/random` - Fetch random videos; GET method
  - `/api/videos/subsribed` - Fetch subscribe videos; GET method
  - `/api/videos/tags?tags=tag1,tag2` - Fetch videos by tags; GET method
  - `/api/videos/search?q=title` - Search video by video title; GET method
- `/api/comments`
  - `/api/comments/` - Add a comment; POST method
  - `/api/comments/:id` - Delete a comment; DELETE method
  - `/api/comments/:videoId` - Fetch all video comments; GET method

## Controllers

- `auth.controller.js`
- `user.controller.js`
- `video.controller.js`
- `comment.controller.js`

## Models

### User Model

- `user.model.js`:
  - name (String, Required, Unique)
  - email (String, Required, Unique)
  - password (String, Required)
  - img (String)
  - subscribers (Number, Default: 0)
  - subscribedUsers (Array of Strings)
  - timestamps (Created at, Updated at).

### Video Model

- `video.model.js`:
  - userId (String, Required)
  - title (String, Required)
  - desc (String, Required)
  - imgUrl (String, Required)
  - videoUrl (String, Required)
  - views (Number, Default: 0)
  - tags (Array of Strings, Default: [])
  - likes (Array of Strings, Default: [])
  - dislikes (Array of Strings, Default: [])
  - timestamps (Created at, Updated at)

### Comment Model

- `comment.model.js`:
  - userId (String, Required)
  - videoId (String, Required)
  - desc (String, Required)
  - timestamps (Created at, Updated at)

## Environment Variables

- `MONGO_URL`: MongoDB connection URL.
- `JWT_SECRET`: Json web token secret
