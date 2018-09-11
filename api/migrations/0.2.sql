-- 2018-07-30: Emiliano Viada
CREATE TABLE IF NOT EXISTS `interested` (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    operation VARCHAR(100) NOT NULL,
    info VARCHAR(510) DEFAULT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY(id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = INNODB;

-- 2018-08-13: Emiliano Viada
CREATE TABLE IF NOT EXISTS `user_profile` (
    user_id INT NOT NULL,
    address VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    web VARCHAR(255) DEFAULT NULL,
    facebook VARCHAR(255) DEFAULT NULL,
    instagram VARCHAR(255) DEFAULT NULL,
    twitter VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE = INNODB;
