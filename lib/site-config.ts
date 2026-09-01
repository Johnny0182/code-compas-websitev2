export const siteConfig = {
  agencyName: "Code Compas",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    headline: "Make Sure They Choose You Before They Keep Searching.",
    cta: "Get Started >>>",
  },
  services: [
    { letter: "A", title: "Web Design and Development", label: "Sites that earn attention", price: "STARTING AT $550.00", description: "Responsive, conversion-focused websites designed around your brand, audience, and business goals." },
    { letter: "B", title: "App Development", label: "Tools people enjoy using", price: "STARTING AT $1,200.00", description: "Purpose-built web applications and digital tools created to simplify workflows and improve customer experiences." },
    { letter: "C", title: "Business Automation", label: "Less busywork, more momentum", price: "STARTING AT $300.00", description: "Smart automations that reduce repetitive work, connect your systems, and help your business operate more efficiently." },
    { letter: "D", title: "Customize Your Solution", label: "Built around your reality", price: "STARTING AT $300.00", description: "Need something different? We can shape a custom digital solution around your process, goals, and existing technology." },
  ],
  projects: [
    { number: "01", title: "Primos Plumbing", category: "Strategy · Web Design · Lead Generation", description: "A conversion focused trade business website that makes emergency plumbing services easy to understand and helps customers request estimates or call for service quickly.", year: "2026", imagePath: "/images/project-1-edited.png", imageAlt: "Primos Plumbing trade business website with service navigation and estimate calls to action" },
    { number: "02", title: "Lantern and Logic Photography", category: "Web Design · Client Portal", description: "An elegant photography platform with secure client login capabilities, private galleries, and a simple portal for downloading finished images.", year: "2026", imagePath: "/images/project-2-edited.png", imageAlt: "Lantern and Logic Photography website with a wedding gallery and client portal experience" },
    { number: "03", title: "Grim Grounds Coffee", category: "Web Design · Ordering · Accounts", description: "A dark, atmospheric coffee shop website with online takeout ordering, customer login capabilities, and a clear path from menu browsing to checkout.", year: "2026", imagePath: "/images/project-3-edited.png", imageAlt: "Grim Grounds Coffee website with online ordering and customer login capabilities" },
    { number: "04", title: "The Lion and Lamb Church", category: "Web Design · Mobile App · Community", description: "A welcoming church website and companion app that help members plan visits, watch services, discover communities, receive alerts, and stay connected throughout the week.", year: "2026", imagePath: "/images/project-4-edited.png", imageAlt: "The Lion and Lamb church website with a church photograph and companion app download call to action" },
  ],
  about: {
    kicker: "Hablamos Español.",
    heading: "Passionate Digital",
    headingSecondLine: "Creators.",
    body: "We are a bilingual digital agency based in Los Angeles, helping small businesses locally and across the globe. We take the headache out of technology by handling everything under one roof.",
    capabilities: [
      { icon: "💻", title: "Websites & Applications", description: "Takeout platforms, trade websites, and multilingual sites built to convert users into paying customers." },
      { icon: "⚙️", title: "Operations & Automation", description: "Python scripts, Excel automations, and seamless accounting integrations." },
      { icon: "🖥️", title: "Hardware Setup", description: "POS systems, server installations, computer and printer configuration, and Business OneDrive." },
      { icon: "🎨", title: "Brand & Merch", description: "Full logo design, plus flyers, stickers, apparel, and promo items through our design partners." },
      { icon: "🗣️", title: "Bilingual Training", description: "We train your Spanish- and English-speaking staff so your new tech actually gets used." },
    ],
  },
  contact: {
    heading: "Let’s build something that works for your business.",
    body: "Tell us what you’re trying to change. We’ll come back with a clear next step.",
    email: "Use the inquiry form",
    socialLabel: "Instagram",
  },
  footerStatement: "Digital strategy, design, development, and automation for ambitious businesses.",
  seo: {
    title: "Code Compas — Digital Strategy, Design, and Development",
    description: "Strategy, design, development, and automation built around real business goals.",
    ogTitle: "Code Compas — Make your business the obvious choice",
    ogDescription: "A practical digital agency for ambitious businesses.",
    siteName: "Code Compas",
  },
} as const;
