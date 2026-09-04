# RadheOS Portfolio - Deployment Guide

## 🚀 Deploy to GitHub Pages (Free Hosting)

Your portfolio is configured for GitHub Pages with `base: './'` in vite.config.js, so it's ready to deploy!

### Step 1: Install Git

Open PowerShell as Administrator and run:
```powershell
winget install --id Git.Git -e --source winget
```

After installation, **close and reopen PowerShell** for Git to be available.

### Step 2: Create a GitHub Account (if needed)

1. Go to https://github.com/signup
2. Create your free account
3. Verify your email

### Step 3: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you prefer)
3. Description: "RadheOS - Interactive macOS Portfolio for Radhe Patel | CPA Candidate 2027"
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** check "Add a README file"
6. Click "Create repository"

### Step 4: Push Your Code to GitHub

Open PowerShell in your portfolio folder:

```powershell
cd "C:\Users\patel\Downloads\Patel_Radhe_Portfolio"

# Initialize git repository
git init

# Configure your identity (use your GitHub email and name)
git config user.name "Your Name"
git config user.email "your-github-email@example.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: RadheOS Portfolio with Gehra Hua audio and cinematic intro"

# Connect to your GitHub repository (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Deploy to GitHub Pages

Two options:

#### Option A: Using GitHub Actions (Automated - Recommended)

1. Create `.github/workflows/deploy.yml` (I'll create this file for you below)
2. Push the changes
3. GitHub will automatically build and deploy on every push

#### Option B: Manual Deployment

```powershell
# Build the site
npm run build

# Install gh-pages package
npm install -D gh-pages

# Deploy to GitHub Pages
npx gh-pages -d dist
```

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: Select `gh-pages` → `/root` → Save
4. Wait 1-2 minutes

Your site will be live at:
```
https://YOUR-USERNAME.github.io/portfolio/
```

## 🎯 Testing Locally Before Deploying

### Test the Production Build:

```powershell
# Build the production version
npm run build

# Preview the production build
npm run preview
```

Then open the URL shown (usually http://localhost:4173) in your browser.

### Test in Different Browsers:

- ✅ Chrome/Edge (Chromium) - Best support
- ✅ Firefox - Full support
- ✅ Safari - Full support (macOS/iOS)
- ✅ Mobile browsers (test responsive design)

## 📱 Sharing on LinkedIn

Once your site is live on GitHub Pages:

### Create a LinkedIn Post:

**Option 1: Direct Post**
1. Click "Start a post" on LinkedIn
2. Write your message:
   ```
   🎨 Excited to share my interactive portfolio – RadheOS!

   I built a macOS-inspired portfolio featuring:
   ✅ Cinematic typewriter intro with Web Audio API
   ✅ Interactive turntable with vinyl record player
   ✅ Full desktop environment with draggable windows
   ✅ Live PDF resume viewer and project browser
   ✅ Terminal CLI interface

   Built with React, Vite, and modern web technologies.
   Check it out: [YOUR-GITHUB-PAGES-URL]

   #WebDevelopment #Portfolio #ReactJS #WebDesign #CPACandidate #TowsonUniversity
   ```
3. Add a screenshot or screen recording of your portfolio
4. Post!

**Option 2: Add to LinkedIn Profile**

1. Go to your LinkedIn profile
2. Click **"Add profile section"** → **"Featured"** → **"Add link"**
3. Paste your GitHub Pages URL
4. Title: "RadheOS - Interactive Portfolio"
5. Description: Brief description of your portfolio
6. Add a thumbnail/screenshot
7. Save

### LinkedIn Profile Sections to Update:

✅ **Headline**: "Accounting Student | CPA Candidate 2027 | Tax Associate & Process Builder"

✅ **About Section**: Add your portfolio link prominently

✅ **Projects Section**: Add "RadheOS Portfolio" as a project with your live URL

## 🔒 Access & Privacy

**GitHub Pages is PUBLIC** - Anyone with the link can access your site, which is perfect for:
- ✅ Sharing on LinkedIn, resume, and applications
- ✅ Recruiter and employer access
- ✅ Portfolio reviews and networking
- ✅ Including in email signatures

**Your Repository:**
- Set to **Public** = Anyone can view the code (shows your skills!)
- Set to **Private** = GitHub Pages requires GitHub Pro (paid)

## 🌐 Custom Domain (Optional)

Want a custom domain like `radhepatel.com`?

1. Buy a domain from Namecheap, GoDaddy, or Google Domains ($10-15/year)
2. Add a `CNAME` file to your `public/` folder with your domain
3. Configure DNS settings (GitHub provides instructions)
4. Your portfolio will be at `https://radhepatel.com`

## 📊 Track Visitors (Optional)

Add free analytics to see who visits:

**Google Analytics:**
1. Create account at https://analytics.google.com
2. Get tracking ID
3. Add to `index.html` in the `<head>` section

**Cloudflare Web Analytics:**
1. Free, privacy-friendly alternative
2. Sign up at https://www.cloudflare.com/web-analytics
3. Add script to `index.html`

## ⚡ Quick Deployment Checklist

- [ ] Git installed
- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Site is live and accessible
- [ ] Tested on multiple devices/browsers
- [ ] Added to LinkedIn profile
- [ ] Shared on LinkedIn
- [ ] Added to resume
- [ ] Included in email signature

## 🐛 Troubleshooting

**Site shows 404:**
- Wait 2-3 minutes after enabling GitHub Pages
- Check branch is set to `gh-pages` or `main`
- Verify `base: './'` in vite.config.js

**Audio doesn't play:**
- Users must interact (click "Enter Portfolio") before audio plays (browser security)
- Check browser console for errors
- Verify audio files are in `public/` folder

**Fonts look wrong:**
- Check browser console for font loading errors
- Google Fonts CDN should be accessible

**Windows showing behind each other:**
- This is normal macOS behavior!
- Click a window to bring it to front

## 📧 Support

Need help? Common resources:
- GitHub Pages Docs: https://docs.github.com/en/pages
- Vite Deployment: https://vite.dev/guide/static-deploy.html
- LinkedIn Help: https://www.linkedin.com/help

---

**Your portfolio is now ready to share with recruiters, employers, and your network! 🎉**
