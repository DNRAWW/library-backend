import { MigrationInterface, QueryRunner } from "typeorm";

export class userBooksOnDelete1656431293521 implements MigrationInterface {
    name = 'userBooksOnDelete1656431293521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_e746bb935afa81fbcaed41036f1"`);
        await queryRunner.query(`ALTER TABLE "user_books" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_e746bb935afa81fbcaed41036f1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_books" DROP CONSTRAINT "FK_e746bb935afa81fbcaed41036f1"`);
        await queryRunner.query(`ALTER TABLE "user_books" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_books" ADD CONSTRAINT "FK_e746bb935afa81fbcaed41036f1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
