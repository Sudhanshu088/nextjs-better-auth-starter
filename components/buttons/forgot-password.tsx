"use client"

import React from 'react'

import { ForgotPasswordForm } from '@/components/forms/forgot-password';
import { Modal } from '@/components/wrappers/modal';

const ForgotPasswordButton = () => {
    return (
        <Modal
            title='Forgot Password'
            description='Reset your password'
            content={(handleClose) => (<ForgotPasswordForm onSuccess={handleClose} />)}
        >
            <span className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer">
                Forgot your password?
            </span>
        </Modal>
    )
}

export { ForgotPasswordButton }