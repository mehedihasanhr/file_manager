import React from "react";
import Button from "../components/Button";
import { Input, Label } from "../components/Form";
import { useAuth } from "../features/auth/useAuth";

const Login = () => {
    // auth state
    const { loginWithCredentials } = useAuth();

    // form state
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // form validation
        if (!email) {
            setEmailError("Email is required");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        }

        // login user
        loginWithCredentials(email, password);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-[450px] h-fit py-6 px-6 shadow-lg shadow-slate-200 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Label>
                        <span>Email</span>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {emailError && (
                            <span className="text-red-500 text-sm">
                                {emailError}
                            </span>
                        )}
                    </Label>
                    <Label>
                        <span>Password</span>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <span className="text-red-500 text-sm">
                                {passwordError}
                            </span>
                        )}
                    </Label>

                    <Label className="flex-row gap-2">
                        <Input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                    </Label>

                    <Button
                        type="submit"
                        className="w-full bg-slate-600 hover:bg-slate-500 text-white"
                    >
                        Login
                    </Button>
                </form>

                <div className="flex justify-center mt-4">
                    <span className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="text-slate-500 font-bold"
                        >
                            Register
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
