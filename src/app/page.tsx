import type { ReactNode } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/markkaye/";
const EMAIL = "hello@opsology.io";

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12">
      {children}
    </div>
  );
}

function SectionNum({ num }: { num: string }) {
  return (
    <span className="font-heading text-[clamp(4rem,12vw,10rem)] font-semibold leading-none text-white/[0.06] select-none">
      {num}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--ops-bg)] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/12 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-[var(--ops-bg-2)]/80 to-transparent" />
      </div>

      {/* Header: minimal bar */}
      <header className="relative z-10 border-b border-white/5">
        <Container>
          <div className="flex items-center justify-between py-5">
            <div>
              <span className="font-heading text-lg font-semibold tracking-tight text-white">
                Opsology
              </span>
              <span className="ml-2 text-xs text-white/50">—</span>
              <span className="ml-2 text-xs text-white/50">
                Independent Infrastructure Assurance
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={LINKEDIN_URL}
                className="hidden text-sm text-white/60 hover:text-white sm:inline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://calendar.app.google/BDMFRZxZFPkWD8BJ6"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-[#071022] transition hover:bg-orange-400"
                target="_blank"
                rel="noreferrer"
              >
                Check availability
              </a>
            </div>
          </div>
        </Container>
      </header>

      <main className="relative">
        {/* Hero: split layout — left huge headline, right content panel */}
        <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-40">
          <Container>
            <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-20">
              {/* Left: massive headline */}
              <div className="lg:col-span-6">
                <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/50 sm:gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Senior, independent assurance
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    High-impact engagements
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Commercially grounded judgement
                  </span>
                </div>
                <h1 className="mt-8 font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  Operational assurance for platforms that cannot afford{" "}
                  <span className="block text-orange-300 lg:mt-2">failure</span>.
                </h1>
              </div>
              {/* Right: intro card + CTAs */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
                  <div className="space-y-5 text-base leading-[1.7] text-white/75">
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
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="https://calendar.app.google/BDMFRZxZFPkWD8BJ6"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-[#071022] transition hover:bg-orange-400"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Check availability
                    </a>
                    <a
                      href="#assessment"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    >
                      What you get
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Assessment: bento grid + section number */}
        <section id="assessment" className="relative py-24 sm:py-32 lg:py-40">
          <Container>
            <div className="relative flex gap-12 lg:gap-20">
              <div className="absolute left-6 top-0 hidden lg:block lg:left-8">
                <SectionNum num="01" />
              </div>
              <div className="min-w-0 flex-1 lg:pl-0">
                <div className="mb-12 max-w-xl">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/50">
                    Engagement
                  </p>
                  <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Infrastructure Risk & Scale Assessment
                  </h2>
                  <p className="mt-5 text-sm leading-[1.7] text-white/75">
                    A focused engagement designed to give leadership clear
                    visibility into operational resilience, architectural
                    exposure, and scaling readiness.
                  </p>
                </div>
                {/* Bento: one large, three smaller */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:col-span-2 lg:row-span-2 lg:flex lg:flex-col lg:justify-center">
                    <h3 className="font-heading text-lg font-semibold text-white">
                      Where your platform is fragile
                    </h3>
                    <p className="mt-3 text-sm leading-[1.65] text-white/75">
                      Clear identification of failure modes, operational hotspots,
                      and reliability bottlenecks.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="font-heading text-base font-semibold text-white">
                      What could constrain growth
                    </h3>
                    <p className="mt-2 text-sm leading-[1.65] text-white/75">
                      Capacity, architecture, and process constraints that will
                      surface under scale.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <h3 className="font-heading text-base font-semibold text-white">
                      Which risks are underestimated
                    </h3>
                    <p className="mt-2 text-sm leading-[1.65] text-white/75">
                      Identify structural risks before they impact revenue.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:col-span-2 lg:col-span-2">
                    <h3 className="font-heading text-base font-semibold text-white">
                      Business consequence, not just tech
                    </h3>
                    <p className="mt-2 text-sm leading-[1.65] text-white/75">
                      A prioritised view of what matters, and what to do next.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Who: full-bleed dark band */}
        <section className="relative border-y border-white/10 bg-[var(--ops-bg-2)]/60 py-24 sm:py-32 lg:py-40">
          <Container>
            <div className="relative flex gap-12 lg:gap-20">
              <div className="absolute left-6 top-0 hidden lg:block lg:left-8">
                <SectionNum num="02" />
              </div>
              <div className="grid min-w-0 flex-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/50">
                    Fit
                  </p>
                  <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Who engages Opsology
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                    <p className="text-base leading-[1.75] text-white/80">
                      Typically founder-led and growth-stage organisations where
                      technology is now mission-critical and uncertainty is no
                      longer acceptable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* About: vertical accent + content */}
        <section className="relative py-24 sm:py-32 lg:py-40">
          <Container>
            <div className="relative flex gap-12 lg:gap-20">
              <div className="absolute left-6 top-0 hidden lg:block lg:left-8">
                <SectionNum num="03" />
              </div>
              <div className="grid min-w-0 flex-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/50">
                    About
                  </p>
                  <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Independent by design
                  </h2>
                </div>
                <div className="flex gap-8 lg:col-span-7">
                  <div className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent lg:block" />
                  <div className="min-w-0 space-y-5 text-sm leading-[1.75] text-white/80">
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
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View LinkedIn
                      </a>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-[#071022] transition hover:bg-orange-400"
                      >
                        Email Opsology
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA: full-bleed tinted band */}
        <section className="relative border-t border-white/10 bg-gradient-to-b from-orange-500/[0.06] to-transparent py-24 sm:py-32 lg:py-40">
          <Container>
            <div className="relative flex gap-12 lg:gap-20">
              <div className="absolute left-6 top-0 hidden lg:block lg:left-8">
                <SectionNum num="04" />
              </div>
              <div className="mx-auto max-w-3xl flex-1 text-center lg:mx-0 lg:max-w-none lg:text-left">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                  <div>
                    <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Book a consultation
                    </h2>
                    <p className="mt-4 text-base leading-[1.7] text-white/75">
                      If your platform is becoming too important to rely on
                      assumption, an independent view brings clarity.
                    </p>
                  </div>
                  <div className="shrink-0 space-y-3 lg:text-left">
                    <a
                      href="https://calendar.app.google/BDMFRZxZFPkWD8BJ6"
                      className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-2xl bg-orange-500 px-8 py-4 text-base font-semibold text-[#071022] transition hover:bg-orange-400 sm:w-auto"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Check availability
                    </a>
                    <p className="text-xs text-white/60">
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
            </div>
          </Container>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-[var(--ops-bg-2)]/40 py-8 sm:py-10">
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
