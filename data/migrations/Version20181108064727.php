<?php declare(strict_types=1);

namespace Migration;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181108064727 extends AbstractMigration
{
    // Init Database
    public function getDescription()
    {
        return 'Init Database.';
    }

    // init schema
    public function up(Schema $schema): void
    {
        $this->addSql('create table user
            (
              id                              int(10) auto_increment
                primary key,
              email                           varchar(100)                          null,
              password                        char(60)                              null,
              first_name                      varchar(100)                          null,
              last_name                       varchar(100)                          null,
              language                        char(5) default \'en_US\'               not null,
              created_at                      timestamp default current_timestamp() not null
              on update current_timestamp(),
              is_active                       int(1) default 0                      not null
              comment \'active=1,inactive=0\',
              updated_by                      int(10)                               null,
              deleted_at                      timestamp                             null,
              updated_at                      timestamp                             null,
              is_admin                        int(1) default 0                      not null,
              is_ldap                         int(1) default 0                      not null,
              username                        varchar(100)                          not null,
              password_reset_token            varchar(32)                           null,
              password_reset_token_created_at datetime                              null,
              last_token                      varchar(255)                          null,
              last_token_create_at            datetime                              null,
              constraint unique_username
              unique (username)
            )
              collate = utf8_unicode_ci');

        $this->addSql('create table role
            (
              id          int(10) auto_increment
                primary key,
              name        varchar(100)                            not null,
              created_at  timestamp  not null,
              updated_at  timestamp  not null,
              description text                                    null,
              constraint role_name_uindex
              unique (name)
            )
              collate = utf8_unicode_ci');

        $this->addSql('create table role_hierarchy
            (
              id             int auto_increment
                primary key,
              parent_role_id int not null,
              child_role_id  int not null,
              constraint role_role_child_role_id_fk
              foreign key (child_role_id) references role (id)
                on update cascade
                on delete cascade,
              constraint role_role_parent_role_id_fk
              foreign key (parent_role_id) references role (id)
                on update cascade
                on delete cascade
            )
              collate = utf8_unicode_ci;
            
            create index IDX_AB8EFB72A44B56EA
              on role_hierarchy (parent_role_id);
            
            create index IDX_AB8EFB72B4B76AB7
              on role_hierarchy (child_role_id);');

        $this->addSql('create table permission
            (
              id          int(10) auto_increment
                primary key,
              name        varchar(100)                            not null,
              model       text                                    null,
              description text                                    null,
              created_at  timestamp  not null,
              updated_at  timestamp  not null,
              deleted_at  timestamp default current_timestamp()   not null
            )
              collate = utf8_unicode_ci');

        $this->addSql('create table role_permission
            (
              role_id       int(10) not null,
              permission_id int(10) not null,
              primary key (role_id, permission_id)
            )
              collate = utf8_unicode_ci');

        $this->addSql('create table user_role
        (
          id      int(10) auto_increment,
          user_id int(10) not null,
          role_id int(10) not null,
          primary key (id)
        )
          collate = utf8_unicode_ci;
        create index id
          on user_role (id)');
    }

    // drop schema
    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE user_role');
        $this->addSql('DROP TABLE role_permission');
        $this->addSql('DROP TABLE permission');
        $this->addSql('DROP TABLE role_hierarchy');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE user');
    }
}
