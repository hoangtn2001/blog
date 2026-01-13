import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const isVideo = file.type.startsWith("video");
  const folder = isVideo ? "videos" : "images";
  const ext = path.extname(file.name);
  const fileName = `${Date.now()}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({
    url: `/${folder}/${fileName}`,
  });
}
