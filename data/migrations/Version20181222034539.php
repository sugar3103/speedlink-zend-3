<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181222034539 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        foreach ($this->defineTables() as $table => $value) {
            $sql = $value['query'] . ' ' . $table .'(';
            $implode = array();
            foreach ($value['columns'] as $column => $condition) {
                $implode[] = $column .' '. $condition;                
            }

            $sql .= implode(',', $implode);
            $sql .= ') collate = utf8_unicode_ci';

            $this->addSql($sql);
        }
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }

    private function defineTables() {
        $tables['country']= array(
            'query' => 'create table',
            'columns' => array(
                'country_id' => 'int(11) auto_increment primary key',
                'name'  => 'varchar(50) not null',
                'name_en'  => 'varchar(50) not null',
                'description' => 'text null',
                'description_en' => 'text null',
                'status'   => 'int(1) not null',
                'is_deleted' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'iso_code'  => 'varchar(50) not null',
                'created_by'    => 'int(11) not null',
                'created_at'    =>'datetime not null',
                'updated_by' => 'int(11)',
                'updated_at'    => 'datetime',
                'ref_as_by'     => 'int(11)'
            )
        );

        $tables['city'] = array(
            'query' => 'create table',
            'columns'    => array(
                'city_id' => 'int(11) auto_increment primary key',
                'country_id' => 'int(11) not null',
                'name'  => 'varchar(50) not null',
                'name_en'  => 'varchar(50) not null',
                'description' => 'text null',
                'description_en' => 'text null',
                'status'   => 'TINYINT(1) not null',
                'is_deleted' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'zip_code'  => 'varchar(50) not null',
                'created_by'    => 'int(11) not null',
                'created_at'    =>'datetime not null',
                'updated_by' => 'int(11)',
                'updated_at'    => 'datetime',
                'ref_as_by'     => 'int(11)'
            )
        );

        $tables['district'] = array(
            'query' => 'create table',
            'columns'    => array(
                'district_id' => 'int(11) auto_increment primary key',
                'city_id' => 'int(10)  not null',
                'name'  => 'varchar(50)  not null',
                'name_en'  => 'varchar(50)  not null',
                'description' => 'text null',
                'description_en' => 'text null',
                'status'   => 'int(1)',
                'is_deleted' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'created_by'    => 'int(11) not null',
                'created_at'    =>'datetime not null',
                'updated_by' => 'int(11)',
                'updated_at'    => 'datetime',
                'ref_as_by'     => 'int(11)'
            )
        );

        $tables['ward'] = array(
            'query' => 'create table',
            'columns'    => array(
                'ward_id' => 'int(11) auto_increment primary key',
                'district_id' => 'int(11) not null',
                'name'  => 'varchar(50)  not null',
                'name_en'  => 'varchar(50)  not null',
                'description' => 'text null',
                'description_en' => 'text null',
                'postal_code' => 'varchar(20) null',
                'status'   => 'int(1)  not null',
                'is_deleted' => 'TINYINT(1) NOT NULL DEFAULT 0',
                'created_by'    => 'int(11)  not null',
                'created_at'    =>'datetime  not null',
                'updated_by' => 'int(11)',
                'updated_at'    => 'datetime',
                'ref_as_by'     => 'int(11)'
            )
        );

        $tables['address_code'] = array(
            'query' => 'create table',
            'columns'    => array(
                'address_code_id' => 'int(11) auto_increment primary key',
                'code' => 'varchar(50) CHARACTER SET utf8 NOT NULL',
                'country_id' => 'int(11) not null',
                'city_id' => 'int(11) not null',
                'district_id' => 'int(11) not null',
                'ward_id' => 'int(11) not null',
                'branch_id' => 'int(11) not null',
                'hub_id' => 'int(11) not null',
                'created_by'    => 'int(11)  not null',
                'created_at'    =>'datetime  not null',
                'updated_by' => 'int(11)',
                'updated_at'    => 'datetime',
                'ref_as_by'     => 'int(11)'
            )
        );

        return $tables;
    }
}
