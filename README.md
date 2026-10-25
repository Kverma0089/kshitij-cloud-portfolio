# Kshitij Verma — Azure Cloud & DevOps Portfolio

## 🚀 Project Overview

A fully responsive, production-ready personal portfolio website showcasing expertise in **Microsoft Azure**, **DevOps practices**, **Infrastructure as Code**, and **cloud-native technologies**.

## 🌟 Features

- **Hero Section** — Animated gradient with particle background, floating profile card, and live stats
- **About** — Professional summary with highlight grid
- **Skills** — Animated progress bars + categorised skill tag clouds (Azure, DevOps, IaC, Monitoring, Security, Networking)
- **Projects** — 6 featured cloud projects with metrics, tech stacks, and live status indicators
- **Certifications** — 8 Microsoft & industry credentials (AZ-104, AZ-400, AZ-305, CKA, Terraform Associate)
- **Experience** — Timeline layout with 4 professional roles and key achievements
- **Architecture Patterns** — 6 cloud design patterns with service badges
- **Contact** — Validated contact form with select dropdown and status feedback
- **Footer** — Brand, navigation, technologies, and services columns

## 🎨 Design Highlights

- **Dark glassmorphism** aesthetic with Azure blue/cyan palette
- **Animated particles** floating in hero background
- **Card tilt** effect on project and certification cards
- **Scroll-reveal** animations via IntersectionObserver
- **Typed text** rotation on profile card
- **Animated skill bars** triggered on scroll
- **Reading progress** indicator bar
- **Fully responsive** — mobile-first, works on all screen sizes
- **Custom scrollbar** styled to match theme

## 🛠️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Structure  | HTML5 Semantic markup  |
| Styling    | Vanilla CSS (CSS vars) |
| Logic      | Vanilla JavaScript ES6+|
| Fonts      | Google Fonts (Outfit, Inter, JetBrains Mono) |
| Images     | AI-generated assets    |

## 📁 Project Structure

```
kshitij-cloud-portfolio/
├── index.html                    # Main HTML file (single-page)
├── assets/
│   ├── css/
│   │   └── style.css             # All styles (design tokens, components, responsive)
│   ├── js/
│   │   └── main.js               # All JS (scroll, animations, form, effects)
│   └── images/
│       ├── hero_bg.jpg            # Azure hero background
│       └── profile.jpg            # Profile avatar
└── README.md                     # This file
```

## 🔍 How to Preview Locally

Since this is a **pure HTML/CSS/JS** site with no build step required, you can preview it in multiple ways:

### Option 1 — Open Directly in Browser (Simplest)
1. Navigate to `c:\Terraform Batch18\kshitij-cloud-portfolio\`
2. Double-click `index.html`
3. It opens directly in your default browser ✅

### Option 2 — VS Code Live Server (Recommended)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` in the Explorer
3. Select **"Open with Live Server"**
4. Browser opens at `http://127.0.0.1:5500` with hot-reload ✅

### Option 3 — Python Local Server
```bash
# Python 3
cd "c:\Terraform Batch18\kshitij-cloud-portfolio"
python -m http.server 8080
# Then open: http://localhost:8080
```

### Option 4 — PowerShell One-liner
```powershell
cd "c:\Terraform Batch18\kshitij-cloud-portfolio"
Start-Process index.html
```

## 🏗️ Certifications Showcased

| Certification | Issuer | Year |
|--------------|--------|------|
| AZ-900 Azure Fundamentals | Microsoft | 2022 |
| AZ-104 Azure Administrator Associate | Microsoft | 2022 |
| AZ-400 Azure DevOps Engineer Expert | Microsoft | 2023 |
| AZ-305 Azure Solutions Architect Expert | Microsoft | 2023 |
| CKA Certified Kubernetes Administrator | CNCF | 2023 |
| Terraform Associate 003 | HashiCorp | 2024 |
| SC-900 Security, Compliance & Identity | Microsoft | 2022 |
| GitHub Actions Certification | GitHub | 2024 |

## 📋 Customisation Guide

To personalise this portfolio:

1. **Update contact details** in `index.html` → search for `kshitij.verma@example.com`
2. **Replace profile image** → swap `assets/images/profile.jpg`
3. **Update LinkedIn/GitHub URLs** → search for `kshitij-verma`
4. **Modify project details** → update project cards in the `#projects` section
5. **Add your resume** → place `resume-kshitij-verma.pdf` in `assets/`

## 📄 License

Personal portfolio project. All rights reserved © 2026 Kshitij Verma.
