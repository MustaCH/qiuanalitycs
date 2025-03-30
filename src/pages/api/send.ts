import type { APIRoute } from "astro";
import { Resend } from "resend";
import { render } from "@react-email/render";
import BetaEmail from "../../emails/betaEmail";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const GET: APIRoute = async () => {
  const emailContent = BetaEmail({ name: "Ignacio", lastName: "Poletti" });
  const emailHtml = await render(emailContent);
  const emailText = await render(emailContent, { plainText: true });

  const { data, error } = await resend.emails.send({
    from: "Qiu <team@qiuanalitycs.com>",
    to: ["polettiignacio7@gmail.com"],
    subject: "Bienvenido a la Beta de Qiu",
    html: emailHtml,
    text: emailText,
  });

  if (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message })
    );
  }

  return new Response(JSON.stringify({ data }));
};
