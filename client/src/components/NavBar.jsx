import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/reducers/userSlice'

const NavBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem><Link to="/" className={navigationMenuTriggerStyle()}>
                    Jobhunter
                </Link></NavigationMenuItem>
                <NavigationMenuItem><Link to="/" className={navigationMenuTriggerStyle()}>
                    Főoldal
                </Link></NavigationMenuItem>

                {!user ? (<>
                    <NavigationMenuItem><Link to="/register" className={navigationMenuTriggerStyle()}>
                        Regisztráció
                    </Link></NavigationMenuItem>
                    <NavigationMenuItem><Link to="/login" className={navigationMenuTriggerStyle()}>
                        Bejelentkezés
                    </Link></NavigationMenuItem>
                </>) : (<>
                    <NavigationMenuItem><Link to="/profile" className={navigationMenuTriggerStyle()}>
                        Profilom
                    </Link></NavigationMenuItem>

                    {user.role == "company" && (
                        <NavigationMenuItem><Link to="/jobs/create" className={navigationMenuTriggerStyle()}>
                            Álláshirdetés hozzáadása
                        </Link></NavigationMenuItem>
                    )}

                    <NavigationMenuItem><Link onClick={handleLogout} className={navigationMenuTriggerStyle()}>
                        Kijelentkezés
                    </Link></NavigationMenuItem>
                </>)}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavBar;