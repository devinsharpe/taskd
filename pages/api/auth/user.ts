import { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.cookies["sb:token"]) {
      const { error, user } = await supabase.auth.api.getUser(
        req.cookies["sb:token"]
      );
      if (error) {
        res.status(error.status).send({ error: error.message });
      } else {
        res.status(200).send({ ...user });
      }
    } else {
      res.status(401).send({ error: "Unauthenticated user" });
    }
  } else {
    res.status(404).send({ error: "Not Found" });
  }
}
