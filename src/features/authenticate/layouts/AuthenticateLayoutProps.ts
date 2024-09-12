import React from "react";

interface AuthenticateLayoutProps {
	children: React.ReactNode;
	roles?: string[];
	auth?: boolean;
}

export type { AuthenticateLayoutProps };
