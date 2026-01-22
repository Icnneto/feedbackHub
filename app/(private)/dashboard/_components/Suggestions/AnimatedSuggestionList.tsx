'use client'

import { motion, LayoutGroup } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedSuggestionListProps {
    children: ReactNode[]
    suggestionIds: string[]
}

export default function AnimatedSuggestionList({ children, suggestionIds }: AnimatedSuggestionListProps) {
    return (
        <LayoutGroup>
            <div className="flex flex-col gap-y-6 items-center">
                {children.map((child, index) => (
                    <motion.div
                        key={suggestionIds[index]}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            layout: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full flex justify-center"
                    >
                        {child}
                    </motion.div>
                ))}
            </div>
        </LayoutGroup>
    )
}
