const LINKEDIN_URL = "https://www.linkedin.com/in/markkaye/";
const EMAIL = "hello@opsology.io";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-6">{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium tracking-[0.22em] text-white/60">
        {eyebrow.toUpperCase()}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
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
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-sm">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-white/75">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-48 right-[-6rem] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.25]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070A12]/20 to-[#070A12]" />
      </div>

      {/* Header */}
      <header className="relative">
        <Container>
          <div className="flex items-center justify-between py-8">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5">
                <span className="text-sm font-semibold tracking-tight">O</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">Opsology</div>
                <div className="text-xs text-white/60">
                  Independent Infrastructure Assurance
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                className="hidden text-sm text-white/70 hover:text-white sm:inline"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-[#070A12] shadow-sm transition hover:bg-white/90"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <main className="relative">
        <section className="pt-8 pb-16 sm:pt-16 sm:pb-20">
          <Container>
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <Pill>Senior, independent assurance</Pill>
                <Pill>Fast, focused engagements</Pill>
                <Pill>Commercially grounded judgement</Pill>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Operational confidence for platforms that can’t afford
                instability.
              </h1>

              <p className="mt-6 text-lg leading-8 text-white/75">
                When technology becomes business-critical, operational
                confidence matters. Opsology provides senior, independent
                technical assurance to organisations whose platforms cannot
                afford instability, scaling failure, or hidden architectural
                risk.
              </p>

              <p className="mt-4 text-lg leading-8 text-white/75">
                This is not staff augmentation or generic consulting. It is
                experienced, systems-level judgement — applied quickly and
                without internal bias.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#070A12] shadow-sm transition hover:bg-white/90"
                >
                  Email {EMAIL}
                </a>
                <a
                  href="#assessment"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  What you get
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Assessment */}
        <section id="assessment" className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <SectionTitle
                  eyebrow="Engagement"
                  title="Infrastructure Risk & Scale Assessment"
                />
                <p className="mt-4 text-sm leading-6 text-white/75">
                  A focused engagement designed to give leadership clear
                  visibility into operational resilience, architectural
                  exposure, and scaling readiness.
                </p>
              </div>

              <div className="grid gap-4 lg:col-span-7 sm:grid-cols-2">
                <Card title="Where your platform is fragile">
                  Clear identification of failure modes, operational hotspots,
                  and reliability bottlenecks.
                </Card>
                <Card title="What could constrain growth">
                  Capacity, architecture, and process constraints that will
                  surface under scale.
                </Card>
                <Card title="Which risks are underestimated">
                  The quiet risks that don’t show in dashboards until they hit
                  the business.
                </Card>
                <Card title="Business consequence, not just tech">
                  A prioritised view of what matters — and what to do next.
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* Who */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionTitle eyebrow="Fit" title="Who engages Opsology" />
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-sm leading-7 text-white/80">
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
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionTitle eyebrow="About" title="Independent by design" />
              </div>
              <div className="lg:col-span-7 space-y-4 text-sm leading-7 text-white/80">
                <p>
                  Opsology is led by Mark Kaye, an infrastructure architect
                  trusted to stabilise and modernise complex platforms across
                  enterprise and high-growth environments.
                </p>
                <p>
                  Known for calm judgement, rapid situational understanding,
                  and commercially grounded technical insight.
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <a
                    href={LINKEDIN_URL}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View LinkedIn
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#070A12] shadow-sm transition hover:bg-white/90"
                  >
                    Email Opsology
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Start a conversation
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    If your platform is becoming too important to rely on
                    assumption, an independent view brings clarity.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#070A12] shadow-sm transition hover:bg-white/90"
                  >
                    {EMAIL}
                  </a>
                  <p className="mt-3 text-center text-xs text-white/60">
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

      <footer className="relative border-t border-white/10 py-10">
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
