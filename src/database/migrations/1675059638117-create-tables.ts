import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1675059638117 implements MigrationInterface {
  name = 'createTables1675059638117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`answer_images\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(20) NOT NULL, \`answer_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`answers\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_user_id\` varchar(255) NULL, \`content\` longtext NOT NULL, \`count\` int NOT NULL, \`document_link\` varchar(255) NOT NULL, \`is_correct_answer\` tinyint NOT NULL COMMENT '0: NOTHING | 1: WRONG | 2: CORRECT', \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE', \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(128) NOT NULL, \`logo\` varchar(20) NOT NULL, \`description\` varchar(512) NOT NULL, \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`question_tags\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tag_id\` varchar(36) NOT NULL, \`question_id\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_497e97015cc760e52aa0b8c258\` (\`tag_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`questions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_user_id\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`content\` longtext NOT NULL, \`count\` int NOT NULL, \`github_link\` varchar(255) NOT NULL, \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE', \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`question_images\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(20) NOT NULL, \`question_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_tokens\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NOT NULL, \`token\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NOT NULL, \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`version\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` tinyint NOT NULL COMMENT '0: ADMIN | 1: STUDENT | 2: LECTURE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_question_actions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`action_type\` tinyint NOT NULL COMMENT '0: NOTHING | 1: LIKE | 2: DISLIKE', \`question_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_559651a82d8eb825898d4fd4d0\` (\`question_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`full_name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(20) NULL, \`banner\` varchar(20) NULL, \`phone_number\` varchar(11) NULL, \`description\` longtext NULL, \`role\` tinyint NOT NULL COMMENT '0: ADMIN | 1: STUDENT | 2: LECTURE', \`gender\` tinyint NOT NULL COMMENT '0: Unknow | 1: Male | 2: Female', \`is_valid_email\` tinyint NOT NULL, \`face_recognition_model\` varchar(200) NULL, \`secret_key\` varchar(50) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_answer_actions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`action_type\` tinyint NOT NULL COMMENT '0: NOTHING | 1: LIKE | 2: DISLIKE', \`answer_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_43ba17852456eb906ed1704ec7\` (\`answer_id\`), PRIMARY KEY (\`id\`, \`answer_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer_images\` ADD CONSTRAINT \`FK_2f79157b5b2a05fa1e44b10afa5\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_tags\` ADD CONSTRAINT \`FK_497e97015cc760e52aa0b8c2586\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_tags\` ADD CONSTRAINT \`FK_da3d79ee83f674d9f5fc9cc88d0\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` ADD CONSTRAINT \`FK_6be6f97436a9046de3185aa275b\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_9e144a67be49e5bba91195ef5de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_question_actions\` ADD CONSTRAINT \`FK_559651a82d8eb825898d4fd4d0d\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_question_actions\` ADD CONSTRAINT \`FK_e93a6b0a763a7fdc28d9d88f78d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answer_actions\` ADD CONSTRAINT \`FK_43ba17852456eb906ed1704ec76\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answer_actions\` ADD CONSTRAINT \`FK_5b5b271d2928fa62138028820da\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_answer_actions\` DROP FOREIGN KEY \`FK_5b5b271d2928fa62138028820da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answer_actions\` DROP FOREIGN KEY \`FK_43ba17852456eb906ed1704ec76\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_question_actions\` DROP FOREIGN KEY \`FK_e93a6b0a763a7fdc28d9d88f78d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_question_actions\` DROP FOREIGN KEY \`FK_559651a82d8eb825898d4fd4d0d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_9e144a67be49e5bba91195ef5de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` DROP FOREIGN KEY \`FK_6be6f97436a9046de3185aa275b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_tags\` DROP FOREIGN KEY \`FK_da3d79ee83f674d9f5fc9cc88d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_tags\` DROP FOREIGN KEY \`FK_497e97015cc760e52aa0b8c2586\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`answer_images\` DROP FOREIGN KEY \`FK_2f79157b5b2a05fa1e44b10afa5\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_43ba17852456eb906ed1704ec7\` ON \`user_answer_actions\``,
    );
    await queryRunner.query(`DROP TABLE \`user_answer_actions\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(
      `DROP INDEX \`REL_559651a82d8eb825898d4fd4d0\` ON \`user_question_actions\``,
    );
    await queryRunner.query(`DROP TABLE \`user_question_actions\``);
    await queryRunner.query(`DROP TABLE \`user_tokens\``);
    await queryRunner.query(`DROP TABLE \`question_images\``);
    await queryRunner.query(`DROP TABLE \`questions\``);
    await queryRunner.query(
      `DROP INDEX \`REL_497e97015cc760e52aa0b8c258\` ON \`question_tags\``,
    );
    await queryRunner.query(`DROP TABLE \`question_tags\``);
    await queryRunner.query(`DROP TABLE \`tags\``);
    await queryRunner.query(`DROP TABLE \`answers\``);
    await queryRunner.query(`DROP TABLE \`answer_images\``);
  }
}
