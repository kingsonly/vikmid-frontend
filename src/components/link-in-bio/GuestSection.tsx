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
import { Section } from "@/store/link-in-bio/interface/linkInBioInterface"
interface themeColorsInterface {
    background: string;
    text: string;
    accent: string;

}
export default function GuestSection({ section, themeColors, children, sectionIndex }: { section: Section, themeColors: themeColorsInterface, children: React.ReactNode, sectionIndex: number }) {

    return (
        <div>

            <motion.div
                key={section.id}
                className="rounded-lg overflow-hidden"
                style={{
                    backgroundColor: section && section?.title && section?.title?.length > 0 ? `${themeColors.background}` : '',
                    // Removed border
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * sectionIndex }}
            >
                {section && section?.title && section?.title?.length > 0 ?
                    <div
                        className="px-4 py-3 font-medium text-lg"
                        style={{
                            color: themeColors.text,
                            // Removed border-bottom
                        }}
                    >
                        {section.title}
                    </div> : null
                }


                <div className="p-4 space-y-3">
                    {children}

                </div>
            </motion.div>

        </div>
    )
}

