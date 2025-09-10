"use client"

import React, { useState } from 'react'

import { useFormik } from 'formik'
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'
import { toast } from "sonner"

import { SignOnButton } from '@/components/buttons/sign-on'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { authClient } from '@/lib/auth-client'

type Props = { onSuccess: () => void }

const SignUpForm = ({ onSuccess }: Props) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const formik = useFormik({

        initialValues: {
            username: '',
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

                await authClient.signUp.email({
                    email: values.email,
                    password: values.password,
                    name: values.username,
                    image: "",
                    callbackURL: "/"
                }, {

                    onSuccess: (ctx) => {
                        onSuccess()
                        toast.success("Account created successfully")
                    },

                    onError: (ctx) => { toast.error(ctx.error.message) }

                });

            } catch (error) { console.error("error") }

            finally { setSubmitting(false) }

        }

    })

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

            <div className='grid grid-cols-2 gap-2'>
                <SignOnButton provider="GitHub" />
                <SignOnButton provider="Google" />
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
            </div>

            <div className="flex flex-col gap-2">

                <Label htmlFor="username" className="ml-2">Username</Label>

                <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.username && formik.errors.username && (
                    <div className="text-red-500 px-2">{formik.errors.username}</div>
                )}

            </div>

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

            <div className="flex flex-col gap-2">

                <Label htmlFor="password" className="ml-2">Password</Label>

                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="pe-9"
                    />
                    <button
                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        aria-pressed={isVisible}
                        aria-controls="password"
                    >
                        {isVisible ? (
                            <EyeOffIcon size={16} aria-hidden="true" />
                        ) : (
                            <EyeIcon size={16} aria-hidden="true" />
                        )}
                    </button>
                </div>

                {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 px-2">{formik.errors.password}</div>
                )}

            </div>

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                className='w-full cursor-pointer'>
                {formik.isSubmitting ? (
                    <>
                        <Loader2 className='animate-spin' />
                        <span>Signing Up...</span>
                    </>
                ) : 'Sign Up'}
            </Button>

        </form>
    )
}

export { SignUpForm }