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

// * Components
import TweetsRow from "@components/table/tweets/row";

interface TweetsTableProps {
  children: React.ReactNode;
  handleNextPage?: () => void;
  handlePreviousPage?: () => void;
  loading: boolean;
  pageNumber: number;
  pageMax: number;
}

const TweetsTable = ({
  children,
  handleNextPage,
  handlePreviousPage,
  loading,
  pageNumber,
  pageMax,
}: TweetsTableProps) => (
  <>
    <TableModulz cellSpacing="1" cellPadding="0">
      <Thead>
        <Tr>
          <Th sx={{ width: "160px" }}>Campaign</Th>
          <Th sx={{ width: "160px" }}>Text</Th>
          <Th sx={{ width: "136px" }}>Created By</Th>
          <Th sx={{ width: "96px" }}>Created At</Th>
          <Th sx={{ width: "96px" }}>Last Updated</Th>
          <Th sx={{ width: "48px" }}>View</Th>
          <Th sx={{ width: "48px" }}>Delete</Th>
        </Tr>
      </Thead>
      <tbody>
        {loading ? (
          <>
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
            <TweetsRow loading />
          </>
        ) : (
          children
        )}
      </tbody>
    </TableModulz>
    {!loading && (
      <Flex
        sx={{
          alignItems: "center",
          height: "48px",
          justifyContent: "space-between",
        }}
      >
        <Flex sx={{ justifyContent: "flex-start", width: "128px" }}>
          {pageNumber > 1 && (
            <>
              <IconButton
                sx={{ cursor: "pointer" }}
                onClick={handlePreviousPage}
              >
                <ArrowLeftIcon />
              </IconButton>
              <Text ml={1}>Previous Page</Text>
            </>
          )}
        </Flex>
        <Flex sx={{ justifyContent: "center", width: "128px" }}>
          <Text>
            Page {pageNumber} of {pageMax}
          </Text>
        </Flex>
        <Flex sx={{ justifyContent: "flex-end", width: "128px" }}>
          {pageNumber < pageMax && (
            <>
              <Text mr={1}>Next Page</Text>
              <IconButton sx={{ cursor: "pointer" }} onClick={handleNextPage}>
                <ArrowRightIcon />
              </IconButton>
            </>
          )}
        </Flex>
      </Flex>
    )}
  </>
);

export default TweetsTable;
