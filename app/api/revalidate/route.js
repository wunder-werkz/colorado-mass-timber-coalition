import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

import { GLOBAL_TAG } from "@/sanity/lib/fetch";

// Auth modes, in priority order:
//   1. SANITY_REVALIDATE_SECRET set -> require a valid webhook signature.
//   2. SANITY_REVALIDATE_ALLOW_UNSIGNED === "true" -> accept anything.
//   3. Neither -> 500.
//
// Mode 3 exists so that losing the secret env var fails loudly instead of
// quietly downgrading to mode 2. Unsigned has to be an explicit choice.
export async function POST(req) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    const allowUnsigned =
      process.env.SANITY_REVALIDATE_ALLOW_UNSIGNED === "true";

    let body;

    if (secret) {
      // parseBody returns isValidSignature: null (not false) both when the
      // signature header is missing and when no secret is passed to it, so
      // require an explicit true.
      const parsed = await parseBody(req, secret);

      if (parsed.isValidSignature !== true) {
        return Response.json({ message: "Invalid signature" }, { status: 401 });
      }

      body = parsed.body;
    } else if (allowUnsigned) {
      // parseBody returns a null body when there's no signature header, so read
      // the request directly. An empty body is fine here: it just means
      // "revalidate everything", which is what the global tag does anyway.
      body = await req.json().catch(() => null);
    } else {
      return Response.json(
        {
          message:
            "Revalidation is not configured. Set SANITY_REVALIDATE_SECRET, " +
            "or SANITY_REVALIDATE_ALLOW_UNSIGNED=true to accept unsigned requests.",
        },
        { status: 500 }
      );
    }

    // GLOBAL_TAG alone is enough to refresh every page. The document's own type
    // and id, plus any `tags` from a webhook projection, are added for
    // granularity if the fetch tags are ever narrowed.
    const tags = new Set([GLOBAL_TAG]);

    if (body?._type) tags.add(body._type);
    if (body?._id) tags.add(body._id);

    if (Array.isArray(body?.tags)) {
      for (const tag of body.tags) {
        if (typeof tag === "string" && tag) tags.add(tag);
      }
    }

    for (const tag of tags) revalidateTag(tag);

    return Response.json({ revalidated: true, tags: [...tags] });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
