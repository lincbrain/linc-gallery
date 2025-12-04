import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'LINC Gallery',
  staticDirectories: ['static'],
  tagline: 'Showcase of the science from a NIH BRAIN CONNECTS center',
  favicon: 'img/linc.logo.color+white.notext+square.png',

  url: 'https://gallery.lincbrain.org',
  baseUrl: '/',
  organizationName: 'lincbrain',
  projectName: 'gallery.lincbrain.org',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        theme: {
          customCss: './src/css/custom.css',
        },
        docs: false,
      },
    ],
  ],

  themeConfig:
    ({
      navbar: {
        logo: {
          alt: 'Logo',
          src: 'img/linc.logo.color+white.notext.png',
        },
        items: [
          {to: '/pathways', label: 'Pathway Atlas', position: 'right'},
          {to: '/dmri', label: 'High-resolution dMRI', position: 'right'},
          {to: 'https://connects.mgh.harvard.edu/', label: 'Project Homepage', position: 'right'},
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/lincbrain/linc-gallery',
              },
            ],
          },
          {
            items: [
              {
                html: `<div style="text-align: right;">© ${new Date().getFullYear()} LINC</div>`,
              },
            ],
          },
        ],
      },
      colorMode: {
          defaultMode: 'light',
          disableSwitch: true,
        },
      prism: {
        theme: prismThemes.github,
      },
    }),
};

export default config;
