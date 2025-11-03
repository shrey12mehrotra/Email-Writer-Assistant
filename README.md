# 📧 Email Writer Assistant — Chrome Extension


## 🚀 Overview

Email Writer Assistant is a free Chrome Extension that helps you write quick, polished replies in Gmail using AI.

It automatically generates responses based on the email content and your chosen tone — powered by a secure backend hosted online.


## ✨ Features

🧠 AI-generated email replies inside Gmail

🎭 Choose your reply tone — Professional, Friendly, Casual, Formal, etc.

💬 Works directly in Gmail’s compose window

💯 100% free — no setup or API key needed


## 🧩 Folder Structure

Email-Writer-Assistant/

│
├── backend/           # Already deployed backend (you don't need to touch this)
│
├── extension/         # Chrome extension source
│   ├── manifest.json
│   ├── content.js
│   ├── content.css
│   
│
└── README.md


## 🧠 How It Works

1\. The Chrome Extension detects when you open Gmail.

2\. It adds an “AI Reply” button inside the email toolbar.

3\. When clicked, it sends the email text and tone choice to the hosted backend.

4\. The backend generates and inserts a smart reply automatically.


## 🛠️ Setup Guide

Follow these steps to install and use the Email Writer Assistant on your computer.

### 🟦 Step 1 — Download the Extension
    
1\. Click on the green Code button above, then choose Download ZIP.

2\. Extract the ZIP file on your computer.

3\. Open the extracted folder and find the extension folder.


### 🟩  Step 2 — Load Extension into Chrome

1\. Open Google Chrome.

2\. Go to: 👉 chrome://extensions/

3\. Turn on Developer mode (top-right corner).

4\. Click Load unpacked.

5\. Select the extension folder you extracted earlier.

6\. The Email Writer Assistant icon will appear in your extensions bar.


**<span style="color:blue; font-weight:bold;">Step 3 — Use in Gmail</span>**

1\. Go to Gmail

2\. Click Compose to open a new message.

3\. You’ll see an AI Reply button in the bottom toolbar.

4\. Click it → choose a tone (Professional, Friendly, etc.) → your AI reply will appear automatically in the compose box.


## ⚙️ Backend Information

The backend is already hosted online, so you don’t need to run anything locally.

The extension automatically connects to:

https://email-writer-assistant-s3kc.onrender.com/api/email/generate

If this URL ever changes, open the content.js file and update this line:

const response = await fetch('https://email-writer-assistant-s3kc.onrender.com/api/email/generate', {


## 💡 Troubleshooting

* If the AI Reply button doesn’t appear, refresh Gmail and open a new compose window.
* Make sure Developer Mode is enabled in Chrome extensions.
* If the reply doesn’t generate, check the console log (Ctrl + Shift + I → Console) for details.


## 🧰 Tech Stack

* Frontend: Chrome Extension (JavaScript, HTML, CSS)
* Backend: Spring Boot (Java)
* AI Engine: Gemini API
* Hosting: Render (Free Tier)


## 🧑‍💻 Developed By

Email Writer Assistant is built and maintained by **Shrey Mehrotra**.

It’s free to use, open-source, and designed to make email writing effortless.

