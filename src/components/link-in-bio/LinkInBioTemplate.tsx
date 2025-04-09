"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getSocialPlatform } from "@/utils/helpers"
import Link from "next/link"
import GuestSection from "./GuestSection"
import GuestLink from "./GuestLink"
import GuestSocialLink from "./GuesSocialLink"
import defaultImage from "../../../public/bioprofile.jpg"
// Using the Redux types provided
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
    icon?: React.ElementType // Added for rendering
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

interface LinkInBioState {
    id: string
    hubId: number
    template: number
    displayName: string
    profilePicture?: string | null
    banner?: string | null
    themeColors?: string | null
    status: boolean
    createdAt: string
    updatedAt: string
    pages: Page[]
    socialLinks?: SocialLink[] | null
}

interface TemplateProps {
    linkInBioState?: LinkInBioState
    selectedTemplate: string
    selectedPalette: {
        name: string
        background: string
        text: string
        accent: string
    }
    profileImage: {
        url: string | null | undefined
    }
    bannerImage: {
        url: string | null | undefined
    }
    username: string
    socialAccounts: SocialLink[] | null | undefined
}

export default function LinkInBioTemplate({
    linkInBioState,
    selectedTemplate,
    selectedPalette,
    profileImage,
    bannerImage,
    username,
    socialAccounts,
}: TemplateProps) {
    const [activePage, setActivePage] = useState<string | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)

    // Default empty state if linkInBioState is undefined
    const safeState = linkInBioState || {
        id: "",
        hubId: 0,
        template: 0,
        displayName: "",
        status: true,
        createdAt: "",
        updatedAt: "",
        pages: [],
        socialLinks: [],
    }

    // Set the first page as active by default
    useEffect(() => {
        if (safeState.pages && safeState.pages.length > 0 && !activePage) {
            setActivePage(safeState.pages[0].id)
        }
    }, [safeState.pages, activePage])

    // Get theme colors from state
    let themeColors = { background: "#000000", text: "#ffffff", accent: "#9333ea" }
    try {
        if (safeState.themeColors) {
            themeColors = JSON.parse(safeState.themeColors)
        }
    } catch (error) {
        console.error("Error parsing theme colors:", error)
    }

    // Get the active page object
    const currentPage = safeState.pages.find((page) => page.id === activePage)

    // Styles for links
    const linkClasses = `block p-3 rounded-md border border-opacity-20 text-center hover:bg-opacity-10 transition-colors`
    const socialIcon = (socialNetworkName: string, url: string) => {
        let icon = getSocialPlatform(socialNetworkName)
        if (!icon) return
        return <Link href={url} target="_blank"> <icon.icon className="w-5 h-5" style={{ color: themeColors.accent }} /> </Link>
    }
    // Social icons component
    // const SocialIcons = () => (
    //     <div className="flex justify-center space-x-4 mt-2">
    //         {socialAccounts && socialAccounts.map((account, index) => {
    //             const Icon = account.socialNetworkName
    //             return socialIcon(Icon, account.link)
    //         })}
    //     </div>
    // )

    const SocialIcons = () => (
        <div className="grid grid-cols-7 gap-4 justify-center mt-2">
            {socialAccounts && socialAccounts.map((account) => {
                const Icon = getSocialPlatform(account.socialNetworkName)
                return Icon ? (
                    <GuestSocialLink key={account.id} socialLink={account} themeColors={themeColors?.accent} Icon={Icon} />
                ) : null
            })}
        </div>
    )
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

    const PageMenu = () => {
        if (safeState && themeColors) {
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
                                {safeState.pages.map((page) => (
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


    const renderTemplate = () => {

        switch (selectedTemplate) {
            case "classic":
                return (
                    <div className="w-full flex justify-center sm:py-4 min-h-screen h-screen overflow-hidden bg-black">
                        <div
                            className="relative flex flex-col min-h-full w-full sm:w-64 md:w-96  shadow-[inset_10px_0_30px_rgba(0,255,255,0.3),inset_-10px_0_30px_rgba(0,255,255,0.3)] overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${adjustBrightness(themeColors.background, 12)} 40%, ${themeColors.background} 100%)`,
                                boxShadow: getInsetShadow(themeColors.background),
                            }}
                        >
                            {/* Fixed Header */}
                            <div className="sticky top-0 z-10 bg-opacity-90 backdrop-blur-md flex flex-col items-center p-4">
                                {/* Menu Button */}
                                {safeState.pages.length > 1 && (
                                    <button
                                        onClick={() => setMenuOpen(true)}
                                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-opacity-10"
                                        style={{
                                            color: themeColors.text,
                                            backgroundColor: `${themeColors.accent}30`,
                                        }}
                                    >
                                        <Menu className="w-5 h-5" />
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
                                        src={profileImage.url || defaultImage}
                                        alt={safeState.displayName}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </motion.div>

                                {/* Username and Social Icons */}
                                <div className="text-center mt-2 capitalize">
                                    <motion.h2
                                        className="text-xl font-bold"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        style={{ color: themeColors.text }}
                                    >
                                        {safeState.displayName}
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
                    <div className="w-full flex justify-center  min-h-screen h-screen overflow-hidden " style={{ backgroundColor: "#000" }}>
                        <div
                            className="relative flex flex-col min-h-[100%]  w-full   overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${adjustBrightness(themeColors.background, 12)} 40%, ${themeColors.background} 100%)`,
                                boxShadow: getInsetShadow(themeColors.background),
                            }}
                        >
                            {/* Background Image */}
                            <Image
                                src={profileImage.url || defaultImage}
                                alt={safeState.displayName}
                                width={100} // Makes it responsive
                                height={100}
                                className="object-cover w-full h-8/10"
                                priority
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-60" />

                            {/* Content Wrapper */}
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-between p-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {/* Fixed Header */}
                                <div className="w-full flex flex-col items-center sticky top-0 z-10 backdrop-blur-md py-4">
                                    {/* Menu Button */}
                                    {safeState.pages.length > 1 && (
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
                                        {safeState.displayName}
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
                                <div className="flex-1 overflow-auto mt-6 hide-scrollbar">
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
                            className="relative flex flex-col min-h-[100%]  w-full  overflow-hidden"
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
                                        src={bannerImage.url || defaultImage}
                                        alt={safeState.displayName}
                                        fill
                                        className="object-cover w-[100%]"
                                        priority
                                    />

                                    {/* Menu Button */}
                                    {safeState.pages.length > 1 && (
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
                                                src={profileImage.url || defaultImage}
                                                alt={safeState.displayName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Username and Social Icons */}
                                        <h2 className="text-xl font-bold mt-4 capitalize" style={{ color: themeColors.text }}>
                                            {safeState.displayName}
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

    return renderTemplate()
}

