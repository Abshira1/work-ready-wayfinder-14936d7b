export type Country = "Kenya" | "Uganda" | "Other";
export type Qualification = "Secondary" | "Diploma" | "Bachelor's" | "Master's" | "PhD";
export type Answer3 = "Yes" | "No" | "Partly";
export type WorkAuth = "Yes" | "No" | "Not sure";

export interface Profile {
  country: Country;
  qualification: Qualification;
  field: string;
  years: number;
  certificates: Answer3;
  workAuth: WorkAuth;
}

export interface Resource { title: string; description: string; url: string }
export interface PathwayResult { credentials: string[]; steps: string[]; resources: Resource[] }

export function getCredentials(p: Profile): string[] {
  const list: string[] = [];
  if (p.qualification === "Secondary") {
    list.push("Secondary school leaving certificate (e.g. KCSE, UCE or equivalent)");
  } else if (p.qualification === "Diploma") {
    list.push("Diploma certificate and transcripts");
    list.push("Recognition of your diploma by the national qualifications authority");
  } else {
    list.push(`${p.qualification} degree certificate and academic transcripts`);
    list.push("Degree equivalency / recognition from the national qualifications or higher-education authority");
    if (p.qualification === "PhD" || p.qualification === "Master's") {
      list.push("Thesis or research summary (useful for academic and research roles)");
    }
  }
  if (p.years > 0) list.push("Reference or employment letters covering your work experience");
  if (p.certificates === "No") {
    list.push("Request replacement copies from your school or university, or ask about UNESCO Qualifications Passport for refugees");
    list.push("Sworn statement (affidavit) describing your qualifications while documents are missing");
  } else if (p.certificates === "Partly") {
    list.push("Request copies of the missing documents from your institution where possible");
    list.push("Certified copies and translations of the documents you do have");
  } else {
    list.push("Certified copies and official translations of your certificates");
  }
  return list;
}

export function getSteps(p: Profile): string[] {
  const steps: string[] = [];
  if (p.workAuth === "Yes") {
    steps.push("Keep your work permit or refugee ID valid and make copies for employers");
    steps.push("Register for a tax number (e.g. KRA PIN in Kenya, TIN in Uganda) if you don't have one");
    steps.push("Check if your profession needs registration with a professional body before you can practise");
  } else if (p.workAuth === "No") {
    steps.push("Ask UNHCR or a legal aid organisation about your eligibility for a work permit");
    if (p.country === "Kenya") steps.push("Ask about the Class M work permit for refugees in Kenya");
    else if (p.country === "Uganda") steps.push("Confirm your refugee status documents with the Office of the Prime Minister (OPM)");
    else steps.push("Contact the immigration office in your country about refugee work rights");
    steps.push("Meanwhile, focus on volunteering, training and verifying your credentials");
  } else {
    steps.push("Visit UNHCR or a free legal aid clinic to confirm your right to work");
    steps.push("Bring your refugee ID, registration papers and any permits to that appointment");
    steps.push("Avoid formal paid work until your status is confirmed");
  }
  return steps;
}

const RESOURCE_MAP: { keywords: string[]; resources: Resource[] }[] = [
  { keywords: ["health", "nurse", "nursing", "medic", "doctor", "pharma", "clinic"], resources: [
    { title: "Free Global Health Courses", description: "Short online courses for health professionals.", url: "https://example.com/health-courses" },
    { title: "Health Workers Mentorship Network", description: "Get matched with a mentor in healthcare.", url: "https://example.com/health-mentors" },
  ]},
  { keywords: ["software", "it", "tech", "computer", "developer", "programming", "data", "engineer"], resources: [
    { title: "Free Coding & Data Courses", description: "Self-paced tech courses with certificates.", url: "https://example.com/tech-courses" },
    { title: "Tech Mentors for Refugees", description: "One-to-one mentoring from people in tech.", url: "https://example.com/tech-mentors" },
  ]},
  { keywords: ["teach", "education", "school", "lecturer"], resources: [
    { title: "Teacher Development Online", description: "Free courses on modern teaching methods.", url: "https://example.com/teacher-courses" },
    { title: "Educators Mentorship Circle", description: "Connect with experienced teachers.", url: "https://example.com/educator-mentors" },
  ]},
  { keywords: ["business", "account", "finance", "marketing", "management", "sales"], resources: [
    { title: "Free Business & Finance Courses", description: "Learn bookkeeping, finance and management.", url: "https://example.com/business-courses" },
    { title: "Entrepreneur Mentorship Program", description: "Mentors for starting or growing a business.", url: "https://example.com/business-mentors" },
  ]},
];

const DEFAULT_RESOURCES: Resource[] = [
  { title: "Free Online Skills Courses", description: "Courses across many fields, free for refugees.", url: "https://example.com/skills-courses" },
  { title: "General Career Mentorship", description: "A mentor to help plan your next career step.", url: "https://example.com/career-mentors" },
];

export function getResources(field: string): Resource[] {
  const words = field.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  for (const entry of RESOURCE_MAP) {
    if (entry.keywords.some((k) => words.some((w) => w === k || (k.length > 3 && w.startsWith(k))))) return entry.resources;
  }
  return DEFAULT_RESOURCES;
}

export function checkPathway(p: Profile): PathwayResult {
  return { credentials: getCredentials(p), steps: getSteps(p), resources: getResources(p.field) };
}
