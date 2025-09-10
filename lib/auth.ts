import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { drizzle } from "@/lib/drizzle";

import { sendEmail } from "@/utils/send-email";

import { schema } from "@/schema";

export const auth = betterAuth({

    database: drizzleAdapter(drizzle, {
        provider: "pg",
        schema
    }),

    emailAndPassword: {

        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,

        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
        },

        onPasswordReset: async ({ user }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Password reset successful",
                text: `Your password has been successfully reset.`,
            });
        },

    },

    emailVerification: {

        autoSignInAfterVerification: false,

        sendOnSignUp: true,
        sendOnSignIn: true,

        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },

        onEmailVerification: async (user) => {
            await sendEmail({
                to: user.email,
                subject: "Email verified",
                text: `Your email has been successfully verified.`,
            });
        }

    },

    socialProviders: {

        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },

        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },

    },

    plugins: [nextCookies()]

});