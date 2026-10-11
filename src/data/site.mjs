// Company-wide content: navigation, contact routes, offices, news.

export const site = {
  name: 'CoolFly',
  url: 'https://coolflyaircraft.com',
  tagline: 'Your will. Your altitude.',
  description:
    'CoolFly designs and builds single-seat electric aircraft in Hangzhou, from the flight controller up. Explore Urban, Dream ST and Dream PRO, or become a CoolFly dealer.',
};

export const nav = [
  {
    label: 'Aircraft',
    key: 'aircraft',
    href: 'compare.html',
    children: [
      { label: 'Urban', note: 'Standing', href: 'urban.html' },
      { label: 'Dream ST', note: 'Seated', href: 'dream-st.html' },
      { label: 'Dream PRO', note: 'Long endurance', href: 'dream-pro.html' },
      { label: 'Compare models', note: '', href: 'compare.html' },
    ],
  },
  { label: 'Safety', key: 'safety', href: 'safety.html' },
  { label: 'Dealers', key: 'dealers', href: 'dealers.html' },
  { label: 'Company', key: 'company', href: 'company.html' },
  { label: 'Contact', key: 'contact', href: 'contact.html' },
];

export const contacts = {
  business: 'business@coolflyaircraft.com',
  support: 'support@coolflyaircraft.com',
  press: 'press@coolflyaircraft.com',
  phone: '+86 131 7364 8613',
  hours: 'Mon–Fri, 9:00–18:00 (UTC+8)',
  address: 'Gongshu District, Hangzhou, Zhejiang 310000, China',
};

// confirm: Paris and Brazil are listed on the current contact page without
// addresses. Add street addresses before launch.
export const offices = [
  { city: 'Hangzhou', country: 'China', role: 'Headquarters, R&D and manufacturing' },
  { city: 'Paris', country: 'France', role: 'Europe' },
  { city: 'Brazil', country: 'Brazil', role: 'Latin America' },
];

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/coolfly-aircraft/' },
  { label: 'Instagram', href: 'https://www.instagram.com/coolfly_aircraft/' },
];

// Latest company news. Links point to the existing newsroom until it moves.
export const news = [
  {
    date: '2026-09-23',
    title: 'CoolFly returns to Global Digital Trade Expo 2026',
    href: 'https://coolflyaircraft.com/coolfly-returns-to-global-digital-trade-expo-2026-advancing-the-commercialization-of-personal-flight/',
    image: 'assets/img/booth.jpg',
  },
  {
    date: '2026-09-24',
    title: 'CoolFly partners with AGIBOT on low-altitude flight at Zhuhai Chimelong',
    href: 'https://coolflyaircraft.com/coolfly-partners-with-agibot-to-bring-low-altitude-flight-to-zhuhai-chimelongs-new-embodied-ai-theme-park/',
    image: 'assets/img/agibot.jpg',
  },
  {
    date: '2026-09-03',
    title: 'CoolFly brings its vision for personal flight to IFA Berlin 2026',
    href: 'https://coolflyaircraft.com/coolfly-brings-its-vision-for-personal-flight-to-ifa-berlin-2026/',
    image: 'assets/img/ifa.jpg',
  },
];

// Milestones shown on the company page, oldest first.
export const timeline = [
  { year: '2008', events: ['Flight control R&D begins'] },
  { year: '2017', events: ['First flight pack prototype'] },
  { year: '2020', events: ['First-generation aircraft'] },
  { year: '2022', events: ['CoolFly founded in Hangzhou'] },
  { year: '2025', events: ['Standing platform revealed'] },
  { year: '2026', events: ['CCTV Spring Festival Gala', 'CES Las Vegas', 'EAA AirVenture Oshkosh', 'Urban global launch', 'IFA Berlin'] },
];

export const dealerRegions = [
  { region: 'Europe', note: 'Supported from our Paris office' },
  { region: 'North America', note: 'Following EAA AirVenture Oshkosh 2026' },
  { region: 'Australia', note: 'Open for partners' },
  { region: 'Middle East', note: 'Open for partners' },
];
