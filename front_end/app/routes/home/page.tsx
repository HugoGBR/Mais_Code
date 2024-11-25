'use client';
import RelatorioHome from '@/components/relatorioHome';
import ApexAreaChart from "@/components/GraficoHome";
import CardSalarioHome from "@/components/CardSalarioHome";
import MenssagemBemVindo from '@/components/MenssagemBemVindo';

export default function HomePage() {
    return (
        <div className="flex flex-col items-center w-full lg:w-8/12 p-4 md:p-8">
            <div className="flex flex-col gap-y-6 md:flex-row md:justify-between mb-6 w-full">
                <MenssagemBemVindo />
                <CardSalarioHome />
            </div>

            <div className="flex flex-col gap-6 w-full">
                <div className="flex-grow">
                    <ApexAreaChart />
                </div>
                <div className="hidden lg:block flex-grow md:rounded-xl bg-white border hover:shadow-lg text-center">
                    <RelatorioHome />
                </div>
            </div>
        </div>
    );
}
