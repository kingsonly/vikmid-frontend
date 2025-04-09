"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useApiCall } from "@/utils/useApiCall"
import { Link } from "@/store/link-in-bio/interface/linkInBioInterface"
import { Clipboard, Check } from "lucide-react" // Import icons

interface themeColorsInterface {
    background: string;
    text: string;
    accent: string;
}

export default function GuestLink({ link, themeColors, linkIndex }: { link: Link, themeColors: themeColorsInterface, linkIndex: number }) {
    const { apiCall } = useApiCall();
    const [copied, setCopied] = useState(false);

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, link: Link) => {
        e.preventDefault() // Prevent default navigation temporarily

        // Collect all relevant bio data
        const data = {
            linkId: link.id,
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
            window.open(link.link, "_blank", "noopener,noreferrer")
        };

        try {
            const createLinkStatus = await apiCall({
                endpoint: `/link-stats/create`,
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

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent link click
        try {
            //await navigator.clipboard.writeText(link.link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2s
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <motion.div
            key={link.id}
            className="flex items-center justify-between p-3 rounded-xl transition-all shadow-sm hover:shadow-md"
            style={{
                color: themeColors.text,
                backgroundColor: `${themeColors.text}10`,
                borderRadius: "16px",
            }}
            whileHover={{
                backgroundColor: `${themeColors.accent}20`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * linkIndex }}
        >
            {/* Clickable Link */}
            <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center"
                onClick={(e) => handleLinkClick(e, link)}
            >
                {link.title}
            </a>

            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="ml-2 p-2 rounded-full transition hover:bg-gray-200"
                title="Copy link"
            >
                {copied ? <Check size={18} color={themeColors.accent} /> : <Clipboard size={18} />}
            </button>
        </motion.div>
    );
}
