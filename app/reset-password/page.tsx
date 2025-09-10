import React from 'react'
import { notFound } from 'next/navigation'

import { ResetPasswordForm } from '@/components/forms/reset-password'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{
        [key: string]: string |
        string[] |
        undefined
    }>
}) => {

    const { error, token } = await searchParams

    if (error) { throw new Error(error as string) }

    if (!token) { notFound() }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

            <Card className="w-full max-w-md">

                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>Enter your new password below.</CardDescription>
                </CardHeader>

                <CardContent>
                    <ResetPasswordForm token={token as string} />
                </CardContent>

            </Card>
            
        </main>
    )
}


export default Page