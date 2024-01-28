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
- `/api/users`
- `/api/videos`
- `/api/comments`

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
