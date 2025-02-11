"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

const withAuth = (Component: any, requireHubSelection = false) => {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const user = useSelector((state: any) => state.userDetails);
        const hubId = user?.activeHub;
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            console.log("Checking auth:", user, hubId);
            if (user.email.length < 1) {
                router.push("/login");
            } else if (requireHubSelection && !hubId) {
                router.push("/dashboard");
            } else {
                setLoading(false); // Allow rendering only when checks pass
            }
        }, [user, hubId, router]);

        if (loading) return null; // Prevents flashing incorrect content

        return <Component {...props} />;
    };
};

export default withAuth;
