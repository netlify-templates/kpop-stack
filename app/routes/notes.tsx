import { Form, json, Link, LoaderFunction, Outlet } from "remix";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return json({});
};

export default function NotesPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Note
          </Link>

          <hr />
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Header() {
  const user = useUser();
  return (
    <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
      <h1 className="text-3xl font-bold">
        <Link to=".">Notes</Link>
      </h1>
      <p>{user.email}</p>
    </header>
  );
}
