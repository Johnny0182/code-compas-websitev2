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
    kicker: "Small team. Clear thinking.",
    heading: "Built to make your business the obvious choice.",
    body: "We are a digital agency focused on building practical, memorable, and scalable digital experiences. We combine strategy, design, development, and automation to create solutions that support real business goals.",
    statement: "No mystery process. No disposable templates. Just smart digital work shaped around what your business needs next.",
    values: ["Strategy before decoration", "Useful by design", "Built to keep working"],
  },
  contact: {
    heading: "Let’s build something that works for your business.",
    body: "Tell us what you’re trying to change. We’ll come back with a clear next step.",
    email: "[CONTACT EMAIL]",
    socialLabel: "Instagram",
    socialUrl: "[INSTAGRAM URL]",
  },
  footerStatement: "Digital strategy, design, development, and automation for ambitious businesses.",
  seo: {
    title: "[AGENCY NAME] — Digital Agency in [CITY OR SERVICE AREA]",
    description: "Strategy, design, development, and automation built around real business goals.",
    ogTitle: "[AGENCY NAME] — Make your business the obvious choice",
    ogDescription: "A practical digital agency for ambitious businesses.",
    siteName: "[AGENCY NAME]",
    canonicalUrl: "https://example.com",
    socialImage: "/images/social-preview.webp",
  },
} as const;
