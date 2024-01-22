CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` varchar(255) UNIQUE,
    `password` varchar(255) NOT NULL,
    `email` varchar(255) UNIQUE,
    `role_id` INT NOT NULL,
    `activated` BOOL NOT NULL DEFAULT TRUE,
    `refresh_token` varchar(255),
    `binding` BIGINT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id) 
);

CREATE TABLE `roles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` varchar(255) UNIQUE,
    `description` varchar(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id) 
);