"use client"

import React, { useState } from 'react'

import { InfoIcon, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { PasswordWithStrengthIndicatorInput } from '@/components/inputs/input'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { authClient } from '@/lib/auth-client'

type Props = {
    token: string
}

const ResetPasswordForm = ({
    token
}: Props) => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!")
            return
        }

        try {

            await authClient.resetPassword({
                newPassword,
                token,
            }, {

                onRequest: (ctx) => {
                    setIsSubmitting(true);
                },

                onSuccess: (ctx) => {
                    toast.success("Password reset successfully. You can now sign in with your new password.");
                    setIsSubmitting(false);
                },

                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    setIsSubmitting(false);
                }

            });

        } catch (error) { console.error("An unexpected error occurred:", error) }

    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>

            <div className="flex flex-col gap-2">
                <Label htmlFor="new-password" className="pl-2">
                    New Password
                </Label>
                <PasswordWithStrengthIndicatorInput
                    password={newPassword}
                    onPasswordChange={setNewPassword}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password" className="pl-2">
                    Confirm Password
                </Label>
                <Input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Confirm your new password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="rounded-md border border-blue-500/50 px-4 py-3 text-blue-600">
                <p className="text-sm">
                    <InfoIcon
                        className="me-3 -mt-0.5 inline-flex opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                    Try not to forget your new password! We won't be able to
                    send it to you if you do.
                </p>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className='w-full cursor-pointer'
            >
                {isSubmitting ? (
                    <span className='flex justify-center items-center gap-2'>
                        <Loader2 className='animate-spin' />
                        Resetting...
                    </span>
                ) : "Reset Password"}
            </Button>

        </form>
    )
}

export { ResetPasswordForm }