import { Session } from "next-auth";
import { createContext } from "react";

export const UserContext = createContext<Session>(null);
