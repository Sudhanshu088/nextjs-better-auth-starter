import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/lib/db";

import { sendEmail } from "@/utils/send-email";

import { schema } from "@/schema";

export const auth = betterAuth({

    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
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