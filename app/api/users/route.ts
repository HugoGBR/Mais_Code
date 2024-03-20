import banco from "@/lib/database";
import {NextResponse} from "next/server";

export async function GET() {
    try {
        const results = await new Promise((resolve, reject) => {
            banco.query("SELECT * FROM USERS", (error: any, results: any, fields: any) => {
                if (error) {
                    reject("Erro ao obter usuários do banco de dados: " + error);
                } else {
                    resolve(results);
                }
            });
        });
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({mensagem: "Erro interno do servidor: " + error});
    }
}

export async function POST(request: Request) {
    try {
        const {nome} = await request.json();
        await banco.query("INSERT INTO USERS SET ?", {nome});
        return NextResponse.json({mensagem: "Criado com sucesso!"});
    } catch (error) {
        return NextResponse.json({mensagem: "Erro ao criar usuário: " + error});
    }
}

export async function PUT(request: Request) {
    try {
        const {id, nome} = await request.json();
        await banco.query("UPDATE USERS SET nome = ? WHERE id = ?", [nome, id]);
        return NextResponse.json({mensagem: "Usuario atualizado com sucesso!"});
    } catch (error) {
        return NextResponse.json({mensagem: "Erro ao atualizar usuário: " + error});
    }
}

export async function DELETE(request: Request) {
    try {
        const {id} = await request.json();
        await banco.query("DELETE FROM USERS WHERE id = ?", [id]);
        return NextResponse.json({mensagem: "Usuario excluido com sucesso!"});
    } catch (error) {
        return NextResponse.json({mensagem: "Erro ao excluir usuário: " + error})
    }
}