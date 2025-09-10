import { resend } from "@/lib/resend";

type Props = {
    to: string;
    subject: string;
    text: string;
    // react: React.ReactNode
}

export async function sendEmail({
    to,
    subject,
    text,
    // react
}: Props) {

    try {

        await resend.emails.send({
            from: 'Acme <no-reply@unown.sbs>',
            to,
            subject,
            text,
            // react
        });

    } catch (error) { console.error("Error sending email:", error) }

}