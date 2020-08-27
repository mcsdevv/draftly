// * Libraries
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// * Hooks
import useDrafts from "@hooks/use-drafts";
import usePublished from "@hooks/use-published";
import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

// * Modulz
import {
  Button,
  Container,
  Flex,
  Input,
  Subheading,
  Text,
} from "@modulz/radix";

export default function DeleteTeam() {
  const { setDrafts } = useDrafts();
  const { setPublished } = usePublished();
  const router = useRouter();
  const { scope, setScope } = useScope();
  const { setUser, teams, user } = useUser();
  const [teamName, setTeamName] = useState("");
  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTeamName(e.currentTarget.value);
  };
  const handleOnSubmitDelete = async () => {
    const url = "/api/team/delete";
    const { status } = await fetch(url, {
      method: "DELETE",
    });
    if (status === 200) {
      const filteredTeams = teams.filter((t: any) => t.tuid !== scope.tuid);
      setUser({ user, teams: filteredTeams });
      setDrafts([]);
      setPublished([]);
      if (filteredTeams) {
        setScope(filteredTeams[0]);
      } else {
        Cookies.remove("tuid");
        setScope(null);
      }
      router.push("/dashboard");
    }
  };
  return (
    <Container mb={4} size={1}>
      <Subheading mb={2}>Delete Team</Subheading>
      <Flex mb={2}>
        <Input
          name="deleteName"
          onChange={handleOnChange}
          size={1}
          type="text"
          value={teamName}
        />
        <Button
          disabled={teamName !== scope.name}
          ml={2}
          onClick={handleOnSubmitDelete}
          size={1}
        >
          Submit
        </Button>
      </Flex>
      <Text sx={{ color: "gray600" }}>
        Enter the team display name to confirm deletion.
      </Text>
    </Container>
  );
}
