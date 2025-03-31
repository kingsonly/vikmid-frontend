'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Camera, Copy, ExternalLink, Instagram, Share2, Twitter, Facebook, LinkedinIcon as LinkedIn, YoutubeIcon as YouTube, TwitterIcon as TikTok, Twitch, Github, Dribbble, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageSettingsTab from './PageSettingsTab'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
    setLinkInBioState,
    updateDisplayName,
    updateBanner,
    updateThemeColors,
    addPage,
    updatePage,
    removePage,
    addSection,
    updateSection,
    removeSection,
    addLink,
    updateLink,
    removeLink,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    reorderSocialLinks
} from "../../store/link-in-bio/linkInBioSlice"
import { useApiCall } from '@/utils/useApiCall'
import SocialLinkTab from './SocialLinkTab'
import PagesTab from './PagesTab'
import LinkInBioTemplate from './LinkInBioTemplate'

interface LinkType {
    title: string
    url: string
    enabled: boolean
}

interface ImageType {
    url: string
    file: File | null
}

interface ColorPalette {
    name: string
    background: string
    text: string
    accent: string
}

interface SocialAccount {
    platform: string
    username: string
    icon: React.ElementType
}

const colorPalettes: ColorPalette[] = [
    { name: 'Modern Dark', background: 'bg-gray-900', text: 'text-gray-100', accent: 'bg-purple-500' },
    { name: 'Ocean Breeze', background: 'bg-blue-900', text: 'text-blue-100', accent: 'bg-teal-400' },
    { name: 'Sunset Vibes', background: 'bg-orange-900', text: 'text-yellow-100', accent: 'bg-pink-500' },
    { name: 'Forest Dream', background: 'bg-green-900', text: 'text-green-100', accent: 'bg-yellow-400' },
    { name: 'Lavender Mist', background: 'bg-purple-900', text: 'text-purple-100', accent: 'bg-pink-400' },
]

const socialPlatforms = [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'Facebook', icon: Facebook },
    { name: 'LinkedIn', icon: LinkedIn },
    { name: 'YouTube', icon: YouTube },
    { name: 'TikTok', icon: TikTok },
    { name: 'Twitch', icon: Twitch },
    { name: 'Github', icon: Github },
    { name: 'Dribbble', icon: Dribbble },
]

export default function LinkInBio() {
    const linkInBioState = useSelector((state: RootState) => state.linkInBio);
    const userDetails = useSelector((state: RootState) => state.userDetails);
    const dispatch = useDispatch<AppDispatch>();
    const { apiCall } = useApiCall();
    useEffect(() => {
        getLinkInBio()
    }, [])

    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
        { platform: 'Instagram', username: 'myinstagram', icon: Instagram },
        { platform: 'Twitter', username: 'mytwitter', icon: Twitter },
    ])

    const [links, setLinks] = useState<LinkType[]>([
        { title: 'My YouTube Channel', url: 'https://youtube.com/mychannelß', enabled: true },
        { title: 'Latest Blog Post', url: 'https://myblog.com/latest', enabled: true },
        { title: 'Twitter', url: 'https://twitter.com/myhandle', enabled: true },
    ])
    const [newLink, setNewLink] = useState({ title: '', url: '' })
    const [username, setUsername] = useState('kingsonly')
    const [selectedTemplate, setSelectedTemplate] = useState('classic')
    const [profileImage, setProfileImage] = useState<ImageType>({ url: '/placeholder.svg?height=600&width=600', file: null })
    const [bannerImage, setBannerImage] = useState<ImageType>({ url: '/placeholder.svg?height=600&width=1200', file: null })
    const [darkMode, setDarkMode] = useState(true)
    const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(colorPalettes[0])

    const [displayAll, setDisplayAll] = useState<boolean>(false)

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode)
    }, [darkMode])




    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
        const file = event.target.files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            if (type === 'profile') {
                setProfileImage({ url, file })
            } else {
                setBannerImage({ url, file })
            }
        }
    }

    const getTemplatePreview = () => {
        const baseClasses = `${selectedPalette.background} ${selectedPalette.text}`
        const linkClasses = `block p-3 rounded-md border ${selectedPalette.text} border-opacity-20 text-center hover:${selectedPalette.accent} hover:bg-opacity-10 transition-colors`

        const socialIcons = (
            <div className="flex justify-center space-x-4 mt-2">
                {socialAccounts.map((account, index) => (
                    <account.icon key={index} className="w-5 h-5" style={{ color: JSON.parse(linkInBioState.themeColors as string).accent }} />
                ))}
            </div>
        )

        switch (selectedTemplate) {
            case 'classic':
                return (
                    <div
                        className={`flex flex-col items-center space-y-6 p-6  min-h-full`}
                        style={{ backgroundColor: JSON.parse(linkInBioState.themeColors as string).background }}
                    >
                        <motion.div
                            className="relative w-24 h-24"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <Image
                                src={profileImage.url}
                                alt="Profile"
                                fill
                                className="rounded-full object-cover"
                            />
                        </motion.div>
                        <div className="text-center">
                            <motion.h2
                                className="text-xl font-bold"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                style={{ color: JSON.parse(linkInBioState.themeColors as string).text }}
                            >
                                {username}
                            </motion.h2>
                            {socialIcons}
                        </div>
                        <motion.div
                            className="w-full space-y-3 max-w-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {links.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkClasses}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    {link.title}
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                )
            case 'portrait':
                return (
                    <div className="relative min-h-full">
                        <Image
                            src={profileImage.url}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                        <motion.div
                            className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-end p-6 ${selectedPalette.text}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.h2
                                className="text-xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {username}
                            </motion.h2>
                            {socialIcons}
                            <motion.div
                                className="w-full space-y-3 max-w-sm mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {links.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={linkClasses}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        {link.title}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                )
            case 'banner':
                return (
                    <div className={`flex flex-col min-h-full ${baseClasses}`}>
                        <div className="relative h-40">
                            <Image
                                src={bannerImage.url}
                                alt="Banner"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <motion.div
                                className="relative -mt-12 flex flex-col items-center"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="relative w-24 h-24 border-4 border-black rounded-full overflow-hidden">
                                    <Image
                                        src={profileImage.url}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-bold mt-4">{username}</h2>
                                {socialIcons}
                                <motion.div
                                    className="w-full space-y-3 max-w-sm px-6 mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {links.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={linkClasses}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            {link.title}
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                )
        }
    }

    const getLinkInBio = async () => {

        try {
            const linkInBioData = await apiCall({
                endpoint: `/link-in-bio/init/${userDetails.activeHub}`,
                method: "get",
                "showToast": false,
            }
            );
            if (linkInBioData) {
                console.log("link in bio real api data", linkInBioData.data)
                dispatch(setLinkInBioState(linkInBioData.data))
                setDisplayAll(true)

            }
        } catch (error) {
            console.error("Error fetching link in bio:", error);
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

    return (
        <>
            {displayAll ?
                <div className={`space-y-6 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-6 transition-colors duration-200`}>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                            Manage Link in Bio
                        </h1>
                        <div className="flex gap-2">
                            <Button variant="outline" className="bg-purple-800 text-white border-purple-600 hover:bg-purple-700">
                                <Copy className="w-4 h-4 mr-2" />
                                Copy URL
                            </Button>
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Editor Section */}
                        <div className="space-y-6">
                            <Tabs defaultValue="page-settings" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="page-settings">Page Settings</TabsTrigger>
                                    <TabsTrigger value="pages">Pages</TabsTrigger>
                                    <TabsTrigger value="social">Social Links</TabsTrigger>
                                </TabsList>
                                <PageSettingsTab linkInBioState={linkInBioState} />
                                <PagesTab linkInBioState={linkInBioState} />
                                <SocialLinkTab linkInBioState={linkInBioState} />

                            </Tabs>
                        </div>

                        {/* Phone Preview Section */}
                        <div className="relative">
                            <div className="sticky top-6">
                                <div className="mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-[14px] border-zinc-800 overflow-hidden shadow-xl">
                                    <div className="relative h-full">
                                        {/* Phone Notch */}
                                        <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl" />

                                        {/* Preview Content */}
                                        {/* {getTemplatePreview()} */}
                                        <LinkInBioTemplate
                                            linkInBioState={linkInBioState}
                                            selectedTemplate={templateConverter(linkInBioState.template, "number") as string}
                                            selectedPalette={JSON.parse(linkInBioState.themeColors as string)}
                                            profileImage={{ url: linkInBioState.profilePicture }}
                                            bannerImage={{ url: linkInBioState.banner }}
                                            username={linkInBioState.displayName}
                                            socialAccounts={linkInBioState.socialLinks}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div>loading</div>
            }
        </>
    )
}