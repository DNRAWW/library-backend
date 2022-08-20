import { MigrationInterface, QueryRunner } from "typeorm";

export class entities1660999997521 implements MigrationInterface {
    name = 'entities1660999997521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ganres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c955aba355262ee4019c3571728" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "author_id" integer NOT NULL, "ganre_id" integer NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "sur_name" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "passport" bigint NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_requests" ("id" SERIAL NOT NULL, "user_id" integer, "book_id" integer NOT NULL, "aproved_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "unique_request" UNIQUE ("user_id", "book_id"), CONSTRAINT "PK_8534d5b32d46134b250fa8dcef5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_1056dbee4616479f7d562c562df" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_da1712198cee6cb121110eac65b" FOREIGN KEY ("ganre_id") REFERENCES "ganres"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_requests" ADD CONSTRAINT "FK_b01917928d21503f2d5a8bda22a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_requests" DROP CONSTRAINT "FK_b01917928d21503f2d5a8bda22a"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_da1712198cee6cb121110eac65b"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_1056dbee4616479f7d562c562df"`);
        await queryRunner.query(`DROP TABLE "book_requests"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "ganres"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
