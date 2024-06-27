'use client'
export default function TipoCliente() {


    return (
        <div className="flex h-full justify-center items-center">
            <div className="w-full bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-8 text-center">Tipo de Cliente</h2>
                <form>
                    <div className="mb-4 flex flex-col gap-5">
                        <input
                            type="text"
                            id="tipoCliente"
                            name="tipoCliente"
                            // value={nomeContrato}
                            // onChange={(event) => setNomeContrato(event.target.value)}
                            placeholder="Tipo de Cliente"
                            required
                            className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="nummber"
                            id="porcetagem"
                            name="porcetagem"
                            // value={nomeContrato}
                            // onChange={(event) => setNomeContrato(event.target.value)}
                            placeholder="Porcetagem 99%"
                            required
                            className="border-b-2 focus:border-b-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded w-full">
                            CADASTRAR
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}