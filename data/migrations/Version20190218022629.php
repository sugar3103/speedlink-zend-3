<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190218022629 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql("CREATE TABLE pricing
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                name                       VARCHAR(50) NOT NULL,
                carrier_id                 INT(11) NOT NULL,
                category_id              CHAR(10) NOT NULL  COMMENT 'Inbound, Outbound, Domestic',
                origin_country_id          INT(11) NOT NULL,
                origin_city_id             INT(11) NULL COMMENT 'required if category == Domestic',
                origin_district_id         INT(11) NULL,
                origin_ward_id             INT(11) NULL,
                effected_date              DATE NULL,
                expired_date               DATE NULL,
                saleman_id                 INT(11) NULL COMMENT 'user_id',
                is_private                 TINYINT(1) NOT NULL,
                customer_id                INT(11) NULL COMMENT 'required if is_private == 1',
                status                     TINYINT(1) NOT NULL DEFAULT 0,
                approval_status            TINYINT(1) COMMENT '0 == new, 1 == approved, 2 == draft',
                approved_by                INT NULL COMMENT 'user_id',
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE pricing_data
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                pricing_id                 INT(11) NOT NULL,
                service_id                 INT(11) NOT NULL,
                shipment_type_id           INT(11) NOT NULL,
                status                     TINYINT(1) NOT NULL DEFAULT 0,
                pricing_data               TEXT NULL,
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE field_vas
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                name                       VARCHAR(50) NOT NULL,
                function_name              VARCHAR(50) NULL,
                description                TEXT NULL,
                description_en             TEXT NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE pricing_vas
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                pricing_data_id            INT(11) NOT NULL,
                name                       VARCHAR(50) NOT NULL,
                formula                    VARCHAR(50) NOT NULL,
                min                        DECIMAL(10, 2) NULL,
                type                       TINYINT(1) NOT NULL COMMENT '0 == formula, 1 == range',
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE pricing_vas_spec
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                pricing_data_id            INT(11) NOT NULL,
                pricing_vas_spec_id        INT(11) NOT NULL,
                `from`                     DECIMAL(10, 2) NOT NULL,
                `to`                       DECIMAL(10, 2) NOT NULL COMMENT '0 == over',
                `value`                    DECIMAL(10, 2) NOT NULL,
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE pricing_cod
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                pricing_data_id            INT(11) NOT NULL,
                `from`                     DECIMAL(10, 2) NOT NULL,
                `to`                       DECIMAL(10, 2) NOT NULL COMMENT '0 == over',
                internal_city              DECIMAL(10, 2) NOT NULL,
                internal_city_ras          DECIMAL(10, 2) NOT NULL,
                external_city              DECIMAL(10, 2) NOT NULL,
                external_city_ras          DECIMAL(10, 2) NOT NULL,
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

        $this->addSql("CREATE TABLE pricing_cod_min
            (
                id                         INT(11) AUTO_INCREMENT PRIMARY KEY,
                pricing_data_id            INT(11) NOT NULL,
                internal_city_min          DECIMAL(10, 2) NOT NULL,
                internal_city_ras_min      DECIMAL(10, 2) NOT NULL,
                external_city_min          DECIMAL(10, 2) NOT NULL,
                external_city_ras_min      DECIMAL(10, 2) NOT NULL,
                created_by                 INT(11) NOT NULL,
                created_at                 TIMESTAMP NOT NULL,
                updated_by                 INT(11) NULL,
                updated_at                 TIMESTAMP NULL,
                is_deleted                 TINYINT(1) NOT NULL DEFAULT 0
            ) COLLATE = utf8_unicode_ci"
        );

    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DROP TABLE pricing');
        $this->addSql('DROP TABLE pricing_data');
        $this->addSql('DROP TABLE field_vas');
        $this->addSql('DROP TABLE pricing_vas');
        $this->addSql('DROP TABLE pricing_vas_spec');
        $this->addSql('DROP TABLE pricing_cod');
        $this->addSql('DROP TABLE pricing_cod_min');
    }
}
