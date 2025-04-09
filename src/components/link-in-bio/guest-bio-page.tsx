"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, Twitter, Instagram, Facebook, Linkedin, Github, Youtube } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ProfileLoading from "./profile-loader"
import NotFound from "./not-found"
import { useApiCall } from "@/utils/useApiCall"
import GuestSection from "./GuestSection"
import GuestLink from "./GuestLink"
import { getSocialPlatform } from "@/utils/helpers"
import GuestSocialLink from "./GuesSocialLink"

// Types for the bio profile
interface LinkStats {
    id: string
    linkId: string
    stats: string
    createdAt: string
    updatedAt: string
}

interface SocialLink {
    id: string
    socialNetworkName: string
    bioProfileId: string
    link: string
    order: number
    status: boolean
    createdAt: string
    updatedAt: string
    stats?: LinkStats[] | null
}

interface Link {
    id: string
    title: string
    link: string
    image?: string | null
    linkDesign?: string | null
    order: number
    pageSectionId: string
    status: boolean
    createdAt: string
    updatedAt: string
    stats?: LinkStats[] | null
}

interface Section {
    id: string
    title: string | null
    pageId: string
    status: boolean
    order: number
    createdAt: string
    updatedAt: string
    links?: Link[] | null
}

interface Page {
    id: string
    name: string
    bioProfileId: string
    status: boolean
    createdAt: string
    updatedAt: string
    sections?: Section[] | null
}
interface themeColorsInterface {
    background: string;
    text: string;
    accent: string;

}

interface BioProfile {
    id: string
    username: string
    displayName: string
    template: string
    profilePicture: string
    banner?: string
    themeColors: string
    pages: Page[]
    socialLinks: SocialLink[]
}

// Map social network names to icons
const socialIcons: Record<string, React.ElementType> = {
    Twitter: Twitter,
    Instagram: Instagram,
    Facebook: Facebook,
    LinkedIn: Linkedin,
    GitHub: Github,
    Youtube: Youtube,
}

export default function GuestBioPage({ username }: { username: string }) {
    const [activePage, setActivePage] = useState<string | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [profile, setProfile] = useState<BioProfile | null>(null)
    const [currentPage, setCurrentPage] = useState<Page | null>()
    const [themeColors, setThemeColors] = useState<themeColorsInterface | null>()
    const { apiCall } = useApiCall();
    // Set the first page as active by default
    useEffect(() => {
        // if (profile.pages && profile.pages.length > 0 && !activePage) {
        //     setActivePage(profile.pages[0].id)
        // }
        getBioProfile(username)
    }, [])
    useEffect(() => {
        if (profile?.pages) {
            const currentPage = profile.pages.find((page) => page.id === activePage)
            setCurrentPage(currentPage)
        }

    }, [activePage])

    async function getBioProfile(username: string) {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/link-in-bio/links/${username}`;


        try {
            const getProfile = await apiCall({
                endpoint: `${apiUrl}`,
                method: "get",
                "showToast": false,
            });

            if (getProfile.data.id.length > 0) {

                setProfile(getProfile.data)
                // set current page 
                setActivePage(getProfile.data.pages[0].id)
                const currentPage = getProfile.data.pages.find((page) => page.id === getProfile.data.pages[0].id)
                setCurrentPage(currentPage)
                setThemeColors(JSON.parse(getProfile.data.themeColors))
            } else {
                setNotFound(true)
            }

        } catch (error) {
            //console.error("Error loading profile:", error)
            setNotFound(true)
        } finally {
            setLoading(false)
        }
        return null

    }

    // Styles for links
    const linkClasses = `block p-3 rounded-md border border-opacity-20 text-center hover:bg-opacity-10 transition-colors`

    // Social icons component
    const SocialIcons = () => (
        <div className="grid grid-cols-7 gap-4 justify-center mt-2">
            {profile?.socialLinks.map((account) => {
                const Icon = getSocialPlatform(account.socialNetworkName)
                return Icon ? (
                    <GuestSocialLink key={account.id} socialLink={account} themeColors={themeColors?.accent} Icon={Icon} />
                ) : null
            })}
        </div>
    )

    // Page navigation menu
    const PageMenu = () => {
        if (profile && themeColors) {
            return <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-opacity-90 p-6 rounded-lg max-w-sm w-full mx-4"
                            style={{ backgroundColor: themeColors.background }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold" style={{ color: themeColors.text }}>
                                    Pages
                                </h3>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="p-1 rounded-full hover:bg-opacity-10"
                                    style={{ color: themeColors.text, backgroundColor: `${themeColors.accent}30` }}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {profile.pages.map((page) => (
                                    <button
                                        key={page.id}
                                        className={`w-full text-left p-3 rounded-md transition-colors capitalize ${page.id === activePage ? "font-bold" : ""
                                            }`}
                                        style={{
                                            color: themeColors.text,
                                            backgroundColor: page.id === activePage ? `${themeColors.accent}30` : "transparent",
                                        }}
                                        onClick={() => {
                                            setActivePage(page.id)
                                            setMenuOpen(false)
                                        }}
                                    >
                                        {page.name}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        }
    }

    const templateConverter = (template: string | number, type: "string" | "number") => {
        var template: string | number
        if (type === "string") {
            switch (template) {
                case "classic":
                    template = 1
                    break;
                case "portrait":
                    template = 2
                    break;
                case "banner":
                    template = 3
                    break;

                default:
                    template = 1
                    break;
            }
        } else {
            switch (template) {
                case 1:
                    template = "classic"
                    break;
                case 2:
                    template = "portrait"
                    break;
                case 3:
                    template = "banner"
                    break;

                default:
                    template = "classic"
                    break;
            }
        }

        return template;
    }
    function adjustBrightness(hex: string, percent: number) {
        // Ensure valid hex
        if (!hex.startsWith("#") || (hex.length !== 7 && hex.length !== 4)) return hex;

        let r: number, g: number, b: number;

        if (hex.length === 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        } else {
            // Handle shorthand hex (e.g., #abc)
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }

        // Increase brightness
        r = Math.min(255, r + (255 * percent) / 100);
        g = Math.min(255, g + (255 * percent) / 100);
        b = Math.min(255, b + (255 * percent) / 100);

        return `rgb(${r}, ${g}, ${b})`;
    }

    const getInsetShadow = (bgColor) => {
        const rgba = hexToRgb(bgColor);
        if (!rgba) return "inset 10px 0 30px rgba(0,255,255,0.8), inset -10px 0 30px rgba(0,255,255,0.8)";

        const { r, g, b } = rgba;
        return `inset 10px 0 30px rgba(${r},${g},${b},0.8), inset -10px 0 30px rgba(${r},${g},${b},0.8)`;
    };

    // Function to convert HEX to RGB
    const hexToRgb = (hex) => {
        let r = 0, g = 0, b = 0;
        if (hex.startsWith("#")) {
            hex = hex.substring(1);
        }

        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else {
            return null;
        }
        return { r, g, b };
    };


    // Render the template based on the user's selection
    const renderTemplate = () => {
        if (profile && themeColors) {
            switch (templateConverter(profile.template, "number") as string) {
                case "classic":
                    return (
                        <div className="w-full flex justify-center sm:py-4 min-h-screen h-screen overflow-hidden bg-black">
                            <div
                                className="relative flex flex-col min-h-full w-full sm:w-64 md:w-96 sm:rounded-[50px_50px_100px_100px] shadow-[inset_10px_0_30px_rgba(0,255,255,0.3),inset_-10px_0_30px_rgba(0,255,255,0.3)] overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${adjustBrightness(themeColors.background, 12)} 40%, ${themeColors.background} 100%)`,
                                    boxShadow: getInsetShadow(themeColors.background),
                                }}
                            >
                                {/* Fixed Header */}
                                <div className="sticky top-0 z-10 bg-opacity-90 backdrop-blur-md flex flex-col items-center p-4">
                                    {/* Menu Button */}
                                    {profile.pages.length > 1 && (
                                        <button
                                            onClick={() => setMenuOpen(true)}
                                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-10"
                                            style={{
                                                color: themeColors.text,
                                                backgroundColor: `${themeColors.accent}30`,
                                            }}
                                        >
                                            <Menu className="w-5 h-5 " />
                                        </button>
                                    )}

                                    {/* Profile Image */}
                                    <motion.div
                                        className="relative w-24 h-24"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    >
                                        <Image
                                            src={profile.profilePicture || "/placeholder.svg"}
                                            alt={profile.displayName}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </motion.div>

                                    {/* Username and Social Icons */}
                                    <div className="text-center mt-2">
                                        <motion.h2
                                            className="text-xl font-bold capitalize"
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            style={{ color: themeColors.text }}
                                        >
                                            {profile.displayName}
                                        </motion.h2>
                                        <SocialIcons />
                                    </div>

                                    {/* Current Page Name */}
                                    {currentPage && (
                                        <motion.h3
                                            className="text-lg font-medium capitalize"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{ color: themeColors.text }}
                                        >
                                            {currentPage.name}
                                        </motion.h3>
                                    )}
                                </div>

                                {/* Scrollable Sections */}
                                <div className="flex-1 overflow-y-auto px-6 mt-6 hide-scrollbar">
                                    {currentPage?.sections?.map((section, sectionIndex) => (
                                        <GuestSection key={section.id} themeColors={themeColors} section={section} sectionIndex={sectionIndex}>
                                            {section.links?.map((link, linkIndex) => (
                                                <GuestLink key={link.id} themeColors={themeColors} link={link} linkIndex={linkIndex} />
                                            ))}
                                        </GuestSection>
                                    ))}

                                    {/* If no sections exist */}
                                    {(!currentPage?.sections || currentPage.sections.length === 0) && (
                                        <p className="text-center py-4 opacity-70" style={{ color: themeColors.text }}>
                                            No sections in this page
                                        </p>
                                    )}
                                </div>

                                {/* Page Menu */}
                                <PageMenu />

                                {/* Footer */}
                                <div className="mt-8 text-center text-xs opacity-50 pb-4" style={{ color: themeColors.text }}>
                                    <p>Powered by VIKMID</p>
                                </div>
                            </div>
                        </div>
                    )

                case "portrait":
                    return (
                        <div className="w-full flex justify-center sm:py-4 min-h-screen h-screen overflow-hidden " style={{ backgroundColor: "#000" }}>
                            <div
                                className="relative flex flex-col min-h-[100%]  w-full sm:w-64 md:w-96 sm:rounded-[50px_50px_100px_100px] shadow-[inset_10px_0_30px_rgba(0,255,255,0.3),inset_-10px_0_30px_rgba(0,255,255,0.3)] overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${adjustBrightness(themeColors.background, 12)} 40%, ${themeColors.background} 100%)`,
                                    boxShadow: getInsetShadow(themeColors.background),
                                }}
                            >
                                {/* Background Image */}
                                <Image
                                    src={profile.profilePicture || "/placeholder.svg"}
                                    alt={profile.displayName}
                                    width={100} // Makes it responsive
                                    height={100}
                                    className="object-cover w-full h-8/10"
                                    priority
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-60" />

                                {/* Content Wrapper */}
                                <motion.div
                                    className="absolute inset-0 flex flex-col items-center justify-between "
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {/* Fixed Header */}
                                    <div className="w-full flex flex-col items-center sticky top-0 z-10 backdrop-blur-md py-4">
                                        {/* Menu Button */}
                                        {profile.pages.length > 1 && (
                                            <button
                                                onClick={() => setMenuOpen(true)}
                                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-20"
                                                style={{
                                                    color: "#ffffff",
                                                    backgroundColor: `${themeColors.accent}50`,
                                                }}
                                            >
                                                <Menu className="w-5 h-5" />
                                            </button>
                                        )}

                                        {/* Username and Social Icons */}
                                        <motion.h2
                                            className="text-xl font-bold text-white mb-6 capitalize"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {profile.displayName}
                                        </motion.h2>
                                        <SocialIcons />

                                        {/* Current Page Name */}
                                        {currentPage && (
                                            <motion.h3
                                                className="text-lg font-medium text-white mt-2 capitalize"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                {currentPage.name}
                                            </motion.h3>
                                        )}
                                    </div>

                                    {/* Scrollable Sections and Links */}
                                    <div className="flex-1 overflow-auto px-6 mt-6 hide-scrollbar">
                                        {currentPage?.sections?.map((section, sectionIndex) => (
                                            <GuestSection key={section.id} themeColors={themeColors} section={section} sectionIndex={sectionIndex}>
                                                {section.links?.map((link, linkIndex) => (
                                                    <GuestLink key={link.id} themeColors={themeColors} link={link} linkIndex={linkIndex} />
                                                ))}
                                            </GuestSection>
                                        ))}

                                        {/* If no sections exist */}
                                        {(!currentPage?.sections || currentPage.sections.length === 0) && (
                                            <p className="text-center py-4 opacity-70" style={{ color: themeColors.text }}>
                                                No sections in this page
                                            </p>
                                        )}
                                    </div>

                                    {/* Page Menu */}
                                    <PageMenu />

                                    {/* Footer */}
                                    <div className="mt-6 text-center text-xs text-white opacity-50">
                                        <p>Powered by VIKMID</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                    )

                case "banner":
                    return (
                        <div className="w-full flex justify-center sm:py-4 min-h-screen h-screen overflow-hidden " style={{ backgroundColor: "#000" }}>
                            <div
                                className="relative flex flex-col min-h-[100%]  w-full sm:w-64 md:w-96 sm:rounded-[50px_50px_100px_100px] shadow-[inset_10px_0_30px_rgba(0,255,255,0.3),inset_-10px_0_30px_rgba(0,255,255,0.3)] overflow-hidden"
                                style={{
                                    background: `linear-gradient(135deg, ${adjustBrightness(themeColors.background, 12)} 40%, ${themeColors.background} 100%)`,
                                    boxShadow: getInsetShadow(themeColors.background),
                                }}
                            >
                                {/* FIXED SECTION */}
                                <div className="sticky top-0 bg-opacity-90 z-10">
                                    {/* Banner Image */}
                                    <div className="relative h-40 ">
                                        <Image
                                            src={profile.banner || profile.profilePicture}
                                            alt={profile.displayName}
                                            fill
                                            className="object-cover w-[100%]"
                                            priority
                                        />

                                        {/* Menu Button */}
                                        {profile.pages.length > 1 && (
                                            <button
                                                onClick={() => setMenuOpen(true)}
                                                className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
                                                style={{ color: "#ffffff" }}
                                            >
                                                <Menu className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <motion.div
                                            className="relative -mt-12 flex flex-col items-center"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {/* Profile Image */}
                                            <div
                                                className="relative w-24 h-24 border-4 rounded-full overflow-hidden"
                                                style={{ borderColor: themeColors.background }}
                                            >
                                                <Image
                                                    src={profile.profilePicture || "/placeholder.svg"}
                                                    alt={profile.displayName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Username and Social Icons */}
                                            <h2 className="text-xl font-bold mt-4 capitalize" style={{ color: themeColors.text }}>
                                                {profile.displayName}
                                            </h2>
                                            <SocialIcons />

                                            {/* Current Page Name */}
                                            {currentPage && (
                                                <h3 className="text-lg font-medium mt-2 capitalize" style={{ color: themeColors.text }}>
                                                    {currentPage.name}
                                                </h3>
                                            )}


                                        </motion.div>
                                    </div>
                                </div>

                                {/* SCROLLABLE SECTIONS & LINKS */}
                                <div className="flex-1 overflow-auto px-6 mt-6 hide-scrollbar">
                                    {currentPage?.sections?.map((section, sectionIndex) => (
                                        <GuestSection key={section.id} themeColors={themeColors} section={section} sectionIndex={sectionIndex}>
                                            {section.links?.map((link, linkIndex) => (
                                                <GuestLink key={link.id} themeColors={themeColors} link={link} linkIndex={linkIndex} />
                                            ))}
                                        </GuestSection>
                                    ))}

                                    {/* If no sections exist */}
                                    {(!currentPage?.sections || currentPage.sections.length === 0) && (
                                        <p className="text-center py-4 opacity-70" style={{ color: themeColors.text }}>
                                            No sections in this page
                                        </p>
                                    )}
                                </div>

                                {/* Page Menu */}
                                <PageMenu />

                                {/* Footer */}
                                <div className="mt-8 pb-4 text-center text-xs opacity-50" style={{ color: themeColors.text }}>
                                    <p>Powered by VIKMID</p>
                                </div>
                            </div>
                        </div>

                    )

                default:
                    return (
                        <div className="flex items-center justify-center h-screen">
                            <p>Template not found</p>
                        </div>
                    )
            }
        }
    }


    if (loading) {
        return <ProfileLoading />
    }

    if (notFound) {
        return <NotFound />
    }

    return renderTemplate()
}

