import { MigrationInterface, QueryRunner } from "typeorm";

export class bookRequestTypo1661008941398 implements MigrationInterface {
    name = 'bookRequestTypo1661008941398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_requests" RENAME COLUMN "aproved_at" TO "approved_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_requests" RENAME COLUMN "approved_at" TO "aproved_at"`);
    }

}
