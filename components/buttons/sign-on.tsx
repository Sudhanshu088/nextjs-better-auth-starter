"use client"

import React, { useState } from 'react';
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { authClient } from '@/lib/auth-client';

type AuthProvider = "Google" | "GitHub";

const providerMap = {

    Google: {
        id: "google",
        Icon: FaGoogle
    },

    GitHub: {
        id: "github",
        Icon: FaGithub
    }

} as const;

type Props = {
    provider: AuthProvider;
};

const SignOnButton = ({ provider }: Props) => {

    const [loading, setLoading] = useState(false);

    const { id, Icon } = providerMap[provider];

    const handleSignIn = async () => {

        try {

            await authClient.signIn.social(
                { provider: id },
                {
                    onRequest: () => setLoading(true),
                    onSuccess: () => setLoading(false),
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                        setLoading(false);
                    },
                }
            );

        } catch (error) {

            console.error(error);
            toast.error("Something went wrong during sign-in.");

        } finally { setLoading(false) }

    };

    return (
        <Button
            type="button"
            onClick={handleSignIn}
            variant="outline"
            disabled={loading}
            className="flex justify-center items-center gap-2 w-full cursor-pointer"
        >
            {loading ? <Loader2 className="animate-spin" /> : <Icon />}
            <span>Sign in with {provider}</span>
        </Button>
    );

};

export { SignOnButton };