import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/uploads";

export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

// Public route that serves images uploaded from the dashboard.
// (Files added to /public after a production build are not served by Next.js,
// which is why uploads live in data/uploads and go through this route.)
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const name = params.file;
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (!/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(name) || !TYPES[ext]) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
