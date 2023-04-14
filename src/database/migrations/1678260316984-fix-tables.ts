import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTables1678260316984 implements MigrationInterface {
    name = 'fixTables1678260316984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`group_board_histories\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` tinyint(11) NOT NULL COMMENT '0: CREATE_COLUMN | 1: DROP_COLUMN | 2: ADD_NEW_CARD_TO_COLUMN | 3: DROP_CARD_FROM_COLUMN | 4: MOVE_CARD_FROM_COLUMN_TO_COLUMN | 5: ASSIGN_MEMBER_TO_CARD | 6: UNASSIGN_MEMBER_FROM_CARD | 7: FINISH_ASSIGNED_TASK_FROM_CARD', \`column_name\` varchar(50) NULL, \`card_name\` varchar(50) NULL, \`from_column\` varchar(50) NULL, \`to_column\` varchar(50) NULL, \`from_card\` varchar(50) NULL, \`to_card\` varchar(50) NULL, \`assignee\` varchar(36) NULL, \`board_id\` varchar(36) NOT NULL, \`member_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`order\` smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`column_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group_columns\` ADD \`order\` smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group_columns\` ADD \`board_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` CHANGE \`time\` \`time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`group_columns\` CHANGE \`is_favorite\` \`is_favorite\` tinyint NOT NULL COMMENT '0: NONE | 1: FAVORITED' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`group_events\` CHANGE \`start_time\` \`start_time\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`group_events\` CHANGE \`end_time\` \`end_time\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`group_quick_questions\` CHANGE \`start_time\` \`start_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`group_quick_questions\` CHANGE \`end_time\` \`end_time\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`qr_code\` \`qr_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`invite_code\` \`invite_code\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`sub_meeting_link\` \`sub_meeting_link\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_members\` CHANGE \`joinDate\` \`joinDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`group_members\` CHANGE \`outDate\` \`outDate\` timestamp(6) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` ADD CONSTRAINT \`FK_f2c0baa5e89b9328592ad8b8888\` FOREIGN KEY (\`board_id\`) REFERENCES \`group_boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` ADD CONSTRAINT \`FK_cbcca74112fbb4788c3cedb8378\` FOREIGN KEY (\`member_id\`) REFERENCES \`group_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD CONSTRAINT \`FK_ce7087ed72b4e5e5a0c72a8c5aa\` FOREIGN KEY (\`column_id\`) REFERENCES \`group_columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_columns\` ADD CONSTRAINT \`FK_c5d300f9ac5141473df86a2514a\` FOREIGN KEY (\`board_id\`) REFERENCES \`group_boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_cb080abe9c2f19dc80f9563bf50\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_cb080abe9c2f19dc80f9563bf50\``);
        await queryRunner.query(`ALTER TABLE \`group_columns\` DROP FOREIGN KEY \`FK_c5d300f9ac5141473df86a2514a\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP FOREIGN KEY \`FK_ce7087ed72b4e5e5a0c72a8c5aa\``);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` DROP FOREIGN KEY \`FK_cbcca74112fbb4788c3cedb8378\``);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` DROP FOREIGN KEY \`FK_f2c0baa5e89b9328592ad8b8888\``);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`answer_id\` \`answer_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answers\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_cb080abe9c2f19dc80f9563bf50\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`secret_key\` \`secret_key\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`face_recognition_model\` \`face_recognition_model\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`description\` \`description\` longtext NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_number\` \`phone_number\` varchar(11) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`banner\` \`banner\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`avatar\` \`avatar\` varchar(20) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_members\` CHANGE \`outDate\` \`outDate\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_members\` CHANGE \`joinDate\` \`joinDate\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`sub_meeting_link\` \`sub_meeting_link\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`invite_code\` \`invite_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`groups\` CHANGE \`qr_code\` \`qr_code\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_quick_questions\` CHANGE \`end_time\` \`end_time\` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00''`);
        await queryRunner.query(`ALTER TABLE \`group_quick_questions\` CHANGE \`start_time\` \`start_time\` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00''`);
        await queryRunner.query(`ALTER TABLE \`group_events\` CHANGE \`end_time\` \`end_time\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_events\` CHANGE \`start_time\` \`start_time\` timestamp NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_columns\` CHANGE \`is_favorite\` \`is_favorite\` tinyint NOT NULL COMMENT '0: NORMAL | 1: FAVORITE' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` CHANGE \`time\` \`time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`group_columns\` DROP COLUMN \`board_id\``);
        await queryRunner.query(`ALTER TABLE \`group_columns\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`column_id\``);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`order\``);
        await queryRunner.query(`DROP TABLE \`group_board_histories\``);
    }

}
