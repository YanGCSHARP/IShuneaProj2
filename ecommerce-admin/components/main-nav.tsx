"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import React from 'react'

export function MainNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLElement>){
    
    const pathname = usePathname();
    const params = useParams() as { storeID?: string };
    const routes= [{
        href: `/${params.storeID}`,
        label:"Overview",
        active: pathname=== `/${params.storeID}`,
        
    },
    {
        href: `/${params.storeID}/billboards`,
        label:"Billboards",
        active: pathname=== `/${params.storeID}/billboard`,
        
    },{
        href: `/${params.storeID}/settings`,
        label:"Settings",
        active: pathname=== `/${params.storeID}/settings`,
        
    }];
    return(
        <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
            {routes.map((route) =>(
                <Link
                 key={route.href} 
                 href={route.href} 
                 className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-black dark:text-white" : "text-muted-foreground"
                )}>
                {route.label}
                </Link>
            )) }
        </nav>
    )
};