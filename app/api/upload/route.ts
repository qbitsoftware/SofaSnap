import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { IncomingForm } from 'formidable';


export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const formData = await req.formData()
        const files: File[] = [];

        for (const [name, value] of formData.entries()) {
            if (value instanceof File) {
                // Validate the file size (limit to 10MB)
                if (value.size > 10 * 1024 * 1024) {
                    return NextResponse.json({ error: 'Fail on liiga suur' }, { status: 400 });
                }

                // Validate the file type (only allow PNG, JPG, JPEG, SVG)
                const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
                if (!allowedTypes.includes(value.type)) {
                    return NextResponse.json({ error: 'Faili tüüp on keelatud' }, { status: 400 });
                }

                // If validation passes, add the file to the list
                files.push(value);
            }
        }

        let filePaths: string[] = [];

        console.log("Starting to upload files to bucket")
        const supabase = createClient()
        const uploadPromises = files.map(async (file) => {
            const filename = `${uuidv4()}-${file.name}`;

            const { data, error } = await supabase.storage
                .from("resources")
                .upload(`products/${filename}`, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (data) {
                const filepath = data.path;
                console.log("Adding to filePaths", filepath);
                filePaths.push(filepath);
            }

            if (error) {
                console.log("Error uploading file", error);
                throw new Error("Upload failed");
            }
        });

        await Promise.all(uploadPromises);
        console.log("Successfully uploaded all the files!", filePaths)
        return NextResponse.json({ data: filePaths }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
