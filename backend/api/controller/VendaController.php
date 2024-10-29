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
            $sql = "
            SELECT 
                vendas.id AS venda_id, 
                vendas.cliente_id, 
                clientes.nome AS nome_cliente, 
                vendas.tipo_contrato_id, 
                tipo_contrato.nome AS nome_tipo_contrato, 
                vendas.produto_id, 
                produtos.nome AS nome_produto, 
                vendas.usuario_id, 
                usuarios.nome AS nome_usuario, 
                vendas.status_cliente, 
                vendas.horas_trabalhadas, 
                vendas.inicio_contrato, 
                vendas.final_contrato, 
                vendas.valor_entrada, 
                vendas.valor_total, 
                vendas.nome_contato, 
                vendas.email AS email_contato, 
                vendas.telefone AS telefone_contato, 
                vendas.metodo_pagamento, 
                vendas.numero_parcela, 
                vendas.status AS status_venda,
                clientes.cpf_cnpj
            FROM 
                vendas
            JOIN 
                clientes ON vendas.cliente_id = clientes.id
            JOIN 
                tipo_contrato ON vendas.tipo_contrato_id = tipo_contrato.id
            JOIN 
                produtos ON vendas.produto_id = produtos.id
            JOIN 
                usuarios ON vendas.usuario_id = usuarios.id
            WHERE 
                vendas.id = :id;
            ";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $venda = $db->fetch(PDO::FETCH_ASSOC);
            return $venda;
        } catch (\Exception $th) {
            echo "Erro ao buscar a venda: " . $th->getMessage();
            return null;
        }
    }

    public function createNewSell()
    {
        try {
            $user = json_decode(file_get_contents("php://input"));
            $sql = "INSERT INTO vendas(cliente_id, tipo_contrato_id, produto_id, usuario_id, status_cliente, horas_trabalhadas, inicio_contrato, final_contrato, valor_entrada, valor_total, nome_contato, email, telefone,  metodo_pagamento, numero_parcela, status)
                    VALUES (:cliente_id, :tipo_contrato_id, :produto_id, :usuario_id, :status_cliente, :horas_trabalhadas, :inicio_contrato, :final_contrato, :valor_entrada, :valor_total, :nome_contato, :email, :telefone,  :metodo_pagamento, :numero_parcela, :status)";

            $db = $this->conn->prepare($sql);
            $db->bindParam(":cliente_id", $user->cliente_id);
            $db->bindParam(":tipo_contrato_id", $user->tipo_contrato_id);
            $db->bindParam(":produto_id", $user->produto_id);
            $db->bindParam(":usuario_id", $user->usuario_id);
            $db->bindParam(":status_cliente", $user->status_cliente);
            $db->bindParam(":horas_trabalhadas", $user->horas_trabalhadas);
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
            return json_encode(['status' => 0, 'message' => 'Erro ao criar venda: ' . $e->getMessage()]);
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
                    horas_trabalhadas = :horas_trabalhadas,
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
            $db->bindParam(":horas_trabalhadas", $user->horas_trabalhadas);
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

    private function checkContratoExistsById(int $id)
    {
        $query = "SELECT COUNT(*) FROM vendas WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }

    public function createNewlistParcelas()
    {
        try {
            $parcela = json_decode(file_get_contents("php://input"));
            $sql = "INSERT INTO parcelas(id_venda, total_parcela, numero_da_parcela, valor_da_parcela, status)
                    VALUES (:id_venda, :total_parcela, :numero_da_parcela, :valor_da_parcela, :status)";

            $db = $this->conn->prepare($sql);
            $db->bindParam(":id_venda", $parcela->id_venda);
            $db->bindParam(":total_parcela", $parcela->total_parcela);
            $db->bindParam(":numero_da_parcela", $parcela->numero_da_parcela);
            $db->bindParam(":valor_da_parcela", $parcela->valor_da_parcela);
            $db->bindParam(":status", $parcela->status);
            $db->execute();
            return json_encode(["Mensagem" => "Parcela Cadastrada com Sucesso!"]);
        } catch (\Exception $e) {
            error_log('Erro ao criar Parcela: ' . $e->getMessage());
            return json_encode(['status' => 0, 'message' => 'Erro ao criar Parcela: ' . $e->getMessage()]);
        }
    }

    public function countVenda()
    {
        try {
            $sql = "SELECT COUNT(*) FROM vendas;";
            $db = $this->conn->prepare($sql);
            $db->execute();
            $QuantidadeVendas = $db->fetch(PDO::FETCH_ASSOC);
            return $QuantidadeVendas;
        } catch (\Exception $th) {
            echo "Erro ao buscar o cliente: " . $th->getMessage();
            return null;
        }
    }


    public function CancelamentodaVenda(int $id): array
    {
        $cancelamento = "cancelado";
        try {
            $vendaExists = $this->checkContratoExistsById($id);
            if (!$vendaExists) {
                return ['status' => 0, 'message' => 'Venda não encontrada.'];
            }

            $sql = "UPDATE vendas SET status = :cancelado WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindValue(":cancelado", $cancelamento);
            $db->bindValue(":id", $id);

            if ($db->execute()) {
                return ['status' => 1, 'message' => 'Venda cancelada com sucesso.'];
            } else {
                return ['status' => 0, 'message' => 'Falha ao cancelar a venda.'];
            }
        } catch (Exception $e) {

            return ['status' => 0, 'message' => 'Erro ao cancelar a venda: ' . $e->getMessage()];
        }
    }

    public function AtivarVenda(int $id)
    {
        $ativar = "em andamento";
       
        try {
            $vendaExists = $this->checkContratoExistsById($id);
            if (!$vendaExists) {
                return ['status' => 0, 'message' => 'Venda não encontrada.'];
            }

            $sql = "UPDATE vendas SET status = :emandamento WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindValue(":emandamento", $ativar );
            $db->bindValue(":id", $id);

            if ($db->execute()) {
                return ['status' => 1, 'message' => 'Venda ativada com sucesso.'];
            } else {
                $errorInfo = $db->errorInfo();
                return ['status' => 0, 'message' => 'Falha ao ativar a venda.', 'error' => $errorInfo];
            }
        } catch (Exception $e) {

            return ['status' => 0, 'message' => 'Erro ao ativar a venda: ' . $e->getMessage()];
        }
    }

    public function getParcelaByIdv(int $id)
    {
        try {
            $sql = "
            SELECT * FROM parcelas WHERE id_venda = :id;
            ";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id", $id);
            $db->execute();
            $parcela = $db->fetchAll(PDO::FETCH_ASSOC);
            return $parcela;
        } catch (\Exception $th) {
            echo "Erro ao buscar parcelas: " . $th->getMessage();
            return null;
        }
    }
    private function checkParcelaExistsByIdv(int $id)
    {
        $query = "SELECT COUNT(*) FROM parcelas WHERE id_venda = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $count = $stmt->fetchColumn();
        return $count > 0;
    }
    public function updateParcelaByIDv(int $id)
    {
        try {
            // Obtendo os dados do corpo da requisição
            $user = json_decode(file_get_contents('php://input'));
    
            // Verificando se os dados enviados são válidos
            if (!$user) {
                return ['status' => 0, 'message' => 'Dados da parcela inválidos.'];
            }
    
            // Preparando a consulta SQL para atualizar a parcela
            $sql = "UPDATE parcelas SET 
                    valor_da_parcela = :valor_da_parcela,
                    status = :status    
                    WHERE id = :id";
    
            $db = $this->conn->prepare($sql);
    
            // Vinculando os parâmetros
            $db->bindParam(":valor_da_parcela", $user->valor_da_parcela);
            $db->bindParam(":status", $user->status);
            $db->bindParam(":id", $id);
    
            // Executando a consulta
            if ($db->execute()) {
                return ['status' => 1, 'message' => 'Parcela atualizada com sucesso.'];
            } else {
                return ['status' => 0, 'message' => 'Falha ao atualizar a parcela.'];
            }
        } catch (Exception $e) {
            // Retornando o erro em caso de exceção
            return ['status' => 0, 'message' => 'Erro ao atualizar a parcela: ' . $e->getMessage()];
        }
    }
    
}


