const SECTIONS = [
  'World', 'Politics', 'Business', 'Technology',
  'Sports', 'Entertainment', 'Science', 'Lifestyle',
  'Education', 'Opinion', 'Investigations'
];

const DEMO_ARTICLES = [
  {
    id: 'demo-world-1',
    section: 'World',
    kicker: 'Demonstration • World Desk',
    headline: 'Demo: West African Corridors Focus on Cross-Border Power Trade',
    summary: 'Sample demonstration article exploring regional grid interconnection and maritime logistics in the abstract.',
    author: 'Demo Editorial Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Placeholder Source A', 'Demonstration Placeholder Source B'],
    body: [
      'This is clearly labelled demonstration content created for the MUNDINFO Global Briefing prototype.',
      'Regional planners and energy specialists often examine transmission capacity, tariff alignment, and seasonal reserve margins when modeling cross-border electricity exchanges.',
      'In a production build, this article body, author field, and source list will load dynamically from your own database.'
    ]
  },
  {
    id: 'demo-politics-1',
    section: 'Politics',
    kicker: 'Demonstration • Diplomacy',
    headline: 'Demo: Civic Digital Identity Debates Continue Across Capitals',
    summary: 'Sample demonstration story outlining policy consultations on data privacy and public service access.',
    author: 'Demo Policy Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Policy Brief 01'],
    body: [
      'This is clearly labelled demonstration content for layout and template testing.',
      'Policy debates around digital identity frequently weigh convenience in public administration against data protection and offline fallback access.'
    ]
  },
  {
    id: 'demo-business-1',
    section: 'Business',
    kicker: 'Demonstration • Markets',
    headline: 'Demo: Food Processing Scales Up Through Regional Value Chains',
    summary: 'Sample demonstration briefing on agri-processing investment, cold storage, and export standards.',
    author: 'Demo Markets Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Trade Note 04'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Expanding domestic processing and cold-chain storage helps reduce post-harvest losses and adds value closer to farming communities.'
    ]
  },
  {
    id: 'demo-tech-1',
    section: 'Technology',
    kicker: 'Demonstration • Infrastructure',
    headline: 'Demo: Subsea Cable Redundancy Along Atlantic Routes',
    summary: 'Sample demonstration report on bandwidth resilience, local caching, and data center efficiency.',
    author: 'Demo Tech Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Telecoms Note 02'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Multi-cable routing and regional internet exchange points help keep digital services responsive during network maintenance or faults.'
    ]
  },
  {
    id: 'demo-sports-1',
    section: 'Sports',
    kicker: 'Demonstration • International',
    headline: 'Demo: Youth Track and Field Circuits Expand Across Five Cities',
    summary: 'Sample demonstration note on accredited coaching programs, timing systems, and national trials.',
    author: 'Demo Sports Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Athletics Bulletin'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Consistent competition calendars and coach education give emerging athletes structured pathways from school meets to senior championships.'
    ]
  },
  {
    id: 'demo-ent-1',
    section: 'Entertainment',
    kicker: 'Demonstration • Culture',
    headline: 'Demo: Independent Film Restoration Archives Welcome New Reels',
    summary: 'Sample demonstration feature on celluloid preservation, festival circuits, and sound archiving.',
    author: 'Demo Culture Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Archive Index'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Climate-controlled vaults and digital scanning ensure historical cinema and audio recordings remain accessible to researchers and audiences.'
    ]
  },
  {
    id: 'demo-sci-1',
    section: 'Science',
    kicker: 'Demonstration • Environment',
    headline: 'Demo: Coastal Mangrove Restoration Tracks Salinity and Erosion',
    summary: 'Sample demonstration summary on field monitoring, tidal buffers, and community forestry.',
    author: 'Demo Science Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Coastal Study'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Mangrove ecosystems stabilize shorelines and support nursery habitats when paired with long-term community stewardship.'
    ]
  },
  {
    id: 'demo-life-1',
    section: 'Lifestyle',
    kicker: 'Demonstration • Urban Life',
    headline: 'Demo: Walkable Corridors and Shaded Transit Plazas Take Shape',
    summary: 'Sample demonstration piece on city streetscapes, heat mitigation, and neighborhood mobility.',
    author: 'Demo Lifestyle Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Urban Design Note'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Tree canopy coverage, wider sidewalks, and safer crossings make daily walking and transit connections more comfortable in warm climates.'
    ]
  },
  {
    id: 'demo-edu-1',
    section: 'Education',
    kicker: 'Demonstration • Learning',
    headline: 'Demo: Bilingual STEM Lab Kits Roll Out to Rural Districts',
    summary: 'Sample demonstration explainer on offline lab kits, teacher workshops, and curriculum materials.',
    author: 'Demo Education Desk (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Curriculum Brief'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Hands-on science kits paired with practical teacher training help students connect classroom theory with everyday experiments.'
    ]
  },
  {
    id: 'demo-opinion-1',
    section: 'Opinion',
    kicker: 'Demonstration • Column',
    headline: 'Demo: Why Middle-Power Coalitions Matter for Multilateral Trade',
    summary: 'Sample demonstration opinion note examining trade mediation, rules-based orders, and regional voices.',
    author: 'Demo Contributing Columnist (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Commentary Notes'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Coordinated diplomacy among mid-sized economies can keep trade channels open and encourage practical standards across regions.'
    ]
  },
  {
    id: 'demo-inv-1',
    section: 'Investigations',
    kicker: 'Demonstration • Investigation',
    headline: 'Demo: Tracking Cross-Border Shipping Delays and Supply Chain Costs',
    summary: 'Sample demonstration investigative overview of port turnaround times, customs clearance, and freight margins.',
    author: 'Demo Investigations Unit (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Logistics Ledger', 'Demonstration Port Timetable'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Bottlenecks at terminals and document handoffs ripple across importers and consumers, making transparent tracking essential.'
    ]
  },
  {
    id: 'demo-inv-2',
    section: 'Investigations',
    kicker: 'Demonstration • Analysis',
    headline: 'Demo: Municipal Utility Audits and Public Maintenance Reporting',
    summary: 'Sample demonstration analysis of inspection logs, repair timelines, and open service records.',
    author: 'Demo Investigations Unit (Sample)',
    date: 'November 23, 2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80',
    sources: ['Demonstration Public Records Sample'],
    body: [
      'This is clearly labelled demonstration content only.',
      'Clear maintenance schedules and published audit summaries help citizens see how infrastructure budgets are used.'
    ]
  }
];
