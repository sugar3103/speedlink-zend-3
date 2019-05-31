<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190515034137 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        foreach ($this->defineTable() as $key => $value) {
            $this->addSql('CREATE TABLE '. $key. ' ' . $value);
        }
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }

    private function defineTable() {
        $tables = [];
        $tables['category'] = '(
            id                  INT(11) AUTO_INCREMENT PRIMARY KEY,
            name                VARCHAR(100) NOT NULL,
            name_en             VARCHAR(100) NOT NULL,
            description         VARCHAR(255) NULL,
            description_en         VARCHAR(255) NULL,
            status              INT(1) DEFAULT 1 NOT NULL,
            is_deleted          INT(1) DEFAULT 0 NOT NULL,
            created_by          INT(11) NOT NULL,    
            created_at          TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,
            updated_by          INT(11) NOT NULL,    
            updated_at          TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,

            constraint created_category_created_by_fk foreign key (created_by) references user (id) on update cascade on delete cascade,
            constraint updated_category_updated_by_fk foreign key (updated_by) references user (id) on update cascade on delete cascade
        ) collate = utf8_unicode_ci;';

        $tables['domestic_pricing'] =  '(
            id                  INT(11) AUTO_INCREMENT PRIMARY KEY,
            name                VARCHAR(100) NOT NULL, 
            name_en             VARCHAR(100) NOT NULL,
            carrier_id          INT(11) NOT NULL,
            category_id         INT(11) NOT NULL,
            service_id          INT(11) NOT NULL,
            effected_date       DATETIME NOT NULL,
            expired_date        DATETIME NOT NULL,
            saleman_id          INT(11) NOT NULL,
            is_private          INT(1) DEFAULT 0 NOT NULL,
            customer_id         INT(11) NOT NULL,
            status              INT(1) DEFAULT 1 NOT NULL,
            is_deleted          INT(1) DEFAULT 0 NOT NULL,
            approval_status     INT(1) DEFAULT 0 NOT NULL,
            approval_by         INT(11) NOT NULL,
            created_by          INT(11) NOT NULL,    
            created_at          TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,
            updated_by          INT(11) NOT NULL,    
            updated_at          TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,

            
            constraint carrier_domestic_pricing_carrier_id_fk foreign key (carrier_id) references carrier (id) on update cascade on delete cascade,
            constraint category_domestic_pricing_category_id_fk foreign key (category_id) references category (id) on update cascade on delete cascade,
            constraint service_domestic_pricing_service_id_fk foreign key (service_id) references service (id) on update cascade on delete cascade,
            constraint saleman_domestic_pricing_saleman_id_fk foreign key (saleman_id) references user (id) on update cascade on delete cascade,
            constraint customer_domestic_pricing_customer_id_fk foreign key (customer_id) references user (id) on update cascade on delete cascade,
            constraint approval_domestic_pricing_customer_id_fk foreign key (approval_by) references user (id) on update cascade on delete cascade,
            constraint created_domestic_pricing_created_by_fk foreign key (created_by) references user (id) on update cascade on delete cascade,
            constraint updated_domestic_pricing_updated_by_fk foreign key (updated_by) references user (id) on update cascade on delete cascade
        ) collate = utf8_unicode_ci;';

        $tables['domestic_pricing_data'] = '(
            id                          INT(11) AUTO_INCREMENT PRIMARY KEY,
            domestic_pricing_id         INT(11) NOT NULL,
            domestic_range_weight_id    INT(11) NOT NULL,
            value                       DECIMAL(2) NOT NULL,
            is_deleted                  INT(1) DEFAULT 0 NOT NULL,
            created_by                  INT(11) NOT NULL,    
            created_at                  TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,
            updated_by                  INT(11) NOT NULL,    
            updated_at                  TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,

            constraint domestic_pricing_domestic_pricing_data_pricing_id_fk foreign key (domestic_pricing_id) references domestic_pricing (id) on update cascade on delete cascade,
            constraint domestic_range_weight_domestic_pricing_data_range_weight_id_fk foreign key (domestic_range_weight_id) references domestic_range_weight (id) on update cascade on delete cascade,
            constraint created_domestic_pricing_data_created_by_fk foreign key (created_by) references user (id) on update cascade on delete cascade,
            constraint updated_domestic_pricing_data_updated_by_fk foreign key (updated_by) references user (id) on update cascade on delete cascade
        ) collate = utf8_unicode_ci;';

        $tables['domestic_pricing_vas'] = '(
            id                          INT(11) AUTO_INCREMENT PRIMARY KEY,
            name                           VARCHAR(100) NOT NULL,
            name_en                     VARCHAR(100) NOT NULL,
            domestic_pricing_id         INT(11) NOT NULL,
            formula                     VARCHAR(50) NOT NULL,
            min                         DECIMAL(2) NOT NULL,
            `type`                      INT(1) DEFAULT 0 NOT NULL,
            is_deleted                  INT(1) DEFAULT 0 NOT NULL,
            created_by                  INT(11) NOT NULL,    
            created_at                  TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,
            updated_by                  INT(11) NOT NULL,    
            updated_at                  TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,

            constraint unique_name unique (name),
            constraint unique_name_en unique (name_en),

            constraint domestic_pricing_domestic_pricing_vas_pricing_id_fk foreign key (domestic_pricing_id) references domestic_pricing (id) on update cascade on delete cascade,
            constraint created_domestic_pricing_vas_created_by_fk foreign key (created_by) references user (id) on update cascade on delete cascade,
            constraint updated_domestic_pricing_vas_updated_by_fk foreign key (updated_by) references user (id) on update cascade on delete cascade
        ) collate = utf8_unicode_ci;';
        
        $tables['domestic_pricing_vas_spec'] = '(
            id                          INT(11) AUTO_INCREMENT PRIMARY KEY,
            domestic_pricing_id         INT(11) NOT NULL,
            domestic_pricing_vas_id     INT(11) NOT NULL,
            `from`                        DECIMAL(2) NOT NULL,
            `to`                          DECIMAL(2) NOT NULL,
            value                       DECIMAL(2) NOT NULL,
            is_deleted                  INT(1) DEFAULT 0 NOT NULL,
            created_by                  INT(11) NOT NULL,    
            created_at                  TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,
            updated_by                  INT(11) NOT NULL,    
            updated_at                  TIMESTAMP DEFAULT current_timestamp() NOT NULL on update current_timestamp,

            constraint domestic_pricing_domestic_pricing_vas_spec_pricing_id_fk foreign key (domestic_pricing_id) references domestic_pricing (id) on update cascade on delete cascade,
            constraint domestic_pricing_vas_domestic_pricing_vas_spec_pricing_vas_id_fk foreign key (domestic_pricing_vas_id) references domestic_pricing_vas (id) on update cascade on delete cascade,
            constraint created_domestic_pricing_vas_spec_created_by_fk foreign key (created_by) references user (id) on update cascade on delete cascade,
            constraint updated_domestic_pricing_vas_spec_updated_by_fk foreign key (updated_by) references user (id) on update cascade on delete cascade
        ) collate = utf8_unicode_ci;';

        return $tables;
    }
}
