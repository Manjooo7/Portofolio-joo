"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ name: "", message: "", photo: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      if (!isSupabaseConfigured) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("comments")
        .select("id, name, message, photo_url, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage("Komentar belum bisa dimuat.");
      } else {
        setComments(data ?? []);
      }

      setIsLoading(false);
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim() || !isSupabaseConfigured) return;

    setIsPosting(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("comments")
      .insert({
        name: formData.name.trim(),
        message: formData.message.trim(),
        photo_url: formData.photo?.src ?? null,
      })
      .select("id, name, message, photo_url, created_at")
      .single();

    setIsPosting(false);

    if (error) {
      setErrorMessage("Komentar gagal dikirim. Coba lagi sebentar.");
      return;
    }

    setComments([data, ...comments]);
    setFormData({ name: "", message: "", photo: null });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, photo: { name: file.name, src: reader.result } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pixel-card p-6 md:p-8 flex flex-col h-full bg-surface w-full max-h-[850px]">
      <h3 className="font-[family-name:var(--font-pixel)] text-text-main text-sm md:text-base mb-6 flex items-center gap-3">
        {/* Chat bubble icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--primary)"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        Comments ({comments.length})
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <div>
          <label className="font-[family-name:var(--font-pixel)] text-text-main text-[0.5rem] tracking-wider block mb-2">NAME *</label>
          <input
            type="text"
            className="pixel-input bg-section-alt w-full"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="font-[family-name:var(--font-pixel)] text-text-main text-[0.5rem] tracking-wider block mb-2">MESSAGE *</label>
          <textarea
            className="pixel-input min-h-[80px] resize-y bg-section-alt w-full"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="font-[family-name:var(--font-pixel)] text-text-main text-[0.5rem] tracking-wider block mb-2">PROFILE PHOTO <span className="text-text-secondary lowercase font-[family-name:var(--font-body)] tracking-normal">(optional)</span></label>
          <label className="border-[3px] border-dashed border-primary bg-section-alt hover:bg-bg transition-colors cursor-pointer p-4 flex flex-col items-center justify-center group relative overflow-hidden">
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <div className="flex items-center gap-2 font-[family-name:var(--font-pixel)] text-[0.5rem] text-primary group-hover:text-accent transition-colors z-10 truncate max-w-full">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
               <span className="truncate">{formData.photo ? formData.photo.name : "Choose Profile Photo"}</span>
            </div>
            <p className="text-[0.6rem] text-text-secondary mt-1 z-10 font-bold">Max file size: 5MB</p>
          </label>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-600 font-bold">{errorMessage}</p>
        )}

        {!isSupabaseConfigured && (
          <p className="text-xs text-text-secondary font-bold">
            Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.
          </p>
        )}

        <button type="submit" disabled={isPosting || !isSupabaseConfigured} className="pixel-btn w-full justify-center text-center mt-2 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
           {isPosting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-full border-[3px] border-dashed border-border bg-section-alt text-text-secondary font-[family-name:var(--font-pixel)] text-[0.6rem] p-6 text-center">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="flex items-center justify-center h-full border-[3px] border-dashed border-border bg-section-alt text-text-secondary font-[family-name:var(--font-pixel)] text-[0.6rem] p-6 text-center">
            Belum ada komentar.<br/>Jadilah yang pertama!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-[3px] border-border p-4 bg-section-alt shadow-[4px_4px_0_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  {comment.photo_url ? (
                    <img src={comment.photo_url} alt={comment.name} className="w-8 h-8 rounded-full border-2 border-primary object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-surface font-[family-name:var(--font-body)] font-bold text-xs border-2 border-border">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <h4 className="font-bold text-text-main text-sm font-[family-name:var(--font-body)]">{comment.name}</h4>
                </div>
                <span className="text-text-secondary text-xs">
                  {new Date(comment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p className="text-text-main text-sm mt-2">{comment.message}</p>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--section-alt);
          border-left: 2px solid var(--border-color);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--primary);
          border: 2px solid var(--border-color);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }
      `}</style>
    </div>
  );
}
