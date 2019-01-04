<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181227030329 extends AbstractMigration
{
    //Init table
    public function getDescription()
    {
        return 'Init create table status';
    }

    //Init schema
    public function up(Schema $schema) : void
    {
        $this->addSql('CREATE TABLE IF NOT EXISTS status (
            status_id       INT(11)         AUTO_INCREMENT  PRIMARY KEY,
            name            VARCHAR(50)                     NOT NULL,
            description     TEXT                            NULL,
            status          INT(1)                          NOT NULL,
            is_deleted                      TINYINT(1) NOT NULL DEFAULT 0,
            created_by      INT(11)                         NOT NULL,
            created_at      DATETIME                        NOT NULL,
            updated_by      INT(11)                         NULL,
            updated_at      DATETIME                        NULL
        ) collate = utf8_unicode_ci');
    }

    //Drop schema
    public function down(Schema $schema) : void
    {
        $this->addSql('DROP TABLE IF EXISTS status');
    }
}
