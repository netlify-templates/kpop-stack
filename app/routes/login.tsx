import {
  ActionFunction,
  Form,
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useSearchParams,
} from "remix";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
  const remember = formData.get("remember");

  // TODO (#17): Add form validations
  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/notes",
  });
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/notes";

  const actionData = useActionData() as ActionData;

  React.useEffect(() => {
    // Handle form validations here
  }, [actionData]);

  return (
    <div>
      <Form method="post" noValidate>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" autoComplete="" />
        <button type="submit">Create Account</button>
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <div>
          <input id="remember" name="remember" type="checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <div>
          Don't have an account? <Link to={{ pathname: "/join" }}>Sign up</Link>
        </div>
      </Form>
    </div>
  );
}
