<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190129025542 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `branch` 
        ADD `name` VARCHAR(20) NOT NULL,
        ADD `name_en` VARCHAR(20) NOT NULL,
        ADD `country_id` INT NOT NULL,
        ADD `city_id` INT NOT NULL,
        ADD `district_id` INT NOT NULL,
        ADD `ward_id` INT NOT NULL,
        ADD `description` text NULL,
        ADD `description_en` text NULL');

      $this->addSql('ALTER TABLE `hub` 
        ADD `country_id` INT NOT NULL,
        ADD `name` VARCHAR(20) NOT NULL,
        ADD `description` text NULL,
        ADD `name_en` VARCHAR(20) NOT NULL,
        ADD `description_en` text NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
