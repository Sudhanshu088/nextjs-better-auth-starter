import React from 'react'

import { GalleryVerticalEnd } from "lucide-react"

import { SignInForm } from "@/components/forms/sign-in"
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

    const { redirect_url } = await searchParams

    return (
        <main className="bg-muted fixed inset-0 flex flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">

                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </a>

                <div className="flex flex-col gap-6">

                    <Card>

                        <CardHeader className="text-center">

                            <CardTitle className="text-xl">Welcome back</CardTitle>

                            <CardDescription>
                                Login with your Apple or Google account
                            </CardDescription>

                        </CardHeader>

                        <CardContent>
                            <SignInForm redirect_url={redirect_url as string} />
                        </CardContent>

                    </Card>

                    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>

            </div>
        </main>
    )

}

export default Page