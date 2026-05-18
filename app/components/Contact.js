"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import Comments from "./Comments";

export default function Contact() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const spawnConfetti = () => {
    const particles = [];
    const colors = ["var(--accent)", "var(--primary)", "#FFD700", "#FF6B6B", "#4ECDC4"];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: Math.random() * 40 + 20,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1.5,
      });
    }
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendError("");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "78f0189a-14d1-460f-a365-d963389fd4dc",
        subject: `Portfolio message from ${formData.name}`,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        from_name: "Portfolio Contact Form",
      }),
    });

    const result = await response.json();

    setIsSending(false);

    if (!response.ok || !result.success) {
      setSendError("Message failed to send. Please try again.");
      return;
    }

    setSubmitted(true);
    spawnConfetti();
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-section-alt z-[-2]" />
      {/* Confetti Overlay */}
      {confetti.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confetti.map((p) => (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
                imageRendering: "pixelated",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <SectionTitle>CONTACT ME</SectionTitle>

        <div className={`text-center mb-10 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          <p className="font-[family-name:var(--font-body)] text-text-main text-lg mb-2">
            Let&apos;s build something great together!
          </p>
          <p className="font-[family-name:var(--font-body)] text-text-secondary text-sm">
            Jangan ragu untuk menghubungi saya.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${visible ? "animate-fadeInUp" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <form onSubmit={handleSubmit} className="pixel-card p-6 md:p-8 space-y-5 h-fit relative">
            {/* Success Overlay */}
            {submitted && (
              <div className="absolute inset-0 bg-surface/95 z-10 flex flex-col items-center justify-center gap-4 border-[3px] border-accent">
                <div className="text-4xl animate-bounce-slow">🎉</div>
                <p className="font-[family-name:var(--font-pixel)] text-accent text-sm tracking-wider">
                  MESSAGE SENT!
                </p>
                <p className="font-[family-name:var(--font-pixel)] text-primary text-[0.5rem] tracking-wider">
                  +10 EXP GAINED
                </p>
                <div className="h-3 w-32 bg-section-alt border-2 border-border overflow-hidden mt-2">
                  <div className="h-full bg-accent animate-[expBar_1s_ease-out_forwards]" />
                </div>
              </div>
            )}

            <div>
              <label className="font-[family-name:var(--font-pixel)] text-text-main text-[0.5rem] tracking-wider block mb-2">NAME</label>
              <input
                type="text"
                className="pixel-input"
                placeholder="your_name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="font-[family-name:var(--font-pixel)] text-text-main text-[0.5rem] tracking-wider block mb-2">EMAIL</label>
              <input
                type="email"
                className="pixel-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="font-[family-name:var(--font-pixel)] text-text-main text-[0.5rem] tracking-wider block mb-2">MESSAGE</label>
              <textarea
                className="pixel-input min-h-[120px] resize-y"
                placeholder="say_hello..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            {sendError && (
              <p className="text-xs text-red-600 font-bold">{sendError}</p>
            )}
            <div className="pt-2">
              <button type="submit" disabled={isSending} className="pixel-btn w-full justify-center text-center disabled:opacity-60 disabled:cursor-not-allowed">
                {isSending ? "Sending..." : "Send Message >>"}
              </button>
            </div>
          </form>

          {/* Comments Section */}
          <Comments />
        </div>
      </div>

      <style jsx>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes expBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
}
