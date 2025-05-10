import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("images");

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: "No files uploaded" },
                { status: 400 }
            );
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), "public/uploads");
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        const urls: string[] = [];

        for (const file of files) {
            if (!(file instanceof File)) {
                console.error("Invalid file object:", file);
                continue;
            }

            // Validate file type
            if (!file.type.startsWith("image/")) {
                console.error("Invalid file type:", file.type);
                continue;
            }

            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Create unique filename
                const uniqueId = uuidv4();
                const extension = file.name.split(".").pop();
                const filename = `${uniqueId}.${extension}`;

                // Save to public directory
                const path = join(uploadsDir, filename);
                await writeFile(path, buffer);

                console.log("File uploaded successfully:", filename);
                urls.push(`/uploads/${filename}`);
            } catch (error) {
                console.error("Error processing file:", file.name, error);
            }
        }

        if (urls.length === 0) {
            return NextResponse.json(
                { error: "No files were successfully uploaded" },
                { status: 400 }
            );
        }

        return NextResponse.json({ urls });
    } catch (error) {
        console.error("Error uploading files:", error);
        return NextResponse.json(
            {
                error: "Failed to upload files",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
} 