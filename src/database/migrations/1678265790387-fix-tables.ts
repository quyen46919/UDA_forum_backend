import {MigrationInterface, QueryRunner} from "typeorm";

export class fixTables1678265790387 implements MigrationInterface {
    name = 'fixTables1678265790387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`group_columns\` DROP COLUMN \`is_favorite\``);
        await queryRunner.query(`ALTER TABLE \`cards\` ADD \`is_favorite\` tinyint NOT NULL COMMENT '0: NONE | 1: FAVORITED' DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` CHANGE \`time\` \`time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`type\` \`type\` tinyint(11) NOT NULL COMMENT '0: CREATE_COLUMN | 1: DROP_COLUMN | 2: ADD_NEW_CARD_TO_COLUMN | 3: DROP_CARD_FROM_COLUMN | 4: MOVE_CARD_FROM_COLUMN_TO_COLUMN | 5: ASSIGN_MEMBER_TO_CARD | 6: UNASSIGN_MEMBER_FROM_CARD | 7: FINISH_ASSIGNED_TASK_FROM_CARD'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`column_name\` \`column_name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`card_name\` \`card_name\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`from_column\` \`from_column\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`to_column\` \`to_column\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`from_card\` \`from_card\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`to_card\` \`to_card\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`assignee_id\` \`assignee_id\` varchar(36) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_cb080abe9c2f19dc80f9563bf50\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_cb080abe9c2f19dc80f9563bf50\``);
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
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`assignee_id\` \`assignee_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`to_card\` \`to_card\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`from_card\` \`from_card\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`to_column\` \`to_column\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`from_column\` \`from_column\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`card_name\` \`card_name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`column_name\` \`column_name\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`group_board_histories\` CHANGE \`type\` \`type\` tinyint(11) NOT NULL COMMENT '0: CREATE_COLUMN | 1: DROP_COLUMN | 2: ADD_NEW_CARD_TO_COLUMN | 3: DROP_CARD_FROM_COLUMN | 4: MOVE_CARD_FROM_COLUMN_TO_COLUMN | 5: ASSIGN_MEMBER_TO_CARD | 6: UNASSIGN_MEMBER_FROM_CARD | 7: FINISH_ASSIGNED_TASK_FROM_CARD'`);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` CHANGE \`time\` \`time\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`deleted_at\` \`deleted_at\` timestamp(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`refresh_expire_at\` \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expire_at\` \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`cards\` DROP COLUMN \`is_favorite\``);
        await queryRunner.query(`ALTER TABLE \`group_columns\` ADD \`is_favorite\` tinyint NOT NULL COMMENT '0: NONE | 1: FAVORITED' DEFAULT '0'`);
    }

}
