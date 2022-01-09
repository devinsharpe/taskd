import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    supabase.auth.api.setAuthCookie(req, res);
  } else {
    res.status(400).send({ error: "What are you even trying to do?" });
  }
}
