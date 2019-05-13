<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190510045949 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('create table domestic_area
        (
            id                              int(11) auto_increment                primary key,
            name                           varchar(100)                         not null,
            name_en                           varchar(100)                         not null,
            created_by                 INT(11) NOT NULL,
            created_at                 TIMESTAMP NOT NULL,
            updated_by                 INT(11) NULL,
            updated_at                 TIMESTAMP NULL,
            is_deleted                 TINYINT(1) NOT NULL DEFAULT 0         
        )
          collate = utf8_unicode_ci');

          // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('create table domestic_area_city
        (
            id                              int(11) auto_increment                primary key,
            domestic_area_id                int(11) not null,
            city_id                         int(11) not null,
            created_by                 INT(11) NOT NULL,
            created_at                 TIMESTAMP NOT NULL,
            updated_by                 INT(11) NULL,
            updated_at                 TIMESTAMP NULL,
            is_deleted                 TINYINT(1) NOT NULL DEFAULT 0         
        )
          collate = utf8_unicode_ci');

          $this->addSql('create table domestic_zone
          (
              id                              int(11) auto_increment                primary key,
              name                    VARCHAR(100) NOT NULL,
              name_en                 VARCHAR(100) NOT NULL,
              created_by                 INT(11) NOT NULL,
              created_at                 TIMESTAMP NOT NULL,
              updated_by                 INT(11) NULL,
              updated_at                 TIMESTAMP NULL,
              is_deleted                 TINYINT(1) NOT NULL DEFAULT 0         
          )
            collate = utf8_unicode_ci');

            $this->addSql("CREATE TABLE domestic_range_weight
            (
                id                      INT(11) AUTO_INCREMENT PRIMARY KEY,
                name                    VARCHAR(100) NOT NULL,
                name_en                 VARCHAR(100) NOT NULL,
                carrier_id              INT(11) NOT NULL,
                category_id             INT(11) NOT NULL,
                service_id              INT(11) NOT NULL,
                zone_id                 INT(11) NOT NULL,
                shipment_type_id        INT(11) NOT NULL,
                calculate_unit          TINYINT(1) NOT NULL DEFAULT 0,
                unit                    DECIMAL(10,2)  DEFAULT 0 COMMENT 'required if calculate_unit == 1',
                is_ras                  INT(1) default 0 not null,
                round_up                DECIMAL(10,2) NOT NULL,
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
        $this->addSql('DROP TABLE domestic_area');
        $this->addSql('DROP TABLE domestic_area_city');
        $this->addSql('DROP TABLE domestic_range_weight');
    }
}
