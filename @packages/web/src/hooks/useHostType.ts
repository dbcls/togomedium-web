import { HOST_LIVE, HOST_STAGING } from "%core/consts.ts";
import { useEffect, useState } from "react";

type HostType = "production" | "staging" | "local" | "";

export const useHostType = () => {
  const [hostType, setHostType] = useState<HostType>("");

  useEffect(() => {
    const host = window.location.hostname;
    switch (true) {
      case host.includes("localhost"):
        setHostType("local");
        break;
      case host.includes(HOST_STAGING):
        setHostType("staging");
        break;
      case host.includes(HOST_LIVE):
        setHostType("production");
        break;
      default:
        setHostType("");
    }
  }, []);

  return { hostType };
};
