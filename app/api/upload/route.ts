import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import sharp from 'sharp';

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const files: File[] = [];
        const filesToRemove: string[] = [];

        for (const [, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > 20 * 1024 * 1024) {
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
            const uploadFile = file;
            let uploadBuffer: Buffer | undefined = undefined;
            if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                const arrayBuffer = await file.arrayBuffer();
                const inputBuffer = Buffer.from(arrayBuffer);
                let sharpInstance = sharp(inputBuffer);
                sharpInstance = sharpInstance.resize({ width: 1600, withoutEnlargement: true });
                if (file.type === 'image/png') {
                    sharpInstance = sharpInstance.png({ quality: 80, compressionLevel: 8 });
                } else {
                    sharpInstance = sharpInstance.jpeg({ quality: 80 });
                }
                uploadBuffer = await sharpInstance.toBuffer();
            }
            const filename = `${uuidv4()}-${file.name}`.replaceAll(" ", "");
            const uploadData = uploadBuffer ? uploadBuffer : uploadFile;
            const { data, error } = await supabase.storage
                .from("resources")
                .upload(`/products/${filename}`, uploadData, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: file.type,
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
