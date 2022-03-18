import {
  ActionFunction,
  Form,
  json,
  Link,
  MetaFunction,
  redirect,
  useActionData,
  useSearchParams,
} from "remix";
import { createUserSession, getUserId } from "~/session.server";
import { createUser } from "~/models/user.server";

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
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

  // TODO (#17): Add form validations
  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

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
          Already have an account?{" "}
          <Link to={{ pathname: "/login" }}>Log in</Link>
        </div>
      </Form>
    </div>
  );
}
