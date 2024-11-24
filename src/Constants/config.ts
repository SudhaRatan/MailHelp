export const API_URL = "http://localhost:3000";
export const API_URL1 = "https://mailhelpbackend.onrender.com";

export const scopes = [
  "https://www.googleapis.com/auth/gmail.send", // Send emails
  "https://www.googleapis.com/auth/gmail.readonly", // Read emails
  "https://www.googleapis.com/auth/gmail.modify", // Modify emails (for replies)
  "https://www.googleapis.com/auth/gmail.compose", // Create emails
  "https://www.googleapis.com/auth/gmail.labels", // Manage labels
  // "https://www.googleapis.com/auth/gmail.threads.readonly", // Read email threads
];
