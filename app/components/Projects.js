"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";

const projects = [
  {
    title: "Web Event Organizer",
    type: "Kolaborasi",
    description: "Platform manajemen event berbasis web yang memudahkan pengelolaan acara, registrasi peserta, dan informasi jadwal secara real-time.",
    features: ["Halaman daftar event dengan filter kategori", "Form registrasi peserta", "Dashboard informasi event", "Desain responsif mobile-friendly"],
    tech: ["HTML", "CSS", "JavaScript", "React.js"],
    github: "#",
    demo: "https://stukkadigital.com/",
  },
  {
    title: "ePub Reader",
    type: "Kolaborasi",
    description: "Aplikasi web pembaca file ePub langsung di browser tanpa perlu instalasi tambahan, dengan antarmuka yang bersih dan nyaman untuk membaca.",
    features: ["Upload & baca file .epub di browser", "Navigasi antar chapter", "Pengaturan font size dan tema baca", "Progress tracking halaman"],
    tech: ["HTML", "CSS", "JavaScript", "ePub.js"],
    github: "#",
    demo: "https://epub-reader-production.up.railway.app/",
  },
  {
    title: "MyArtikelKu",
    type: "UI/UX Design",
    description: "Desain antarmuka (UI/UX) untuk platform MyArtikelKu. Fokus pada pengalaman pengguna yang intuitif, tata letak yang bersih, dan kemudahan navigasi untuk membaca artikel.",
    features: ["Prototyping interaktif", "Desain responsif (Mobile & Desktop)", "Sistem tipografi dan palet warna", "Wireframing"],
    tech: ["Figma"],
    github: null,
    demo: "https://www.figma.com/design/gia1jhzzvH0vIQPGe3ArhA/Myartikelku?node-id=0-1&t=wbZn2cV56NSpOxQ6-1",
    demoText: "View Design",
  },
  {
    title: "DeteksiHelmKu",
    type: "Personal",
    description: "Sistem deteksi objek secara real-time menggunakan bahasa pemrograman Python dengan mengimplementasikan algoritma Deep Learning YOLOv8. Sistem ini dapat memindai webcam langsung melalui browser.",
    features: ["Deteksi penggunaan helm secara real-time", "Integrasi Streamlit-WebRTC untuk webcam browser", "Model Deep Learning YOLOv8", "Deployment via Streamlit Community Cloud"],
    tech: ["Python", "YOLOv8", "Streamlit", "OpenCV", "WebRTC"],
    github: null,
    demo: "https://deteksihelmku.streamlit.app/",
  },
];

const certificates = [
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    date: "2023",
    link: "/certificates/Cybersecurity_Essentials_certificate_slmnalfrs0705-gmail-com_52dc84ed-3770-46ff-8130-295ebade389f.pdf",
  },
  {
    title: "AI Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "2025",
    link: "/certificates/AI_Fundamentals_with_IBM_SkillsBuild_certificate_slmnalfrs0705-gmail-com_ed1be905-961c-47fa-969b-9ef86626db4e.pdf",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2025",
    link: "/certificates/Introduction_to_Cybersecurity_certificate_slmn-alfrs23-mhs-uinjkt-ac-id_08a9b7ed-6b2b-4bcd-a49f-f87b2fa24898.pdf",
  },
  {
    title: "CCNA : Introduction to Netrworks",
    issuer: "Cisco Networking Academy",
    date: "2024",
    link: "/certificates/_certificate_slmnalfrs0705-gmail-com_14b5f8e3-06b5-4452-b52f-212a8d1439f5.pdf",
  },
  {
    title: "CCNA : Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    link: "/certificates/_certificate_slmnalfrs0705-gmail-com_4a55d4d6-a7f0-41b8-9c87-780832fda7b6.pdf",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "2025",
    link: "/certificates/IBMDesign20251223-29-qznr1o.pdf",
  },
  {
    title: "Data Communication and Networking Tech",
    issuer: "Huawei",
    date: "2024",
    link: "/certificates/photo.png",
  },
  {
    title: "HCIA-AI V4.0 Course",
    issuer: "Huawei",
    date: "2025",
    link: "/certificates/photo(1).png",
  },
  {
    title: "Development and Basic Concepts of Cloud Computing",
    issuer: "Huawei",
    date: "2024",
    link: "/certificates/photo(2).png",
  },
  {
    title: "Cloud Basic: Development and Basic Concepts of AI",
    issuer: "Huawei",
    date: "2024",
    link: "/certificates/photo(3).png",
  },
  {
    title: "Stukka Digital Internship",
    issuer: "Intern Certication",
    date: "2026",
    link: "/certificates/Salman AlFarisi.pdf",
  },
];

function ProjectCard({ project }) {
  return (
    <div className="pixel-card p-0 overflow-hidden flex flex-col">
      <div className="bg-primary p-4 flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-pixel)] text-white text-[0.6rem] md:text-xs tracking-wide">
          {project.title}
        </h3>
        <span className="pixel-badge" style={{ fontSize: "0.4rem" }}>
          {project.type === "Kolaborasi" ? "COLLAB" : "PERSONAL"}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-[family-name:var(--font-body)] text-text-main text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <ul className="mb-5 space-y-1.5 flex-1">
          {project.features.map((f, i) => (
            <li key={i} className="font-[family-name:var(--font-body)] text-text-secondary text-xs flex items-start gap-2">
              <span className="text-accent mt-0.5">▸</span>{f}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="font-[family-name:var(--font-code)] text-[0.6rem] px-2 py-1 border-2 border-border text-text-secondary bg-section-alt">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          {project.github && project.github !== "#" && (
            <a href={project.github} className="pixel-btn pixel-btn-outline pixel-btn-small flex-1 justify-center">GitHub</a>
          )}
          {project.demo && project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pixel-btn pixel-btn-small flex-1 justify-center">
              {project.demoText || "Live Demo"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ cert }) {
  return (
    <div className="pixel-card p-5 flex flex-col justify-between gap-3 relative">
      {/* Visual Preview */}
      <div className="w-full aspect-[4/3] bg-section-alt mb-2 border-2 border-border overflow-hidden relative group">
        {cert.link.endsWith('.pdf') ? (
          <iframe
            src={`${cert.link}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="absolute top-1/2 left-1/2 w-[130%] h-[140%] pointer-events-none"
            style={{ border: 'none', transform: 'translate(-50%, -50%) scale(1.4)' }}
            title={cert.title}
          />
        ) : (
          <img
            src={cert.link}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {/* Click overlay */}
        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="View Certificate">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-surface px-3 py-1 font-[family-name:var(--font-pixel)] text-[0.5rem] border-2 border-border text-primary transition-opacity shadow-[2px_2px_0_var(--shadow-color)]">
              CLICK TO VIEW
            </span>
          </div>
        </a>
      </div>

      {/* Issuer Badge */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-6 h-6 border-2 border-border bg-section-alt flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
            <rect x="3" y="1" width="10" height="2" fill="#2D6A4F" />
            <rect x="5" y="3" width="6" height="2" fill="#2D6A4F" />
            <rect x="6" y="5" width="4" height="2" fill="#52B788" />
            <rect x="5" y="7" width="6" height="2" fill="#52B788" />
            <rect x="6" y="9" width="1" height="4" fill="#2D6A4F" />
            <rect x="9" y="9" width="1" height="4" fill="#2D6A4F" />
            <rect x="5" y="13" width="3" height="1" fill="#2D6A4F" />
            <rect x="8" y="13" width="3" height="1" fill="#2D6A4F" />
          </svg>
        </div>
        <span className="font-[family-name:var(--font-code)] text-text-secondary text-[0.65rem] truncate">
          {cert.issuer}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-[family-name:var(--font-body)] text-text-main text-xs font-bold leading-snug">
        {cert.title}
      </h3>

      {/* Date */}
      <div className="mt-auto pt-1">
        <span className="font-[family-name:var(--font-code)] text-text-secondary text-[0.6rem]">
          {cert.date}
        </span>
      </div>
    </div>
  );
}

const tabs = [
  { key: "projects", label: "Web Projects", icon: "◇" },
  { key: "certificates", label: "Certificates", icon: "◈" },
];

export default function Projects() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle>PORTOFOLIO</SectionTitle>

        {/* Tab Buttons */}
        <div className={`flex justify-center gap-4 mb-10 ${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pixel-btn pixel-btn-small ${activeTab === tab.key
                ? ""
                : "pixel-btn-outline"
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={`${visible ? "animate-fadeInUp" : "opacity-0"}`}>
          {activeTab === "projects" && (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((p) => (<ProjectCard key={p.title} project={p} />))}
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {certificates.map((c) => (<CertificateCard key={c.title} cert={c} />))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
