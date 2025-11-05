# 📧 Email Writer Assistant — Chrome Extension & Application


## 🚀 Overview

SmartAI Email Assistant helps you write smart, context-aware replies using AI — both as a Chrome Extension for Gmail and a dedicated web app.

It automatically generates responses based on the email content and your chosen tone — powered by a secure backend hosted online.

* 🧩 Chrome Extension: Instantly generates replies inside Gmail.
* 🌐 Frontend Web App: Type or paste an email and get a polished AI-generated response.
* ⚙️ Backend API: Secure Spring Boot service hosted online and integrated with Gemini AI.

**🔗 Check it out :** [https://smartai-email-assistant.netlify.app/](https://smartai-email-assistant.netlify.app/)


## ✨ Features

✅ AI-powered email reply generation
🎭 Multiple tones — Professional, Friendly, Formal, Casual, and more
💬 Seamless Gmail integration via Chrome Extension
⚡ Real-time response generation
💯 100% free — no setup or API key required


## 🧩 Folder Structure

```
Email-Writer-Assistant/
│
├── backend/ # Already deployed backend (you don't need to touch this)
│
├── extension/ # Chrome extension source
│ ├── manifest.json
│ ├── content.js
│ ├── content.css
│
├── frontend/ # React frontend (Netlify deployed)
│
└── README.md
```


## 💡 How It Works

### 🧠 Chrome Extension

1\. The Chrome Extension detects when you open Gmail.

2\. It adds an “AI Reply” button inside the email toolbar.

3\. When clicked, it sends the email text and tone choice to the hosted backend.

4\. The backend generates and inserts a smart reply automatically.

### 🌐 Web App

1\. Visit [https://smartai-email-assistant.netlify.app/](https://smartai-email-assistant.netlify.app/).

2\. Paste any email content.

3\. Select tone and click Generate Reply.

4\. Copy or use the AI-generated response instantly.


## 🛠️ Setup Guide for Extension

Follow these steps to install and use the Email Writer Assistant on your computer.

### 🟦 Step 1 — Download the Extension
    
1\. Click on the green Code button above, then choose Download ZIP.

2\. Extract the ZIP file on your computer.

3\. Open the extracted folder and find the extension folder.


### 🟩  Step 2 — Load Extension into Chrome

1\. Open Google Chrome.

2\. Go to: 👉 [chrome://extensions/](chrome://extensions/)

3\. Turn on Developer mode (top-right corner).

4\. Click Load unpacked.

5\. Select the extension folder you extracted earlier.

6\. The Email Writer Assistant icon will appear in your extensions bar.


### 🟨 Step 3 — Use in Gmail

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

* Frontend: 
    * Application: React (Vite), Material UI, Framer Motion
    * Chrome Extension: JavaScript, HTML, CSS
* Backend: Spring Boot (Java)
* AI Engine: Gemini API
* Hosting: 
    * Frontend → Netlify
    * Backend → Render

