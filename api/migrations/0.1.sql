-- 2018-01-08: Emiliano Viada
CREATE TABLE IF NOT EXISTS `inmuebles` (
    id INT AUTO_INCREMENT, type VARCHAR(100) NOT NULL,
    operation VARCHAR(100) NOT NULL, user_id INT NOT NULL,
    street TEXT, neighborhood VARCHAR(255) DEFAULT NULL,
    city VARCHAR(255), state VARCHAR(100), area_front FLOAT NOT NULL DEFAULT 0,
    area_back FLOAT NOT NULL DEFAULT 0, area_built FLOAT NOT NULL DEFAULT 0,
    water TINYINT(1) NOT NULL DEFAULT 0, electricity TINYINT(1) NOT NULL DEFAULT 0,
    gas TINYINT(1) NOT NULL DEFAULT 0, streetlight TINYINT(1) NOT NULL DEFAULT 0,
    cord TINYINT(1) NOT NULL DEFAULT 0, pavement TINYINT(1) NOT NULL DEFAULT 0,
    kitchen TINYINT(1) NOT NULL DEFAULT 0, water_heater TINYINT(1) NOT NULL DEFAULT 0,
    inmersion_heater TINYINT(1) NOT NULL DEFAULT 0, air_conditioner TINYINT(1) NOT NULL DEFAULT 0,
    heater TINYINT(1) NOT NULL DEFAULT 0, fan TINYINT(1) NOT NULL DEFAULT 0,
    central_heater TINYINT(1) NOT NULL DEFAULT 0, alarm TINYINT(1) NOT NULL DEFAULT 0,
    kitchen_furniture TINYINT(1) NOT NULL DEFAULT 0, placard TINYINT(1) NOT NULL DEFAULT 0,
    campana TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME, updated_at DATETIME,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = INNODB;

-- 2018-02-28: Emiliano Viada
CREATE TABLE IF NOT EXISTS `inmuebles_photos` (
    inmueble_id INT, type VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL, obs VARCHAR(255) NULL DEFAULT NULL,
    INDEX inm_ind (inmueble_id),
    FOREIGN KEY (inmueble_id) REFERENCES inmuebles(id) ON DELETE CASCADE
) ENGINE = INNODB;

-- 2018-03-19: Emiliano VIada
CREATE TABLE IF NOT EXISTS `users` (
    id INT AUTO_INCREMENT, first_name VARCHAR(255) DEFAULT NULL,
    last_name VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL,
    created_at DATETIME, updated_at DATETIME,
    PRIMARY KEY(id)
) ENGINE = INNODB;

-- 2018-04-24: Emiliano Viada
CREATE TABLE IF NOT EXISTS `user_token` (
    `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
    `user_id` int(11) NOT NULL,
    `expiration_date` datetime NOT NULL,
    `updated_at` datetime NOT NULL,
    `created_at` datetime NOT NULL,
    INDEX user_ind (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE = INNODB;
