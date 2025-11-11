# Crowd Catch
A simple web application for uploading images directly to an AWS S3 bucket. This project consists of a React frontend and a Node.js backend.

# Getting Started
Follow these instructions to get the project running on your local machine.

**1. Backend (Node.js)**

The backend server handles the file upload logic and communication with AWS S3.

**Run the server:**

Navigate to the backend directory:

```
cd backend
```

**Install the required npm packages:**

```
npm install
```

Set up your environment variables: Create a new file named .env in the backend directory. Add your AWS credentials and S3 bucket details:

```
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY_HERE
AWS_REGION=YOUR_BUCKET_REGION_HERE
S3_BUCKET_NAME=YOUR_BUCKET_NAME_HERE
```
**Start the server:**
```
npm run start
```
The server will be running on http://localhost:8000.

**2. Frontend (React)**

The frontend provides the user interface for selecting and previewing a photo before uploading.

**Run the client:**

Open a new terminal window and navigate to the frontend directory:

```
cd frontend
```

**Install the required npm packages:**

```
npm install
```

**Start the React development server:**

```
npm run start
```

The application will automatically open in your browser, usually at http://localhost:3000.
