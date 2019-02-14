<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190213092206 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("CREATE TABLE branch_area
            (
                id                 INT(11) AUTO_INCREMENT PRIMARY KEY,
                branch_id          INT(11) NOT NULL,
                hub_id          INT(11) NOT NULL,
                country_id         INT(11) NOT NULL,
                city_id            INT(11) NOT NULL,
                district_id        INT(11) NOT NULL,
                ward_id            INT(11) NOT NULL,
                status             TINYINT(1) NOT NULL DEFAULT 0,
                is_deleted         TINYINT(1) NOT NULL DEFAULT 0,
                updated_at         TIMESTAMP NULL,
                updated_by         INT(11) NULL,
                created_at         TIMESTAMP NOT NULL,
                created_by         INT(11) NOT NULL
            ) COLLATE = utf8_unicode_ci"
        );
      $this->addSql('ALTER TABLE `branch` 
      ADD `address` text NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("DROP TABLE branch_area");
    }
}
