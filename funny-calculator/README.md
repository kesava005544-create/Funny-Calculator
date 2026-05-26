# 🎮 FUNNY CALCI — K7 Edition

> A retro arcade-themed calculator with neon aesthetics, sound effects, confetti, and a reactive emoji face!

![Funny Calci Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=for-the-badge&logo=github)

---

## ✨ Features

- 🎨 **Neon Arcade UI** — glowing buttons, scanline display, animated gradient background
- 😄 **Reactive Emoji Face** — the calculator reacts to what you type!
- 🎉 **Confetti Explosion** — fires on big results and equal presses
- 🔊 **Sound Effects** — number pops, equal fanfare, looping background melody
- ⌨️ **Full Keyboard Support** — use your keyboard to type numbers and operators
- 📱 **Mobile Responsive** — works great on all screen sizes
- 🔇 **Sound Toggle** — mute/unmute anytime with the corner button

---

## 📁 File Structure

```
funny-calculator/
├── index.html          ← Main page
├── style.css           ← All styles (retro neon theme)
├── calculator.js       ← All logic + animations
├── README.md           ← This file
└── assets/
    └── sounds/
        ├── mixkit-cartoon-dazzle-hit-and-birds-746.wav   ← Equal sound
        ├── mixkit-funny-cartoon-melody-2881.wav           ← Background music
        └── mixkit-long-pop-2358.wav                       ← Number click sound
```

---

## 🚀 Deploy to GitHub Pages (Step-by-Step)

### 1. Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click **"New repository"** (the green button)
3. Name it: `funny-calculator`
4. Set it to **Public**
5. Click **"Create repository"**

### 2. Upload the Files

**Option A — Upload via GitHub website (easiest):**
1. Open your new repository
2. Click **"Add file" → "Upload files"**
3. Drag the entire `funny-calculator/` folder contents into the upload area
4. Keep the folder structure exactly as shown above
5. Click **"Commit changes"**

**Option B — Using Git (recommended):**
```bash
git init
git add .
git commit -m "🎮 Initial commit - Funny Calci"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/funny-calculator.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **Save**

### 4. Visit Your Live Site! 🎉

After 1-2 minutes, your calculator will be live at:
```
https://YOUR_USERNAME.github.io/funny-calculator/
```

---

## 🎮 How to Use

| Key / Button | Action |
|---|---|
| `0-9` | Type numbers |
| `+` `-` `×` `÷` | Operators |
| `=` or `Enter` | Calculate |
| `DEL` or `Backspace` | Delete last character |
| `AC` or `Escape` | Clear all |
| `%` | Percentage |
| `±` | Toggle positive/negative |
| `.` | Decimal point |
| 🔊 (top right) | Toggle sounds |

---

## 🛠 Built With

- Pure **HTML5**, **CSS3**, **Vanilla JS** — no frameworks, no dependencies
- **Google Fonts**: Fredoka One, Space Mono, Baloo 2
- Sound effects from [Mixkit](https://mixkit.co)

---

Made with ❤️ by K7
