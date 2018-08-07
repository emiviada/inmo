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
