import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export async function POST(req: Request) {
  try {
    const { emails, html, subject } = await req.json();

    if (!emails?.length) {
      return Response.json(
        { success: false, message: "No emails provided" },
        { status: 400 }
      );
    }

    for (const email of emails) {
      await transporter.sendMail({
        from: `"Bj Sign World" <support@ttm4u.com>`,
        to: email,
        subject,
        html,
      });

      await delay(800);
    }

    return Response.json({
      success: true,
      sent: emails.length,
    });
  } catch (error: any) {
    console.error("Mail error:", error);
    return Response.json(
      { success: false, message: "Mail sending failed" },
      { status: 500 }
    );
  }
}
