import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Chris Portfolio',
  subtitle: 'Demo Site',
  lang: 'en',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
  themeColor: {
    hue: 256,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: true,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: '/assets/images/banner.webp',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center',      // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false,         // Display the credit text of the banner image
      text: '',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  toc: {
    enable: true,           // Display the table of contents on the right side of the post
    depth: 2                // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [    // Leave this array empty to use the default favicon
    {
      src: '/favicon/favicon-16x16.png',
      sizes: '16x16'
    }
    ,
    {
      src: '/favicon/favicon-32x32.png',
      sizes: '32x32'
    }
    ,
    {
      src: '/favicon/favicon-96x96.png',
      sizes: '96x96'
    }
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    // LinkPreset.Archive,
    { name: "Github", url: "/github/",  },
    { name: "Games", url: '/archive/category/Games/', },
    LinkPreset.About,
    // {
    //   name: 'GitHub',
    //   url: 'https://github.com/chrisdbhr',          // Internal links should not include the base path, as it is automatically added
    //   external: true,                               // Show an external link icon and will open in a new tab
    // },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'https://www.gravatar.com/avatar/bc67d0d8223c77034223d024d9f96b46?s=256',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Christopher Ravailhe',
  bio: 'Cross-platform games and apps developer since 2017!',
  links: [
    {
      name: 'LinkedIn',
      icon: 'fa6-brands:linkedin',       // Visit https://icones.js.org/ for icon codes
                                        // You will need to install the corresponding icon set if it's not already included
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://linkedin.com/in/chrisdbhr/',
    },
    {
      name: 'Github',
      icon: 'line-md:github',
      url: 'https://github.com/Chrisdbhr',
    },
    {
      name: 'Call/Meet',
      icon: 'line-md:phone-call-loop',
      url: 'https://call.chrisjogos.com',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
