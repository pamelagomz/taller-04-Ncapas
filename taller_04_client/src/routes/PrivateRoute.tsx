import {Navigate, Outlet} from 'react-router-dom';
// import Header from "@/components/ui/Header.tsx";

export default function PrivateRoute() {
    /*const {user} = UseUserContext();

    if (!user) {
        return <Navigate to={LOGIN} />;
    }*/

    return (
        <div className={'xl:flex-row flex flex-col'}>
            {/*<Header/>*/}
            <Outlet />
        </div>
    );
}
