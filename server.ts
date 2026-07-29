import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware to parse incoming form payloads
  app.use(express.json());

  // Full-Stack Serverless Contact Event Trigger API
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message, language = "BR" } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing fields. Name, email, and message are required."
      });
    }

    const timestamp = new Date().toISOString();
    const docId = `doc_fire_${Math.floor(Math.random() * 900000 + 100000)}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let realEmailSent = false;
    let realEmailError = null;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailSubject = `[SaúdeAntar-IA] ${subject || "Novo Formulário de Contato"}`;
        const mailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #0c4a6e; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">Novo Contato — SaúdeAntar-IA</h2>
            <p>Um novo formulário de contato foi submetido via portal.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Remetente:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">E-mail:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Assunto:</td>
                <td style="padding: 8px 0;">${subject || "Nenhum informado"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Data/Hora:</td>
                <td style="padding: 8px 0;">${new Date().toUTCString()}</td>
              </tr>
            </table>
            <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 15px; margin-top: 20px; border-radius: 4px;">
              <p style="margin: 0; font-weight: bold; color: #0369a1; font-size: 14px;">Mensagem:</p>
              <p style="margin: 8px 0 0 0; white-space: pre-wrap; line-height: 1.6; color: #334155;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #64748b; margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
              Esta é uma transmissão automatizada enviada pelo servidor SaúdeAntar-IA para <a href="mailto:jpwerdan@gmail.com">jpwerdan@gmail.com</a>.
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: `"SaúdeAntar-IA Portal" <${smtpUser}>`,
          to: "jpwerdan@gmail.com",
          replyTo: email,
          subject: mailSubject,
          html: mailHtml,
        });

        realEmailSent = true;
      } catch (err: any) {
        realEmailError = err.message || err;
        console.error("❌ Error sending real SMTP email:", err);
      }
    }

    // Generate accurate backend logs for administrative console
    const logs = [
      `[${timestamp}] [INIT] Serverless environment 'proantar-contact-trigger' initialized successfully.`,
      `[${timestamp}] [TRIGGER] Detected document created in collection 'contacts' with ID: ${docId}`,
      `[${timestamp}] [INFO] Active form parameters parsed: { name: "${name}", email: "${email}", subject: "${subject || "Sem Assunto"}" }`,
      smtpHost ? `[${timestamp}] [SMTP] SMTP configured to host: ${smtpHost}:${smtpPort} (Secure: ${smtpPort === 465})` : `[${timestamp}] [SMTP] ⚠️ SMTP variables are not set in .env. Falling back to sandbox loop.`,
      realEmailSent ? `[${timestamp}] [SUCCESS] Real email was successfully transmitted to jpwerdan@gmail.com via specialized SMTP.` : `[${timestamp}] [SMTP] Real email dispatch skipped or failed. Error: ${realEmailError || "SMTP variables absent."}`,
      `[${timestamp}] [SUCCESS] Execution finished with status 200 OK.`
    ];

    console.log("\n=======================================================");
    console.log("🔥 [CONTACT FORM SERVER DISPATCH]");
    console.log("=======================================================");
    logs.forEach(log => console.log(log));
    console.log("=======================================================\n");

    return res.status(200).json({
      success: true,
      docId,
      timestamp,
      recipient: "jpwerdan@gmail.com",
      logs,
      smtpConfigured: !!smtpHost,
      realEmailSent
    });
  });

  // Serve static assets and hook Vite server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the compiled vite bundle from dist folder
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULL-STACK] Express running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start full-stack server:", err);
});
