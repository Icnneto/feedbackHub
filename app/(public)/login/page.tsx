import { Suspense } from 'react'
import { LoginForm } from './_components/login-form'

export default async function SignupPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}