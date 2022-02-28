import { ApiError, User } from "@supabase/supabase-js";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { supabase } from "../utils/supabaseClient";

async function getUser(req: NextRequest) {
  let token = req.cookies["sb:token"];
  if (!token) {
    return {
      user: null,
      data: null,
      error: {
        message: "There is no supabase token in request cookies",
        status: 400,
      },
    } as { user: User | null; data: User | null; error: ApiError | null };
  }
  const authResult = await supabase.auth.api.getUser(req.cookies["sb:token"]);
  return authResult;
}

const AUTH_PAGES = ["/signin", "/signup", "/forgot", "/reset"];

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const authResult = await getUser(req);
  if (
    req.nextUrl.pathname.includes("/api/") ||
    req.nextUrl.pathname.includes("/sounds/") ||
    req.nextUrl.pathname.includes("/icons/") ||
    req.nextUrl.pathname.includes("/manifest.json")
  ) {
    return NextResponse.next();
  } else if (AUTH_PAGES.includes(req.nextUrl.pathname)) {
    if (authResult.user) {
      return NextResponse.redirect("/home");
    }
    return NextResponse.next();
  } else {
    if (authResult.error) {
      console.log(
        "Authorization error, redirecting to login page",
        authResult.error
      );
      return NextResponse.redirect("/signin");
    } else if (!authResult.user) {
      console.log("No auth user, redirecting");
      return NextResponse.redirect("/signin");
    } else {
      console.log("User is found", authResult.user);
      return NextResponse.next();
    }
  }
}
