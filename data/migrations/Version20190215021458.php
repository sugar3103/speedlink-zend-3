<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190215021458 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql("CREATE TABLE zone_code
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                code                       VARCHAR(20) NOT NULL,
                carrier_id                 INT(11) NOT NULL,
                category                   CHAR(10) NOT NULL  COMMENT 'Inbound, Outbound, Domestic',
                service_id                 INT(11) NOT NULL,
                shipment_type_id           INT(11) NOT NULL,
                origin_country_id          INT(11) NOT NULL,
                origin_city_id             INT(11) NULL COMMENT 'required if category == Domestic',
                origin_district_id         INT(11) NULL,
                origin_ward_id             INT(11) NULL,
                destination_country_id     INT(11) NOT NULL,
                destination_city_id        INT(11) NULL COMMENT 'required if category == Domestic',
                destination_district_id    INT(11) NULL,
                destination_ward_id        INT(11) NULL,
                is_private                 TINYINT(1) NOT NULL,
                customer_id                INT(11) NOT NULL COMMENT 'required if is_private == 1',
                status                     TINYINT(1) NOT NULL DEFAULT 0,
                description                TEXT NULL,
                description_en             TEXT NULL,
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE range_weight
            (
                id                      INT(11) AUTO_INCREMENT PRIMARY KEY,
                code                    VARCHAR(20) NOT NULL,
                carrier_id              INT(11) NOT NULL,
                category                CHAR(10) NOT NULL COMMENT 'Inbound, Outbound, Domestic',
                service_id              INT(11) NOT NULL,
                shipment_type_id        INT(11) NOT NULL,
                calculate_unit          TINYINT(1) NOT NULL DEFAULT 0,
                unit                    DECIMAL(10,2)  DEFAULT 0 COMMENT 'required if calculate_unit == 1',
                round_up                DECIMAL(10,2) NOT NULL,
                is_private              TINYINT(1) NOT NULL,
                customer_id             INT(11) COMMENT 'required if is_private == 1',
                `from`                  DECIMAL(10,2) NOT NULL,
                `to`                    DECIMAL(10,2) NOT NULL COMMENT '0 = Over',
                status                  TINYINT(1) NOT NULL DEFAULT 0,
                description             TEXT NULL,
                description_en          TEXT NULL,
                created_by              INT(11) NOT NULL,
                created_at              TIMESTAMP NOT NULL,
                updated_by              INT(11) NULL,
                updated_at              TIMESTAMP NULL,
                is_deleted              TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE zone_code');
        $this->addSql('DROP TABLE range_weight');
    }
}
