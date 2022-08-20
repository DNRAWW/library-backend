import { MigrationInterface, QueryRunner } from "typeorm";

export class bookRequestDeleteUniqueConstraint1661011228466 implements MigrationInterface {
    name = 'bookRequestDeleteUniqueConstraint1661011228466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_requests" DROP CONSTRAINT "unique_request"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_requests" ADD CONSTRAINT "unique_request" UNIQUE ("user_id", "book_id")`);
    }

}
