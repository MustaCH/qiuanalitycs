import { isEmailRegistered } from "../../lib/firebase-admin";

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email");

  if (!email) {
    return new Response(JSON.stringify({ error: "Email requerido" }), {
      status: 400,
    });
  }

  const isRegistered = await isEmailRegistered(email);

  return new Response(
    JSON.stringify({
      available: !isRegistered,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
