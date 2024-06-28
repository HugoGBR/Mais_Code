"use server"
import {cookies} from "next/headers";

export async function criarCookie(cookieName: string) {

    cookies().set({
        name: cookieName,
        value: "autenticado",
        httpOnly: true,
    })
}

export async function getCookie() {
    const allCookies = cookies();
    const userCookie = allCookies.get('CookiCriado');

    if (userCookie) {
        return userCookie.value;
    } else {
        return null;
    }
}








