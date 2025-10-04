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
                if (value.size > 10 * 1024 * 1024) {
                    return NextResponse.json({ error: 'Fail on liiga suur' }, { status: 400 });
                }

                const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
                if (!allowedTypes.includes(value.type)) {
                    return NextResponse.json({ error: 'Faili tüüp on keelatud' }, { status: 400 });
                }

                files.push(value);
            }
            if (typeof value == "string") {
                filesToRemove.push(value)
            }
        }

        const filePaths: string[] = new Array(files.length);

        const supabase = await createClient()
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
                    filePaths[index] = process.env.BUCKET_URL! + "/" + filepath
                }
            }

            if (error) {
                void error;
                throw new Error("Upload failed");
            }
        });
        if (filesToRemove.length > 0) {
            const { error } = await supabase.storage.
                from("resources").remove(filesToRemove)
            if (error) {
                void error;
                throw new Error("File removal failed")
            }
        }

        await Promise.all(uploadPromises);
        return NextResponse.json({ data: filePaths }, { status: 200 });
    } catch (error) {
        void error;
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
