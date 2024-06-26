<?php
include "../database.php";
class Vendacontroller
{
    private $conn;

    public function __construct()
    {
        $objDb = new Database;
        $this->conn = $objDb->connect();
    }


    public function getAllProductById(int $id)
    {
        try {
            $sql = "SELECT * FROM produtos WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $user = $db->fetch(PDO::FETCH_ASSOC);
            return $user;

        } catch (\Exception $th) {
            echo "Erro ao buscar o cliente: " . $th->getMessage();
            return null;
        }
    }

    // await createNewSell(datadoinicio, datadofim, NomeContato, Number(TelefoneContato), EmailContato, Number(ValorEntrada))

    public function createNewSell()
{
    try {
        $user = json_decode(file_get_contents("php://input"));
        $sql = "INSERT INTO vendas(cliente_id, tipo_contrato_id, produto_id, usuario_id, inicio_contrato, final_contrato, valor_entrada, valor_total, nome_contato, email, telefone,  metodo_pagamento, numero_parcela, status)
                VALUES (:cliente_id, :tipo_contrato_id, :produto_id, :usuario_id, :inicio_contrato, :final_contrato, :valor_entrada, :valor_total, :nome_contato, :email, :telefone,  :metodo_pagamento, :numero_parcela, :status)";
        
        $db = $this->conn->prepare($sql);
        $db->bindParam(":cliente_id", $user->cliente_id);   
        $db->bindParam(":tipo_contrato_id", $user->tipo_contrato_id);
        $db->bindParam(":produto_id", $user->produto_id);
        $db->bindParam(":usuario_id", $user->usuario_id);
        $db->bindParam(":inicio_contrato", $user->inicio_contrato);
        $db->bindParam(":final_contrato", $user->final_contrato);
        $db->bindParam(":valor_entrada", $user->valor_entrada);
        $db->bindParam(":valor_total", $user->valor_total);
        $db->bindParam(":nome_contato", $user->nome_contato);
        $db->bindParam(":email", $user->email);
        $db->bindParam(":telefone", $user->telefone);
        $db->bindParam(":metodo_pagamento", $user->metodo_pagamento);
        $db->bindParam(":numero_parcela", $user->numero_parcela);
        $db->bindParam(":status", $user->status);

        $db->execute();

        return json_encode(["Mensagem" => "Venda Cadastrada com Sucesso!"]);
    } catch (\Exception $e) {
        error_log('Erro ao criar venda: ' . $e->getMessage());
        return json_encode(['status' => 0, 'message' => 'Erro ao criar venda'.$e->getMessage()]);
    }
}

    // public function CreateNewSell()
    // {
    //     $user = json_decode(file_get_contents("php://input"));
    //     $sql = "INSERT INTO vendas(tipo_contrato_id,parcela_id,inicio_contrato,final_contrato,valor_entrada,valor_total,nome_contato,email,telefone,metodo_pagamento)
    //     VALUES (:tipo_contrato_id,:parcela_id,:inicio_contrato,:final_contrato,:valor_entrada,:valor_total,:nome_contato,:email,:telefone,:metodo_pagamento)";
    //     $db = $this->conn->prepare($sql);
    //     $db->bindParam(":tipo_contrato_id", $user->tipo_contrato_id);
    //     $db->bindParam(":parcela_id", $user->parcela_id);
    //     $db->bindParam(":inicio_contrato", $user->inicio_contrato);
    //     $db->bindParam(":final_contrato", $user->final_contrato);
    //     $db->bindParam(":valor_entrada", $user->valor_entrada);
    //     $db->bindParam(":valor_total", $user->valor_total);
    //     $db->bindParam(":nome_contato", $user->nome_contato);
    //     $db->bindParam(":email", $user->email);
    //     $db->bindParam(":telefone", $user->telefone);
    //     $db->bindParam(":metodo_pagamento", $user->metodo_pagamento);
    //     $db->execute();

    //     if ($db->execute()) {
    //         $resposta = ["Mensagem" => "Venda Cadastrada com Sucesso!"];
    //     }

    //     return $resposta;
    // }
}