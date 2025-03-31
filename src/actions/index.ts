import { Resend } from "resend";
import { render } from "@react-email/render";
import { defineAction } from "astro:actions";
import BetaEmail from "../emails/betaEmail";
import { z } from "astro:schema";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2, "Nombre requerido"),
      lastName: z.string().min(2, "Apellido requerido"),
      email: z.string().email("Email inválido"),
    }),
    handler: async ({ name, lastName, email }) => {
      const emailContent = BetaEmail({ name: name, lastName: lastName });
      const emailHtml = await render(emailContent);
      const emailText = await render(emailContent, { plainText: true });

      const { data, error } = await resend.emails.send({
        from: "Qiu <team@qiuanalitycs.com>",
        to: [email],
        subject: `Bienvenido ${name} a la Beta de Qiu`,
        html: emailHtml,
        text: emailText,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  }),
};
