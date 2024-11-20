"use client"

import { PostHogProvider } from "posthog-js/react"
import { posthog } from "posthog-js"

export default function CSPostHogProvider({ children }) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}