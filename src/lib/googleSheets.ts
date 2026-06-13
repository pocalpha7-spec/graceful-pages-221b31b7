// src/lib/googleSheets.ts

import Papa from "papaparse";

// Extracted from your published Google Sheet URL
const SHEET_ID =
  "2PACX-1vREzwjP-RNLKUPRhiEGBp9PKN7r1OV1wkG2rW-N9-hzunQnvwXU4xIJ_-mpKxtXrAKbRZS1Ix6lKnON";

/**
 * Load any sheet/tab from Google Sheets
 *
 * Example:
 * loadSheet("Products")
 * loadSheet("Categories")
 */
export async function loadSheet<T>(sheetName: string): Promise<T[]> {
  const url = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv&gid=${await getSheetGid(
    sheetName
  )}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load sheet: ${sheetName}`);
  }

  const csv = await response.text();

  const parsed = Papa.parse<T>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
}

/**
 * Map sheet names to their gid values.
 *
 * Open each tab in Google Sheets and copy its gid from the URL:
 *
 * Example:
 * https://docs.google.com/.../edit#gid=123456789
 */
async function getSheetGid(sheetName: string): Promise<string> {
  const gids: Record<string, string> = {
    Products: "300290042",
    Categories: "0",
  };

  const gid = gids[sheetName];

  if (!gid) {
    throw new Error(`No gid configured for sheet "${sheetName}"`);
  }

  return gid;
}