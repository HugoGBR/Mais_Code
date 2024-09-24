CREATE DATABASE IF NOT EXISTS `mais_code`;

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

CREATE TABLE `parcelas` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero_parcela` INT(11) NOT NULL,
  `valor_parcela` DECIMAL(10,2) NOT NULL,
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
  `status_usuario` boolean default(1),
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
`status` ENUM('pago','a pagar','cancelado') NOT NULL,
PRIMARY KEY (`id`)
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

DELIMITER $$

CREATE TRIGGER after_venda_insert
AFTER INSERT ON vendas
FOR EACH ROW
BEGIN
  -- Verifica se o método de pagamento é "À vista"
  IF NEW.metodo_pagamento = 'À vista' THEN
    -- Insere uma nova linha na tabela `parcelas`
    INSERT INTO parcelas (id_venda, total_parcela, numero_da_parcela, valor_da_parcela, status)
    VALUES (NEW.id, 1, 1, NEW.valor_total, 'pago');
  END IF;
END $$

DELIMITER ;
drop * trigger
DELIMITER $$

CREATE TRIGGER COMISSÃO
AFTER INSERT ON vendas
FOR EACH ROW
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE total_parcelas INT;
  DECLARE valor_parcela DECIMAL(8,2);
  DECLARE data_pagamento DATE;
  DECLARE user_id BIGINT(20);
  DECLARE status_cliente INT;
  
  -- Recupera o total de parcelas e o valor da parcela da tabela parcelas
  SELECT total_parcela, valor_da_parcela INTO total_parcelas, valor_parcela FROM parcelas WHERE id_venda = NEW.id LIMIT 1;
  
  -- Recupera a data de início do contrato, o id do usuário e o status_cliente
  SET data_pagamento = NEW.inicio_contrato;
  SET user_id = NEW.usuario_id;
  SET status_cliente = NEW.status_cliente;
  
  -- Loop para inserir todas as comissões de acordo com o número de parcelas
  WHILE i <= total_parcelas DO
    -- Insere as informações na tabela bancocomissao
    INSERT INTO bancocomissao (id_venda, user_id, comissao_total, data_pagamento, numero_da_parcela, status)
    VALUES (
      NEW.id, 
      user_id, 
      (valor_parcela * (status_cliente / 100)),  -- Calcula a comissão com base no status_cliente
      DATE_ADD(data_pagamento, INTERVAL (i - 1) MONTH),  -- Adiciona i-1 meses à data de início do contrato
      i, 
      (SELECT status FROM parcelas WHERE id_venda = NEW.id AND numero_da_parcela = i)  -- Recupera o status de cada parcela
    );
    
    -- Incrementa o contador
    SET i = i + 1;
  END WHILE;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_venda_status_update
AFTER UPDATE ON vendas
FOR EACH ROW
BEGIN
  IF NEW.status = 'cancelado' THEN
    -- Atualiza as parcelas associadas à venda, exceto aquelas com status 'pago'
    UPDATE parcelas 
    SET status = 'cancelado'
    WHERE id_venda = NEW.id AND status != 'pago';

    -- Atualiza as comissões associadas à venda, exceto aquelas com status 'pago'
    UPDATE bancocomissao 
    SET status = 'cancelado'
    WHERE id_venda = NEW.id AND status != 'pago';
  END IF;
END $$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_parcela_status_update
AFTER UPDATE ON parcelas
FOR EACH ROW
BEGIN
  IF NEW.status = 'pago' THEN
    -- Atualiza o status da comissão correspondente à parcela
    UPDATE bancocomissao 
    SET status = 'pago'
    WHERE id_venda = NEW.id_venda 
    AND numero_da_parcela = NEW.numero_da_parcela;
  END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER after_venda_insert_with_entrada
AFTER INSERT ON vendas
FOR EACH ROW
BEGIN
  -- Verifica se a venda possui valor de entrada diferente de zero
  IF NEW.valor_entrada > 0 THEN
    -- Insere a parcela correspondente ao valor de entrada
    INSERT INTO parcelas (id_venda, total_parcela, numero_da_parcela, valor_da_parcela, status)
    VALUES (
      NEW.id,        -- id_venda
      1,             -- total_parcela igual a 1
      1,             -- numero_da_parcela igual a 1
      NEW.valor_entrada, -- valor_da_parcela igual ao valor_entrada
      1              -- status igual a 1
    );

    -- Insere a comissão correspondente ao valor de entrada
    INSERT INTO bancocomissao (id_venda, user_id, comissao_total, data_pagamento, numero_da_parcela, status)
    VALUES (
      NEW.id,        -- id_venda
      NEW.usuario_id, -- user_id igual ao usuario_id da venda
      (NEW.valor_entrada * (NEW.status_cliente / 100)), -- comissao_total calculada com base no valor_entrada e status_cliente
      NEW.inicio_contrato, -- data_pagamento igual ao inicio_contrato
      0,             -- numero_da_parcela igual a 0
      1              -- status igual a 1
    );
  END IF;
END $$

DELIMITER ;


