import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const { name, email, message, hcaptchaToken } = await req.json();

        if (!name || !email || !message || !hcaptchaToken) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Verify hCaptcha Token
        const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;
        if (!hcaptchaSecret) {
            return NextResponse.json({ error: "Server Configuration Error: Missing HCAPTCHA_SECRET_KEY in environment" }, { status: 500 });
        }

        const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${hcaptchaSecret}&response=${hcaptchaToken}`,
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
            console.error("hCaptcha verification failed:", verifyData);
            return NextResponse.json({ error: `Captcha Verification Failed: ${verifyData["error-codes"] ? verifyData["error-codes"].join(", ") : "Invalid Token"}` }, { status: 400 });
        }

        // 2. Send Email via Resend
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            return NextResponse.json({ error: "Server Configuration Error: Missing RESEND_API_KEY in environment" }, { status: 500 });
        }

        const resend = new Resend(resendApiKey);

        const targetEmail = process.env.CONTACT_EMAIL || "Roshanpravin0@gmail.com";

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Using Resend's default sender or a verified domain
            to: targetEmail,
            replyTo: email,
            subject: `New Inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (error) {
            console.error("Resend error:", error);
            // Surface the specific Resend API error message
            return NextResponse.json({ error: `Resend Error: ${error.message || "Failed to send email"}` }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (err: any) {
        console.error("Contact API error:", err);
        return NextResponse.json({ error: `Internal server error: ${err.message || String(err)}` }, { status: 500 });
    }
}
