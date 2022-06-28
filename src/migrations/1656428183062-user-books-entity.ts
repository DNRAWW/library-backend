import { MigrationInterface, QueryRunner } from "typeorm";

export class userBooksEntity1656428183062 implements MigrationInterface {
    name = 'userBooksEntity1656428183062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_books" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "book_id" integer NOT NULL, "given_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_629bc1a648860619b0f75f5dfe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_e746bb935afa81fbcaed41036f1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_e746bb935afa81fbcaed41036f1"`);
        await queryRunner.query(`DROP TABLE "user_books"`);
    }

}
