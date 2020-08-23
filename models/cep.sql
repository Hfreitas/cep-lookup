-- Criando Banco de dados de cache

CREATE DATABASE IF NOT EXISTS cep_lookup;
use cep_lookup;
CREATE TABLE ceps (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `cep` CHAR(8) NOT NULL,
  `uf` CHAR(2) NOT NULL,
  `cidade` VARCHAR(50) NOT NULL,
  `bairro` VARCHAR(50),
  `logradouro` VARCHAR(200),
  UNIQUE INDEX `cep_index` (cep)
) ENGINE = INNODB;
