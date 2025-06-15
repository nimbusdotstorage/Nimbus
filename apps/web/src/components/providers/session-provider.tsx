"use client";

import { type PropsWithChildren, createContext, useContext } from "react";
import { type Session } from "@nimbus/auth/auth";
import { type User } from "better-auth";

interface SessionContextType {
	user: User;
	session: Session;
}

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = ({ children, value }: PropsWithChildren<{ value: SessionContextType }>) => {
	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};
