/* Replace with your SQL commands */

CREATE TABLE `userCheckIn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `moodScore` int DEFAULT NULL,
  `feeling` varchar(50) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `checkInTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);