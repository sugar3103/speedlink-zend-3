<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190528081458 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("ALTER TABLE `district` ADD `ras` INT(1) NOT NULL DEFAULT '0' AFTER `status`;");
        $this->addSql("ALTER TABLE `ward` ADD `ras` INT(1) NOT NULL DEFAULT '0' AFTER `status`;");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `district` DROP `ras`;');
        $this->addSql('ALTER TABLE `ward` DROP `ras`;');
    }
}
