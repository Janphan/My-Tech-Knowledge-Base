module.exports = {
  title: 'My Tech Knowledge Base',
  tagline: 'Notes, guides and templates',
  url: 'https://janphan.github.io',
  baseUrl: '/My-Tech-Knowledge-Base/',
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Janphan',
  projectName: 'My-Tech-Knowledge-Base',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl:
            'https://github.com/Janphan/My-Tech-Knowledge-Base/edit/main/website/docs/',
        },
        theme: {
          // customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
