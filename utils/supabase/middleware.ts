import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./server";

export const updateSession = async (request: NextRequest) => {

  const supabase = createClient()

  try {
    const user = await supabase.auth.getUser();
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });


    if (request.nextUrl.pathname.startsWith("/admin") && user.error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/admin") && Number(user.data.user?.user_metadata.role) != 1) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
