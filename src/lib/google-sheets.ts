// ═══════════════════════════════════════════════════════════════════
// SonoPrep — Google Sheets Integration
// Appends demo leads to the "SonoPrep Lead Tracker" spreadsheet
// ═══════════════════════════════════════════════════════════════════

import { SignJWT, importPKCS8 } from "jose";

/* ── Config ─────────────────────────────────────────────────────── */

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = "SonoPrep Lead Tracker";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

/* ── Auth: build a short-lived Google access token from the SA key ─ */

async function getAccessToken(): Promise<string> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY not set");

  const key = JSON.parse(keyJson);
  const privateKey = await importPKCS8(key.private_key, "RS256");

  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    iss: key.client_email,
    scope: SCOPES,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(privateKey);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

/* ── Append a row to the lead tracker sheet ───────────────────── */

export interface LeadRow {
  email: string;
  score?: number;
  weakestCategory?: string;
  source: string;
}

export async function appendLeadToSheet(lead: LeadRow): Promise<void> {
  if (!SPREADSHEET_ID) {
    console.warn("GOOGLE_SHEETS_SPREADSHEET_ID not set — skipping sheet write");
    return;
  }

  try {
    const token = await getAccessToken();

    const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const row = [
      now,                          // Date
      lead.email,                   // Email
      lead.score ?? "",             // Score
      lead.weakestCategory ?? "",   // Weakest Category
      lead.source,                  // Source
      "Subscribed",                 // Email Status
      "No",                         // Purchased
      "",                           // Purchase Date
      "",                           // Notes
    ];

    const range = `${SHEET_NAME}!A:I`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Google Sheets append error:", res.status, text);
    }
  } catch (err) {
    // Never block the user experience for a tracking integration
    console.error("Google Sheets sync failed:", err);
  }
}
