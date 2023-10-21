import React from "react";
import Login from "../components/login";

const SignInPage = () => {
    return (
        <>
            <Login />
            <footer className="footer">
                <div className="copyright-text">
                    NextAuth ©2023 Created By AR7B.
                </div>
            </footer>
        </>
    );
};

export default SignInPage;