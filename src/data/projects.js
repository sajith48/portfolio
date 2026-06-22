export const projectsData = [
  {
    id: 1,
    title: "QuickSlots Chrome Extension",
    shortDesc: "A productivity-focused Chrome Extension with 4 clipboard slots, keyboard shortcuts, recent history, and drag-and-drop reordering for faster text management.",
    longDesc: `QuickSlots is a modern multi-clipboard Chrome Extension built to improve productivity by allowing users to save, organize, and paste frequently used text with customizable keyboard shortcuts.

The extension provides four clipboard slots, enabling quick access to saved text without repeatedly copying and pasting. It also includes Recent History to keep track of recently saved content, drag-and-drop slot reordering for better organization, instant search, and editing capabilities.

Designed with performance and simplicity in mind, QuickSlots stores all data locally using the Chrome Storage API, ensuring user privacy and fast access without relying on external servers.`,
    img: "/images/project_quickslots_1782037942504.png",
    tags: ["JavaScript", "Chrome Extensions", "JSON", "HTML5", "CSS3"],
    category: "Chrome Extensions",
    github: "https://github.com/sajith48",
    demo: "https://github.com/sajith48",
    features: [
      "Dynamic glassmorphic control center",
      "Configurable hotkey site mapping",
      "Low memory footprints (under 10MB runtime)",
      "Backup synchronization and recovery profiles"
    ]
  },
  {
    id: 2,
    title: "YouTube Focus Mode Extension",
    shortDesc: "Hides distracting platform components to maximize learning productivity.",
    longDesc: "A focus-oriented extension engineered to suppress distracting elements on video sites. It injects a highly responsive DOM-filtering script to seamlessly block recommender sidebars, Shorts reels, infinite feeds, and user comments. The extension includes a clean, togglable control popover allowing students to configure filter strengths based on their current focus needs.",
    img: "/images/project_focusmode_1782037956658.png",
    tags: ["JavaScript", "DOM Injection", "CSS Inject", "Productivity Tools"],
    category: "Chrome Extensions",
    github: "https://github.com/sajith48",
    demo: "https://github.com/sajith48",
    features: [
      "Instant hides of Shorts reels and sidebar feeds",
      "Granular blocking filter toggles",
      "Zero-latency script injections",
      "Minimalist distraction-free dashboard toggle"
    ]
  }
];
