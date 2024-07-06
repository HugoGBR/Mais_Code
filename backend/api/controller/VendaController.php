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
    public function getVendaById(int $id)
    {
        try {
            $sql = "SELECT * FROM vendas WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $user = $db->fetch(PDO::FETCH_ASSOC);
            return $user;

        } catch (\Exception $th) {
            echo "Erro ao buscar a venda: " . $th->getMessage();
            return null;
        }
    }

    // await createNewSell(datadoinicio, datadofim, NomeContato, Number(TelefoneContato), EmailContato, Number(ValorEntrada))

    public function createNewSell()
{
    try {
        $user = json_decode(file_get_contents("php://input"));
        $sql = "INSERT INTO vendas(cliente_id, tipo_contrato_id, produto_id, usuario_id, status_cliente, inicio_contrato, final_contrato, valor_entrada, valor_total, nome_contato, email, telefone,  metodo_pagamento, numero_parcela, status)
                VALUES (:cliente_id, :tipo_contrato_id, :produto_id, :usuario_id, :status_cliente, :inicio_contrato, :final_contrato, :valor_entrada, :valor_total, :nome_contato, :email, :telefone,  :metodo_pagamento, :numero_parcela, :status)";
        
        $db = $this->conn->prepare($sql);
        $db->bindParam(":cliente_id", $user->cliente_id);   
        $db->bindParam(":tipo_contrato_id", $user->tipo_contrato_id);
        $db->bindParam(":produto_id", $user->produto_id);
        $db->bindParam(":usuario_id", $user->usuario_id);
        $db->bindParam(":status_cliente", $user->status_cliente);
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


public function updateContratoByID(int $id)
{
    try {
        $userExists = $this->checkContratoExistsById($id);
        if (!$userExists) {
            return ['status' => 0, 'message' => 'Contrato não encontrado.'];
        }

        $user = json_decode(file_get_contents('php://input'));
        if (!$user) {
            return ['status' => 0, 'message' => 'Dados do Contrato inválidos.'];
        }

        $sql = "UPDATE vendas SET 
                    cliente_id = :cliente_id,
                    tipo_contrato_id = :tipo_contrato_id,
                    produto_id = :produto_id,
                    usuario_id = :usuario_id,
                    status_cliente = :status_cliente,
                    inicio_contrato = :inicio_contrato,
                    final_contrato = :final_contrato,
                    valor_entrada = :valor_entrada,
                    valor_total = :valor_total,
                    nome_contato = :nome_contato,
                    email = :email,
                    telefone = :telefone,
                    metodo_pagamento = :metodo_pagamento,
                    numero_parcela = :numero_parcela,
                    status = :status
                WHERE id = :id";

        $db = $this->conn->prepare($sql);
        $db->bindParam(":cliente_id", $user->cliente_id);   
        $db->bindParam(":tipo_contrato_id", $user->tipo_contrato_id);
        $db->bindParam(":produto_id", $user->produto_id);
        $db->bindParam(":usuario_id", $user->usuario_id);
        $db->bindParam(":status_cliente", $user->status_cliente);
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
        $db->bindParam(":id", $id);

        if ($db->execute()) {
            return ['status' => 1, 'message' => 'Registro atualizado com sucesso.'];
        } else {
            return ['status' => 0, 'message' => 'Falha ao atualizar o registro.'];
        }
    } catch (Exception $e) {
        return ['status' => 0, 'message' => 'Erro ao atualizar Contrato: ' . $e->getMessage()];
    }
}
    private function checkContratoExistsById(int $id){
        $query = "SELECT COUNT(*) FROM vendas WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
}