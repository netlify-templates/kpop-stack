import { ActionFunction, Form, json, Link, MetaFunction, redirect, useActionData, useSearchParams } from "remix";

export const meta: MetaFunction = () => {
  return {
      title: "Login"
  };
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;

  const actionData = useActionData() as ActionData;

  React.useEffect(() => {
      // Handle form validations here
  }, [actionData])

  return (
      <div>
          <Form method="post" noValidate>
             <label htmlFor="email">Email Address</label>
             <input type="email" name="email" id="email" />
             <label htmlFor="password">Password</label>
             <input id="password" type="password" name="password" autoComplete="" />
             <button type="submit">Create Account</button>
             <input type="hidden" name="redirectTo" value={redirectTo} />
             <div>Don't have an account?{" "}<Link to={{ pathname: "/join" }}>Sign up</Link></div>
          </Form>
      </div>
  )
}