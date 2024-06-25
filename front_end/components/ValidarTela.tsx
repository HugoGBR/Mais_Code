import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/lib/coockie';

export default function AuthGuard ({ children }: {children: ReactNode}){
    const router = useRouter();
    const [isLoading, setIsCarregando] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const cookie = await getCookie(); 
            if (!cookie) {
                router.push('/');
            } else {
                setIsCarregando(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return <p>Não Autorizado...</p>;
    }

    return <>{children}</>;
};

