import banco from "@/lib/database";
import {NextResponse} from "next/server";

export async function GET() {
    const results = await new Promise((resolve, reject) => {
        banco.query("SELECT * FROM usuario", (error: any, results: any, fields: any) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
    return NextResponse.json(results);
}
