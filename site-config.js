/**
 * DentTalks / DentTracks media configuration
 * Update URLs here — no rebuild required for static hosting.
 */
window.DENTTALKS_CONFIG = {
  // Independence@Scale intro session recording
  // Prefer a direct MP4 or YouTube URL for reliable mobile playback.
  // Google Drive embeds work on desktop; mobile browsers often block/break them.
  // Examples:
  //   introRecordingUrl: "https://www.youtube.com/watch?v=VIDEO_ID"  (unlisted is fine)
  //   introRecordingMp4Url: "https://cdn.example.com/intro.mp4"
  //   introRecordingUrl: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
  introRecordingUrl: "https://drive.google.com/file/d/1n8868VQ4DntWK_71wWW7rdvE09KXLe_i/view?usp=sharing",
  introRecordingYoutubeUrl: "",
  introRecordingMp4Url: "",

  // Registration for live sessions
  joinSeriesUrl: "https://www.eventbrite.com/e/denttalks-independence-scale-intro-tickets-1999791587471",

  // Separate business briefing
  businessBriefingUrl: "https://v.denttracks.com/",

  nextSessionTitle: "Episode 1 — The New Economics of Independent Dentistry",
  nextSessionDate: "Friday, October 23, 2026 • 4:00 PM CT",

  domain: "https://denttalks.com",
  denttracksUrl: "https://denttracks.com",
  denttracksMediaUrl: "https://denttracks.vercel.app"
};

window.DENTTALKS_MEDIA = {
  series: [
    {
      id: "intro-2026",
      kind: "recording",
      badge: "Independence@Scale",
      title: "Introductory Session — How the Platform Works + 18-Episode Roadmap",
      description: "Dr. Vajahat “VJ” Yar Khan and Clark Caflisch introduce Independence@Scale, why the model is being built, and the full DentTalks curriculum for independent owners.",
      date: "September 18, 2026",
      duration: "60 min",
      // Uses DENTTALKS_CONFIG.introRecordingUrl when set
      useIntroRecording: true,
      cta: "Watch Recording",
      secondaryCta: "Reserve Next Session",
      secondaryUrlKey: "joinSeriesUrl",
      thumb: "assets/intro-webinar-flyer-card.jpg"
    },
    {
      id: "ep-01",
      kind: "upcoming",
      badge: "Episode 01",
      title: "The New Economics of Independent Dentistry",
      description: "Kickoff of the formal 18-episode curriculum — market forces, ownership models, and what scale actually buys independent practices.",
      date: "October 23, 2026 • 4:00 PM CT",
      duration: "Live on Zoom",
      urlKey: "joinSeriesUrl",
      cta: "Reserve Your Free Seat",
      thumb: "assets/intro-webinar-flyer-card.jpg"
    }
  ],
  podcasts: [
    {
      id: "pod-1",
      badge: "DentTracks Spotlight",
      title: "When a practicing dentist decides to solve the operational challenges holding dental practices back",
      description: "Drawing from clinical and business experience, Dr. Khan shares how DentTracks uses AI to streamline operations while preserving personalized patient care.",
      url: "https://www.youtube.com/watch?v=h41U_GdKzS8",
      videoId: "h41U_GdKzS8",
      cta: "Watch Episode",
      platform: "YouTube",
      channel: "DentTracks"
    },
    {
      id: "pod-2",
      badge: "Podcast EP 224",
      title: "Optimizing Dental Practices for the Future",
      description: "We're talking about how technology, AI, and smart outsourcing can make running a dental practice easier, more efficient, and more profitable.",
      url: "https://www.youtube.com/watch?v=ateXli5HzNA",
      videoId: "ateXli5HzNA",
      cta: "Watch Episode",
      platform: "YouTube",
      channel: "DentTracks"
    },
    {
      id: "pod-3",
      badge: "DentTalks",
      title: "Unlock R&D Tax Credits for Dental Practices",
      description: "Understand the essentials of R&D Tax Credits and how expert guidance can help your dental practice claim more confidently.",
      url: "https://www.youtube.com/watch?v=UYtE9Wuqx0w",
      videoId: "UYtE9Wuqx0w",
      cta: "Watch Episode",
      platform: "YouTube",
      channel: "DentTracks"
    },
    {
      id: "pod-4",
      badge: "DentTalks Mastermind",
      title: "The Dental Wealth Blueprint: Turning Taxation Into Profit",
      description: "An exclusive DentTalks Mastermind session revealing overlooked tax strategies designed to strengthen financial health for growing dental practices.",
      url: "https://www.youtube.com/watch?v=V--Lkei81Z0",
      videoId: "V--Lkei81Z0",
      cta: "Watch Episode",
      platform: "YouTube",
      channel: "DentTracks"
    }
  ],
  blogs: [
    {
        "id": "dentaccounts-for-dsos-financial-clarity-at-scale-without-accounting-complexity",
        "tag": "DentTracks",
        "title": "DentAccounts for DSOs: Financial Clarity at Scale Without Accounting Complexity",
        "description": "As dental organizations grow beyond a single location, financial clarity becomes harder to maintain – not because of volume, but because of fragmentation.",
        "url": "blog/dentaccounts-for-dsos-financial-clarity-at-scale-without-accounting-complexity.html",
        "author": "DentTracks Team",
        "meta": "June 27, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/dentaccounts-for-dsos-financial-clarity-at-scale-without-accounting-complexity.jpg"
    },
    {
        "id": "scalable-technology-trends-driving-growth-in-modern-dental-practices",
        "tag": "DentTracks",
        "title": "Scalable Technology Trends Driving Growth in Modern Dental Practices",
        "description": "Most dental practices juggle growing patient demands with complex billing and credentialing challenges—and it often feels like there aren’t enough hours in the day. Scalable dental…",
        "url": "blog/scalable-technology-trends-driving-growth-in-modern-dental-practices.html",
        "author": "DentTracks Team",
        "meta": "June 15, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/scalable-technology-trends-driving-growth-in-modern-dental-practices.jpg"
    },
    {
        "id": "top-trends-in-ai-powered-dental-practice-management-for-2026",
        "tag": "DentTracks",
        "title": "Top Trends in AI-Powered Dental Practice Management for 2026",
        "description": "The old way of managing dental practices—manual scheduling, slow insurance checks, and guesswork on finances—is losing ground fast. AI dental software is reshaping how you run your…",
        "url": "blog/top-trends-in-ai-powered-dental-practice-management-for-2026.html",
        "author": "DentTracks Team",
        "meta": "June 8, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/top-trends-in-ai-powered-dental-practice-management-for-2026.jpg"
    },
    {
        "id": "unlocking-practice-growth-scalable-solutions-for-every-dental-clinic",
        "tag": "DentTracks",
        "title": "Unlocking Practice Growth: Scalable Solutions for Every Dental Clinic",
        "description": "You’re managing a growing dental practice, but your current tools just can’t keep up. Manual processes and scattered data slow you down and eat into your profitability. Scalable so…",
        "url": "blog/unlocking-practice-growth-scalable-solutions-for-every-dental-clinic.html",
        "author": "DentTracks Team",
        "meta": "June 5, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/unlocking-practice-growth-scalable-solutions-for-every-dental-clinic.jpg"
    },
    {
        "id": "scale-smarter-how-scalable-saas-helps-growing-dental-practices-maximize-revenue",
        "tag": "DentTracks",
        "title": "Scale Smarter: How Scalable SaaS Helps Growing Dental Practices Maximize Revenue",
        "description": "Scaling your dental practice doesn’t have to mean juggling endless spreadsheets and missed revenue opportunities. Many growing clinics lose thousands each month due to inefficient …",
        "url": "blog/scale-smarter-how-scalable-saas-helps-growing-dental-practices-maximize-revenue.html",
        "author": "DentTracks Team",
        "meta": "May 23, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/scale-smarter-how-scalable-saas-helps-growing-dental-practices-maximize-revenue.jpg"
    },
    {
        "id": "from-data-to-dollars-how-ai-analytics-transforms-dental-practice-financial-performance",
        "tag": "DentTracks",
        "title": "From Data to Dollars: How AI Analytics Transforms Dental Practice Financial Performance",
        "description": "Most dental practices lose thousands each month without realizing it. Missed follow-ups, slow collections, and unchecked write-offs quietly eat into your profits. AI dental analyti…",
        "url": "blog/from-data-to-dollars-how-ai-analytics-transforms-dental-practice-financial-performance.html",
        "author": "DentTracks Team",
        "meta": "May 15, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/from-data-to-dollars-how-ai-analytics-transforms-dental-practice-financial-performance.jpg"
    },
    {
        "id": "10-game-changing-benefits-of-ai-powered-dental-practice-management",
        "tag": "DentTracks",
        "title": "10 Game-Changing Benefits of AI-Powered Dental Practice Management",
        "description": "You spend hours juggling insurance calls, scheduling, and chasing claims that slow your practice down. AI dental practice management cuts through that chaos by automating these tas…",
        "url": "blog/10-game-changing-benefits-of-ai-powered-dental-practice-management.html",
        "author": "DentTracks Team",
        "meta": "April 30, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/10-game-changing-benefits-of-ai-powered-dental-practice-management.jpg"
    },
    {
        "id": "how-ai-powered-dental-practice-management-solutions-improve-operational-efficiency",
        "tag": "DentTracks",
        "title": "How AI-Powered Dental Practice Management Solutions Improve Operational Efficiency",
        "description": "Most dental practices lose hours each week to manual tasks like scheduling and insurance checks. That’s time your team could spend caring for patients or growing your business. AI …",
        "url": "blog/how-ai-powered-dental-practice-management-solutions-improve-operational-efficiency.html",
        "author": "DentTracks Team",
        "meta": "April 23, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/how-ai-powered-dental-practice-management-solutions-improve-operational-efficiency.jpg"
    },
    {
        "id": "from-data-to-dollars-using-dental-analytics-to-optimize-revenue-cycle-management",
        "tag": "DentTracks",
        "title": "From Data to Dollars: Using Dental Analytics to Optimize Revenue Cycle Management",
        "description": "You’re losing revenue every day without realizing it. Missed claims, slow payments, and denied insurance requests quietly drain your practice’s profits. Dental revenue cycle manage…",
        "url": "blog/from-data-to-dollars-using-dental-analytics-to-optimize-revenue-cycle-management.html",
        "author": "DentTracks Team",
        "meta": "April 8, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/from-data-to-dollars-using-dental-analytics-to-optimize-revenue-cycle-management.jpg"
    },
    {
        "id": "automating-insurance-verification-and-credentialing-in-dentistry-faster-eligibility-quicker-payer-enrollment-stronger-cash-flow",
        "tag": "DentTracks",
        "title": "Automating Insurance Verification and Credentialing in Dentistry: Faster Eligibility, Quicker Payer Enrollment, Stronger Cash Flow",
        "description": "Manual insurance verification and credentialing slow your practice down and cause costly denials. Automating these processes with real-time eligibility (RTE) checks and dental cred…",
        "url": "blog/automating-insurance-verification-and-credentialing-in-dentistry-faster-eligibility-quicker-payer-enrollment-stronger-cash-flow.html",
        "author": "DentTracks Team",
        "meta": "April 1, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/automating-insurance-verification-and-credentialing-in-dentistry-faster-eligibility-quicker-payer-enrollment-stronger-cash-flow.jpg"
    },
    {
        "id": "from-data-to-dollars-leveraging-dental-analytics-to-accelerate-revenue-and-ebitda",
        "tag": "DentTracks",
        "title": "From Data to Dollars: Leveraging Dental Analytics to Accelerate Revenue and EBITDA",
        "description": "You’re leaving money on the table if your dental practice isn’t using data to guide decisions. Dental analytics reveal hidden revenue leaks and pinpoint exactly where your case acc…",
        "url": "blog/from-data-to-dollars-leveraging-dental-analytics-to-accelerate-revenue-and-ebitda.html",
        "author": "DentTracks Team",
        "meta": "March 22, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/from-data-to-dollars-leveraging-dental-analytics-to-accelerate-revenue-and-ebitda.jpg"
    },
    {
        "id": "practical-strategies-for-reducing-administrative-burden-in-dental-clinics-an-ai-first-playbook",
        "tag": "DentTracks",
        "title": "Practical Strategies for Reducing Administrative Burden in Dental Clinics — An AI-First Playbook",
        "description": "You spend hours each week trapped in paperwork that pulls you away from patient care and practice growth. Reducing administrative burden in dental clinics isn’t just about saving t…",
        "url": "blog/practical-strategies-for-reducing-administrative-burden-in-dental-clinics-an-ai-first-playbook.html",
        "author": "DentTracks Team",
        "meta": "March 15, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/practical-strategies-for-reducing-administrative-burden-in-dental-clinics-an-ai-first-playbook.jpg"
    },
    {
        "id": "why-integrating-financial-and-practice-management-systems-transforms-dental-performance",
        "tag": "DentTracks",
        "title": "Why Integrating Financial and Practice Management Systems Transforms Dental Performance",
        "description": "Most dental practices juggle separate systems for clinical work and finances—and it costs more than time. When you unify financial and clinical data, you gain clearer insights and …",
        "url": "blog/why-integrating-financial-and-practice-management-systems-transforms-dental-performance.html",
        "author": "DentTracks Team",
        "meta": "March 1, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/why-integrating-financial-and-practice-management-systems-transforms-dental-performance.jpg"
    },
    {
        "id": "from-front-desk-to-ledger-how-ai-powered-automation-is-revolutionizing-dental-practice-management",
        "tag": "DentTracks",
        "title": "From Front Desk to Ledger: How AI-Powered Automation Is Revolutionizing Dental Practice Management",
        "description": "Running a dental practice means juggling patient care, insurance hurdles, and endless admin tasks every day. AI dental practice management now cuts through that chaos, automating e…",
        "url": "blog/from-front-desk-to-ledger-how-ai-powered-automation-is-revolutionizing-dental-practice-management.html",
        "author": "DentTracks Team",
        "meta": "February 20, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/from-front-desk-to-ledger-how-ai-powered-automation-is-revolutionizing-dental-practice-management.jpg"
    },
    {
        "id": "streamline-your-practice-best-practices-for-automating-insurance-verification-in-dental-clinics",
        "tag": "DentTracks",
        "title": "Streamline Your Practice: Best Practices for Automating Insurance Verification in Dental Clinics",
        "description": "Insurance verification often drains hours from your team each week, slowing down patient onboarding and increasing errors. Manual checks no longer fit the pace of today’s dental pr…",
        "url": "blog/streamline-your-practice-best-practices-for-automating-insurance-verification-in-dental-clinics.html",
        "author": "DentTracks Team",
        "meta": "February 14, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/streamline-your-practice-best-practices-for-automating-insurance-verification-in-dental-clinics.jpg"
    },
    {
        "id": "unlocking-profitability-how-data-analytics-revolutionizes-dental-practices",
        "tag": "DentTracks",
        "title": "Unlocking Profitability: How Data Analytics Revolutionizes Dental Practices",
        "description": "Most dental practices rely on gut feeling when making key decisions—and it costs them thousands each month. Data analytics changes that by turning raw numbers into clear actions th…",
        "url": "blog/unlocking-profitability-how-data-analytics-revolutionizes-dental-practices.html",
        "author": "DentTracks Team",
        "meta": "February 1, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/unlocking-profitability-how-data-analytics-revolutionizes-dental-practices.jpg"
    },
    {
        "id": "top-strategies-to-automate-your-dental-practice-workflow-successfully",
        "tag": "DentTracks",
        "title": "Top Strategies to Automate Your Dental Practice Workflow Successfully",
        "description": "Most dental practices spend countless hours tangled in paperwork and manual tasks that drain time and energy. You know these inefficiencies hold your team back from focusing on pat…",
        "url": "blog/top-strategies-to-automate-your-dental-practice-workflow-successfully.html",
        "author": "DentTracks Team",
        "meta": "January 26, 2026 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/top-strategies-to-automate-your-dental-practice-workflow-successfully.jpg"
    },
    {
        "id": "the-hidden-chaos-in-dental-communication-and-why-most-practices-dont-see-it",
        "tag": "Dental Tech",
        "title": "The Hidden Chaos in Dental Communication – And Why Most Practices Don’t See It",
        "description": "Modern dental businesses invest heavily in clinical excellence, equipment, and patient acquisition. Yet one critical layer of operations is often overlooked: communication.",
        "url": "blog/the-hidden-chaos-in-dental-communication-and-why-most-practices-dont-see-it.html",
        "author": "DentTracks Team",
        "meta": "January 21, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/the-hidden-chaos-in-dental-communication-and-why-most-practices-dont-see-it.jpg"
    },
    {
        "id": "dentaccounts-bringing-financial-clarity-to-dental-practices-without-accounting-complexity",
        "tag": "DentTracks",
        "title": "DentAccounts: Bringing Financial Clarity to Dental Practices Without Accounting Complexity",
        "description": "Financial clarity is one of the most misunderstood challenges in dental practices.",
        "url": "blog/dentaccounts-bringing-financial-clarity-to-dental-practices-without-accounting-complexity.html",
        "author": "DentTracks Team",
        "meta": "January 17, 2026 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/dentaccounts-bringing-financial-clarity-to-dental-practices-without-accounting-complexity.jpg"
    },
    {
        "id": "denttracks-revolutionizing-dental-business-efficiency",
        "tag": "DentTracks",
        "title": "DentTracks: Revolutionizing Dental Business Efficiency",
        "description": "Running a dental business today is about more than great dentistry; it’s about managing operations that run like clockwork. From scheduling appointments and tracking treatments to …",
        "url": "blog/denttracks-revolutionizing-dental-business-efficiency.html",
        "author": "DentTracks Team",
        "meta": "October 18, 2025 · 2 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/denttracks-revolutionizing-dental-business-efficiency.jpg"
    },
    {
        "id": "why-denttracks-is-the-most-flexible-dental-software-for-growing-businesses",
        "tag": "DentTracks",
        "title": "Why DentTracks Is the Most Flexible Dental Software for Growing Businesses",
        "description": "Growth in a dental business brings both opportunities and new complexities. As operations expand, managing multiple locations, staff, and systems can quickly become overwhelming. D…",
        "url": "blog/why-denttracks-is-the-most-flexible-dental-software-for-growing-businesses.html",
        "author": "DentTracks Team",
        "meta": "October 11, 2025 · 2 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/why-denttracks-is-the-most-flexible-dental-software-for-growing-businesses.jpg"
    },
    {
        "id": "elevate-your-patient-experience-with-denttracks",
        "tag": "DentTracks",
        "title": "Elevate Your Patient Experience with DentTracks",
        "description": "In today’s competitive dental landscape, patient experience is the key differentiator that drives growth and loyalty. DentTracks puts patient satisfaction at the center of your den…",
        "url": "blog/elevate-your-patient-experience-with-denttracks.html",
        "author": "DentTracks Team",
        "meta": "October 10, 2025 · 2 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/elevate-your-patient-experience-with-denttracks.jpg"
    },
    {
        "id": "how-ai-powered-cloud-based-dental-software-is-optimizing-your-practice",
        "tag": "Dental Tech",
        "title": "How AI-Powered, Cloud-Based Dental Software is Optimizing Your Practice",
        "description": "Running a dental practice comes with a lot of responsibilities—from managing appointments and patient care to handling finances and staff. It can often feel like there’s not enough…",
        "url": "blog/how-ai-powered-cloud-based-dental-software-is-optimizing-your-practice.html",
        "author": "DentTracks Team",
        "meta": "April 12, 2025 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/how-ai-powered-cloud-based-dental-software-is-optimizing-your-practice.jpg"
    },
    {
        "id": "why-denttracks-is-the-most-flexible-dental-software-for-growing-practices",
        "tag": "Dental Tech",
        "title": "Why DentTracks is the Most Flexible Dental Software for Growing Practices",
        "description": "Running a growing dental practice means dealing with new challenges every day. As your practice expands, you will need a system that can adapt to these changes. Whether it is manag…",
        "url": "blog/why-denttracks-is-the-most-flexible-dental-software-for-growing-practices.html",
        "author": "DentTracks Team",
        "meta": "March 20, 2025 · 5 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/why-denttracks-is-the-most-flexible-dental-software-for-growing-practices.jpg"
    },
    {
        "id": "ai-in-dental-practice-management-how-it-transforms-operations-and-enhances-patient-care",
        "tag": "Dental Tech",
        "title": "AI in Dental Practice Management: How It Transforms Operations and Enhances Patient Care",
        "description": "Running a dental practice means balancing many different tasks—from scheduling appointments and managing billing to keeping patients happy and informed. It’s a lot to handle, but w…",
        "url": "blog/ai-in-dental-practice-management-how-it-transforms-operations-and-enhances-patient-care.html",
        "author": "DentTracks Team",
        "meta": "March 10, 2025 · 4 min read",
        "cta": "Read Article",
        "thumb": "assets/blog-thumbs/ai-in-dental-practice-management-how-it-transforms-operations-and-enhances-patient-care.jpg"
    }
]
};
