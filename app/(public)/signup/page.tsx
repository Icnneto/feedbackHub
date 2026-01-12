import { Suspense } from 'react'
import { SignupForm } from './_components/signup-form'

export default async function SignupPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupForm />
        </Suspense>
    )
}