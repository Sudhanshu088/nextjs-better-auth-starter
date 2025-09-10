"use client"

import React from 'react'

import { Loader2 } from 'lucide-react'
import { useFormik } from 'formik'
import { toast } from "sonner"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { authClient } from '@/lib/auth-client'

type Props = { onSuccess: () => void }

const ForgotPasswordForm = ({ onSuccess }: Props) => {

    const formik = useFormik({

        initialValues: {
            email: '',
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

                await authClient.requestPasswordReset({
                    email: values.email,
                    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
                }, {

                    onSuccess: (ctx) => {
                        onSuccess()
                        toast.success("Password reset email sent. Please check your inbox.")
                    },

                    onError: (ctx) => { toast.error(ctx.error.message) }

                });

            } catch (error) { toast.error("error") }

            finally { setSubmitting(false) }

        },

    })

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">

                <Label htmlFor="email" className="ml-2">Email</Label>

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

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                className='w-full cursor-pointer'
            >
                {formik.isSubmitting ? (
                    <span className='flex justify-center items-center gap-2'>
                        <Loader2 className='animate-spin' />
                        Sending reset link...
                    </span>
                ) : "Send Reset Link"}
            </Button>

        </form>
    )
}

export { ForgotPasswordForm }