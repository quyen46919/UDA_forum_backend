import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTables1667027355185 implements MigrationInterface {
  name = 'CreateUserTables1667027355185';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (
        \`id\` varchar(36) NOT NULL, 
        \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
        \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
        \`full_name\` varchar(50) NOT NULL, 
        \`email\` varchar(50) NOT NULL, 
        \`password\` varchar(255) NOT NULL, 
        \`avatar_url\` varchar(50) NULL, 
        \`banner_url\` varchar(50) NULL, 
        \`gender\` tinyint NOT NULL COMMENT '0: Unknow | 1: Male | 2: Female', 
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
