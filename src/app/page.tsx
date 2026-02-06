"use client";

import type { ReactNode } from "react";
import { newsreader } from "./fonts";

const LINKEDIN_URL = "https://www.linkedin.com/in/markkaye/";
const EMAIL = "hello@opsology.io";

function handleScheduleMeeting() {
  const bookingUrl =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL ||
    "https://calendar.app.google/BDMFRZxZFPkWD8BJ6";
  const width = 800;
  const height = 825;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  window.open(
    bookingUrl,
    "ScheduleMeeting",
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">{children}</div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/80">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
        {eyebrow}
      </p>
      <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.06]">
      <h3 className="font-heading text-base font-semibold text-white">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-relaxed text-white/75">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--ops-bg)] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -bottom-56 right-[-8rem] h-[640px] w-[640px] rounded-full bg-sky-500/10 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ops-bg-2)]/0 via-[var(--ops-bg)]/30 to-[var(--ops-bg-2)]" />
      </div>

      {/* Header */}
      <header className="relative">
        <Container>
          <div className="flex items-center justify-between py-8">
            <div className="leading-tight">
              <div
                className={`${newsreader.className} text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl`}
              >
                Opsology<span className="text-orange-500">.</span>
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
              <button
                type="button"
                onClick={handleScheduleMeeting}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-[#071022] transition hover:bg-orange-400"
              >
                Check availability
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <main className="relative">
        <section className="pt-10 pb-20 sm:pt-16 sm:pb-24">
          <Container>
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <Pill>Senior, independent assurance</Pill>
                <Pill>High-impact engagements</Pill>
                <Pill>Commercially grounded judgement</Pill>
              </div>

              <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.2] tracking-tighter text-white sm:text-5xl">
                Operational assurance for platforms that{" "}
                <span className="text-orange-300">cannot afford failure</span>
                <span className="text-white">.</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-white/75">
                When technology becomes business-critical, operational certainty
                matters. Opsology provides senior,{" "}
                <span className="text-orange-300">
                  independent technical assurance
                </span>{" "}
                to organisations whose platforms cannot afford instability,
                scaling failure, or hidden architectural risk.
              </p>

              <p className="mt-4 text-lg leading-8 text-white/75">
                This is not staff augmentation or generic consulting. It is{" "}
                <span className="text-orange-300">
                  systems-level judgement grounded in experience
                </span>
                {", "}
                brought to bear rapidly and without internal bias.
              </p>

              <p className="mt-4 text-lg leading-8 text-white/75">
                Trusted across enterprise and high-growth environments operating{" "}
                <span className="text-orange-300">
                  business-critical platforms
                </span>{" "}
                at scale.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleScheduleMeeting}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-[#071022] transition hover:bg-orange-400"
                >
                  Check availability
                </button>
                <a
                  href="#assessment"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
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
                  title="Infrastructure Risk & Scale Assessment."
                />
                <p className="mt-4 text-sm leading-6 text-white/75">
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
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionTitle eyebrow="Fit" title="Who engages Opsology?" />
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

        {/* Trust */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionTitle
                  eyebrow="Trust"
                  title="Pivotal to success of €1 million programme."
                />
              </div>
              <div className="lg:col-span-7">
                <blockquote className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                  <div className="mb-2 text-orange-300" aria-hidden>
                    <svg
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-sm leading-[1.75] italic text-white/90">
                    Mark&apos;s architectural vision and technical depth were
                    pivotal to the success of a €1 million information
                    management programme. He brings rare clarity,
                    professionalism, and leadership that inspire confidence at
                    every level.&quot;
                  </p>
                  <footer className="mt-6 flex flex-col gap-0.5 border-t border-orange-300/25 pt-6">
                    <cite className="not-italic text-sm font-semibold text-white/90">
                      Alan Bainbridge
                    </cite>
                    <span className="text-sm text-orange-300">
                      Programme Manager, BHP
                    </span>
                  </footer>
                </blockquote>
              </div>
            </div>
          </Container>
        </section>

        {/* Experience */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionTitle
                  eyebrow="Experience"
                  title="Trusted in complex enterprise environments."
                />
              </div>
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-3 transition-transform duration-200 hover:scale-125 sm:h-14 sm:w-28">
                      <img
                        src="/clients/apple-logo.png"
                        alt=""
                        className="h-5 w-auto max-w-[72px] object-contain sm:h-6"
                      />
                    </div>
                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-3 transition-transform duration-200 hover:scale-125 sm:h-14 sm:w-28">
                      <img
                        src="/clients/ikea-logo.png"
                        alt=""
                        className="h-5 w-auto max-w-[72px] object-contain sm:h-6"
                      />
                    </div>
                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-3 transition-transform duration-200 hover:scale-125 sm:h-14 sm:w-28">
                      <img
                        src="/clients/dhl-logo.png"
                        alt=""
                        className="h-5 w-auto max-w-[72px] object-contain sm:h-6"
                      />
                    </div>
                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-3 transition-transform duration-200 hover:scale-125 sm:h-14 sm:w-28">
                      <img
                        src="/clients/astrazeneca-logo.png"
                        alt=""
                        className="h-5 w-auto max-w-[72px] object-contain sm:h-6"
                      />
                    </div>
                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-3 transition-transform duration-200 hover:scale-125 sm:h-14 sm:w-28">
                      <img
                        src="/clients/bhp-logo.png"
                        alt=""
                        className="h-5 w-auto max-w-[72px] object-contain sm:h-6"
                      />
                    </div>
                    <div className="flex h-12 w-24 items-center justify-center rounded-lg bg-white px-3 transition-transform duration-200 hover:scale-125 sm:h-14 sm:w-28">
                      <img
                        src="/clients/lockheed_martin-logo.png"
                        alt=""
                        className="h-5 w-auto max-w-[72px] object-contain sm:h-6"
                      />
                    </div>
                  </div>
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
                <SectionTitle eyebrow="About" title="Independent by design." />
              </div>
              <div className="lg:col-span-7 space-y-4 text-sm leading-7 text-white/80">
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
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <h2 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Book a consultation.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    If your platform is becoming too important to rely on
                    assumption, an independent view brings clarity.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <button
                    type="button"
                    onClick={handleScheduleMeeting}
                    className="flex w-full items-center justify-center whitespace-nowrap rounded-2xl bg-orange-500 px-6 py-4 text-sm font-semibold text-[#071022] transition hover:bg-orange-400"
                  >
                    Check availability
                  </button>
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
            <p>
              © {new Date().getFullYear()}{" "}
              <span
                className={`${newsreader.className} text-sm font-semibold text-white/80 sm:text-base`}
              >
                Opsology
              </span>
              <span className="text-orange-500">.</span>
            </p>
            <p>Independent Infrastructure Assurance</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
