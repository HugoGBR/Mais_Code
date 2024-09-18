
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
