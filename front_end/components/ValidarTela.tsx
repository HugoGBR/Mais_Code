"use client";
import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCookie } from '@/lib/coockie';

export default function AuthGuard({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const cookie = await getCookie("CookiCriado");

            if (pathname === '/') {
                setIsLoading(false);
                return;
            }

            if (!cookie) {
                router.push('/');
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, pathname]);

    if (isLoading) {
        return <p>Carregando...</p>;
    }

    return <>{children}</>;
};