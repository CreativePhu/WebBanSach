import React from 'react';
import {jwtDecode} from 'jwt-decode';
import {verifyToken} from "../api/Auth";
import {updateUser, resetUser} from "../redux/UserSlice";
import {useAppDispatch} from '../redux/Hooks'

const WithAuthCheck = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const AuthCheck: React.FC<P> = (props) => {
        const dispatch = useAppDispatch()

        const getUserToken = async (token: string) => {
            try {
                const response = await verifyToken(token);
                dispatch(updateUser(response));

            } catch (error) {
                console.log(error);
            }
        }

        React.useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const decodedToken = jwtDecode(token) as { exp: number }
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                dispatch(resetUser());
                return;
            } else {
                getUserToken(token);
            }
        }, []);

        return <WrappedComponent {...props} />;
    }

    return AuthCheck;
}

export default WithAuthCheck;