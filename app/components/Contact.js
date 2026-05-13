"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import Comments from "./Comments";

export default function Contact() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-section-alt">
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
          <form onSubmit={handleSubmit} className="pixel-card p-6 md:p-8 space-y-5 h-fit">
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
            <div className="pt-2">
              <button type="submit" className="pixel-btn w-full justify-center text-center">
                {submitted ? "✓ SENT!" : "Send Message >>"}
              </button>
            </div>
          </form>

          {/* Comments Section */}
          <Comments />
        </div>
      </div>
    </section>
  );
}
