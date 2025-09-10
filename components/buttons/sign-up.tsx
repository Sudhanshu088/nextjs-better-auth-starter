"use client"

import React from 'react'

import { SignUpForm } from '@/components/forms/sign-up';
import { Modal } from '@/components/wrappers/modal';

const SignUpButton = () => {
    return (
        <Modal
            title='Sign Up'
            description='Create a new account'
            content={(handleClose) => (<SignUpForm onSuccess={handleClose} />)}
        >
            <span className="underline underline-offset-4 cursor-pointer">
                Sign up
            </span>
        </Modal>
    )
}

export { SignUpButton }