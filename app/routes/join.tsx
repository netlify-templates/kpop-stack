import { Form, Link } from "remix";

export default function Join() {
    return (
        <div>
            <Form>
               <label htmlFor="email">Email Address</label>
               <input type="email" name="email" id="email" />
               <label htmlFor="password">Password</label>
               <input type="password" name="passowrd" autoComplete="" />
               <button type="submit">Create Account</button>
               <div>Already have an account?{" "}<Link to={{ pathname: "/login" }}>Log in</Link></div>
            </Form>
        </div>
    )
}