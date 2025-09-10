"use client"

import React from 'react'

import { useFormik } from 'formik'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { ForgotPasswordButton } from '@/components/buttons/forgot-password'
import { SignOnButton } from "@/components/buttons/sign-on"
import { SignUpButton } from "@/components/buttons/sign-up"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { authClient } from '@/lib/auth-client'

type Props = {
    redirect_url: string
}

const SignInForm = ({ redirect_url }: Props) => {

    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },

        onSubmit: async (values, { setSubmitting }) => {

            setSubmitting(true)

            await formik.validateForm()
            if (!formik.isValid) {
                toast.error("Try entering some real values");
                setSubmitting(false)
                return
            }

            try {

                await authClient.signIn.email({
                    email: values.email,
                    password: values.password,
                    callbackURL: redirect_url,
                    rememberMe: true
                }, {
                    onError: (ctx) => { toast.error(ctx.error.message) },
                })

            } catch (error) { console.error("error") }

            finally { setSubmitting(false) }

        },

    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-6">

                <div className="flex flex-col gap-4">
                    <SignOnButton provider="GitHub" />
                    <SignOnButton provider="Google" />
                </div>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                        Or continue with
                    </span>
                </div>

                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 px-2">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {/* <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a> */}
                            <ForgotPasswordButton />
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 px-2">{formik.errors.password}</div>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className='w-full cursor-pointer'
                    >
                        {formik.isSubmitting ? (
                            <span className='flex justify-center items-center gap-2'>
                                <Loader2 className='animate-spin' />
                                Signing in...
                            </span>
                        ) : "Sign In"}
                    </Button>

                </div>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <SignUpButton />
                </div>

            </div>
        </form>
    )
}

export { SignInForm }