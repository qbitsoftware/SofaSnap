"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'
import { getAllComplaintsAction, updateComplaintAction } from "@/app/actions";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";

type Complaint = {
    id: number;
    created_at: string;
    updated_at: string;
    text: string;
    resolved: boolean | null;
}

type Complaints = {
    complaints: Complaint[] | undefined
}

export function UserComplaints({ complaints: initialComplaints }: Complaints) {
    const [complaints, setComplaints] = useState(initialComplaints);

    const toast = useToast()

    const updateValue = async (id: number) => {
        try {
            await updateComplaintAction(id);
            const updatedComplaints = await getAllComplaintsAction();
            if (updatedComplaints.data) {
                setComplaints(updatedComplaints.data);
            } else {
                setComplaints([])
            }
            toast.toast({ title: "Edukalt lõpetatud" })
        } catch (error) {
            console.error(error);
            toast.toast({ title: "Midagi läks valesti" })
        }
    };

    if (!complaints || complaints.length === 0) {
        return (
            <Card className="text-center p-6 bg-white">
                <CardContent>
                    <p className="text-xl font-semibold">Kaebused puuduvad</p>
                    <p className="text-muted-foreground mt-2">Hetkel on aega puhkamiseks</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {complaints.map(complaint => (
                <Card key={complaint.id} className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Kaebus #{complaint.id}</CardTitle>
                        <CardDescription>
                            Esitatud: {new Date(complaint.created_at).toLocaleString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{complaint.text}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div>
                            Staatus:
                            {complaint.resolved === true && <span className="ml-2 text-green-500">Tehtud</span>}
                            {complaint.resolved === false && <span className="ml-2 text-red-500">Tegemata</span>}
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500"
                                disabled={complaint.resolved === true}
                                onClick={() => updateValue(complaint.id)}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Märgi tehtuks
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}