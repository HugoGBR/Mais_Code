
CREATE DATABASE `mais_code`;

USE `mais_code`;

CREATE TABLE `cargos` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO cargos(nome) VALUES
("administrador"),
("vendedor"),
("financeiro");



CREATE TABLE `clientes` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(255) NOT NULL,
  `cpf_cnpj` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `produtos` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `horas_trabalhadas` DECIMAL(8,2) NOT NULL,
  `descricao_produto` VARCHAR(255) NOT NULL,
  `comissao_antiga` INT NOT NULL,
  `comissao_nova` INT not null,
  PRIMARY KEY (`id`)
);

CREATE TABLE `tipo_contrato` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);



CREATE TABLE `usuarios` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cargo_id` BIGINT(20) UNSIGNED NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
   KEY `usuarios_cargo_id_foreign` (`cargo_id`),
   CONSTRAINT `usuarios_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE `vendas` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente_id` BIGINT(20) UNSIGNED NOT NULL,
  `tipo_contrato_id` BIGINT(20) UNSIGNED NOT NULL,
  `produto_id` BIGINT(20) UNSIGNED NOT NULL,
  `usuario_id` BIGINT(20) UNSIGNED NOT NULL,
  `status_cliente` INT NOT NULL,
  `horas_trabalhadas` INT NOT null,
  `inicio_contrato` DATE NOT NULL,
  `final_contrato` DATE NOT NULL,
  `valor_entrada` DECIMAL(8,2),
  `valor_total` DECIMAL(8,2) NOT NULL,
  `nome_contato` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(255) NOT NULL,
  `metodo_pagamento` VARCHAR(45) NOT NULL,
  `numero_parcela` DECIMAL(10, 2),
  `status` ENUM('concluido','em andamento','cancelado') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendas_cliente_id_foreign` (`cliente_id`),
  KEY `vendas_tipo_contrato_id_foreign` (`tipo_contrato_id`),
  KEY `vendas_produto_id_foreign` (`produto_id`),
  KEY `vendas_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `vendas_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vendas_produto_id_foreign` FOREIGN KEY (`produto_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vendas_tipo_contrato_id_foreign` FOREIGN KEY (`tipo_contrato_id`) REFERENCES `tipo_contrato` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vendas_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `parcelas`(
`id`BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
`id_venda` BIGINT(20) UNSIGNED NOT NULL,
`total_parcela` INT NOT NULL,
`numero_da_parcela` INT NOT NULL,
`valor_da_parcela` DECIMAL(8,2) NOT NULL,
PRIMARY KEY (`id`),
KEY `parcelas_venda_id_foreign` (`id_venda`),
CONSTRAINT `parcelas_venda_id_foreign` FOREIGN KEY (`id_venda`) REFERENCES `vendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `bancocomissao`(
 `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
 `id_venda` BIGINT(20) UNSIGNED NOT NULL,
 `user_id` BIGINT(20) UNSIGNED NOT NULL,
 `comissao_total`DECIMAL(8,2) NOT NULL,
 `data_pagamento` DATE NOT NULL,
 `numero_da_parcela` DECIMAL(10, 2) NOT NULL,
 `status` ENUM('pago','a pagar','cancelado') NOT NULL,
 PRIMARY KEY (`id`),
  KEY `bancocomissao_venda_id_foreign` (`id_venda`),
  KEY `bancocomissao_user_id_foreign` (`user_id`),
  CONSTRAINT `bancocomissao_venda_id_foreign` FOREIGN KEY (`id_venda`) REFERENCES `vendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bancocomissao_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


DELIMITER //

CREATE TRIGGER after_vendas_insert
AFTER INSERT ON vendas
FOR EACH ROW
BEGIN
  DECLARE comissao_total DECIMAL(8,2);
  DECLARE parcela_comissao DECIMAL(8,2);
  DECLARE i INT DEFAULT 1;
  DECLARE data_pagamento DATE;

  -- Calcular a comissão total
  SET comissao_total = NEW.valor_total * (NEW.status_cliente / 100);
  
  -- Calcular a comissão por parcela
  SET parcela_comissao = comissao_total / NEW.numero_parcela;
  
  -- Definir a data de pagamento inicial
  SET data_pagamento = NEW.inicio_contrato;

  -- Loop para inserir as parcelas de comissão na tabela bancocomissao
  WHILE i <= NEW.numero_parcela DO
    -- Inserir na tabela bancocomissao
    INSERT INTO bancocomissao (id_venda, user_id, comissao_total, data_pagamento, numero_da_parcela, status)
    VALUES (NEW.id, NEW.usuario_id, parcela_comissao, data_pagamento, i, 'a pagar');
    
    -- Incrementar o mês da data de pagamento para a próxima parcela
    SET data_pagamento = DATE_ADD(data_pagamento, INTERVAL 1 MONTH);
    
    -- Incrementar o contador de parcelas
    SET i = i + 1;
  END WHILE;
END;

//

DELIMITER ;
-- Trigger para atualizar o status da comissão para "pago" quando a data de pagamento passou
DELIMITER //

CREATE TRIGGER update_comissao_status_before_insert
BEFORE INSERT ON bancocomissao
FOR EACH ROW
BEGIN
  IF NEW.data_pagamento < CURDATE() THEN
    SET NEW.status = 'pago';
  END IF;
END //

CREATE TRIGGER update_comissao_status_before_update
BEFORE UPDATE ON bancocomissao
FOR EACH ROW
BEGIN
  IF NEW.data_pagamento < CURDATE() AND NEW.status != 'pago' THEN
    SET NEW.status = 'pago';
  END IF;
END //

DELIMITER ;

-- Trigger para atualizar o status da comissão para "cancelado" quando o status da venda é "cancelado"
DELIMITER //

CREATE TRIGGER update_comissao_status_on_venda_update
AFTER UPDATE ON vendas
FOR EACH ROW
BEGIN
  IF NEW.status = 'cancelado' THEN
    UPDATE bancocomissao 
    SET status = 'cancelado' 
    WHERE id_venda = NEW.id AND status != 'pago';
  END IF;
END //

DELIMITER ;

use mais_code;
select * from vendas;
	 SELECT 
			vendas.id AS numero_contrato,
			vendas.inicio_contrato AS data_inicio, 
			vendas.final_contrato AS data_fim, 
			clientes.nome AS nome_cliente, 
			usuarios.nome AS nome_vendedor, 
			vendas.valor_total, vendas.status as st
			
			FROM vendas
			
			JOIN clientes ON vendas.cliente_id = clientes.id
			
			JOIN usuarios ON vendas.usuario_id = usuarios.id
			
			WHERE vendas.status IN ('concluido', 'em andamento')
            AND YEAR(vendas.inicio_contrato) = 2024
			AND MONTH(vendas.inicio_contrato) = 08 
			
			ORDER BY vendas.inicio_contrato DESC;



