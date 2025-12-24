# My Tech Knowledge Base

A comprehensive documentation site for technical knowledge, guides, and project templates built with [Docusaurus](https://docusaurus.io/).

## 📑 Table of Contents

- [Live Site](#-live-site)
- [Features](#-features)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation & Development](#installation--development)
- [Available Commands](#-available-commands)
  - [Development](#development-from-project-root)
  - [Maintenance](#maintenance)
  - [Git & Deployment](#git--deployment)
  - [Development Scripts](#development-scripts)
- [Project Structure](#-project-structure)
- [Search Functionality](#-search-functionality)
- [Interactive Quiz](#-interactive-quiz)
- [Content Organization](#-content-organization)
  - [Core Concepts](#core-concepts-01_core_concepts)
  - [Environment Setup](#environment-setup-02_environments_setup)
  - [Technology Stack](#technology-stack-03_technology_stack)
  - [Project Templates](#project-templates-04_project_templates)
- [Technical Details](#-technical-details)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌐 Live Site

**Visit the documentation**: https://janphan.github.io/My-Tech-Knowledge-Base/

## ✨ Features

- 📚 **Comprehensive Documentation** - Organized technical guides and knowledge base
- 🔍 **Full-Site Search** - Search across all documentation pages
- 🎯 **Interactive Quiz** - Test your knowledge with flashcards and deck-based quiz system
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast Deployment** - Automatic deployment via GitHub Actions
- 🎨 **Modern UI** - Clean, professional interface with dark/light themes
- 📝 **Easy Content Management** - Simple Markdown-based content creation
- 🤖 **Automated Tools** - Scripts for scanning abbreviations and generating quizzes

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/Janphan/My-Tech-Knowledge-Base.git
cd My-Tech-Knowledge-Base

# Install dependencies and start development server
npm run dev
```

The site will open automatically at http://localhost:3000/My-Tech-Knowledge-Base/

## 📋 Available Commands

### Development (from project root)

```bash
# Start development server (recommended)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Serve production build
npm run serve
```

### Maintenance

```bash
# Clean Docusaurus cache
npm run clean

# Clean install all dependencies
npm run clean-install

# Install dependencies
npm run install:all

# Generate flashcards from abbreviations
node scripts/generate-flashcards.js

# Scan documentation for abbreviations
node scripts/scan-abbreviations.js
```

### Git & Deployment

```bash
# Quick commit and push (use with caution)
npm run push

# Check git status
npm run status

# Deploy (builds and shows deployment steps)
npm run deploy
```

### Development Scripts

For advanced users, you can also use the development scripts:

**Linux/Mac:**

```bash
./scripts/dev.sh dev        # Start development server
./scripts/dev.sh build      # Build for production
./scripts/dev.sh preview    # Build and preview
./scripts/dev.sh clean      # Clean install
./scripts/dev.sh deploy     # Build and show deployment steps
```

**Windows:**

```cmd
scripts\dev.bat dev        # Start development server
scripts\dev.bat build      # Build for production
scripts\dev.bat preview    # Build and preview
scripts\dev.bat clean      # Clean install
scripts\dev.bat deploy     # Build and show deployment steps
```

## 📁 Project Structure

```
My-Tech-Knowledge-Base/
├── website/                    # Docusaurus site
│   ├── docs/                  # Documentation content
│   │   ├── 00_Intro/          # Welcome and introduction pages
│   │   ├── 01_Core_Concepts/  # Core technical concepts
│   │   │   ├── Deployment.md  # Deployment guides
│   │   │   ├── Abbreviations.md # Technical abbreviations
│   │   │   └── Testing.md     # Testing patterns and guides
│   │   ├── 02_Environments_Setup/  # Environment setup guides
│   │   ├── 03_Technology_Stack/    # Technology documentation
│   │   └── 04_Project_Templates/   # Reusable project templates
│   │       └── Firebase_setup/     # Firebase authentication templates
│   ├── static/flashcards/     # Generated quiz files
│   ├── docusaurus.config.js   # Site configuration
│   ├── sidebars.js            # Navigation sidebar structure
│   └── package.json           # Dependencies and scripts
├── scripts/                   # Development utility scripts
│   ├── dev.sh                # Linux/Mac development script
│   ├── dev.bat               # Windows development script
│   ├── generate-flashcards.js # Quiz generator from abbreviations
│   └── scan-abbreviations.js # Auto-scan docs for abbreviations
├── flashcards/                # Generated flashcard files
├── .github/workflows/         # GitHub Actions CI/CD
└── README.md                  # This file
```

## 🔍 Search Functionality

The site includes full-site search that allows you to:

- Search across all documentation pages
- Find content instantly with live results
- Access search from the navigation bar
- Works offline in development mode

## 🎯 Interactive Quiz

Access the interactive quiz from the navbar to test your knowledge of technical abbreviations:

- **Deck-Based System**: Cards are shuffled randomly and removed after study
- **Keyboard Controls**:
  - Space/Enter: Flip card or advance to next
  - R: Reshuffle the deck
- **Progress Tracking**: See studied vs remaining cards
- **Visual Feedback**: Animated card flips and deck visualization
- **Auto-Generated**: Quiz updates automatically from Abbreviations.md

### Generating Quiz

```bash
# Regenerate quiz from current abbreviations
node scripts/generate-flashcards.js
```

The quiz is accessible from the navbar or directly at `/flashcards/abbreviations-quiz.html`

## 📝 Content Organization

### Core Concepts (`01_Core_Concepts/`)

- **Testing**: Comprehensive testing guide with AAA pattern, frameworks, and CI/CD integration
- **Deployment**: Guides for deploying applications
- **Abbreviations**: Technical terms and acronyms (auto-scanned and maintained)

### Environment Setup (`02_Environments_Setup/`)

- Development environment configurations
- Tool installations and setups

### Technology Stack (`03_Technology_Stack/`)

- Framework and library documentation
- Best practices and guides

### Project Templates (`04_Project_Templates/`)

- **Firebase Setup**: Complete authentication templates
  - `firebase.ts`: Firebase configuration template
  - `firebaseAuth.ts`: Authentication service with examples
- Reusable code templates for common tasks

## 🛠️ Technical Details

- **Framework**: [Docusaurus v3.6.3](https://docusaurus.io/)
- **Search**: Local search plugin for full documentation indexing
- **Deployment**: GitHub Pages via GitHub Actions (automatic on push to main)
- **Node.js**: Version 20+ required for Docusaurus v3
- **Styling**: Default Docusaurus theme with customizations
- **Content**: Markdown-based with frontmatter support

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch:

1. **Automatic Build**: GitHub Actions builds the site
2. **Deploy to Pages**: Content is published to `gh-pages` branch
3. **Live Update**: Site updates at https://janphan.github.io/My-Tech-Knowledge-Base/

### Manual Deployment

```bash
# Build and check deployment readiness
npm run deploy

# Then commit and push
git add .
git commit -m "Update documentation"
git push origin main
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create content** in the appropriate `website/docs/` folder
3. **Test locally** with `npm run dev`
4. **Submit a pull request**

### Content Guidelines

- Use clear, descriptive titles
- Include frontmatter for proper categorization
- Add code examples where helpful
- Test links and formatting
- Follow the existing structure

### Adding New Content

```bash
# Create a new documentation file
# Add frontmatter like:
---
sidebar_position: 1
title: Your Topic Title
---

# Your Content Here
```

## 📄 License

This documentation is available under the [MIT License](LICENSE).

---

**🌐 Live Documentation**: https://janphan.github.io/My-Tech-Knowledge-Base/

**📧 Questions?** Open an issue or start a discussion in the repository.
