"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useApiCall } from "@/utils/useApiCall"
import { Link, SocialLink } from "@/store/link-in-bio/interface/linkInBioInterface"
import { Clipboard, Check } from "lucide-react" // Import icons

interface themeColorsInterface {
    background: string;
    text: string;
    accent: string;
}

export default function GuestSocialLink({ socialLink, themeColors, Icon }: { socialLink: SocialLink, themeColors: string | undefined, Icon: any }) {
    const { apiCall } = useApiCall();
    const [copied, setCopied] = useState(false);

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, socialLink: SocialLink) => {
        e.preventDefault() // Prevent default navigation temporarily

        // Collect all relevant bio data
        const data = {
            socialLinkId: socialLink.id,
            stats: {
                referrer: document.referrer || "direct",
                userAgent: navigator.userAgent,
                viewportWidth: window.innerWidth,
                viewportHeight: window.innerHeight,
                language: navigator.language,
                platform: navigator.platform,
            }
        };

        const navigateToLink = () => {
            window.open(socialLink.link, "_blank", "noopener,noreferrer")
        };

        try {
            const createLinkStatus = await apiCall({
                endpoint: `/social-link-stats/create`,
                method: "post",
                data: data,
                "showToast": false,
            });
            if (createLinkStatus) {
                navigateToLink();
            }
        } catch (error) {
            navigateToLink();
        }
    };

    return (
        <a
            key={socialLink.id}
            href={socialLink.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
            onClick={(e) => handleLinkClick(e, socialLink)}
        >
            <Icon.icon className="w-5 h-5" style={{ color: themeColors }} />
        </a>
    );
}
