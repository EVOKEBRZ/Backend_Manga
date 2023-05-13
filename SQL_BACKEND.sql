CREATE DATABASE IF NOT EXISTS `manga-breno`;

USE `manga-breno`;

CREATE TABLE mangas (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  genre VARCHAR(255),
  cover_img VARCHAR(255)
);

CREATE TABLE chapters (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  chapter_number INT,
  id_manga INT,
  FOREIGN KEY (id_manga) REFERENCES mangas(id)
);

CREATE TABLE pages (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  page_number INT,
  img VARCHAR(255),
  chapter_id INT ,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);