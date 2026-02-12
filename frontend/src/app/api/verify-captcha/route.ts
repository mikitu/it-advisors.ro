import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token captcha lipsă" },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Configurare server incompletă" },
        { status: 500 }
      );
    }

    // Verify with Google
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
      // For reCAPTCHA v3, check the score (0.0 - 1.0, higher is more likely human)
      // Score threshold of 0.5 is recommended by Google
      const score = data.score ?? 1.0; // v2 doesn't have score, default to 1.0
      const threshold = parseFloat(process.env.RECAPTCHA_SCORE_THRESHOLD || "0.5");

      if (score < threshold) {
        console.warn(`reCAPTCHA score too low: ${score} (threshold: ${threshold})`);
        return NextResponse.json(
          { success: false, error: "Verificare captcha eșuată - scor prea mic", score },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true, score });
    } else {
      return NextResponse.json(
        { success: false, error: "Verificare captcha eșuată", errors: data["error-codes"] },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Captcha verification error:", error);
    return NextResponse.json(
      { success: false, error: "Eroare server" },
      { status: 500 }
    );
  }
}

