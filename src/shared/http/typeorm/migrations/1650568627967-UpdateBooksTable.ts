import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateBooksTable1650566797004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'books',
      'author',
      new TableColumn({
        name: 'author_id',
        type: 'varchar',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        name: 'AuthorBook',
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'authors',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
