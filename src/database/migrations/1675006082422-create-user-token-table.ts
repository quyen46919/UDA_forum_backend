import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTokenTable1675006082422 implements MigrationInterface {
  name = 'createUserTokenTable1675006082422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_tokens\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`token\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NOT NULL, \`version\` int NOT NULL, \`description\` varchar(255) NOT NULL, \`type\` tinyint NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL`,
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
      `ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL DEFAULT 'NULL'`,
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
    await queryRunner.query(`DROP TABLE \`user_tokens\``);
  }
}
