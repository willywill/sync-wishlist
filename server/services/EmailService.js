import nodemailer from 'nodemailer';
import config from '../config';
import wishlistManageEmailView from '../views/wishlistManageEmailView';

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.com',
  port: 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

const EmailService = (
  ctx,
) => {
  const sendEmail = async ({
    from = `Wishlist Sync <${config.email.user}>`,
    to,
    subject,
    html,
    tag,
  }) => {
    ctx.log('info', { message: 'Sending Email', tag, to, subject });

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  };

  const sendWishlistManageEmail = async (to, url) => {
    const html = wishlistManageEmailView(url);

    await sendEmail({
      to,
      subject: 'Welcome to Wishlist Sync!',
      html,
      tag: 'Send-Wishlist-Manage-Email',
    });

    return true;
  };

  return {
    sendWishlistManageEmail,
  };
};

export default EmailService;
