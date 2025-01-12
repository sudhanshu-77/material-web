/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * A class that represents a markown table as column titles and rows. The
 * `toString()` method outputs a markdown-compatible table.
 */
export class MarkdownTable {
  private readonly rowsInternal: string[][] = [];

  /**
   * @param columnsInternal The column titles of the table.
   */
  constructor(private readonly columnsInternal: string[]) {}

  /**
   * The columns of the table.
   */
  get columns() {
    return this.columnsInternal;
  }

  /**
   * The rows of the table. (add rows with the `addRow()` method)
   */
  get rows() {
    return this.rowsInternal;
  }

  /**
   * Adds a row to the table. The row must be the same length as the number of
   * columns and be in order of the provided columns.
   *
   * @param row The row to add to the table. Must be the same length as the
   * number of columns.
   */
  addRow(row: string[]) {
    if (row.length !== this.columnsInternal.length) {
      throw new Error(
        `Row length (${row.length}) must match column length (${this.columnsInternal.length})`,
      );
    }

    this.rowsInternal.push(row);
  }

  /**
   * Generates a markdown-compatible table from the columns and rows provided.
   *
   * @returns A markdown-compatible table.
   */
  toString() {
    const headerRow = this.columnsInternal.join(' | ');
    const dividerRow = this.columnsInternal.map(() => '---').join(' | ');
    const rows = this.rowsInternal
      .map((row) => `${row.join(' | ')}`)
      .join('\n');
    return `<!-- mdformat off(autogenerated might break rendering in catalog) -->

${headerRow}
${dividerRow}
${rows}

<!-- mdformat on(autogenerated might break rendering in catalog) -->`;
  }
}
