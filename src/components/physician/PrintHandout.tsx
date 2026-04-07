"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import type { ConditionMeta } from "@/content/types";

interface PrintHandoutProps {
  condition: ConditionMeta;
  baseUrl: string;
  keyTakeaways: string[];
  whenToSeekHelp: string[];
}

export default function PrintHandout({ condition, baseUrl, keyTakeaways, whenToSeekHelp }: PrintHandoutProps) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const url = `${baseUrl}/conditions/${condition.slug}`;

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
      color: { dark: "#1e3a5f", light: "#ffffff" },
      errorCorrectionLevel: "M",
    }).then(setQrDataUrl);
  }, [url]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>${condition.title} - Patient Handout</title>
  <style>
    @page { size: letter; margin: 0.75in; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; line-height: 1.5; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #2563a8; padding-bottom: 16px; margin-bottom: 20px; }
    .header-left h1 { font-size: 22px; font-weight: 700; color: #1e3a5f; margin-bottom: 4px; }
    .header-left p { font-size: 12px; color: #666; }
    .qr-section { text-align: center; }
    .qr-section img { width: 100px; height: 100px; }
    .qr-section p { font-size: 9px; color: #888; margin-top: 4px; }
    .icon { font-size: 28px; margin-right: 12px; }
    .section { margin-bottom: 18px; }
    .section h2 { font-size: 14px; font-weight: 700; color: #1e3a5f; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .takeaway-list { list-style: none; padding: 0; }
    .takeaway-list li { padding: 6px 0 6px 24px; position: relative; font-size: 13px; border-bottom: 1px solid #f0f0f0; }
    .takeaway-list li:last-child { border-bottom: none; }
    .takeaway-list li::before { content: "✓"; position: absolute; left: 0; color: #2563a8; font-weight: 700; }
    .warning-box { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 12px 16px; }
    .warning-box h2 { color: #991b1b; margin-bottom: 6px; }
    .warning-list { list-style: none; padding: 0; }
    .warning-list li { padding: 4px 0 4px 20px; position: relative; font-size: 12px; color: #7f1d1d; }
    .warning-list li::before { content: "⚠"; position: absolute; left: 0; }
    .scan-banner { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; text-align: center; margin-top: 20px; }
    .scan-banner p { font-size: 14px; font-weight: 600; color: #1e3a5f; margin-bottom: 4px; }
    .scan-banner .url { font-size: 11px; color: #666; font-family: monospace; }
    .footer { margin-top: 20px; padding-top: 12px; border-top: 1px solid #e0e0e0; display: flex; justify-content: space-between; font-size: 10px; color: #999; }
    .guidelines { font-size: 10px; color: #888; margin-top: 12px; }
    .guidelines span { display: inline-block; background: #f5f5f5; padding: 2px 8px; border-radius: 4px; margin: 2px 4px 2px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left" style="display:flex;align-items:center;">
      <span class="icon">${condition.icon}</span>
      <div>
        <h1>${condition.title}</h1>
        <p>Patient Education Guide</p>
      </div>
    </div>
    <div class="qr-section">
      ${qrDataUrl ? `<img src="${qrDataUrl}" alt="QR Code" />` : ""}
      <p>Scan to learn more</p>
    </div>
  </div>

  <div class="section">
    <h2>Key Takeaways</h2>
    <ul class="takeaway-list">
      ${keyTakeaways.map((t) => `<li>${t}</li>`).join("")}
    </ul>
  </div>

  <div class="section warning-box">
    <h2>When to Seek Help</h2>
    <ul class="warning-list">
      ${whenToSeekHelp.map((w) => `<li>${w}</li>`).join("")}
    </ul>
  </div>

  <div class="scan-banner">
    <p>Scan the QR code above for the full interactive guide</p>
    <span class="url">${url}</span>
  </div>

  <div class="guidelines">
    Based on: ${condition.guidelines.map((g) => `<span>${g.society} (${g.year})</span>`).join("")}
  </div>

  <div class="footer">
    <span>GI Patient Hub — Evidence-Based Patient Education</span>
    <span>Last reviewed: ${condition.lastReviewed}</span>
  </div>

  <p style="font-size:9px;color:#bbb;margin-top:8px;">
    This information is for educational purposes only and does not replace medical advice. Always follow your doctor's specific instructions.
  </p>
</body>
</html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 text-sm font-semibold text-neutral-600 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-lg hover:bg-neutral-100 hover:border-neutral-300 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print Handout
    </button>
  );
}
