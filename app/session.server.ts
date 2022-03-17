import { createCookieSessionStorage, redirect } from "remix";

export const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: ["SUPERSECRET_SECRET"],
        secure: false
    }
});

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
    const cookie = request.headers.get("Cookie");
    return sessionStorage.getSession(cookie);
}

export async function getUserId(request: Request) {
    const session = await getSession(request);
    const userId = session.get(USER_SESSION_KEY);

    return userId;
}

export async function createUserSession({
    request,
    userId,
    remember,
    redirectTo,
  }: {
    request: Request;
    userId: string;
    remember: boolean;
    redirectTo: string;
  }) {
    const session = await getSession(request);
    session.set(USER_SESSION_KEY, userId);

    console.log('session value: ', session.has('userId'))
    console.log('session value: ', session.get('userId'))
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 7 // 7 days
            : undefined,
        }),
      },
    });
  }