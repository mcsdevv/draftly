import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useUser } from "../../hooks";

export default function Plan() {
  const { user } = useUser();
  const { scope } = useContext(ScopeContext);
  return <>Plan</>;
}
