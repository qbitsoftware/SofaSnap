"use client"

import { PostHogProvider } from "posthog-js/react";
import { posthog } from "posthog-js";
import { ReactNode } from "react";

interface CSPostHogProviderProps {
    children: ReactNode;
}

export default function CSPostHogProvider({ children }: CSPostHogProviderProps) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
