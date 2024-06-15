import {Outlet} from "react-router-dom";

export default function AdminRoute() {
    /*const {user} = UseUserContext();

    if (!user) {
        return <Navigate to={LOGIN} />;
    }*/

    return (
        <div className={'flex flex-row p12 min-h-[100dvh] items-center justify-around bg-gray-50'}>
            <Outlet />
        </div>
    );
}
