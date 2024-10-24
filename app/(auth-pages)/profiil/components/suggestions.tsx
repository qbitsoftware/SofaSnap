"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { Feature } from "@/lib/coordinates-validation"
import { Address } from "@/lib/search-validation"
import { Separator } from "@radix-ui/react-separator"
import React, { Dispatch, SetStateAction } from "react"

interface SuggestionProps {
    isLoading: boolean,
    inputValue: string,
    showSuggestions: boolean,
    suggestions: Address[],
    setChosenSuggestion: Dispatch<SetStateAction<Feature | undefined>>,
    setInputValue: (value: string) => void
    id: string
}

const Suggestions = ({ isLoading, showSuggestions, suggestions, inputValue, setChosenSuggestion, setInputValue, id }: SuggestionProps) => {
    //how many suggestions we want
    const test = [1, 2, 3]

    async function saveState(suggestion: Address) {
        const data = {
            mapbox_id: suggestion.mapbox_id!,
            user_id: id,
        }
        try {
            setInputValue("Laeb...")
            const response = await fetch("/api/suggestion/retrieve", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json()
            const address = responseData.data[0] as Feature
            setChosenSuggestion(address)
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
        setInputValue(suggestion.full_address || suggestion.name || "")
    }
    return (
        <div>
            {isLoading ?
                <div>
                    {inputValue.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-xl z-50">
                            {[0, 1, 2].map((_, index) => (
                                <div key={index} className="hover:bg-gray-200 cursor-pointer w-full">
                                    <div className="p-4">
                                        <Skeleton className="h-4 w-1/2 mb-3" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                    {index + 1 != test.length ?
                                        <Separator className="w-full h-[2px] bg-gray-300" />
                                        :
                                        ""
                                    }
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                :
                <div>
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-xl z-50">
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className="hover:bg-gray-200 cursor-pointer w-full" onClick={() => saveState(suggestion)}>
                                    <div className="p-4" >
                                        <h1 className="font-bold pb-3">{suggestion.name}</h1>
                                        <p className="text-slate-500">{suggestion.place_formatted}</p>
                                    </div>
                                    {index + 1 != suggestions.length ?
                                        <Separator className="w-full h-[2px] bg-gray-300" />
                                        :
                                        ""
                                    }
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }

        </div>
    )
}

export { Suggestions }