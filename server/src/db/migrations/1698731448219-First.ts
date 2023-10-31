import { MigrationInterface, QueryRunner } from "typeorm";

export class First1698731448219 implements MigrationInterface {
    name = 'First1698731448219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "site_user_id" uuid, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "site_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(21) NOT NULL, "last_name" character varying(21) NOT NULL, "avatar" character varying, "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "email_verified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "phone" character varying(20), "role" character varying NOT NULL DEFAULT 'user', "verify_token" character varying, "reset_pass_token" character varying, CONSTRAINT "UQ_957a9e82cc14dd86322abf2eda7" UNIQUE ("username"), CONSTRAINT "UQ_a38a383b3c8d781d0accd3c44e2" UNIQUE ("email"), CONSTRAINT "PK_f76d6b4853953c63da40bff758d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_fefbdbe7c0c254b41fa438090cd" FOREIGN KEY ("site_user_id") REFERENCES "site_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_fefbdbe7c0c254b41fa438090cd"`);
        await queryRunner.query(`DROP TABLE "site_user"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
