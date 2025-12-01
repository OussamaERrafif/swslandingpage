'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const company = formData.get('company') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { error: 'Missing required fields' };
  }

  try {
    // Admin Email Template
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://souswebstudi.com/icon.png" alt="SWS Logo" style="width: 60px; height: 60px;" />
          </div>
          <h2 style="color: #FF4D00;">New Contact Form Submission</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #FF4D00;">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 4px;">${message}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // User Thank You Email Template (Dark Theme matching website)
    const userHtml = `
      <!DOCTYPE html>
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: Arial, sans-serif;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; min-height: 100vh;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #171717; border: 1px solid #333333; border-radius: 12px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="padding: 30px 40px; border-bottom: 1px solid #333333; text-align: center;">
                    <img src="https://souswebstudi.com/icon.png" alt="SWS Logo" style="width: 60px; height: 60px; margin-bottom: 10px;" />
                    <h1 style="margin: 0; color: #FF4D00; font-size: 24px; font-weight: bold; letter-spacing: 1px;">SWS</h1>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px;">Hello ${name},</h2>
                    <p style="margin: 0 0 20px 0; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                      Thank you for reaching out to us. We have received your message regarding <strong>"${company || 'your project'}"</strong>.
                    </p>
                    <p style="margin: 0 0 30px 0; color: #a3a3a3; font-size: 16px; line-height: 1.6;">
                      Our team will review your inquiry and get back to you shortly. We're excited to discuss how we can help bring your digital vision to life.
                    </p>
                    <div style="background-color: rgba(255, 77, 0, 0.1); border-left: 4px solid #FF4D00; padding: 15px; border-radius: 4px;">
                      <p style="margin: 0; color: #ffffff; font-size: 14px;">
                        "We'll get back to you within 24 hours."
                      </p>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #0f0f0f; border-top: 1px solid #333333;">
                    <p style="margin: 0; color: #525252; font-size: 12px; text-align: center;">
                      &copy; ${new Date().getFullYear()} Sous Web Studio. All rights reserved.
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

    const { data, error } = await resend.batch.send([
      {
        from: 'SWS Contact <support@support.souswebstudi.com>',
        to: ['oussamaerrafif@gmail.com'],
        subject: `New Contact Form Submission from ${name}`,
        html: adminHtml,
        replyTo: email,
      },
      {
        from: 'SWS <support@support.souswebstudi.com>',
        to: [email],
        subject: 'Thank you for contacting SWS',
        html: userHtml,
      }
    ]);

    if (error) {
      console.error('Resend error:', error);
      return { error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Server error:', error);
    return { error: 'Failed to send email' };
  }
}
