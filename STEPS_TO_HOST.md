# Step-by-step: Put Hidden London on GitHub and get a link for Tess

Do these in order. If you get stuck, stop and fix that step before going on.

---

## Part 1: Get your project on GitHub

### Step 1: Install Git (if you don’t have it)

1. Open a browser and go to: **https://git-scm.com/downloads**
2. Click the download for **macOS**.
3. Run the installer and follow the prompts (you can leave most options as default).
4. When it’s done, open **Terminal** (search “Terminal” in Spotlight).
5. Type: `git --version` and press Enter.
6. If you see something like `git version 2.x.x`, you’re good. If you see “command not found,” the install didn’t work—try the install again.

---

### Step 2: Create a GitHub account (if you don’t have one)

1. Go to: **https://github.com**
2. Click **Sign up**.
3. Enter email, password, and a username (e.g. your name or “hidden-london”).
4. Verify your email if GitHub asks you to.
5. You’re in when you see your GitHub home page.

---

### Step 3: Create a new empty repo on GitHub

1. On GitHub, click the **+** in the top right and choose **New repository**.
2. **Repository name:** type something like `hidden-london` or `christmas-2025`. (No spaces.)
3. Leave it **Public**.
4. **Do not** check “Add a README” or “Add .gitignore”—we already have files. Leave everything unchecked.
5. Click **Create repository**.
6. You’ll see a page that says “Quick setup.” Leave this tab open—you’ll need the repo URL in a few steps. It looks like: `https://github.com/YOUR-USERNAME/hidden-london.git`

---

### Step 4: Open Terminal in your project folder

1. Open **Terminal**.
2. You need to be *inside* the project folder. Type this (then press Enter), but **replace the path** with the real path to your project if it’s different:

   ```bash
   cd "/Users/garrettweiss/Library/Mobile Documents/com~apple~CloudDocs/Gifts/Tess/christmas_2025"
   ```

3. To double-check you’re in the right place, type: `ls` and press Enter. You should see things like `package.json`, `src`, `README.md`. If you see those, you’re in the project folder.

---

### Step 5: Turn this folder into a Git repo and make the first commit

Do these one at a time in Terminal. After each line, press Enter.

1. Tell Git this folder is a repo:

   ```bash
   git init
   ```

2. Add all your project files (the `.gitignore` we added will keep `node_modules` and `dist` from being added):

   ```bash
   git add .
   ```

3. Save this snapshot with a message:

   ```bash
   git commit -m "Initial commit: Hidden London app"
   ```

You should see something like “X files changed.” If you see an error about “user.name” or “user.email,” see the note at the end of this section.

---

### Step 6: Connect your folder to GitHub and push

1. Go back to the GitHub tab—the page for your new repo. Copy the **HTTPS** URL. It looks like:  
   `https://github.com/YOUR-USERNAME/REPO-NAME.git`

2. In Terminal, tell your folder where the remote repo is (paste your URL in place of the one below):

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   ```

   Example: if your username is `kyle` and repo is `hidden-london`, it would be:

   ```bash
   git remote add origin https://github.com/kyle/hidden-london.git
   ```

3. Push your code to GitHub. (Git might ask you to log in or use a “Personal Access Token” — follow the prompts.)

   ```bash
   git branch -M main
   git push -u origin main
   ```

4. Refresh the GitHub page. You should see all your files (src, package.json, README.md, etc.). **Part 1 is done.**

**If Git said “please tell me who you are”:** Run these once (use your real name and the email from your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Then run `git add .` and `git commit -m "Initial commit: Hidden London app"` again.

---

## Part 2: Put the app online with Vercel (so Tess can open a link)

### Step 7: Sign up for Vercel

1. Go to: **https://vercel.com**
2. Click **Sign Up**.
3. Choose **Continue with GitHub** and log in with your GitHub account if asked.
4. If Vercel asks for permissions to see your repos, click **Authorize**. That’s how it will find your project.

---

### Step 8: Import your GitHub repo

1. On Vercel, click **Add New…** (or **Import Project**).
2. You should see a list of your GitHub repos. Find **hidden-london** (or whatever you named it) and click **Import** next to it.
3. On the next screen, **don’t change anything.** Vercel will already have:
   - **Framework Preset:** Vite  
   - **Build Command:** `npm run build`  
   - **Output Directory:** `dist`
4. Click **Deploy**.

---

### Step 9: Wait for the deploy

1. You’ll see a screen that says “Building…” and shows logs. Wait until it says **Congratulations** or **Your project has been deployed** (usually 1–2 minutes).
2. Click **Visit** (or the link they give you). The link will look like:  
   `https://hidden-london-xxxx.vercel.app`  
   and it will start with **https**—that’s what you need for the camera to work.

---

### Step 10: Test the link (especially the camera)

1. Open the **https** link on your phone (or send it to yourself and open it there). Best is **Safari on iPhone** (as in the README).
2. Go through the app until you get to a step that uses the camera.
3. When the browser asks for **Camera** permission, tap **Allow**.
4. Take a photo and make sure it works. If the camera works over that link, it will work for Tess in London too.

---

### Step 11: Send the link to Tess

1. Copy the **https** URL from Vercel (e.g. `https://hidden-london-xxxx.vercel.app`).
2. Send it to Tess (text, email, etc.).
3. Tell her:
   - Open the link on her phone (Safari on iPhone is best).
   - When the site asks for camera access, tap **Allow** so she can take photos at each stop.
   - She can add it to her home screen (Safari: Share → Add to Home Screen) so it feels more like an app.

---

## Quick checklist

- [ ] Git installed (`git --version` works)
- [ ] GitHub account created
- [ ] New repo created on GitHub (no README added)
- [ ] In Terminal: `cd` into project folder
- [ ] `git init` → `git add .` → `git commit -m "Initial commit: Hidden London app"`
- [ ] `git remote add origin <your-repo-URL>`
- [ ] `git branch -M main` → `git push -u origin main`
- [ ] Repo on GitHub shows your files
- [ ] Signed up at vercel.com with GitHub
- [ ] Imported the repo and clicked Deploy
- [ ] Got the **https** link and tested camera on your phone
- [ ] Sent the **https** link to Tess

If you do these in order, you’ll have the project on GitHub and a live link that works for Tess in London, with camera and everything else working.
