<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181226102620 extends AbstractMigration
{
    // Init Database
    public function getDescription()
    {
        return 'Init Database Branch,Hub';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
      $this->addSql('create table branch
        (
          branch_id                       int(11) auto_increment            primary key,
          hub_id                          int(11)                           not null,
          code                            varchar(20)                       not null,
          status                          int(1) default 0                  not null,
          is_deleted                      TINYINT(1) NOT NULL DEFAULT 0,
          created_by                      int(11)                           not null,
          created_at                      datetime                              null,
          updated_by                      int(11)                               null,
          updated_at                      datetime                              null,          
          constraint unique_code
          unique (code)
        )
          collate = utf8_unicode_ci');

      $this->addSql('create table hub
        (
          hub_id                          int(11) auto_increment            primary key,
          city_id                         int(11)                           not null,
          code                            varchar(20)                       not null,
          status                          int(1) default 0                  not null,
          is_deleted                      TINYINT(1) NOT NULL DEFAULT 0,
          created_by                      int(11)                           not null,
          created_at                      datetime                              null,
          updated_by                      int(11)                               null,
          updated_at                      datetime                              null,
          constraint unique_code
          unique (code)
        )
          collate = utf8_unicode_ci');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE hub');
        $this->addSql('DROP TABLE branch');
    }

}
