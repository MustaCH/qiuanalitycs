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
      try {
        // Email para el usuario
        const userEmailContent = BetaEmail({ name: name, lastName: lastName });
        const userEmailHtml = await render(userEmailContent);
        const userEmailText = await render(userEmailContent, {
          plainText: true,
        });

        const userEmailResult = await resend.emails.send({
          from: "Qiu <team@qiuanalitycs.com>",
          to: [email],
          subject: `Bienvenido ${name} a la Beta de Qiu`,
          html: userEmailHtml,
          text: userEmailText,
        });

        if (userEmailResult.error) {
          throw userEmailResult.error;
        }

        // Email para el equipo
        const teamEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2563eb;">¡Nuevo registro en la Beta!</h1>
            <p>Un nuevo usuario se ha registrado para la beta de Qiu:</p>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Nombre:</strong> ${name}</li>
              <li><strong>Apellido:</strong> ${lastName}</li>
              <li><strong>Email:</strong> ${email}</li>
            </ul>
            <p>Fecha de registro: ${new Date().toLocaleString("es-ES", { timeZone: "America/Argentina/Buenos_Aires" })}</p>
          </div>
        `;

        const teamEmailResult = await resend.emails.send({
          from: "Qiu <team@qiuanalitycs.com>",
          to: ["team@qiuanalitycs.com"],
          subject: "¡Nuevo registro en la Beta de Qiu!",
          html: teamEmailHtml,
        });

        if (teamEmailResult.error) {
          console.error(
            "Error al enviar email al equipo:",
            teamEmailResult.error
          );
          // No lanzamos el error aquí para no afectar la experiencia del usuario
        }

        return userEmailResult.data;
      } catch (error) {
        throw error;
      }
    },
  }),
};
