/**
 * PLACEHOLDER profiles. Replace with your concierges, their real languages and, if they agree, their photographs.
 * First names only, in keeping with the discretion promise.
 */
export type Concierge = { id: string; name: string; based: string; languages: string[]; regions: string; line: string; placeholder: true };

export const concierges: Concierge[] = [
  { id: "c1", name: "Layla", based: "Dubai", languages: ["English", "Arabic", "French"], regions: "The Gulf and Jordan",
    line: "The best part of my day is a message that says, simply, “Thank you, that was perfect.”", placeholder: true },
  { id: "c2", name: "Karim", based: "Marrakech", languages: ["French", "Arabic", "English", "Spanish"], regions: "Morocco, Tunisia and Algeria",
    line: "I grew up in the medina. I still find a new door every month.", placeholder: true },
  { id: "c3", name: "Sophie", based: "Riyadh", languages: ["English", "German", "Arabic"], regions: "Saudi Arabia and the Red Sea",
    line: "AlUla at first light is the reason I moved here. I never tire of showing it.", placeholder: true },
  { id: "c4", name: "Omar", based: "Cairo", languages: ["Arabic", "English", "Italian"], regions: "Egypt and the Nile",
    line: "Every guest asks a different question of the past. My job is to find who can answer it.", placeholder: true },
];
