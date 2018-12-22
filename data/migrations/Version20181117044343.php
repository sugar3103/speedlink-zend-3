<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181117044343 extends AbstractMigration
{

    // Add `deleted_at` field in role table.
    public function getDescription()
    {
        return 'Add `deleted_at` field in role table';
    }

    // Add `deleted_at` field.
    public function up(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE `role` ADD `deleted_at` timestamp NULL');

    }

    // Remove `deleted_at` field.
    public function down(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE `role` DROP COLUMN `deleted_at`');
    }
}
