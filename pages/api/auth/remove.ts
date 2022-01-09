import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.setHeader(
      "Set-Cookie",
      "sb:token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    res.send({});
  } else {
    res.status(400).send({ error: "What are you even trying to do?" });
  }
}
