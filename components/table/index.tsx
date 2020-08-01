// * Modulz
import { Table as TableModulz, Thead, Tr, Th } from "@modulz/radix";

interface TableProps {
  children: React.ReactNode;
  headers: string[];
}

const Table = ({ children }: TableProps) => (
  <TableModulz cellSpacing="1" cellPadding="0">
    <Thead>
      <Tr>
        {/* {headers.map((h) => (
          <Th key={h}>{h}</Th>
        ))} */}
        <Th sx={{ width: "48px" }}>Title</Th>
        <Th sx={{ width: "48px" }}>Text</Th>
        <Th sx={{ width: "48px" }}>Created By</Th>
        <Th sx={{ width: "48px" }}>Created At</Th>
        <Th sx={{ width: "48px" }}>Last Updated</Th>
        <Th sx={{ width: "48px" }}>View</Th>
        <Th sx={{ width: "48px" }}>Delete</Th>
      </Tr>
    </Thead>
    <tbody>{children}</tbody>
  </TableModulz>
);

export default Table;
