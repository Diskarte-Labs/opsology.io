"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    setVerifyError("");

    try {
      const response = await fetch("/api/contact/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();

      if (response.ok) {
        setVerificationCode("");
        setVerificationToken(typeof data.token === "string" ? data.token : "");
        setShowVerifyModal(true);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.error ||
            "Failed to send verification code. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyAndSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim() || verificationCode.trim().length !== 6) {
      setVerifyError("Please enter the 6-digit code from your email.");
      return;
    }
    setIsSubmitting(true);
    setVerifyError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          verificationCode: verificationCode.trim(),
          verificationToken,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setShowVerifyModal(false);
        setVerificationCode("");
        setVerificationToken("");
        setSubmitStatus({
          type: "success",
          message:
            data.message ||
            "Thank you for reaching out — we'll get back to you as soon as we can.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        setVerifyError(
          data.error ||
            "Invalid or expired code. Please request a new code."
        );
      }
    } catch {
      setVerifyError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-orange-400/50 focus:ring-2 focus:ring-orange-500/30";

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/60">
            Contact
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Get in touch.
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Prefer email over a call? Send a message and we&apos;ll reply as
            soon as we can. Your email is verified with a one-time code before
            the message is sent.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              className="pointer-events-none absolute h-0 w-0 opacity-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={fieldClassName}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Email <span className="text-orange-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClassName}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Phone{" "}
                <span className="text-xs text-white/45">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={fieldClassName}
                placeholder="+44 7700 900000"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Subject <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={fieldClassName}
                placeholder="What would you like to discuss?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Message <span className="text-orange-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                minLength={10}
                maxLength={5000}
                className={`${fieldClassName} resize-none`}
                placeholder="Tell us about your platform, risk, or engagement needs..."
              />
              <p className="mt-1 text-xs text-white/45">
                {formData.message.length}/5000 characters
              </p>
            </div>

            {submitStatus.type && (
              <div
                className={`rounded-xl border p-4 text-sm ${
                  submitStatus.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                    : "border-red-500/30 bg-red-500/10 text-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-[#071022] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>

      {showVerifyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          aria-labelledby="verify-modal-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[var(--ops-bg)] p-6 shadow-2xl sm:p-8">
            <h3
              id="verify-modal-title"
              className="font-heading text-xl font-semibold text-white"
            >
              Verify your email
            </h3>
            <p className="mt-2 text-sm text-white/65">
              We&apos;ve sent a 6-digit code to{" "}
              <strong className="text-white/90">{formData.email}</strong>.
              Enter it below to send your message.
            </p>
            <form onSubmit={handleVerifyAndSend} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="verification-code"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Verification code
                </label>
                <input
                  id="verification-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) =>
                    setVerificationCode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="000000"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-lg tracking-[0.4em] text-white placeholder:text-white/30 outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-500/30"
                  autoFocus
                />
              </div>
              {verifyError && (
                <p className="text-sm text-red-300">{verifyError}</p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowVerifyModal(false);
                    setVerificationCode("");
                    setVerificationToken("");
                    setVerifyError("");
                  }}
                  className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || verificationCode.length !== 6}
                  className="flex-1 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-[#071022] transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                >
                  {isSubmitting ? "Sending..." : "Verify and Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
