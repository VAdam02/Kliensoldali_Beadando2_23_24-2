import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem><Link to="/"><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    PageIcon //TODO
                </NavigationMenuLink></Link></NavigationMenuItem>
                <NavigationMenuItem><Link to="/"><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Főoldal
                </NavigationMenuLink></Link></NavigationMenuItem>

                //TODO logged out
                <NavigationMenuItem><Link to="/register"><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Regisztráció
                </NavigationMenuLink></Link></NavigationMenuItem>
                <NavigationMenuItem><Link to="/login"><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Bejelentkezés
                </NavigationMenuLink></Link></NavigationMenuItem>
                //logged out

                //TODO logged in
                <NavigationMenuItem><Link to="/profile"><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Profilom
                </NavigationMenuLink></Link></NavigationMenuItem>

                //TODO logged in as employer
                <NavigationMenuItem><Link to="/jobs/create"><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Álláshirdetés hozzáadása
                </NavigationMenuLink></Link></NavigationMenuItem>
                //logged in as employer

                <NavigationMenuItem><Link ><NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Kijelentkezés //TODO logout
                </NavigationMenuLink></Link></NavigationMenuItem>
                //logged in


            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default NavBar;