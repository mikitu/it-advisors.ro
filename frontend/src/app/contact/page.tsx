"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import PageHeader from "@/components/ui/PageHeader";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Verify reCAPTCHA
      const captchaToken = recaptchaRef.current?.getValue();
      if (!captchaToken) {
        setError("Te rugăm să completezi verificarea captcha.");
        setIsSubmitting(false);
        return;
      }

      const captchaResponse = await fetch("/api/verify-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!captchaResponse.ok) {
        setError("Verificarea captcha a eșuat. Te rugăm să încerci din nou.");
        recaptchaRef.current?.reset();
        setIsSubmitting(false);
        return;
      }

      // TODO: Send contact form to Strapi or email service
      // For now, simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      recaptchaRef.current?.reset();
    } catch {
      setError("A apărut o eroare. Te rugăm să încerci din nou.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        badge="Contactează-ne"
        title="Hai să vorbim"
        description="Completează formularul sau contactează-ne direct. Îți răspundem în maxim 24 de ore."
      />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trimite-ne un mesaj</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nume complet *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e6932] focus:ring-2 focus:ring-[#2e6932]/20 outline-none transition-all"
                      placeholder="Ion Popescu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e6932] focus:ring-2 focus:ring-[#2e6932]/20 outline-none transition-all"
                      placeholder="ion@companie.ro"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e6932] focus:ring-2 focus:ring-[#2e6932]/20 outline-none transition-all"
                      placeholder="0722 123 456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Companie</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e6932] focus:ring-2 focus:ring-[#2e6932]/20 outline-none transition-all"
                      placeholder="Numele companiei"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mesaj *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e6932] focus:ring-2 focus:ring-[#2e6932]/20 outline-none transition-all resize-none"
                    placeholder="Descrie-ne cum te putem ajuta..."
                  />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                    hl="ro"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                {/* Success message */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-800 font-medium">✅ Mulțumim! Mesajul tău a fost trimis. Te vom contacta în curând.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#3d8a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Se trimite..." : "Trimite mesajul"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informații contact</h2>
              <div className="space-y-6 mb-10">
                {[
                  { icon: "📞", label: "Telefon", value: "+40 (728) 691 520", href: "tel:+40728691520" },
                  { icon: "📧", label: "Email", value: "contact@it-advisors.ro", href: "mailto:contact@it-advisors.ro" },
                  { icon: "📍", label: "Adresă", value: "Str. Prevederii 9, Bloc PM20, Sc. 1, Et. 9, Ap. 56, Sector 3, București, 032292", href: "https://maps.google.com/?q=Strada+Prevederii+9+Bucuresti" },
                  { icon: "🕐", label: "Program", value: "Luni - Vineri: 09:00 - 18:00", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="font-medium text-gray-900">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p>Hartă Google Maps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

