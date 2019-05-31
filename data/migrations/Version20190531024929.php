<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190531024929 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("ALTER TABLE domestic_pricing DROP INDEX unique_name");
        
        $this->addSql("ALTER TABLE domestic_pricing_vas DROP INDEX unique_name");
        $this->addSql("ALTER TABLE domestic_pricing_vas DROP INDEX unique_name_en");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
