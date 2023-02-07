import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTables1675701768242 implements MigrationInterface {
    name = 'fixTables1675701768242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`document_link\` \`document_link\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`is_correct_answer\` \`is_correct_answer\` tinyint NOT NULL COMMENT '0: NOTHING | 1: WRONG | 2: CORRECT' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`is_correct_answer\` \`is_correct_answer\` tinyint NOT NULL COMMENT '0: NOTHING | 1: WRONG | 2: CORRECT'`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`document_link\` \`document_link\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }

}
