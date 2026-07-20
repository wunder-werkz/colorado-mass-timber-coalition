import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

import { GLOBAL_TAG } from "@/sanity/lib/fetch";

// Works with no environment variables: a POST carrying a Sanity document
// payload revalidates the site. Setting SANITY_REVALIDATE_SECRET is optional
// and upgrades the endpoint to require a signed webhook.
export async function POST(req) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    let body;

    if (secret) {
      // parseBody returns isValidSignature: null (not false) when the signature
      // header is missing, so require an explicit true.
      const parsed = await parseBody(req, secret);

      if (parsed.isValidSignature !== true) {
        return Response.json({ message: "Invalid signature" }, { status: 401 });
      }

      body = parsed.body;
    } else {
      body = await req.json().catch(() => null);
    }

    // The payload has to look like a Sanity document. This is what stops a
    // stray GET-turned-POST or an empty health check from busting the cache.
    if (!body?._type) {
      return Response.json(
        { message: "Expected a Sanity document payload with a _type" },
        { status: 400 }
      );
    }

    // GLOBAL_TAG alone refreshes every page. The document's own type and id,
    // plus any `tags` from a webhook projection, are added for granularity if
    // the fetch tags are ever narrowed.
    const tags = new Set([GLOBAL_TAG, body._type]);

    if (body._id) tags.add(body._id);

    if (Array.isArray(body.tags)) {
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
