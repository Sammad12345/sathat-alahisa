import type { Dictionary } from "./ar";

export const en: Dictionary = {
  meta: {
    title: "Flatbed Towing in Al-Ahsa & Al-Hofuf | Car Transport and Recovery",
    description:
      "Flatbed towing for broken-down and accident-damaged cars in Al-Ahsa and Al-Hofuf, with transport to other cities by arrangement. Message us on WhatsApp with your location and car details.",
    keywords: [
      "tow truck Al-Ahsa",
      "flatbed towing Al-Hofuf",
      "car transport Al-Ahsa",
      "car towing Hofuf",
      "vehicle recovery Saudi Arabia",
      "broken down car transport",
    ],
    ogAlt: "Flatbed car transport",
    areaServed: ["Al-Ahsa", "Al-Hofuf"],
  },
  common: {
    tagline: "Car towing & transport",
    location: { a: "Al-Ahsa", b: "Al-Hofuf" },
    whatsapp: "WhatsApp",
    whatsappCta: "Message us on WhatsApp",
    whatsappTooltip: "Contact us on WhatsApp",
    callNow: "Call us now",
    call: "Call us",
    newTab: "(opens WhatsApp in a new tab)",
    newTabShort: "(opens in a new tab)",
    skipToContent: "Skip to content",
    home: "Home",
  },
  nav: {
    links: [
      { href: "#services", label: "Services" },
      { href: "#why", label: "Why us" },
      { href: "#contact", label: "Contact" },
    ],
    main: "Main navigation",
    mobile: "Mobile menu",
    open: "Open menu",
    close: "Close menu",
    language: "Choose language",
  },
  messages: {
    greeting: "Hello, I'd like to ask about your flatbed service.",
    general:
      "Hello, I need a flatbed tow truck in Al-Ahsa. I'd like to have my car transported — I'll send you my location and the car details.",
    request: [
      "Hello, I'd like to request a flatbed tow truck.",
      "Car type: ",
      "Problem: ",
      "Current location: (sending it now)",
      "Destination: ",
    ].join("\n"),
    area: "Hello, I'd like to check whether your flatbed service is available for my location. I'll send the pickup location and destination.",
    final:
      "Hello, I need a flatbed to transport my car. I'll send my current location, the car details and the destination.",
    service: (service: string) =>
      `Hello, I'd like to ask about your "${service}" service in Al-Ahsa and Al-Hofuf. I'll send my location and the car details.`,
  },
  hero: {
    eyebrow: "Flatbed towing in Al-Ahsa & Al-Hofuf",
    title: ["The flatbed you need,", "when you need it"],
    subtitle: "Moving your car starts with one call",
    body: "Car towing and transport across Al-Ahsa and Al-Hofuf, made simple. Message us on WhatsApp with your location and your car's details.",
    imageAlt: "A modern flatbed tow truck with a warning light bar on its roof",
    specs: [
      { label: "Coverage", value: "Within Al-Ahsa and Al-Hofuf" },
      { label: "Further afield", value: "Other cities by arrangement" },
      { label: "Contact", value: "Directly by WhatsApp or phone" },
    ],
    more: "Discover more",
  },
  highlights: {
    label: "Service highlights",
    items: [
      { title: "Easy to reach", text: "A direct call or a WhatsApp message — no forms, no complicated steps." },
      { title: "Share your location on WhatsApp", text: "Send your current location in one tap and tell us where the car needs to go." },
      { title: "Careful car transport", text: "Your car is loaded onto the flatbed and secured before it moves." },
      { title: "Serving Al-Ahsa & Al-Hofuf", text: "We serve Al-Ahsa and Al-Hofuf, with transport beyond by arrangement." },
    ],
  },
  services: {
    eyebrow: "Our services",
    title: "Everything you need to move your car",
    intro:
      "Pick the service you need and message us directly on WhatsApp. You'll get a ready-made message naming the service — just add your car details and location.",
    cta: "Ask about this service",
    items: [
      {
        title: "Broken-down car towing",
        text: "Car broken down on the road or outside your home? Send us your location and the problem, and we'll arrange towing to the workshop or any destination you choose.",
        alt: "A car stopped at the roadside at dusk with its doors open",
      },
      {
        title: "Flatbed car transport",
        text: "Your car rides fully loaded on the flatbed instead of being driven — ideal for cars that won't run or shouldn't be driven.",
        alt: "Our flatbed carrying a white pickup truck on the road",
      },
      {
        title: "Accident vehicle transport",
        text: "Transport for accident-damaged cars from the scene or wherever they're parked to a workshop, showroom or any destination we agree on.",
        alt: "A car with front-end damage loaded on a flatbed",
      },
      {
        title: "Transport between locations & cities",
        text: "Moving your car between neighbourhoods in Al-Ahsa and Al-Hofuf, or to other cities and regions once the destination and details are agreed.",
        alt: "A highway through the mountains in Saudi Arabia",
      },
    ],
  },
  why: {
    eyebrow: "Why us",
    title: ["Getting a flatbed", "should be simple."],
    body: "When your car breaks down, the last thing you need is complication. That's why reaching us is clear and direct from the very first message.",
    items: [
      { title: "Easy to request", text: "No app, no sign-up. One message or one call is all it takes to request a flatbed." },
      { title: "Direct contact on WhatsApp", text: "You talk to us directly and can ask anything that matters to you before agreeing." },
      { title: "Easy location sharing", text: "Send your live location from WhatsApp so we know exactly where the car is — no long directions needed." },
      { title: "Clear details before you agree", text: "We go over the car, the destination and the cost with you before the job is confirmed, so you know exactly where you stand." },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: "Three steps, and your car is on the flatbed",
    step: "Step",
    steps: [
      { title: "Contact us", text: "Send your car details and the problem on WhatsApp." },
      { title: "Share your location", text: "Send your current location and the destination." },
      { title: "Agree on the details", text: "Get the cost and details before confirming the service." },
    ],
    note: "We'll prepare a message with the fields we need: car type, problem, location and destination. Just fill them in and send.",
    cta: "Take the first step",
  },
  gallery: {
    eyebrow: "On the road",
    title: "The details that matter, every trip",
    note: "Photos from our own jobs, plus one illustrative image.",
    items: [
      { caption: "Our work: a city transport", alt: "Our red flatbed carrying a grey sedan on a city street" },
      { caption: "Our work: secured on the deck", alt: "A white luxury sedan secured on our red flatbed deck" },
      { caption: "Illustrative: the loading deck", alt: "A silver car's wheel on the perforated metal deck of a flatbed in a workshop" },
      { caption: "Our work: a car on the flatbed", alt: "A grey Hyundai loaded on our flatbed" },
    ],
  },
  area: {
    eyebrow: "Service area",
    title: "Flatbed towing in Al-Ahsa & Al-Hofuf",
    body: "We provide car towing and transport in Al-Ahsa and Al-Hofuf. Contact us with the pickup location and destination, and we'll confirm availability for your location and agree on the details with you.",
    cta: "Check availability for your location",
    coverage: [
      { place: "Al-Ahsa", note: "Car towing and transport within the governorate" },
      { place: "Al-Hofuf", note: "Car towing and transport within the city" },
      { place: "Other cities", note: "By prior arrangement on the destination" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Quick answers",
    intro: "Didn't find your answer? Message us on WhatsApp or call us directly.",
    items: [
      {
        q: "How do I request a flatbed?",
        a: "Tap any WhatsApp button on this page and a chat opens with a ready-made message. Add your car details and the problem, send your location, and we'll get back to you with the details. You can also call us directly on the number shown on this page.",
      },
      {
        q: "Can you transport my car to another city?",
        a: "Yes — cars can be transported from Al-Ahsa and Al-Hofuf to other cities and regions by arrangement. Send us the pickup location and destination so we can confirm and agree on the details.",
      },
      {
        q: "What information do you need to give a price?",
        a: "The car type and its condition (broken down or accident-damaged), its current location and the destination. The cost depends on the distance and the car's condition, and it's explained and agreed before the service is confirmed.",
      },
      {
        q: "How do I send my location on WhatsApp?",
        a: "In the chat, tap the attachment icon (the paperclip or +), choose “Location”, then “Send your current location”. Make sure location services are turned on in your phone. You can send the destination the same way.",
      },
      {
        q: "Can you transport a broken-down or damaged car?",
        a: "Yes — transporting broken-down and accident-damaged cars is one of our core services. Describe the car's condition, ideally with a photo, so we can explain the loading and transport details.",
      },
    ],
  },
  final: {
    eyebrow: "Contact us",
    title: ["Does your car need a flatbed?", "Contact us now"],
    body: "Send your location and car details, and we'll follow up on your transport request on WhatsApp.",
    cta: "Request the service on WhatsApp",
    orCall: "Or call us directly",
    directHeading: "Direct contact",
    directNote: "For urgent cases, a call or WhatsApp is fastest.",
  },
  form: {
    heading: "Submit a service request",
    intro: "Fill in the details so we can review your request and contact you on your number. Fields marked * are required.",
    requiredMark: "required",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      phone: { label: "Phone number", placeholder: "+966 5X XXX XXXX", hint: "Saudi or international number" },
      email: { label: "Email (optional)", placeholder: "name@example.com" },
      service: { label: "Service type", placeholder: "Choose a service", other: "Other service" },
      location: { label: "Vehicle location", placeholder: "District, street or a location link" },
      destination: { label: "Destination", placeholder: "Where should the car go?" },
      details: { label: "Additional details", placeholder: "Car type and condition, or anything we should know" },
    },
    submit: "Submit Service Request",
    submitting: "Sending…",
    whatsappAlt: "Or send the same details on WhatsApp",
    whatsappReview: "A ready-made message opens in WhatsApp for you to review before sending.",
    errors: {
      required: "This field is required.",
      phone: "Enter a valid phone number of 8 to 15 digits.",
      email: "Enter a valid email address.",
      tooLong: "This text is too long.",
      summary: "Please correct the highlighted fields before submitting.",
    },
    success: {
      title: "Your request has been sent",
      body: "Your request reached us by email. For urgent cases, contact us directly on WhatsApp or by phone.",
      again: "Send another request",
    },
    failure: {
      notConfigured: "Online submission isn't available right now, so your request was not sent. You can send the same details on WhatsApp instead.",
      rateLimited: "You've sent several requests in a short time. Please try again shortly or contact us on WhatsApp.",
      generic: "Your request couldn't be sent and did not reach us. Please try again or send the details on WhatsApp.",
    },
    whatsappIntro: "Hello, I'd like to request a flatbed tow truck.",
  },
  notFound: {
    title: "Page not found",
    body: "The link may have changed, or the page is no longer available.",
    home: "Back to the home page",
  },
  footer: {
    about: "Flatbed towing and transport for broken-down and damaged cars in Al-Ahsa and Al-Hofuf, with transport to other cities by arrangement.",
    pageHeading: "Page",
    navLabel: "Footer links",
    contactHeading: "Contact",
    area: "Service area: Al-Ahsa • Al-Hofuf",
    areaNote: "Transport to other cities by arrangement",
    rights: "All rights reserved.",
    credits: "Image credits",
  },
  credits: {
    title: "Image credits",
    description: "Sources and licenses of the illustrative images used on this website.",
    back: "Back to the home page",
    intro:
      "Some photos on this site are from our own jobs; others are illustrative images of flatbed and transport services and do not show our vehicles. The illustrative images have been cropped and color-graded and are used under the licenses listed below.",
    uses: {
      hero: "Hero section",
      breakdown: "Broken-down car towing",
      accident: "Accident vehicle transport",
      intercity: "Transport between locations & cities",
      gallery: "Gallery",
      area: "Service area section",
      contact: "Contact section",
    },
  },
};
