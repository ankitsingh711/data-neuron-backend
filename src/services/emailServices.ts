import jwt from "jsonwebtoken";
import {ses} from "../config/awsConfig";

export const sendVerificationEmail = async (email: string) => {
  const verificationToken = jwt.sign(
    { email },
    process.env.VERIFICATION_SECRET_KEY,
    { expiresIn: "1d" }
  );
  const verificationLink = `http://localhost:8900/verify-email/${verificationToken}`;

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Please verify your email address by clicking the following link: ${verificationLink}`,
        },
      },
      Subject: { Data: "Email Verification" },
    },
    Source: "developerankit2127@gmail.com",
  };

  await ses.sendEmail(params).promise();
};
