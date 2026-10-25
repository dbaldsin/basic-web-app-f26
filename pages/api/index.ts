// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = string;

import QueryProcessor from "../../utils/QueryProcessor";
import shouldSkipForPacing from "../../utils/GamePacing";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.url);
  
  const query = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q || "";
  const skipped = shouldSkipForPacing(query);
  const response = skipped ? "" : QueryProcessor(query);
  if (skipped) console.log("Intentional temporary game pacing", query);

  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(response);
}
