import { MigrationInterface, QueryRunner } from "typeorm";

export class bookEntity1656427073838 implements MigrationInterface {
    name = 'bookEntity1656427073838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
