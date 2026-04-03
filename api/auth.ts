import type { VercelRequest, VercelResponse } from "@vercel/node";
import { SignJWT } from "jose";
import { timingSafeEqual } from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { password } = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const expected = process.env.ANALYTICS_PASSWORD || "";

    if (!password || !expected) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const a = Buffer.from(password.padEnd(256, "\0"));
    const b = Buffer.from(expected.padEnd(256, "\0"));

    if (!timingSafeEqual(a, b) || password !== expected) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret");
    const token = await new SignJWT({ role: "analytics" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    return res.status(200).json({ token });
  } catch {
    return res.status(500).json({ error: "Internal error" });
  }
}
