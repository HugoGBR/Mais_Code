"use server"
import {cookies} from "next/headers";

export async function criarCookie(cookieName: string, values:string) {

    cookies().set({
        name: cookieName,
        value: values,
        httpOnly: true,
    })
}

export async function getCookie(cookieName: string): Promise<string | null> {
    const allCookies = cookies();
    const userCookie = allCookies.get(cookieName);

    if (userCookie) {
        return userCookie.value; // Retorna o valor do cookie como uma string
    } else {
        return null;
    }
}

