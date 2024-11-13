'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Application = {
    id: number
    productName: string
    applicantName: string
    status: 'pending' | 'accepted' | 'rejected'
}

export function ProductApplications() {
    const [applications, setApplications] = useState<Application[]>([
        { id: 1, productName: "Super Gadget", applicantName: "John Doe", status: 'pending' },
        { id: 2, productName: "Awesome Tool", applicantName: "Jane Smith", status: 'pending' },
        { id: 3, productName: "Cool Device", applicantName: "Bob Johnson", status: 'pending' },
    ])

    const handleAction = (id: number, action: 'accept' | 'reject') => {
        setApplications(apps => apps.map(app =>
            app.id === id ? { ...app, status: action === 'accept' ? 'accepted' : 'rejected' } : app
        ))
    }

    return (
        <div className="space-y-4">
            {applications.map(app => (
                <Card key={app.id} className='bg-white'>
                    <CardHeader>
                        <CardTitle>{app.productName}</CardTitle>
                        <CardDescription>Applied by: {app.applicantName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Status: {app.status}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        {app.status === 'pending' && (
                            <>
                                <Button onClick={() => handleAction(app.id, 'accept')} variant="outline">Accept</Button>
                                <Button onClick={() => handleAction(app.id, 'reject')} variant="outline">Reject</Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}