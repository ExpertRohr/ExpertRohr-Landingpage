// server.mjs

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// 🔹 Umgebungsvariablen aus .env laden (liegt im Projektroot)
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// __dirname für ES-Module nachbauen
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfad zu deinem Logo
const logoPath = path.join(__dirname, "src", "assets", "ExpertRohr-min.webp");

// 🔥 Pfad zu deinem Frontend-Build (Vite → dist)
const distPath = path.join(__dirname, "dist");

// Farben passend zum Logo
const COLORS = {
  navy: "#0b274a",
  red: "#e3342f",
  lightBg: "#f3f4f6",
  cardBg: "#ffffff",
  textDark: "#111827",
  textMuted: "#6b7280",
  border: "#e5e7eb",
};

/* =========================================================
   🔐 EIGENER SMTP-SERVER (z. B. IONOS / Provider)
   =========================================================
   .env (im Projektordner, NICHT committen):

   SMTP_HOST=smtp.ionos.de
   SMTP_PORT=587
   SMTP_USER=info@expertrohr.de
   SMTP_PASS=DEIN_MAILPASSWORT

   MAIL_FROM="ExpertRohr Kontaktformular <info@expertrohr.de>"
   MAIL_TO=info@expertrohr.de

   GOOGLE_API_KEY=dein_google_api_key
   GOOGLE_PLACE_ID=deine_place_id

   TELEGRAM_BOT_TOKEN=dein_telegram_bot_token
   TELEGRAM_CHAT_ID=deine_chat_id

   PORT=5000
   ========================================================= */

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Absender & Empfänger
const MAIL_FROM =
  process.env.MAIL_FROM || 'ExpertRohr Kontaktformular <info@expertrohr.de>';
const MAIL_TO = process.env.MAIL_TO || "info@expertrohr.de";

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn(
    "⚠️  SMTP_HOST, SMTP_USER oder SMTP_PASS fehlt. Bitte in der .env setzen."
  );
}

// 🔹 Transporter einmal global erstellen (nicht bei jedem Request neu)
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465, // nur bei 465 true, sonst false
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

/* =========================================================
   🔔 TELEGRAM-BENACHRICHTIGUNG
   ========================================================= */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

console.log("TELEGRAM_BOT_TOKEN gesetzt:", !!TELEGRAM_BOT_TOKEN);
console.log("TELEGRAM_CHAT_ID gesetzt:", !!TELEGRAM_CHAT_ID);

async function sendTelegramMessage(text) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram ist nicht konfiguriert (TELEGRAM_* in .env fehlt)");
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    console.log("Telegram-Nachricht gesendet.");
  } catch (err) {
    console.error("Telegram-Fehler:", err);
  }
}

// Gemeinsames Premium-HTML-Layout
const buildHtml = (title, introHtml, contentHtml) => `
<!doctype html>
<html lang="de">
  <body style="margin:0;padding:0;background-color:${COLORS.lightBg};">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;background:${COLORS.cardBg};border-radius:16px;overflow:hidden;border:1px solid ${COLORS.border};box-shadow:0 10px 25px rgba(15,23,42,0.12);">
            
            <!-- Header mit Logo -->
<tr>
  <td style="background:${COLORS.navy};padding:12px 20px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="vertical-align:middle;">
          <img
            src="cid:expertlogo"
            alt="ExpertRohr Logo"
            width="120"
            style="display:block;border-radius:16px;overflow:hidden;"
          />
        </td>
        <td align="right" style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;color:#e5e7eb;vertical-align:middle;">
          24/7 Notdienst · Berlin &amp; Brandenburg<br/>
          Tel.: <strong style="color:#ffffff;">030-23323873</strong>
        </td>
      </tr>
    </table>
  </td>
</tr>

            <!-- Titel & Einleitung -->
            <tr>
              <td style="padding:24px 24px 8px 24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${COLORS.textDark};">
                <h1 style="margin:0 0 8px 0;font-size:20px;line-height:1.3;font-weight:700;">
                  ${title}
                </h1>
                <p style="margin:0;font-size:14px;line-height:1.6;color:${COLORS.textMuted};">
                  ${introHtml}
                </p>
              </td>
            </tr>

            <!-- Inhalt -->
            <tr>
              <td style="padding:16px 24px 24px 24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                ${contentHtml}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="border-top:1px solid ${COLORS.border};padding:12px 24px 16px 24px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
                <p style="margin:0 0 4px 0;font-size:12px;color:${COLORS.textMuted};">
                  ExpertRohr · Professionelle Rohrreinigung in Berlin &amp; Brandenburg
                </p>
                <p style="margin:0;font-size:11px;color:${COLORS.textMuted};">
                  Diese E-Mail wurde automatisch über das Kontaktformular auf expertrohr.de erstellt.
                  Bitte antworten Sie bei Rückfragen einfach direkt auf diese Nachricht.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// Plain-Text-Fallback
const buildPlainText = ({ name, email, phone, address, problem, urgent }) => `
Neue Anfrage vom Kontaktformular

Name:    ${name}
Telefon: ${phone}
E-Mail:  ${email || "keine angegeben"}
Adresse: ${address}
Notfall: ${urgent ? "Ja (NOTFALL)" : "Nein"}

Problembeschreibung:
${problem}
`;

/* =========================================================
   ROUTE 1: Kontaktformular -> E-Mails + Telegram
   ========================================================= */

app.post("/send-email", async (req, res) => {
  const { name, email, phone, address, problem, urgent } = req.body;
  console.log("Neue Anfrage erhalten:", req.body);

  const plainText = buildPlainText({
    name,
    email,
    phone,
    address,
    problem,
    urgent,
  });

  // ---------- 1) Admin-Mail (an dich) ----------

  const adminContent = `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
      <tr>
        <td colspan="2" style="padding-bottom:12px;font-size:13px;color:${COLORS.textMuted};">
          Es ist eine neue Anfrage über das Kontaktformular eingegangen.
        </td>
      </tr>
      <tr>
        <td style="font-size:13px;font-weight:600;padding:4px 0;width:140px;color:${COLORS.textDark};">Name</td>
        <td style="font-size:13px;padding:4px 0;color:${COLORS.textMuted};">${name || "-"}</td>
      </tr>
      <tr>
        <td style="font-size:13px;font-weight:600;padding:4px 0;color:${COLORS.textDark};">Telefon</td>
        <td style="font-size:13px;padding:4px 0;color:${COLORS.textMuted};">${phone || "-"}</td>
      </tr>
      <tr>
        <td style="font-size:13px;font-weight:600;padding:4px 0;color:${COLORS.textDark};">E-Mail</td>
        <td style="font-size:13px;padding:4px 0;color:${COLORS.textMuted};">${email || "keine angegeben"}</td>
      </tr>
      <tr>
        <td style="font-size:13px;font-weight:600;padding:4px 0;color:${COLORS.textDark};">Adresse</td>
        <td style="font-size:13px;padding:4px 0;color:${COLORS.textMuted};">${address || "-"}</td>
      </tr>
      <tr>
        <td style="font-size:13px;font-weight:600;padding:4px 0;color:${COLORS.textDark};">Notfall</td>
        <td style="font-size:13px;padding:4px 0;color:${urgent ? "#b91c1c" : "#065f46"};">
          ${urgent ? "Ja (NOTFALL)" : "Nein"}
        </td>
      </tr>
    </table>

    <div style="margin-top:16px;">
      <div style="font-size:13px;font-weight:600;margin-bottom:4px;color:${COLORS.textDark};">Problembeschreibung</div>
      <div style="font-size:13px;line-height:1.5;color:${COLORS.textMuted};border-radius:10px;border:1px solid ${COLORS.border};padding:12px;background:#f9fafb;white-space:pre-wrap;">
${problem || "-"}
      </div>
    </div>
  `;

  const adminHtml = buildHtml(
    urgent
      ? "🚨 NOTFALL – Neue Anfrage vom Kontaktformular"
      : "Neue Anfrage vom Kontaktformular",
    "Es liegt eine neue Kundenanfrage vor. Alle Details finden Sie untenstehend.",
    adminContent
  );

  const adminMail = {
    from: MAIL_FROM,
    to: MAIL_TO,
    replyTo: email || MAIL_TO,
    subject: urgent
      ? "🚨 NOTFALL – Neue Anfrage vom Kontaktformular"
      : "Neue Anfrage vom Kontaktformular",
    text: plainText,
    html: adminHtml,
    attachments: [
      {
        filename: "ExpertRohr-min.png",
        path: logoPath,
        cid: "expertlogo",
      },
    ],
  };

  try {
    // Admin-Mail
    await transporter.sendMail(adminMail);
    console.log("Admin-Mail gesendet.");

    // Telegram-Benachrichtigung
    await sendTelegramMessage(
      `📬 <b>Neue Website-Anfrage</b>\n` +
        `👤 <b>Name:</b> ${name || "-"}\n` +
        `📞 <b>Telefon:</b> ${phone || "-"}\n` +
        `📍 <b>Adresse:</b> ${address || "-"}\n` +
        `❗ <b>Notfall:</b> ${urgent ? "JA 🚨" : "nein"}\n\n` +
        `📝 <b>Problem:</b>\n${problem || "-"}`
    );

    // ---------- 2) Danke-Mail an Kunden ----------
    if (email) {
      const thankContent = `
        <p style="font-size:14px;line-height:1.7;color:${COLORS.textMuted};margin:0 0 12px 0;">
          wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.
        </p>

        <p style="font-size:13px;font-weight:600;color:${COLORS.textDark};margin:16px 0 6px;">
          Ihre Angaben:
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td style="font-size:13px;font-weight:600;padding:4px 0;width:140px;color:${COLORS.textDark};">Telefon</td>
            <td style="font-size:13px;padding:4px 0;color:${COLORS.textMuted};">${phone || "-"}</td>
          </tr>
          <tr>
            <td style="font-size:13px;font-weight:600;padding:4px 0;color:${COLORS.textDark};">Adresse</td>
            <td style="font-size:13px;padding:4px 0;color:${COLORS.textMuted};">${address || "-"}</td>
          </tr>
          <tr>
            <td style="font-size:13px;font-weight:600;padding:4px 0;color:${COLORS.textDark};">Notfall</td>
            <td style="font-size:13px;padding:4px 0;color:${urgent ? "#b91c1c" : "#065f46"};">
              ${urgent ? "Ja (NOTFALL)" : "Nein"}
            </td>
          </tr>
        </table>

        <div style="margin-top:16px;">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px;color:${COLORS.textDark};">Ihre Nachricht</div>
          <div style="font-size:13px;line-height:1.5;color:${COLORS.textMuted};border-radius:10px;border:1px solid ${COLORS.border};padding:12px;background:#f9fafb;white-space:pre-wrap;">
${problem || "-"}
          </div>
        </div>

        <p style="font-size:13px;line-height:1.7;color:${COLORS.textMuted};margin-top:18px;">
          Bei dringenden Notfällen erreichen Sie unseren 24/7-Notdienst jederzeit unter:<br/>
          <span style="font-size:15px;font-weight:700;color:${COLORS.red};">📞 030-23323873</span>
        </p>
      `;

      const thankHtml = buildHtml(
        `Vielen Dank für Ihre Anfrage, ${
          name || "sehr geehrte Kundin, sehr geehrter Kunde"
        }!`,
        "dies ist die Bestätigung, dass Ihre Nachricht bei uns eingegangen ist.",
        thankContent
      );

      await transporter.sendMail({
        from: MAIL_FROM,
        to: email, // Kunde
        replyTo: MAIL_TO,
        subject: "Vielen Dank für Ihre Anfrage bei ExpertRohr",
        text: plainText,
        html: thankHtml,
        attachments: [
          {
            filename: "ExpertRohr-min.png",
            path: logoPath,
            cid: "expertlogo",
          },
        ],
      });

      console.log("Danke-Mail gesendet.");
    } else {
      console.log("Keine Kunden-E-Mail angegeben – Danke-Mail übersprungen.");
    }

    res.json({ success: true, message: "E-Mails erfolgreich gesendet." });
  } catch (error) {
    console.error("Fehler beim Senden der E-Mails:", error);
    res.status(500).json({
      success: false,
      message: "Fehler beim Senden der E-Mails.",
    });
  }
});

/* =========================================================
   ROUTE 2: Google-Bewertungen (Places API)
   ========================================================= */

app.get("/api/reviews", async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return res
        .status(500)
        .json({ error: "GOOGLE_API_KEY oder GOOGLE_PLACE_ID fehlt" });
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      console.error("Google Places API Fehler:", data);
      return res
        .status(500)
        .json({ error: "Fehler bei Google Places API", details: data });
    }

    const result = data.result || {};
    const reviews = (result.reviews || []).map((r) => ({
      author_name: r.author_name,
      rating: r.rating,
      text: r.text,
      relative_time: r.relative_time_description,
      profile_photo_url: r.profile_photo_url,
    }));

    res.json({
      rating: result.rating,
      total_ratings: result.user_ratings_total,
      reviews,
    });
  } catch (err) {
    console.error("Serverfehler /api/reviews:", err);
    res.status(500).json({ error: "Interner Serverfehler" });
  }
});

/* =========================================================
   🔥 STATIC FRONTEND + SPA-FALLBACK
   ========================================================= */

// 1) Statische Dateien aus dem Vite-Build ausliefern
app.use(express.static(distPath));

// 2) Alle übrigen Routen an React geben (SPA-Fallback)
//    WICHTIG: Regex benutzen, nicht "*", damit path-to-regexp nicht meckert.
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Server starten
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
