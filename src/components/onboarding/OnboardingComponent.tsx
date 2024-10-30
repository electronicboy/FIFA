"use client";
import React from 'react';
import {Button} from "@/components/ui/button";

export default function OnboardingComponent({updateAction}: {
    updateAction: (data: FormData) => Promise<{ success: boolean, error?: string }>
}) {
    const [error, setError] = React.useState<string | null>(null);
    const [submitting, setSubmitting] = React.useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            setSubmitting(true);
            const res = await updateAction(formData);
            if (!res.success && res.error != null) {
                setError(res.error);
            }
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label>username</label>
            <input name="username"/>
            <Button loading={submitting} variant={"ghost"}>Go!</Button>
            {error && <span>{error}</span>}
        </form>
    );
}
