// * Modulz
import { Table as TableModulz, Thead, Tr, Th } from "@modulz/radix";

interface TableProps {
  children: React.ReactNode;
  headers: string[];
}

const Table = ({ children, headers }: TableProps) => (
  <TableModulz cellSpacing="1" cellPadding="0">
    <Thead>
      <Tr>
        {headers.map((h) => (
          <Th key={h}>{h}</Th>
        ))}
      </Tr>
    </Thead>
    <tbody>{children}</tbody>
  </TableModulz>
);

export default Table;
