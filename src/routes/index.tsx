import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { checkPathway, type PathwayResult, type Profile } from "../lib/pathway";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skills Pathway Checker" },
      { name: "description", content: "Free guidance for skilled refugees on credentials, paperwork and learning options." },
      { property: "og:title", content: "Skills Pathway Checker" },
      { property: "og:description", content: "Free guidance for skilled refugees on credentials, paperwork and learning options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fieldClass =
  "w-full rounded-xl border-2 border-input bg-card px-4 py-3.5 text-lg text-foreground focus:border-primary focus:outline-hidden focus:ring-4 focus:ring-primary/20";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-base font-semibold text-foreground">{label}</label>
      {children}
    </div>
  );
}

function Choice({ name, options, value, onChange, legend }: { name: string; options: string[]; value: string; onChange: (v: string) => void; legend: string }) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-base font-semibold text-foreground">{legend}</legend>
      <div className="grid grid-cols-3 gap-2">
        {options.map((o) => (
          <label key={o} className={`cursor-pointer rounded-xl border-2 px-2 py-3.5 text-center text-lg font-medium transition-colors ${value === o ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground hover:border-primary/50"}`}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" required />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Index() {
  const [country, setCountry] = useState("");
  const [qualification, setQualification] = useState("");
  const [field, setField] = useState("");
  const [years, setYears] = useState("");
  const [certificates, setCertificates] = useState("");
  const [workAuth, setWorkAuth] = useState("");
  const [result, setResult] = useState<PathwayResult | null>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const profile = {
      country, qualification, field: field.trim().slice(0, 100),
      years: Math.max(0, Math.min(60, Number(years) || 0)), certificates, workAuth,
    } as Profile;
    setResult(checkPathway(profile));
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <header className="mb-8">
          <p className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">Free · No sign-up</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">Skills Pathway Checker</h1>
          <p className="mt-3 text-lg text-muted-foreground">Answer six quick questions to see what to verify, what paperwork comes next, and where to keep learning.</p>
        </header>

        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <Field label="Country of residence" htmlFor="country">
            <select id="country" required value={country} onChange={(e) => setCountry(e.target.value)} className={fieldClass}>
              <option value="" disabled>Choose a country</option>
              <option>Kenya</option><option>Uganda</option><option>Other</option>
            </select>
          </Field>
          <Field label="Highest qualification" htmlFor="qualification">
            <select id="qualification" required value={qualification} onChange={(e) => setQualification(e.target.value)} className={fieldClass}>
              <option value="" disabled>Choose a qualification</option>
              <option>Secondary</option><option>Diploma</option><option>Bachelor's</option><option>Master's</option><option>PhD</option>
            </select>
          </Field>
          <Field label="Field of work" htmlFor="field">
            <input id="field" required maxLength={100} placeholder="e.g. Nursing, Software, Teaching" value={field} onChange={(e) => setField(e.target.value)} className={fieldClass} />
          </Field>
          <Field label="Years of work experience" htmlFor="years">
            <input id="years" type="number" inputMode="numeric" min={0} max={60} required value={years} onChange={(e) => setYears(e.target.value)} className={fieldClass} />
          </Field>
          <Choice legend="Do you have your certificates with you?" name="certificates" options={["Yes", "No", "Partly"]} value={certificates} onChange={setCertificates} />
          <Choice legend="Are you legally allowed to work?" name="workAuth" options={["Yes", "No", "Not sure"]} value={workAuth} onChange={setWorkAuth} />
          <button type="submit" className="w-full rounded-2xl bg-primary px-6 py-5 text-xl font-bold text-primary-foreground shadow-soft transition hover:bg-primary/90 focus:outline-hidden focus:ring-4 focus:ring-primary/30">
            Check My Pathway
          </button>
        </form>

        {result && (
          <section id="results" aria-label="Your results" className="mt-8 space-y-6 rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-3xl font-bold text-foreground">Your pathway</h2>
            <ResultBlock n={1} title="Credentials to verify">
              <ul className="list-disc space-y-2 pl-5">{result.credentials.map((c) => <li key={c}>{c}</li>)}</ul>
            </ResultBlock>
            <ResultBlock n={2} title="Next legal & paperwork steps">
              <ol className="list-decimal space-y-2 pl-5">{result.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            </ResultBlock>
            <ResultBlock n={3} title="Free learning & mentorship">
              <div className="space-y-3">
                {result.resources.map((r) => (
                  <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border-2 border-border bg-secondary p-4 transition hover:border-primary">
                    <span className="block text-lg font-semibold text-primary">{r.title} →</span>
                    <span className="block text-base text-muted-foreground">{r.description}</span>
                  </a>
                ))}
              </div>
            </ResultBlock>
          </section>
        )}

        <p className="mt-10 border-t border-border pt-6 text-center text-base text-muted-foreground">
          This tool gives general guidance. Confirm requirements with official authorities.
        </p>
      </div>
    </main>
  );
}

function ResultBlock({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 flex items-center gap-3 text-xl font-bold text-foreground">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-base text-accent-foreground">{n}</span>
        {title}
      </h3>
      <div className="text-lg leading-relaxed text-foreground">{children}</div>
    </div>
  );
}
