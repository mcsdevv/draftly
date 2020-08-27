// * Modulz
import {
  Flex,
  IconButton,
  Text,
  Table as TableModulz,
  Thead,
  Tr,
  Th,
} from "@modulz/radix";
import { ArrowLeftIcon, ArrowRightIcon } from "@modulz/radix-icons";

interface TableProps {
  children: React.ReactNode;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
  pageNumber?: number;
  pageMax?: number;
}

const Table = ({
  children,
  handleNextPage,
  handlePreviousPage,
  pageNumber,
  pageMax,
}: TableProps) => (
  <>
    <TableModulz cellSpacing="1" cellPadding="0">
      <Thead>
        <Tr>
          <Th sx={{ width: "160px" }}>Title</Th>
          <Th sx={{ width: "160px" }}>Text</Th>
          <Th sx={{ width: "120px" }}>Created By</Th>
          <Th sx={{ width: "96px" }}>Created At</Th>
          <Th sx={{ width: "96px" }}>Last Updated</Th>
          <Th sx={{ width: "48px" }}>View</Th>
          <Th sx={{ width: "48px" }}>Delete</Th>
        </Tr>
      </Thead>
      <tbody>{children}</tbody>
    </TableModulz>
    <Flex sx={{ justifyContent: "space-between" }}>
      <IconButton sx={{ cursor: "pointer" }} onClick={handlePreviousPage}>
        <ArrowLeftIcon />
        <Text ml={1}>Previous Page</Text>
      </IconButton>
      <Text>
        Page {pageNumber} of {pageMax}
      </Text>
      <IconButton sx={{ cursor: "pointer" }} onClick={handleNextPage}>
        <Text mr={1}>Next Page</Text>
        <ArrowRightIcon />
      </IconButton>
    </Flex>
  </>
);

export default Table;
