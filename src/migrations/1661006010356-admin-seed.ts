import { MigrationInterface, QueryRunner } from 'typeorm';

export class adminSeed1661006010356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (first_name, last_name, sur_name, date_of_birth, passport, email, password, role) 
        VALUES ('Иван', 'Иванов', 'Иванович', '2002-02-27', 1234567890, 'admin@gmail.com', 'admin', 'ADMIN')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
