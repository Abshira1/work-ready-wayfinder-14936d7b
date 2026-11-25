import { describe, it, expect } from "vitest";
import { checkPathway } from "../lib/pathway";

describe("checkPathway sample profiles", () => {
  it("Kenyan nurse with degree, no certificates, not authorised", () => {
    const r = checkPathway({ country: "Kenya", qualification: "Bachelor's", field: "Nursing", years: 5, certificates: "No", workAuth: "No" });
    expect(r.credentials.some((c) => c.includes("Bachelor's degree"))).toBe(true);
    expect(r.credentials.some((c) => c.includes("replacement"))).toBe(true);
    expect(r.steps.some((s) => s.includes("Class M"))).toBe(true);
    expect(r.resources[0]!.title).toContain("Health");
  });
  it("Ugandan software developer with diploma, partial certificates, authorised", () => {
    const r = checkPathway({ country: "Uganda", qualification: "Diploma", field: "Software development", years: 3, certificates: "Partly", workAuth: "Yes" });
    expect(r.credentials.some((c) => c.includes("Diploma"))).toBe(true);
    expect(r.credentials.some((c) => c.includes("missing documents"))).toBe(true);
    expect(r.steps.some((s) => s.includes("tax number"))).toBe(true);
    expect(r.resources[0]!.title).toContain("Coding");
  });
  it("Other-country PhD carpenter, certificates, unsure status", () => {
    const r = checkPathway({ country: "Other", qualification: "PhD", field: "Carpentry", years: 0, certificates: "Yes", workAuth: "Not sure" });
    expect(r.credentials.some((c) => c.includes("Thesis"))).toBe(true);
    expect(r.credentials.some((c) => c.includes("Reference"))).toBe(false);
    expect(r.steps.some((s) => s.includes("legal aid"))).toBe(true);
    expect(r.resources).toHaveLength(2);
    expect(r.resources[0]!.title).toBe("Free Online Skills Courses");
  });
});
