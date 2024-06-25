CREATE DATABASE IF NOT EXISTS `mais_code`;

USE `mais_code`;

/*Table structure for table `cargos` */
DROP TABLE IF EXISTS `cargos`;

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
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `cpf_cnpj` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `produtos` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `horas_trabalhadas` decimal(8,2) NOT NULL,
  `comissaoA` int NOT NULL,
  `comissaoB` int NOT NULL,
  `descricao_produto` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `clientes` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(255) NOT NULL,
  `cpf_cnpj` VARCHAR(20) NOT NULL,
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
  PRIMARY KEY (`id`),
   KEY `usuarios_cargo_id_foreign` (`cargo_id`),
   CONSTRAINT `usuarios_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `vendas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint(20) unsigned NOT NULL,
  `tipo_contrato_id` bigint(20) unsigned NOT NULL,
  `produto_id` bigint(20) unsigned NOT NULL,
  `usuario_id` bigint(20) unsigned NOT NULL,
  `inicio_contrato` date NOT NULL,
  `final_contrato` date NOT NULL,
  `valor_entrada` decimal(8,2) NOT NULL,
  `valor_total` decimal(8,2) NOT NULL,
  `nome_contato` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `metodo_pagamento` varchar(45) NOT NULL,
  `numero_parcela` text(55) NOT NULL,
  `status` enum('concluido','em andamento','cancelado') NOT NULL,
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
