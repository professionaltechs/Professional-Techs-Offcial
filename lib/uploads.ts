import path from "path";

/** Uploaded blog images are stored here and served through /media/<file>. */
export const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");
