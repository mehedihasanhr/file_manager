import {
    useLoginMutation,
    useLogoutMutation,
    useRefreshQuery,
    useSignupMutation,
} from "./authApiSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "./authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    // get auth state from redux store
    const { auth, loading } = useSelector((state) => state.auth);
    // check if user refresh is fullfilled
    const { isLoading } = useRefreshQuery();
    const navigate = useNavigate();
    // signup
    const [signup, { isLoading: isSignupLoading }] = useSignupMutation();

    // get login mutation from redux store
    const [login, { isLoading: isLogin }] = useLoginMutation();

    // get logout mutation from redux store
    const [logout, { isLoading: isLogout }] = useLogoutMutation();

    // if user refresh is fullfilled
    // change loading state to false
    useEffect(() => {
        let timer;
        if (!isLoading) {
            timer = setTimeout(() => {
                dispatch(setLoading(false));
            }, 200);
        }

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    // create login function
    const loginWithCredentials = async (email, password) => {
        try {
            await login({ email, password }).unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    // sign up
    const signupWithCredentials = async (payload) => {
        if (!payload.name || !payload.email || !payload.password) return;
        try {
            await signup(payload)
                .unwrap()
                .then((res) => {
                    if (res.status === 201) {
                        navigate("/login");
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    // create logout function
    const Logout = async () => {
        try {
            await logout().unwrap();
        } catch (err) {
            console.log(err);
        }
    };

    return {
        auth,
        loading,
        loginWithCredentials,
        signupWithCredentials,
        Logout,
        isLogin,
        isLogout,
    };
};
