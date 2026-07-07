// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// সরাসরি সোর্স কোডেই এপিআই কি বসানো হলো
const resend = new Resend('Re_ayh39KGt_C14e4xe5p3QHY645qxJnvxGk');

export async function POST(request: Request) {
  try {
    const { toEmail, toName, password } = await request.json();

    if (!toEmail || !toName || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      // আপনার ভেরিফাইড ডোমেইন wlc.pro.bd ব্যবহার করা হলো
      from: 'WLC Admin Bot <admin@wlc.pro.bd>', 
      to: [toEmail.trim()],
      subject: 'WLC Internal Panel Portal - অ্যাকাউন্ট অ্যাপ্রুভাল নোটিশ! 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0c0a09; color: #f5f5f4; border-radius: 16px; border: 1px solid #292524;">
          <h2 style="color: #e11d48; margin-bottom: 4px;">WLC Internal Panel Portal</h2>
          <p style="font-size: 12px; color: #a8a29e; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">Club Management System</p>
          <hr style="border: 0; border-top: 1px solid #292524; margin: 20px 0;" />
          <p>প্রিয় <strong>${toName}</strong>,</p>
          <p>আপনার প্যানেল রিকোয়েস্টটি সফলভাবে অ্যাপ্রুভ করা হয়েছে ভাই। Willes Literary Club-এর ইন্টারনাল প্যানেল ড্যাশবোর্ডে লগইন করার জন্য আপনার অটো-জেনারেটেড পাসওয়ার্ড নিচে দেওয়া হলো:</p>
          
          <div style="background-color: #1c1917; border: 1px solid #44403c; padding: 16px; border-radius: 12px; margin: 24px 0; text-align: center;">
            <span style="font-size: 12px; color: #a8a29e; text-transform: uppercase; display: block; margin-bottom: 4px;">Temporary Password</span>
            <strong style="font-size: 22px; color: #f5f5f4; font-family: monospace; letter-spacing: 2px;">${password}</strong>
          </div>

          <p style="font-size: 13px; color: #a8a29e;">নিচের লিংকে ক্লিক করে আপনার ইমেইল এবং এই পাসওয়ার্ড দিয়ে লগইন করতে পারবেন:</p>
          <a href="https://panel.wlc.pro.bd" style="display: inline-block; background: linear-gradient(to right, #be123c, #9f1239); color: white; padding: 12px 24px; font-weight: bold; border-radius: 8px; text-decoration: none; font-size: 13px; margin-top: 8px;">Enter Panel ➔</a>
          
          <hr style="border: 0; border-top: 1px solid #292524; margin: 24px 0;" />
          <p style="font-size: 10px; color: #57534e; text-align: center; font-family: monospace; margin: 0;">SECURE PROTECTED PORTAL</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
