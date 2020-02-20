import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useProfile } from "../../hooks";

export default function Plan() {
  const { user } = useProfile();
  const { scope } = useContext(ScopeContext);
  return <>Plan</>;
}
