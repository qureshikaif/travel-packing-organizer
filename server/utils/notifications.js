import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kaifqureshi.dev@gmail.com",
    pass: "lhgw ewrl qvvl wyju", // Use app password or environment variable
  },
});

/**
 * Sends OTP to the user's email.
 * @param {string} email - The email of the user.
 * @param {string} otp - The OTP to send.
 */
export const sendOTPByEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: "kaifqureshi.dev@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};
