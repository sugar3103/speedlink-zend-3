<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190518034225 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
         // this down() migration is auto-generated, please modify it to your needs
         $this->addSql("ALTER TABLE domestic_pricing DROP foreign key customer_domestic_pricing_customer_id_fk");

         $this->addSql("ALTER TABLE domestic_pricing ADD CONSTRAINT customer_domestic_pricing_customer_id_fk FOREIGN KEY (customer_id) REFERENCES customer (id) on update cascade on delete cascade");
         $this->addSql("ALTER TABLE domestic_pricing MODIFY COLUMN customer_id INT(11) DEFAULT 0 NULL");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
