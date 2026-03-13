# Riley Test Widget - Deployment Instructions

This widget lets you test Riley (your RealWealth AI voice agent) in a browser.

---

## Prerequisites

1. **Retell API Key** - Get from https://dashboard.retellai.com → Settings → API Keys
2. **Agent ID** - Your Riley agent ID from Retell dashboard
3. **GitHub account** - https://github.com
4. **Railway account** - https://railway.app (free tier works)

---

## Step 1: Create GitHub Repository

### 1.1 Go to GitHub
Open https://github.com/new

### 1.2 Create repository
- **Repository name:** `riley-test-widget`
- **Visibility:** Private (recommended) or Public
- Click **Create repository**

### 1.3 Upload files
On the repository page, click **"uploading an existing file"** link

Upload ALL these files from the widget folder:
- `server.js`
- `package.json`
- `.gitignore`
- `public/index.html`
- `public/app.js`
- `public/bundle.js`

**Important:** Make sure to maintain the folder structure. The `public` folder should contain `index.html`, `app.js`, and `bundle.js`.

Click **Commit changes**

---

## Step 2: Deploy to Railway

### 2.1 Sign in to Railway
Go to https://railway.app and sign in with GitHub

### 2.2 Create new project
1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Select your `riley-test-widget` repository
4. Click **Deploy Now**

### 2.3 Add environment variables
1. Click on your deployed service
2. Go to **Variables** tab
3. Click **+ Add Variable** and add:

| Variable Name | Value |
|--------------|-------|
| `RETELL_API_KEY` | Your Retell API key (starts with `key_`) |
| `AGENT_ID` | Your Riley agent ID (e.g., `agent_abc123...`) |
| `PORT` | `8080` |

4. Railway will auto-redeploy after adding variables

### 2.4 Generate public URL
1. Go to **Settings** tab
2. Scroll to **Networking** section
3. Click **Generate Domain**
4. You'll get a URL like: `riley-test-widget-production.up.railway.app`

---

## Step 3: Test Your Widget

1. Open your Railway URL in a browser
2. Click **Start Call**
3. Allow microphone access when prompted
4. Speak with Riley!

---

## Troubleshooting

### "Failed to create call" error
- Check that `RETELL_API_KEY` is correct in Railway Variables
- Check that `AGENT_ID` is correct in Railway Variables
- Verify your Retell account has credits

### No audio / microphone issues
- Make sure you're using HTTPS (Railway provides this)
- Check browser microphone permissions
- Try a different browser (Chrome recommended)

### Deploy failed
- Check Railway logs for errors
- Make sure all files were uploaded to GitHub
- Verify `public/bundle.js` exists (this is the compiled frontend)

---

## Files Overview

| File | Purpose |
|------|---------|
| `server.js` | Express server that calls Retell API |
| `package.json` | Node.js dependencies |
| `public/index.html` | Frontend UI |
| `public/app.js` | Frontend source code |
| `public/bundle.js` | Compiled frontend (auto-generated) |

---

## Local Testing (Optional)

If you want to test locally before deploying:

```bash
cd riley-test-widget
npm install
RETELL_API_KEY=your_key AGENT_ID=your_agent_id npm start
```

Then open http://localhost:8080

---

## Support

- Retell AI Docs: https://docs.retellai.com
- Railway Docs: https://docs.railway.app
