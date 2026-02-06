import type { ReactNode } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/markkaye/";
const EMAIL = "hello@opsology.io";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10">
      {children}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/50">
        {eyebrow}
      </p>
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-[1.2]">
        {title}
      </h2>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-sm transition duration-300 hover:border-white/15 hover:bg-white/[0.06]">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <h3 className="font-heading text-base font-semibold text-white">
          {title}
        </h3>
        <div className="mt-3 text-sm leading-[1.65] text-white/75">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--ops-bg)] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-56 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-orange-500/14 blur-3xl" />
        <div className="absolute -bottom-56 right-[-8rem] h-[640px] w-[640px] rounded-full bg-sky-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ops-bg-2)]/0 via-[var(--ops-bg)]/50 to-[var(--ops-bg-2)]" />
      </div>

      {/* Header */}
      <header className="relative">
        <Container>
          <div className="flex items-center justify-between py-8 sm:py-10">
            <div className="leading-tight">
              <div className="font-heading text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Opsology
              </div>
              <div className="mt-0.5 text-xs text-white/60">
                Independent Infrastructure Assurance
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={LINKEDIN_URL}
                className="hidden text-sm text-white/70 transition hover:text-white sm:inline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://calendar.app.google/BDMFRZxZFPkWD8BJ6"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-[#071022] shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/30"
                target="_blank"
                rel="noreferrer"
              >
                Check availability
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <main className="relative">
        <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
          <Container>
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Pill>Senior, independent assurance</Pill>
                <Pill>High-impact engagements</Pill>
                <Pill>Commercially grounded judgement</Pill>
              </div>

              <h1 className="mt-8 font-heading text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                Operational assurance for platforms that cannot afford{" "}
                <span className="text-orange-300">failure</span>.
              </h1>

              <div className="mt-8 space-y-5 text-lg leading-[1.75] text-white/75">
                <p>
                  When technology becomes business-critical, operational certainty
                  matters. Opsology provides senior, independent technical
                  assurance to organisations whose platforms cannot afford
                  instability, scaling failure, or hidden architectural risk.
                </p>
                <p>
                  This is not staff augmentation or generic consulting. It is
                  experienced, systems-level judgement. Applied quickly and
                  without internal bias.
                </p>
                <p>
                  Trusted across enterprise and high-growth environments operating business-critical platforms at scale.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://calendar.app.google/BDMFRZxZFPkWD8BJ6"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-[#071022] shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/30"
                  target="_blank"
                  rel="noreferrer"
                >
                  Check availability
                </a>
                <a
                  href="#assessment"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/20 hover:bg-white/10"
                >
                  What you get
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Assessment */}
        <section id="assessment" className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="lg:col-span-5">
                <SectionTitle
                  eyebrow="Engagement"
                  title="Infrastructure Risk & Scale Assessment"
                />
                <p className="mt-5 text-sm leading-[1.7] text-white/75">
                  A focused engagement designed to give leadership clear
                  visibility into operational resilience, architectural
                  exposure, and scaling readiness.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                <Card title="Where your platform is fragile">
                  Clear identification of failure modes, operational hotspots,
                  and reliability bottlenecks.
                </Card>
                <Card title="What could constrain growth">
                  Capacity, architecture, and process constraints that will
                  surface under scale.
                </Card>
                <Card title="Which risks are underestimated">
                  Identify structural risks before they impact revenue.
                </Card>
                <Card title="Business consequence, not just tech">
                  A prioritised view of what matters, and what to do next.
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Who */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionTitle eyebrow="Fit" title="Who engages Opsology" />
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                  <p className="text-sm leading-[1.75] text-white/80">
                    Typically founder-led and growth-stage organisations where
                    technology is now mission-critical and uncertainty is no
                    longer acceptable.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* About */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <SectionTitle eyebrow="About" title="Independent by design" />
              </div>
              <div className="lg:col-span-7 space-y-5 text-sm leading-[1.75] text-white/80">
                <p>
                  Opsology is led by Mark Kaye, an infrastructure architect
                  trusted to stabilise and modernise complex platforms across
                  enterprise and high-growth environments.
                </p>
                <p>
                  Known for calm judgement, rapid situational understanding, and
                  commercially grounded technical insight.
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <a
                    href={LINKEDIN_URL}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/20 hover:bg-white/10"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View LinkedIn
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-[#071022] shadow-lg shadow-orange-500/25 transition hover:bg-orange-400"
                  >
                    Email Opsology
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <div className="lg:col-span-8">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Book a consultation
                  </h2>
                  <p className="mt-4 text-sm leading-[1.75] text-white/75">
                    If your platform is becoming too important to rely on
                    assumption, an independent view brings clarity.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <a
                    href="https://calendar.app.google/BDMFRZxZFPkWD8BJ6"
                    className="flex w-full items-center justify-center whitespace-nowrap rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-[#071022] shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/30"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Check availability
                  </a>
                  <p className="mt-4 text-center text-xs text-white/60">
                    Or connect on{" "}
                    <a
                      href={LINKEDIN_URL}
                      className="underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="relative border-t border-white/10 py-10 sm:py-12">
        <Container>
          <div className="flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Opsology</p>
            <p>Independent Infrastructure Assurance</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
