import nodeMailer from "nodemailer";

interface Email {
    address: string;
    subject: string;
    html: string;
}

const sendEmail = async ({ address, subject, html }: Email) => {
    const transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const options = {
        from: process.env.MAIL_USER,
        to: address,
        subject: subject,
        html: html,
    };

    try {
        const result = await transporter.sendMail(options);
        return result;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Something went wrong");
        }
    }
};

export default sendEmail;
