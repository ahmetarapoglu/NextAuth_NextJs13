"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface Props {
    children: ReactNode;
    session: any
}

const Providers = ({ children, session }: Props) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;