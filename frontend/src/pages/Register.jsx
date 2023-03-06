import React from "react";
import Button from "../components/Button";
import { Input, Label } from "../components/Form";
import { useAuth } from "../features/auth/useAuth";

const Register = () => {
    // auth state
    const { signupWithCredentials } = useAuth();

    // form state
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(false);
    const [nameError, setNameError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [passwordError, setPasswordError] = React.useState("");

    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // form validation
        if (!name) {
            setNameError("Name is required");
            return;
        }

        if (!email) {
            setEmailError("Email is required");
            return;
        }

        if (!password) {
            setPasswordError("Password is required");
            return;
        }

        // login user
        signupWithCredentials({ name, email, password });
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-[450px] h-fit py-6 px-6 shadow-lg shadow-slate-200 rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Create an account
                </h1>

                <form className="gap-y-4" onSubmit={handleSubmit}>
                    <Label>
                        <span>Name</span>
                        <Input
                            type="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {nameError && (
                            <span className="text-red-500 text-sm">
                                {nameError}
                            </span>
                        )}
                    </Label>
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

                    <Button
                        type="submit"
                        className="mt-6 w-full bg-slate-600 hover:bg-slate-500 text-white"
                    >
                        Register
                    </Button>
                </form>

                <div className="flex justify-center mt-4">
                    <span className="text-sm text-gray-500">
                        Have an account?{" "}
                        <a href="/login" className="text-slate-500 font-bold">
                            Login
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Register;
