// docusaurus.config.js

module.exports = {
  title: 'My Tech Knowledge Base',
  tagline: 'Notes, guides and templates',
  url: 'https://janphan.github.io',
  baseUrl: '/My-Tech-Knowledge-Base/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Janphan',
  projectName: 'My-Tech-Knowledge-Base',
  
  // 1. Ensure no Algolia config exists in themeConfig
  themeConfig: {
    navbar: {
      title: 'My Tech Knowledge Base',
      items: [],
    },
    // Make sure there is NO 'algolia: {...}' block here
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Your docs are at the root
          routeBasePath: '/', 
          editUrl: 'https://github.com/Janphan/My-Tech-Knowledge-Base/edit/main/website/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: false,
      },
    ],
  ],

  // 2. The Local Search Configuration
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // Hashes the index filename for better caching
        hashed: true,

        // MATCH THIS TO YOUR PRESET:
        // Since your docs are at root ('/'), set this to '/'
        docsRouteBasePath: "/",

        // Search settings
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        
        // Scope: Set these to match what you actually have
        indexDocs: true,
        indexBlog: false,
        indexPages: false, // Set to true if you add standalone pages in src/pages

        // UX Options
        searchResultLimits: 8,
        searchBarShortcut: true, // Allows using "/" to open search
      },
    ],
  ],
};