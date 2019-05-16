<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190516082536 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('
            ALTER TABLE shipment_type 
            ADD CONSTRAINT service_shipment_type_service_id_fk FOREIGN KEY (service_id) REFERENCES service (id) on update cascade on delete cascade
        ');

        $this->addSql('
            ALTER TABLE shipment_type 
            ADD CONSTRAINT carrier_shipment_type_carrier_id_fk FOREIGN KEY (carrier_id) REFERENCES carrier (id) on update cascade on delete cascade
        ');

        $this->addSql('
            ALTER TABLE shipment_type 
            ADD CONSTRAINT category_shipment_type_service_id_fk FOREIGN KEY (category_id) REFERENCES service (id) on update cascade on delete cascade
        ');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("ALTER TABLE shipment_type DROP CONSTRAINT service_shipment_type_service_id_fk");
        $this->addSql("ALTER TABLE shipment_type DROP CONSTRAINT carrier_shipment_type_carrier_id_fk");
        $this->addSql("ALTER TABLE shipment_type DROP CONSTRAINT category_shipment_type_service_id_fk");
      
    }
}
