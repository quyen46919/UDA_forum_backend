import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTables1675704271039 implements MigrationInterface {
    name = 'fixTables1675704271039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answers\` ADD \`question_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_cb080abe9c2f19dc80f9563bf50\``);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`answer_id\` \`answer_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_cb080abe9c2f19dc80f9563bf50\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_677120094cf6d3f12df0b9dc5d3\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_677120094cf6d3f12df0b9dc5d3\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_cb080abe9c2f19dc80f9563bf50\``);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`answer_id\` \`answer_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_cb080abe9c2f19dc80f9563bf50\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP COLUMN \`question_id\``);
    }

}
