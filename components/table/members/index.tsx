// * Modulz
import { Flex, Table, Thead, Tr, Th, Text } from "@modulz/radix";

// * Components
import MembersRow from "@components/table/members/row";

interface MembersTableProps {
  children: React.ReactNode[];
  loading: boolean;
  type: string;
}

const MembersTable = ({ children, loading, type }: MembersTableProps) => (
  <>
    <Table cellSpacing="1" cellPadding="0">
      <Thead>
        <Tr>
          <Th sx={{ width: "160px" }}>Name</Th>
          <Th sx={{ width: "160px" }}>Email</Th>
          <Th sx={{ width: "80px" }}>
            {type === "member" ? "Upgrade" : "Downgrade"}
          </Th>
          <Th sx={{ width: "60px" }}>Remove</Th>
        </Tr>
      </Thead>
      <tbody>
        {loading ? (
          <>
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
            <MembersRow loading />
          </>
        ) : (
          children
        )}
      </tbody>
    </Table>
    {children.length === 0 && (
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          width: "100%",
        }}
      >
        <Text>No members of the team present with this role.</Text>
      </Flex>
    )}
  </>
);

export default MembersTable;
