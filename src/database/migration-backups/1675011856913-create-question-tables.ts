import { MigrationInterface, QueryRunner } from 'typeorm';

export class createQuestionTables1675011856913 implements MigrationInterface {
  name = 'createQuestionTables1675011856913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_8d6a2354aab6a596e9ac2fb136\` ON \`user_question_actions\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tags\` ADD \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` CHANGE \`create_user_id\` \`create_user_id\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` CHANGE \`is_hidden\` \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` DROP FOREIGN KEY \`FK_ff54078f094e7ef1353f215021f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_92ce9a299624e4c4ffd99b645b6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` CHANGE \`type\` \`type\` tinyint NOT NULL COMMENT '0: ADMIN | 1: STUDENT | 2: LECTURE'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` CHANGE \`userId\` \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`role\` \`role\` tinyint NOT NULL COMMENT '0: ADMIN | 1: STUDENT | 2: LECTURE'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_question_actions\` CHANGE \`action_type\` \`action_type\` tinyint NOT NULL COMMENT '0: NOTHING | 1: LIKE | 2: DISLIKE'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` ADD CONSTRAINT \`FK_ff54078f094e7ef1353f215021f\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_92ce9a299624e4c4ffd99b645b6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_92ce9a299624e4c4ffd99b645b6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` DROP FOREIGN KEY \`FK_ff54078f094e7ef1353f215021f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_question_actions\` CHANGE \`action_type\` \`action_type\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`role\` \`role\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` CHANGE \`type\` \`type\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_92ce9a299624e4c4ffd99b645b6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_images\` ADD CONSTRAINT \`FK_ff54078f094e7ef1353f215021f\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` CHANGE \`is_hidden\` \`is_hidden\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` CHANGE \`create_user_id\` \`create_user_id\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`is_hidden\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_8d6a2354aab6a596e9ac2fb136\` ON \`user_question_actions\` (\`questionId\`)`,
    );
  }
}
