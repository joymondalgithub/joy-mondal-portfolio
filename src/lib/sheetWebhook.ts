const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxZm5AVah1E-7Z-71w6HIyWz6UahsA4_CiwUcAC3Ligu-ljRV2jESM7mZ9wcQfHJZY/exec';

export interface SheetLogPayload {
  url: string;
  overallScore: number | string;
  speedScore: number | string;
  seoScore: number | string;
  issues: string;
  contact: string;
  source: string;
}

/**
 * Silently logs AI Website Audit and Quote Modal submissions to the Google Sheet webhook.
 * Uses no-cors with text/plain so browsers skip CORS preflight and never block UI transitions.
 */
export function logToGoogleSheet(payload: SheetLogPayload): void {
  if (typeof window === 'undefined') return;

  const webhookUrl =
    process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) return;

  try {
    void fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Non-blocking fire-and-forget
    });
  } catch {
    // Non-blocking fire-and-forget
  }
}
