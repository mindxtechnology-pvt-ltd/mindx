import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Resend } from 'resend';

@Injectable()
export class MessagesService {
  private resend: Resend;
  private adminEmail = 'mindxtechnologyy@gmail.com';

  constructor(private prisma: PrismaService) {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async create(createMessageDto: CreateMessageDto) {
    // 1. Save message in the database
    const message = await this.prisma.message.create({
      data: createMessageDto,
    });

    // 2. Send emails and wait for result for debugging
    let emailStatus = 'sent';
    try {
      await this.sendEmails(createMessageDto);
    } catch (err) {
      console.error('Failed to send emails via Resend:', err);
      emailStatus = `failed: ${err.message || err}`;
    }

    return { 
      ...message, 
      emailStatus, 
      apiKeyExists: !!process.env.RESEND_API_KEY 
    };
  }

  private async sendEmails(dto: CreateMessageDto) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not defined in backend .env');
      return;
    }

    // A. Send Auto-Reply to Client
    await this.resend.emails.send({
      from: 'MindX Technology <info@mindxtechnology.com>',
      to: dto.email,
      replyTo: this.adminEmail,
      subject: 'Thank you for contacting MindX Technology',
      html: `
        <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0c0a09; color: #fafaf9; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #3b82f6; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Hello ${dto.name},</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px;">
            Thank you for reaching out to <strong>MindX Technology</strong>! We have received your inquiry.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px;">
            One of our team members will review your message and get back to you within 24 hours.
          </p>
          <div style="margin: 30px 0; padding: 15px; background-color: #1c1917; border-left: 4px solid #3b82f6; border-radius: 4px;">
            <p style="font-size: 14px; margin: 0; font-weight: bold; color: #fafaf9;">Your Inquiry Summary:</p>
            <p style="font-size: 14px; margin: 5px 0 0 0; color: #a1a1aa; font-style: italic;">"${dto.message}"</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #27272a; margin: 30px 0;">
          <p style="font-size: 12px; color: #71717a; text-align: center;">
            This is an automated reply from MindX Technology. Please do not reply directly to this email.
          </p>
        </div>
      `,
    });

    // B. Send Lead Notification to Admin
    await this.resend.emails.send({
      from: 'MindX Leads <info@mindxtechnology.com>',
      to: this.adminEmail,
      subject: `New Lead: ${dto.subject || 'Discovery Call Request'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Form Submission Recieved</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 10px 0;">${dto.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${dto.email}">${dto.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0;">${dto.phone || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: bold;">Subject:</td>
              <td style="padding: 10px 0;">${dto.subject || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${dto.message}</td>
            </tr>
          </table>
        </div>
      `,
    });
  }

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    return this.prisma.message.delete({
      where: { id },
    });
  }
}
