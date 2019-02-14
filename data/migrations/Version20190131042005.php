<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190131042005 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('create table setting
            (
                `id`          int(11) auto_increment primary key,
                `code`        varchar(128) not null,
                `key`         varchar(128) not null,
                `value`       text NOT NULL,
                `serialized`  tinyint(1) NOT NULL                
            ) collate = utf8_unicode_ci');

    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE setting');
    }
}
