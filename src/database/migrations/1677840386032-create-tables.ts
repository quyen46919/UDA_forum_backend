import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1677840386032 implements MigrationInterface {
    name = 'createTables1677840386032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`question_images\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(20) NOT NULL, \`question_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(128) NOT NULL, \`logo\` varchar(20) NOT NULL, \`description\` varchar(512) NOT NULL, \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE' DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`question_tags\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`tag_id\` varchar(36) NOT NULL, \`question_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_tokens\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NOT NULL, \`token\` varchar(512) NOT NULL, \`refresh_token\` varchar(512) NOT NULL, \`expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`refresh_expire_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`version\` int NOT NULL, \`type\` tinyint NOT NULL COMMENT '0: ADMIN | 1: STUDENT | 2: LECTURE', \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_answer_actions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`action_type\` tinyint NOT NULL COMMENT '0: NOTHING | 1: LIKE | 2: DISLIKE', \`answer_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`alt\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL DEFAULT '', \`blur_hash\` varchar(255) NOT NULL DEFAULT '', \`url_link\` varchar(255) NOT NULL DEFAULT '', \`create_user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_attendances\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`member_id\` varchar(36) NOT NULL, \`group_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cards\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`content\` varchar(255) NOT NULL, \`tag\` varchar(100) NOT NULL, \`thumbnail\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_card_orders\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`order\` tinyint NOT NULL, \`column_id\` varchar(36) NOT NULL, \`card_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_columns\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`is_favorite\` tinyint NOT NULL COMMENT '0: NORMAL | 1: FAVORITE' DEFAULT '0', \`title\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_column_orders\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`order\` tinyint NOT NULL, \`column_id\` varchar(36) NOT NULL, \`board_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_boards\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`color\` varchar(7) NOT NULL, \`group_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_events\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`meeting_url\` varchar(200) NOT NULL, \`start_time\` timestamp NULL, \`end_time\` timestamp NULL, \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE' DEFAULT '0', \`type\` tinyint NOT NULL COMMENT '0: EVENT | 1: TODO | 2: ANNOUCEMENT' DEFAULT '0', \`color\` varchar(20) NOT NULL, \`group_id\` varchar(36) NOT NULL, \`member_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_notes\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`content\` longtext NOT NULL, \`category\` varchar(50) NOT NULL, \`color\` varchar(20) NOT NULL, \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE' DEFAULT '0', \`group_id\` varchar(36) NOT NULL, \`member_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_quick_answers\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`response_nickname\` varchar(50) NOT NULL, \`answer\` varchar(255) NOT NULL, \`question_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_quick_questions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`start_time\` timestamp NOT NULL, \`end_time\` timestamp NOT NULL, \`note\` varchar(255) NOT NULL, \`type\` tinyint NOT NULL COMMENT '0: NO NAME REQUIRED | 1: NAME REQUIRED' DEFAULT '1', \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE' DEFAULT '0', \`group_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`groups\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`image_url\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`qr_code\` varchar(255) NOT NULL, \`invite_code\` varchar(255) NOT NULL, \`meeting_link\` varchar(255) NOT NULL, \`sub_meeting_link\` varchar(255) NOT NULL, \`deleted_at\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_members\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`joinDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`outDate\` timestamp NULL, \`role\` tinyint NOT NULL COMMENT '0: ADMIN | 1: SUBADMIN | 2: MEMBER' DEFAULT '2', \`user_id\` varchar(36) NOT NULL, \`group_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`full_name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(20) NULL, \`banner\` varchar(20) NULL, \`phone_number\` varchar(11) NULL, \`description\` longtext NULL, \`role\` tinyint NOT NULL COMMENT '0: ADMIN | 1: STUDENT | 2: LECTURE', \`gender\` tinyint NOT NULL COMMENT '0: Unknow | 1: Male | 2: Female', \`is_valid_email\` tinyint NOT NULL, \`face_recognition_model\` varchar(200) NULL, \`secret_key\` varchar(50) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_question_actions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`action_type\` tinyint NOT NULL COMMENT '0: NOTHING | 1: LIKE | 2: DISLIKE', \`question_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`content\` longtext NOT NULL, \`count\` int NOT NULL, \`github_link\` varchar(255) NOT NULL, \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE' DEFAULT '0', \`deleted_at\` timestamp(6) NULL, \`create_user_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answers\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` longtext NOT NULL, \`count\` int NOT NULL, \`document_link\` varchar(255) NOT NULL DEFAULT '', \`is_correct_answer\` tinyint NOT NULL COMMENT '0: NOTHING | 1: WRONG | 2: CORRECT' DEFAULT '0', \`is_hidden\` tinyint NOT NULL COMMENT '0: FALSE | 1: TRUE' DEFAULT '0', \`deleted_at\` timestamp(6) NULL, \`create_user_id\` varchar(36) NOT NULL, \`answer_id\` varchar(36) NULL, \`question_id\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_cb080abe9c2f19dc80f9563bf5\` (\`answer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer_images\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(20) NOT NULL, \`answer_id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`question_images\` ADD CONSTRAINT \`FK_6be6f97436a9046de3185aa275b\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_tags\` ADD CONSTRAINT \`FK_497e97015cc760e52aa0b8c2586\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question_tags\` ADD CONSTRAINT \`FK_da3d79ee83f674d9f5fc9cc88d0\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_9e144a67be49e5bba91195ef5de\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_answer_actions\` ADD CONSTRAINT \`FK_43ba17852456eb906ed1704ec76\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_answer_actions\` ADD CONSTRAINT \`FK_5b5b271d2928fa62138028820da\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_3dfe368a444e295759cbd26d5cb\` FOREIGN KEY (\`create_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` ADD CONSTRAINT \`FK_f81fe0bf33fc0b47449e1453436\` FOREIGN KEY (\`member_id\`) REFERENCES \`group_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` ADD CONSTRAINT \`FK_b975b7e655219ed9e3ea0c6b55a\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_card_orders\` ADD CONSTRAINT \`FK_b4c129f4cb0bab88423a91540c4\` FOREIGN KEY (\`column_id\`) REFERENCES \`group_columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_card_orders\` ADD CONSTRAINT \`FK_dbbf82991915e558283b71c5a41\` FOREIGN KEY (\`card_id\`) REFERENCES \`cards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_column_orders\` ADD CONSTRAINT \`FK_f981c39d1c9b4f1e5b7c329b3bf\` FOREIGN KEY (\`column_id\`) REFERENCES \`group_columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_column_orders\` ADD CONSTRAINT \`FK_b34c3132c05fb800d4a980c3d8e\` FOREIGN KEY (\`board_id\`) REFERENCES \`group_boards\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_boards\` ADD CONSTRAINT \`FK_8c77bea0e0c642efd165de13f13\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_events\` ADD CONSTRAINT \`FK_cfaa278d9a23b2057d139d20a48\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_events\` ADD CONSTRAINT \`FK_9d555eb41473216b9ac9fb7170c\` FOREIGN KEY (\`member_id\`) REFERENCES \`group_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_notes\` ADD CONSTRAINT \`FK_56b8dae27b0b02a01d5467510f9\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_notes\` ADD CONSTRAINT \`FK_97e465c7a653dff1a018c34cadb\` FOREIGN KEY (\`member_id\`) REFERENCES \`group_members\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_quick_answers\` ADD CONSTRAINT \`FK_132ef994bd33ac5526f6376d405\` FOREIGN KEY (\`question_id\`) REFERENCES \`group_quick_questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_quick_questions\` ADD CONSTRAINT \`FK_eda5d9344432b7e95a3227ae8bc\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_20a555b299f75843aa53ff8b0ee\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_members\` ADD CONSTRAINT \`FK_2c840df5db52dc6b4a1b0b69c6e\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` ADD CONSTRAINT \`FK_559651a82d8eb825898d4fd4d0d\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` ADD CONSTRAINT \`FK_e93a6b0a763a7fdc28d9d88f78d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_2dfafd197d73356f321d867907c\` FOREIGN KEY (\`create_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_6c4c56db4c4e5f3a0b23caec86b\` FOREIGN KEY (\`create_user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_cb080abe9c2f19dc80f9563bf50\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answers\` ADD CONSTRAINT \`FK_677120094cf6d3f12df0b9dc5d3\` FOREIGN KEY (\`question_id\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer_images\` ADD CONSTRAINT \`FK_2f79157b5b2a05fa1e44b10afa5\` FOREIGN KEY (\`answer_id\`) REFERENCES \`answers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer_images\` DROP FOREIGN KEY \`FK_2f79157b5b2a05fa1e44b10afa5\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_677120094cf6d3f12df0b9dc5d3\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_cb080abe9c2f19dc80f9563bf50\``);
        await queryRunner.query(`ALTER TABLE \`answers\` DROP FOREIGN KEY \`FK_6c4c56db4c4e5f3a0b23caec86b\``);
        await queryRunner.query(`ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_2dfafd197d73356f321d867907c\``);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` DROP FOREIGN KEY \`FK_e93a6b0a763a7fdc28d9d88f78d\``);
        await queryRunner.query(`ALTER TABLE \`user_question_actions\` DROP FOREIGN KEY \`FK_559651a82d8eb825898d4fd4d0d\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_2c840df5db52dc6b4a1b0b69c6e\``);
        await queryRunner.query(`ALTER TABLE \`group_members\` DROP FOREIGN KEY \`FK_20a555b299f75843aa53ff8b0ee\``);
        await queryRunner.query(`ALTER TABLE \`group_quick_questions\` DROP FOREIGN KEY \`FK_eda5d9344432b7e95a3227ae8bc\``);
        await queryRunner.query(`ALTER TABLE \`group_quick_answers\` DROP FOREIGN KEY \`FK_132ef994bd33ac5526f6376d405\``);
        await queryRunner.query(`ALTER TABLE \`group_notes\` DROP FOREIGN KEY \`FK_97e465c7a653dff1a018c34cadb\``);
        await queryRunner.query(`ALTER TABLE \`group_notes\` DROP FOREIGN KEY \`FK_56b8dae27b0b02a01d5467510f9\``);
        await queryRunner.query(`ALTER TABLE \`group_events\` DROP FOREIGN KEY \`FK_9d555eb41473216b9ac9fb7170c\``);
        await queryRunner.query(`ALTER TABLE \`group_events\` DROP FOREIGN KEY \`FK_cfaa278d9a23b2057d139d20a48\``);
        await queryRunner.query(`ALTER TABLE \`group_boards\` DROP FOREIGN KEY \`FK_8c77bea0e0c642efd165de13f13\``);
        await queryRunner.query(`ALTER TABLE \`group_column_orders\` DROP FOREIGN KEY \`FK_b34c3132c05fb800d4a980c3d8e\``);
        await queryRunner.query(`ALTER TABLE \`group_column_orders\` DROP FOREIGN KEY \`FK_f981c39d1c9b4f1e5b7c329b3bf\``);
        await queryRunner.query(`ALTER TABLE \`group_card_orders\` DROP FOREIGN KEY \`FK_dbbf82991915e558283b71c5a41\``);
        await queryRunner.query(`ALTER TABLE \`group_card_orders\` DROP FOREIGN KEY \`FK_b4c129f4cb0bab88423a91540c4\``);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` DROP FOREIGN KEY \`FK_b975b7e655219ed9e3ea0c6b55a\``);
        await queryRunner.query(`ALTER TABLE \`group_attendances\` DROP FOREIGN KEY \`FK_f81fe0bf33fc0b47449e1453436\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_3dfe368a444e295759cbd26d5cb\``);
        await queryRunner.query(`ALTER TABLE \`user_answer_actions\` DROP FOREIGN KEY \`FK_5b5b271d2928fa62138028820da\``);
        await queryRunner.query(`ALTER TABLE \`user_answer_actions\` DROP FOREIGN KEY \`FK_43ba17852456eb906ed1704ec76\``);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_9e144a67be49e5bba91195ef5de\``);
        await queryRunner.query(`ALTER TABLE \`question_tags\` DROP FOREIGN KEY \`FK_da3d79ee83f674d9f5fc9cc88d0\``);
        await queryRunner.query(`ALTER TABLE \`question_tags\` DROP FOREIGN KEY \`FK_497e97015cc760e52aa0b8c2586\``);
        await queryRunner.query(`ALTER TABLE \`question_images\` DROP FOREIGN KEY \`FK_6be6f97436a9046de3185aa275b\``);
        await queryRunner.query(`DROP TABLE \`answer_images\``);
        await queryRunner.query(`DROP INDEX \`REL_cb080abe9c2f19dc80f9563bf5\` ON \`answers\``);
        await queryRunner.query(`DROP TABLE \`answers\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP TABLE \`user_question_actions\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`group_members\``);
        await queryRunner.query(`DROP TABLE \`groups\``);
        await queryRunner.query(`DROP TABLE \`group_quick_questions\``);
        await queryRunner.query(`DROP TABLE \`group_quick_answers\``);
        await queryRunner.query(`DROP TABLE \`group_notes\``);
        await queryRunner.query(`DROP TABLE \`group_events\``);
        await queryRunner.query(`DROP TABLE \`group_boards\``);
        await queryRunner.query(`DROP TABLE \`group_column_orders\``);
        await queryRunner.query(`DROP TABLE \`group_columns\``);
        await queryRunner.query(`DROP TABLE \`group_card_orders\``);
        await queryRunner.query(`DROP TABLE \`cards\``);
        await queryRunner.query(`DROP TABLE \`group_attendances\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP TABLE \`user_answer_actions\``);
        await queryRunner.query(`DROP TABLE \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`question_tags\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
        await queryRunner.query(`DROP TABLE \`question_images\``);
    }

}
