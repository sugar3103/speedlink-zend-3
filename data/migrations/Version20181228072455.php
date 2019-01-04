<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181228072455 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("CREATE TABLE m_service
            (
                id                INT(11) AUTO_INCREMENT PRIMARY KEY,
                service_name_vn   VARCHAR(50) NULL,
                service_name_en   VARCHAR(50) NULL,
                description_vn    TEXT NULL,
                description_en    TEXT NULL,
                service_code      CHAR(50) NULL,
                status            TINYINT(1) NOT NULL DEFAULT 0,
                is_deleted        TINYINT(1) NOT NULL DEFAULT 0,
                updated_at        TIMESTAMP NULL,
                updated_by        INT(11) NULL,
                created_at        TIMESTAMP NOT NULL,
                created_by        INT(11) NOT NULL
            ) COLLATE = utf8_unicode_ci"
        );
        $this->addSql("CREATE TABLE m_shipment_type
            (
                id                      INT(11) AUTO_INCREMENT PRIMARY KEY,
                shipment_type_name_vn   VARCHAR(50) NULL,
                shipment_type_name_en   VARCHAR(50) NULL,
                description_vn          TEXT NULL,
                description_en          TEXT NULL,
                shipment_type_code      CHAR(50) NULL,
                carrier_id              INT(11) NOT NULL,
                category_code           INT(11) NOT NULL  COMMENT 'Inbound, Outbound, Domestic',
                service_id              INT(11) NOT NULL,
                product_type_code       INT(11) NOT NULL  COMMENT 'Dox, Parcel',
                volumetric_number       INT(11) NULL,
                status                  TINYINT(1) NOT NULL DEFAULT 0,
                is_deleted              TINYINT(1) NOT NULL DEFAULT 0,
                updated_at              TIMESTAMP NULL,
                updated_by              INT(11) NULL,
                created_at              TIMESTAMP NOT NULL,
                created_by              INT(11) NOT NULL
            ) COLLATE = utf8_unicode_ci"
        );
        $this->addSql("CREATE TABLE m_carrier
            (
                id                INT(11) AUTO_INCREMENT PRIMARY KEY,
                carrier_name_vn   VARCHAR(50) NULL,
                carrier_name_en   VARCHAR(50) NULL,
                description_vn    TEXT NULL,
                description_en    TEXT NULL,
                carrier_code      CHAR(50) NULL,
                status            TINYINT(1) NOT NULL DEFAULT 0,
                is_deleted        TINYINT(1) NOT NULL DEFAULT 0,
                updated_at        TIMESTAMP NULL,
                updated_by        INT(11) NULL,
                created_at        TIMESTAMP NOT NULL,
                created_by        INT(11) NOT NULL
            ) COLLATE = utf8_unicode_ci"
        );
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("DROP TABLE m_service");
        $this->addSql("DROP TABLE m_shipment_type");
        $this->addSql("DROP TABLE m_carrier");
    }
}
