import {MigrationInterface, QueryRunner} from "typeorm";

export class fixColumnName1675052932707 implements MigrationInterface {
    name = 'fixColumnName1675052932707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`user_tokens_ibfk_1\``);
        await queryRunner.query(`DROP INDEX \`user_id\` ON \`user_tokens\``);
        await queryRunner.query(`ALTER TABLE \`question_tags\` ADD \`tag_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question_tags\` ADD \`question_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`question_images\` ADD \`question_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`answer_images\` ADD \`answer_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` ADD \`question_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` ADD \`user_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`create_user_id\` \`create_user_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`question_images\` DROP FOREIGN KEY \`FK_ff54078f094e7ef1353f215021f\``);
        await queryRunner.query(`ALTER TABLE \`question_images\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`create_user_id\` \`create_user_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer_images\` DROP FOREIGN KEY \`FK_50808e6cf169244189fb203aa99\``);
        await queryRunner.query(`ALTER TABLE \`answer_images\` CHANGE \`answerId\` \`answerId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`question_images\` ADD CONSTRAINT \`FK_ff54078f094e7ef1353f215021f\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer_images\` ADD CONSTRAINT \`FK_50808e6cf169244189fb203aa99\` FOREIGN KEY (\`answerId\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_92ce9a299624e4c4ffd99b645b6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_92ce9a299624e4c4ffd99b645b6\``);
        await queryRunner.query(`ALTER TABLE \`answer_images\` DROP FOREIGN KEY \`FK_50808e6cf169244189fb203aa99\``);
        await queryRunner.query(`ALTER TABLE \`question_images\` DROP FOREIGN KEY \`FK_ff54078f094e7ef1353f215021f\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`answer_images\` CHANGE \`answerId\` \`answerId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answer_images\` ADD CONSTRAINT \`FK_50808e6cf169244189fb203aa99\` FOREIGN KEY (\`answerId\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`create_user_id\` \`create_user_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question_images\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question_images\` ADD CONSTRAINT \`FK_ff54078f094e7ef1353f215021f\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`create_user_id\` \`create_user_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` DROP COLUMN \`question_id\``);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`answer_images\` DROP COLUMN \`answer_id\``);
        await queryRunner.query(`ALTER TABLE \`question_images\` DROP COLUMN \`question_id\``);
        await queryRunner.query(`ALTER TABLE \`question_tags\` DROP COLUMN \`question_id\``);
        await queryRunner.query(`ALTER TABLE \`question_tags\` DROP COLUMN \`tag_id\``);
        await queryRunner.query(`CREATE INDEX \`user_id\` ON \`user_tokens\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`user_tokens_ibfk_1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

}
