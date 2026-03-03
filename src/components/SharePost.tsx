"use client";

import { useState, useCallback, useEffect } from "react";
import { ShareData, generatePostText, regeneratePostText } from "@/lib/share";

interface SharePostProps {
  data: ShareData;
}

export default function SharePost({ data }: SharePostProps) {
  const [postText, setPostText] = useState("");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // Generate initial text
  useEffect(() => {
    setPostText(generatePostText(data));
  }, [data]);

  // Check Web Share API support
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleRegenerate = useCallback(() => {
    setPostText((prev) => regeneratePostText(data, prev));
    setCopied(false);
  }, [data]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text in textarea
      const textarea = document.querySelector<HTMLTextAreaElement>("#share-text");
      if (textarea) {
        textarea.select();
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  }, [postText]);

  const handleShare = useCallback(async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ text: postText });
      setShared(true);
    } catch (err) {
      // User cancelled — that's fine
      if (err instanceof Error && err.name !== "AbortError") {
        console.warn("Share failed:", err);
      }
    }
  }, [postText]);

  const lineCount = postText.split("\n").length;
  const rows = Math.max(6, Math.min(14, lineCount + 2));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">
          Share your dive
        </h3>
        <button
          onClick={handleRegenerate}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 py-1 active:scale-95 transition-transform"
        >
          <RefreshIcon />
          New version
        </button>
      </div>

      <p className="text-xs text-slate-500">
        Edit this however you like, then copy or share it.
      </p>

      {/* Editable text area */}
      <textarea
        id="share-text"
        value={postText}
        onChange={(e) => {
          setPostText(e.target.value);
          setCopied(false);
        }}
        rows={rows}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y bg-white"
      />

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] ${
            copied
              ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
              : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
          }`}
        >
          {copied ? "✓ Copied!" : "Copy Text"}
        </button>

        {canShare && (
          <button
            onClick={handleShare}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] ${
              shared
                ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {shared ? "✓ Shared!" : "Share →"}
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 text-center">
        {canShare
          ? "Share opens your phone's share sheet — Facebook, Messages, etc."
          : "Copy the text and paste it into your Facebook post."}
      </p>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
    </svg>
  );
}

