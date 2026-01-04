import { factories } from '@strapi/strapi';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1h'; // 1 hour

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Generate access token for verified email
const generateAccessToken = (email: string): string => {
  return jwt.sign({ email, type: 'account_access' }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

// Verify access token
const verifyAccessToken = (token: string): { email: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; type: string };
    if (decoded.type !== 'account_access') return null;
    return { email: decoded.email };
  } catch {
    return null;
  }
};

export default factories.createCoreController('api::verification-code.verification-code', ({ strapi }) => ({
  // Send verification code to email
  async sendCode(ctx) {
    const { email } = ctx.request.body;

    if (!email) {
      return ctx.badRequest('Email is required');
    }

    // Check if there are any orders for this email
    const orders = await strapi.documents('api::order.order').findMany({
      filters: { customerEmail: email },
      limit: 1,
    });

    if (orders.length === 0) {
      // Don't reveal if email exists or not - just say code sent
      return ctx.send({ success: true, message: 'Dacă există comenzi pentru acest email, vei primi un cod de verificare.' });
    }

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Delete any existing unused codes for this email
    const existingCodes = await strapi.documents('api::verification-code.verification-code').findMany({
      filters: { email, used: false },
    });

    for (const existing of existingCodes) {
      await strapi.documents('api::verification-code.verification-code').delete({
        documentId: existing.documentId,
      });
    }

    // Create new verification code
    await strapi.documents('api::verification-code.verification-code').create({
      data: {
        email,
        code,
        expiresAt: expiresAt.toISOString(),
        used: false,
      },
    });

    // Send email with code
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'IT Advisors <noreply@it-advisors.ro>',
        to: email,
        subject: 'Cod de verificare - IT Advisors',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2e6932;">Codul tău de verificare</h2>
            <p>Folosește codul de mai jos pentru a accesa istoricul comenzilor tale:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2e6932;">${code}</span>
            </div>
            <p style="color: #666;">Codul este valabil 1 oră.</p>
            <p style="color: #666;">Dacă nu ai solicitat acest cod, poți ignora acest email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #999; font-size: 12px;">IT Advisors - Soluții IT pentru afaceri</p>
          </div>
        `,
      });
    } catch (error) {
      strapi.log.error('Failed to send verification email:', error);
      return ctx.internalServerError('Nu am putut trimite emailul. Încearcă din nou.');
    }

    return ctx.send({ success: true, message: 'Codul a fost trimis pe email.' });
  },

  // Verify code and return access token + orders
  async verifyCode(ctx) {
    const { email, code } = ctx.request.body;

    if (!email || !code) {
      return ctx.badRequest('Email și codul sunt obligatorii');
    }

    // Find valid verification code
    const verificationCodes = await strapi.documents('api::verification-code.verification-code').findMany({
      filters: {
        email,
        code,
        used: false,
      },
    });

    if (verificationCodes.length === 0) {
      return ctx.badRequest('Cod invalid sau expirat');
    }

    const verificationCode = verificationCodes[0];

    // Check if expired
    if (new Date(verificationCode.expiresAt) < new Date()) {
      return ctx.badRequest('Codul a expirat. Solicită un cod nou.');
    }

    // Mark code as used
    await strapi.documents('api::verification-code.verification-code').update({
      documentId: verificationCode.documentId,
      data: {
        used: true,
        verifiedAt: new Date().toISOString(),
      },
    });

    // Generate access token
    const accessToken = generateAccessToken(email);

    // Get orders for this email
    const orders = await strapi.documents('api::order.order').findMany({
      filters: { customerEmail: email },
      sort: { createdAt: 'desc' },
      populate: {
        items: {
          populate: ['product'],
        },
      },
    });

    return ctx.send({ success: true, accessToken, orders });
  },

  // Get orders using access token
  async getOrders(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.unauthorized('Token de acces lipsă');
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return ctx.unauthorized('Token invalid sau expirat');
    }

    // Get orders for this email
    const orders = await strapi.documents('api::order.order').findMany({
      filters: { customerEmail: decoded.email },
      sort: { createdAt: 'desc' },
      populate: {
        items: {
          populate: ['product'],
        },
      },
    });

    return ctx.send({ success: true, email: decoded.email, orders });
  },

  // Cancel an order
  async cancelOrder(ctx) {
    const authHeader = ctx.request.header.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.unauthorized('Token de acces lipsă');
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return ctx.unauthorized('Token invalid sau expirat');
    }

    const { orderDocumentId } = ctx.request.body;

    if (!orderDocumentId) {
      return ctx.badRequest('ID-ul comenzii este obligatoriu');
    }

    // Find the order
    const order = await strapi.documents('api::order.order').findOne({
      documentId: orderDocumentId,
    });

    if (!order) {
      return ctx.notFound('Comanda nu a fost găsită');
    }

    // Check if the order belongs to this user
    if (order.customerEmail !== decoded.email) {
      return ctx.forbidden('Nu ai permisiunea să anulezi această comandă');
    }

    // Check if order can be cancelled
    if (order.status === 'cancelled') {
      return ctx.badRequest('Comanda este deja anulată');
    }

    if (order.status === 'delivered') {
      return ctx.badRequest('Nu poți anula o comandă livrată');
    }

    if (order.status === 'shipped') {
      return ctx.badRequest('Nu poți anula o comandă expediată');
    }

    // Update order status to cancelled
    await strapi.documents('api::order.order').update({
      documentId: orderDocumentId,
      data: {
        status: 'cancelled',
      },
    });

    return ctx.send({ success: true, message: 'Comanda a fost anulată' });
  },
}));

