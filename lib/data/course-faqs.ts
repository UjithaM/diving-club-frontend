import type { PageFaq } from "@/lib/types";

export const courseFaqs: Record<string, PageFaq[]> = {
  "discover-scuba-diving": [
    {
      question: "Do I need any experience before trying Discover Scuba?",
      answer: "None at all. You don't need a certification, and you don't need to have swum in the ocean before. We start with a short theory session and a pool practice, then head out on the boat. Most people are underwater and exploring within two hours of arriving.",
    },
    {
      question: "How deep do we go?",
      answer: "Maximum 12 m, and usually we stay shallower than that on your first dive. Twelve metres is about the depth where the reef life really starts — coral bommies, fish, the occasional turtle. You won't feel like you're missing anything.",
    },
    {
      question: "Can kids do the Discover Scuba experience?",
      answer: "Yes — from age 10. We adjust the briefing and approach for younger divers, and parents are welcome on the boat (though not in the water during the dive). For children aged 8–9, we offer the Bubblemaker programme in the pool instead.",
    },
    {
      question: "Does this count toward an Open Water course?",
      answer: "It can. If you decide mid-experience that you want to keep going and do the full Open Water Diver course, the Discover Scuba dive can count as one of your open-water training dives. Talk to us at the end of your session.",
    },
  ],
  "open-water-diver": [
    {
      question: "What happens if I can't finish the course?",
      answer: "Life happens — we get it. If you need to stop partway through, we'll pause the training and you can complete the remaining dives on a return trip, or transfer to a PADI dive centre at your next destination. The PADI system is designed to be completed in stages.",
    },
    {
      question: "Do I need to do eLearning before I arrive?",
      answer: "You can, and it speeds things up considerably — you arrive knowing the theory and we go straight to pool and ocean work. But it's not mandatory. We can do the knowledge development sessions in Trincomalee as part of the course. Either works; eLearning just means more time in the water.",
    },
    {
      question: "How many people are in each class?",
      answer: "Maximum five students per instructor. In practice, we often have fewer. Small groups mean you get actual attention — not just a briefing and a wave.",
    },
    {
      question: "Is the Open Water certification recognised worldwide?",
      answer: "Yes — PADI Open Water is the most widely recognised scuba certification on the planet. It's valid in 186 countries and accepted by dive operators everywhere, from Bali to the Maldives to the Red Sea.",
    },
  ],
  "advanced-open-water": [
    {
      question: "How soon after my Open Water can I do Advanced?",
      answer: "Immediately, if you want to. There's no minimum number of logged dives required, though in practice we recommend at least a day or two of fun diving between the two courses so the basic skills feel natural before you're working on more advanced techniques.",
    },
    {
      question: "Can I choose my adventure dives?",
      answer: "Yes — you pick two from the available specialties (deep and navigation are mandatory). Popular choices in Trincomalee include Wreck, Underwater Photography, and Night Diving. We'll run through the options when you book.",
    },
    {
      question: "What depth does Advanced go to?",
      answer: "The deep adventure dive goes to 30 m. It's often the first time divers experience nitrogen narcosis — a slightly heady, floaty feeling at depth. Recognising and managing it is part of what you learn on the deep dive.",
    },
    {
      question: "Do Trincomalee's dive sites suit the Advanced course?",
      answer: "Very well. Klathipa Deep is our go-to for the mandatory deep dive. The SS British Sergeant wreck works perfectly for wreck adventure diving. And the navigation dive on a site like Coral Garden — where natural reference points are clear — is genuinely useful practice.",
    },
  ],
  "rescue-diver": [
    {
      question: "Why is Rescue Diver considered the best course in diving?",
      answer: "Most divers who complete it say the same thing: it changes how you see diving. Not because it's scary, but because you go from thinking about your own dive to thinking about the whole group. The skills are genuinely useful — and the training scenarios, while challenging, are also kind of fun in a problem-solving way.",
    },
    {
      question: "Do I need EFR before starting Rescue Diver?",
      answer: "Yes — Emergency First Response (CPR and first aid) is a prerequisite, and it needs to be current within 24 months. We offer EFR here at Diving Club, so you can do both back-to-back. Most people combine them into a single training trip.",
    },
    {
      question: "What's the hardest part of the Rescue Diver course?",
      answer: "Honestly, the scenario work — rescuing an unresponsive diver underwater and managing them to the surface. It's physically and mentally demanding, but our instructors go through it step by step before you're asked to do it live. Nobody gets thrown in the deep end (so to speak).",
    },
  ],
  "emergency-first-response": [
    {
      question: "Do I need any medical training to take EFR?",
      answer: "None at all. The course is designed from the ground up for people with no first aid background. By the end of the day, you'll know CPR, basic wound care, how to use an AED, and how to manage an emergency scene until help arrives.",
    },
    {
      question: "Is EFR only for divers?",
      answer: "No — the skills you learn are general emergency response skills. They apply anywhere: on the street, at home, at a sport event. The diving focus is just that it's required for Rescue Diver, but the certificate itself is a general first aid qualification.",
    },
  ],
  "deep-diving": [
    {
      question: "Why take a Deep Diving specialty when Advanced already goes to 30 m?",
      answer: "Advanced takes you to 30 m with an instructor. The Deep Diving specialty trains you to plan and execute dives to 40 m yourself — with knowledge of gas management, nitrogen narcosis recognition, and emergency protocols at that depth. It's the difference between being supervised and being genuinely qualified.",
    },
    {
      question: "Which Trincomalee sites can I access with the Deep Diving specialty?",
      answer: "The SS British Sergeant wreck (18–24 m), Klathipa Deep (28–40 m), and eventually, with further tec training, HMS Hermes (45–53 m). The specialty opens up the more dramatic terrain in the bay.",
    },
  ],
  "underwater-photography": [
    {
      question: "Do I need my own camera?",
      answer: "No — we have underwater camera rigs you can use during the training dives. If you want to bring your own housing and camera, that's great. Either way, by the end of the course you'll know how to use it properly.",
    },
    {
      question: "Why is Trincomalee good for underwater photography?",
      answer: "The marine life density, the water clarity (10–25 m visibility in season), and the variety — coral gardens, wrecks, macro life, pelagics. Swami Rock alone gives you turtles, eels, statues, and schools of fish in the same dive. It's a genuinely photogenic destination.",
    },
  ],
  "divemaster": [
    {
      question: "How long does the Divemaster programme take?",
      answer: "Between four and eight weeks, depending on how many logged dives you arrive with, how quickly you develop the skills, and how much time you spend assisting with courses. We treat it as an internship, not a factory — you leave when you're ready, not when a calendar slot has passed.",
    },
    {
      question: "What do I do with a Divemaster certification?",
      answer: "It's the entry point to the professional diving world. You can guide certified divers, assist PADI instructors, work for dive centres around the world, and it's the prerequisite for the PADI Instructor Development Course if you decide to go further.",
    },
    {
      question: "Do you help with job placement after completing Divemaster?",
      answer: "We can't promise placement, but we're honest about the industry: most Divemasters start by working in dive destinations in exchange for accommodation and free diving rather than a full salary. The experience you build in that first year is what eventually opens doors to paid positions.",
    },
  ],
  "wreck-diving": [
    {
      question: "What makes Trincomalee special for wreck diving?",
      answer: "It's one of the most historically significant dive destinations in Asia. The bay saw major naval action in WWII — HMS Hermes (aircraft carrier, 45–53 m) is one of the largest diveable wrecks in the world. For recreational wreck divers, the SS British Sergeant at 18–24 m and Irarakandy at 6–10 m are both accessible and worth multiple dives.",
    },
    {
      question: "Can I penetrate the wrecks?",
      answer: "Limited penetration only, and only for certified wreck divers with proper equipment (torch, line). We don't do full wreck penetration on recreational air. The Wreck Diving specialty teaches non-penetration and limited penetration techniques — enough to experience the interior of accessible sections safely.",
    },
  ],
  "night-diving": [
    {
      question: "Is night diving scary?",
      answer: "A bit, in a good way. The first time you turn off your torch and let your eyes adjust, you'll see bioluminescence — plankton lighting up every movement in the water. It's genuinely one of the stranger, more magical things you can experience. Once you've done a few minutes in the dark, the nerves settle and the curiosity takes over.",
    },
    {
      question: "Do the dive sites look different at night?",
      answer: "Completely different. Creatures that hide during the day come out at night — crabs, lobsters, octopus, sleeping parrotfish in their mucus cocoons. Predators become more active. The reef looks different too — torch-lit colours pop in a way that daylight and blue water doesn't allow.",
    },
  ],
  "nitrox-diving": [
    {
      question: "What's the main advantage of diving with nitrox?",
      answer: "Longer no-decompression limits at depth, and faster surface recovery between dives. On a two-dive day in Trincomalee, nitrox can add meaningful bottom time to your second dive. The trade-off is a lower maximum depth limit — nitrox 32 divers are limited to 34 m.",
    },
    {
      question: "How long does the nitrox course take?",
      answer: "It's a short specialty — usually half a day of knowledge development and a check-out dive. No extensive pool training. If you're already a certified Open Water diver, you can be nitrox-certified by the end of your first day.",
    },
  ],
  "underwater-navigator": [
    {
      question: "Why do I need a navigation specialty when I have a dive guide?",
      answer: "Because guides aren't always available, dive sites aren't always simple, and being able to find your own way back to the boat is a fundamental safety skill. The specialty teaches compass use, natural navigation, and distance estimation — skills every diver should have, not just guides.",
    },
  ],
  "peak-performance-buoyancy": [
    {
      question: "I already have decent buoyancy — is this course still worth it?",
      answer: "Probably, yes. Most divers think their buoyancy is better than it actually is — the camera doesn't lie on the training dives. What the specialty teaches isn't just hovering; it's precision hovering, streamlining your gear, and reading water movement. The divers who take it usually report that every subsequent dive feels easier.",
    },
  ],
  "coral-reef-conservation": [
    {
      question: "Is this course mainly for conservation enthusiasts or useful for all divers?",
      answer: "It's built around diving, not just reading. The skills — buoyancy control around corals, identification of reef health indicators, debris removal protocols — are useful on every dive you do for the rest of your career. The conservation angle gives you context for why you do things the way we teach them.",
    },
  ],
};
