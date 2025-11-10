# My Tech Knowledge Base

A comprehensive documentation site for technical knowledge, guides, and project templates built with [Docusaurus](https://docusaurus.io/).

## 🌐 Live Site

**Visit the documentation**: https://janphan.github.io/My-Tech-Knowledge-Base/

## 🚀 Local Development

To run the documentation site locally:

### Prerequisites

- Node.js 20 or higher
- npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Janphan/My-Tech-Knowledge-Base.git
cd My-Tech-Knowledge-Base

# Navigate to the website directory
cd website

# Install dependencies
npm install

# Start the development server
npm run start
```

The site will open automatically at http://localhost:3000.

### Available Commands

```bash
# Start development server
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

### File Structure

```
My-Tech-Knowledge-Base/
├── website/                    # Docusaurus site
│   ├── docs/                  # Documentation content
│   │   ├── 00_Intro/          # Welcome/intro pages
│   │   ├── 01_Core_Concepts/  # Core concepts docs
│   │   ├── 02_Environments_Setup/  # Environment guides
│   │   ├── 03_Technology_Stack/    # Technology docs
│   │   └── 04_Project_Templates/   # Project templates
│   ├── docusaurus.config.js   # Site configuration
│   ├── sidebars.js            # Sidebar structure
│   └── package.json           # Dependencies
├── .github/workflows/         # GitHub Actions CI/CD
└── README.md                  # This file
```

## 🛠️ Technical Details

- **Framework**: [Docusaurus v3.6.3](https://docusaurus.io/)
- **Deployment**: GitHub Pages via GitHub Actions
- **Node.js**: Version 20+ required
- **Styling**: Default Docusaurus theme with auto-generated sidebar
- **Search**: Built-in search functionality

## 🤝 Contributing

1. Fork the repository
2. Create your content in the appropriate `website/docs/` folder
3. Test locally with `npm run start`
4. Submit a pull request

## 📄 License

This documentation is available under the [MIT License](LICENSE).

---

**Live Documentation**: https://janphan.github.io/My-Tech-Knowledge-Base/
