"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  conditionTitle: string;
  conditionSlug: string;
  baseUrl: string;
}

export default function QRCodeModal({ isOpen, onClose, conditionTitle, conditionSlug, baseUrl }: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [qrSvg, setQrSvg] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const url = `${baseUrl}/conditions/${conditionSlug}`;

  useEffect(() => {
    if (!isOpen) return;

    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: { dark: "#1e3a5f", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }).then(setQrDataUrl);

    QRCode.toString(url, {
      type: "svg",
      width: 400,
      margin: 2,
      color: { dark: "#1e3a5f", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }).then(setQrSvg);
  }, [isOpen, url]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const downloadPng = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `qr-${conditionSlug}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `qr-${conditionSlug}.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-neutral-800 text-lg">QR Code</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Condition name */}
        <p className="text-sm text-neutral-500 text-center mb-4">{conditionTitle}</p>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt={`QR code for ${conditionTitle}`} className="w-48 h-48 rounded-xl border border-neutral-200" />
          ) : (
            <div className="w-48 h-48 rounded-xl border border-neutral-200 bg-neutral-50 animate-pulse" />
          )}
        </div>

        {/* URL */}
        <div className="flex items-center gap-2 bg-neutral-50 rounded-xl p-3 mb-6">
          <code className="text-xs text-neutral-600 truncate flex-1">{url}</code>
          <button
            onClick={copyUrl}
            className="flex-shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700 px-2 py-1 rounded-lg hover:bg-brand-50 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Download buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={downloadPng}
            className="flex items-center justify-center gap-2 bg-brand-600 text-white text-sm font-semibold py-3 rounded-xl hover:bg-brand-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            PNG
          </button>
          <button
            onClick={downloadSvg}
            className="flex items-center justify-center gap-2 bg-white border-2 border-brand-600 text-brand-600 text-sm font-semibold py-3 rounded-xl hover:bg-brand-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            SVG
          </button>
        </div>

        <p className="text-xs text-neutral-400 text-center mt-4">
          Attach to patient paperwork. Patient scans at home for guided education.
        </p>
      </div>
    </div>
  );
}
