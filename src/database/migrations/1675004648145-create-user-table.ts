import {MigrationInterface, QueryRunner} from "typeorm";

export class createUserTable1675004648145 implements MigrationInterface {
    name = 'createUserTable1675004648145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar_url\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`banner_url\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`banner\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_valid_email\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`face_recognition_model\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`secret_key\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` tinyint NOT NULL COMMENT '0: Unknow | 1: Male | 2: Female'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`gender\` \`gender\` tinyint NOT NULL COMMENT '1: Male | 2: Female | 3: Unknow'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`secret_key\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`face_recognition_model\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_valid_email\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`banner\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`banner_url\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar_url\` varchar(50) NULL DEFAULT 'NULL'`);
    }

}
