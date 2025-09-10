"use client"

import React, { useMemo, useState } from "react"

import {
    CheckIcon,
    EyeIcon,
    EyeOffIcon,
    XIcon
} from "lucide-react"

import { Input } from "@/components/ui/input"

type Props = {
    password: string
    onPasswordChange: (value: string) => void
}

const PasswordWithStrengthIndicatorInput = ({
    password,
    onPasswordChange,
}: Props) => {

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible((prev) => !prev)

    const checkStrength = (pass: string) => {
        const requirements = [
            { regex: /.{8,}/, text: "At least 8 characters" },
            { regex: /[0-9]/, text: "At least 1 number" },
            { regex: /[a-z]/, text: "At least 1 lowercase letter" },
            { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
        ]

        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }))
    }

    const strength = checkStrength(password)

    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length
    }, [strength])

    const getStrengthColor = (score: number) => {
        if (score === 0) return "bg-border"
        if (score <= 1) return "bg-red-500"
        if (score <= 2) return "bg-orange-500"
        if (score === 3) return "bg-amber-500"
        return "bg-emerald-500"
    }

    const getStrengthText = (score: number) => {
        if (score === 0) return "Enter a password"
        if (score <= 2) return "Weak password"
        if (score === 3) return "Medium password"
        return "Strong password"
    }

    return (
        <div>

            <div className="*:not-first:mt-2">
                <div className="relative">
                    <Input
                        id="new-password"
                        className="pe-9"
                        placeholder="Password"
                        type={isVisible ? "text" : "password"}
                        value={password}
                        onChange={(e) => onPasswordChange(e.target.value)}
                        aria-describedby="new-password-description"
                    />
                    <button
                        className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label={isVisible ? "Hide password" : "Show password"}
                    >
                        {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                    </button>
                </div>
            </div>

            <div
                className="bg-border mt-3 mb-4 h-1 w-[95%] overflow-hidden rounded-full mx-auto"
                role="progressbar"
                aria-valuenow={strengthScore}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-label="Password strength"
            >
                <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                ></div>
            </div>

            <p id="new-password-description" className="text-sm font-medium mb-2">
                {getStrengthText(strengthScore)}. Must contain:
            </p>

            <ul className="space-y-1.5" aria-label="Password requirements">
                {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                            <CheckIcon size={16} className="text-emerald-500" />
                        ) : (
                            <XIcon size={16} className="text-muted-foreground/80" />
                        )}
                        <span
                            className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                        >
                            {req.text}
                            <span className="sr-only">
                                {req.met ? " - Requirement met" : " - Requirement not met"}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>

        </div>
    )

}

export { PasswordWithStrengthIndicatorInput }
