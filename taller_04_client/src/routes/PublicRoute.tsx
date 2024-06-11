import {Navigate, Outlet} from 'react-router-dom';
//import {PRIVATE} from "@/routes/path.jsx";
//import {UseUserContext} from "@/contexts/UserContext.jsx";

export default function PublicRoute() {

    /*const {user} = UseUserContext();

    if (user) {
        return <Navigate to={PRIVATE} />;
    }*/

    return (
        <div>
            <Outlet />
        </div>
    );
}
