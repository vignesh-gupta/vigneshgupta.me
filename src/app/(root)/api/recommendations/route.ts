import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, company, relationship, quote, profileUrl } = body;

    if (!name || !quote) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const token = process.env.SANITY_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json({ message: "Server misconfigured: missing SANITY_WRITE_TOKEN" }, { status: 500 });
    }

    const serverClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    });

    const id = `recommendation-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const doc = {
      _id: `drafts.${id}`,
      _type: "recommendation",
      name,
      role: role || null,
      company: company || null,
      relationship: relationship || null,
      quote,
      profileUrl: profileUrl || null,
    };

    await serverClient.create(doc);

    return NextResponse.json({ message: "Recommendation submitted" }, { status: 201 });
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e: any = err;
    return NextResponse.json({ message: e?.message || "Unknown error" }, { status: 500 });
  }
}
