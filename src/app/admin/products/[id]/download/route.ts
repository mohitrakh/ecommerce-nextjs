import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises'

export async function GET(req: NextRequest, {params: {id}} : {params: {id: string}}) {
    try {
        const product = await db.product.findUnique({
            where: {id},
            select: {filePath: true, name: true}
        });

        if (product == null) {
            notFound()
        }

        const {size} = await fs.stat(product.filePath)
        const file = await fs.readFile(product.filePath);
        const extention = product.filePath.split(".").pop()

        return new NextResponse(file, { headers: {
                "Content-Disposition": `atttachment; filename="${product.name}.${extention}"`,
                "Content-Length" : size.toString()
            }
        })
    } catch (error) {
        
    }
}