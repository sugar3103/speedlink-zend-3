<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190515100511 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE domestic_range_weight ADD CONSTRAINT carrier_range_weight_carrier_id_fk FOREIGN KEY (carrier_id) REFERENCES carrier (id) on update cascade on delete cascade');
        
        $this->addSql('ALTER TABLE domestic_range_weight ADD CONSTRAINT category_range_weight_category_id_fk FOREIGN KEY (category_id) REFERENCES category (id) on update cascade on delete cascade');
        $this->addSql('
            ALTER TABLE domestic_range_weight 
            ADD CONSTRAINT service_range_weight_service_id_fk FOREIGN KEY (service_id) REFERENCES service (id) on update cascade on delete cascade
        ');
        $this->addSql('
            ALTER TABLE domestic_range_weight 
            ADD CONSTRAINT zone_range_weight_zone_id_fk FOREIGN KEY (zone_id) REFERENCES domestic_zone (id) on update cascade on delete cascade
        ');
        $this->addSql('
            ALTER TABLE domestic_range_weight 
            ADD CONSTRAINT shipment_type_range_weight_shipment_type_id_fk FOREIGN KEY (shipment_type_id) REFERENCES shipment_type (id) on update cascade on delete cascade
        ');
        
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("ALTER TABLE domestic_range_weight DROP CONSTRAINT carrier_range_weight_carrier_id_fk");
        $this->addSql("ALTER TABLE domestic_range_weight DROP CONSTRAINT category_range_weight_category_id_fk");
        $this->addSql("ALTER TABLE domestic_range_weight DROP CONSTRAINT service_range_weight_service_id_fk");
        $this->addSql("ALTER TABLE domestic_range_weight DROP CONSTRAINT zone_range_weight_zone_id_fk");
        $this->addSql("ALTER TABLE domestic_range_weight DROP CONSTRAINT shipment_type_range_weight_shipment_type_id_fk");
    }
}
