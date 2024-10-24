import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const files: File[] = [];
        const filesToRemove: string[] = [];

        for (const [, value] of formData.entries()) {
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
            if (typeof value == "string") {
                filesToRemove.push(value)
            }
        }

        console.log("filesToRemove", filesToRemove)
        console.log("files to add", files)

        // return NextResponse.json({ data: undefined }, { status: 200 });

        const filePaths: string[] = new Array(files.length);

        // console.log("Starting to upload files to bucket")
        const supabase = createClient()
        const uploadPromises = files.map(async (file, index) => {
            const filename = `${uuidv4()}-${file.name}`.replaceAll(" ", "");
            const { data, error } = await supabase.storage
                .from("resources")
                .upload(`/products/${filename}`, file, {
                    cacheControl: "3600",
                    upsert: false,
                });


            if (data) {
                const filepath = data.path;
                if (process.env.BUCKET_URL) {
                    // filePaths.push(process.env.BUCKET_URL! + "/" + filepath);
                    filePaths[index] = process.env.BUCKET_URL! + "/" + filepath
                } else {
                    console.error("Missing bucket url")
                }
            }

            if (error) {
                console.log("Error uploading file", error);
                throw new Error("Upload failed");
            }
        });
        if (filesToRemove.length > 0) {
            console.log("Files to remove", filesToRemove)
            const { data, error } = await supabase.storage.
                from("resources").remove(filesToRemove)
            console.log("data", data, error)
            if (error) {
                console.log("Error removing file", error);
                throw new Error("File removal failed")
            }
        }

        await Promise.all(uploadPromises);
        return NextResponse.json({ data: filePaths }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
