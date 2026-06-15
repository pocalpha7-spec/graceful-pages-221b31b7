// src/lib/googleSheets.ts

import Papa from "papaparse";

/**
 * Google Sheets Published ID
 *
 * Published URL:
 * https://docs.google.com/spreadsheets/d/e/2PACX-1vQdFdnfsRbSk9kOBMbv6BE0R05bkVnOfWhY7zQRQAU61gQTWPnylvFdP4g6qAlVEFrEuOs_Jro0n8Km/pubhtml
 */
const SHEET_ID =
  "2PACX-1vQdFdnfsRbSk9kOBMbv6BE0R05bkVnOfWhY7zQRQAU61gQTWPnylvFdP4g6qAlVEFrEuOs_Jro0n8Km";

/**
 * Load data from a specific Google Sheet tab.
 */
export async function loadSheet<T>(sheetName: string): Promise<T[]> {
  const gid = getSheetGid(sheetName);

  const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv&gid=${gid}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load sheet "${sheetName}"`);
  }

  const csv = await response.text();

  const parsed = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

/**
 * Sheet tab name → gid mapping
 *
 * Get gid from:
 * Google Sheet → Open Tab → URL contains #gid=XXXXXXXX
 */
function getSheetGid(sheetName: string): string {
  const gids: Record<string, string> = {
    Categories: "1919624571",
    "Form-response": "104020349",
  };

  const gid = gids[sheetName];

  if (!gid) {
    throw new Error(`No gid configured for sheet "${sheetName}"`);
  }

  return gid;
}
