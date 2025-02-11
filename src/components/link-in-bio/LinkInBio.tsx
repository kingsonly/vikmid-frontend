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
    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
        { platform: 'Instagram', username: 'myinstagram', icon: Instagram },
        { platform: 'Twitter', username: 'mytwitter', icon: Twitter },
    ])
    const [newSocialAccount, setNewSocialAccount] = useState({ platform: '', username: '' })

    const profileInputRef = useRef<HTMLInputElement>(null)
    const bannerInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode)
    }, [darkMode])

    const addLink = () => {
        if (newLink.title && newLink.url) {
            setLinks(prevLinks => [...prevLinks, { ...newLink, enabled: true }])
            setNewLink({ title: '', url: '' })
        }
    }

    const removeLink = (index: number) => {
        setLinks(prevLinks => prevLinks.filter((_, i) => i !== index))
    }

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

    const addSocialAccount = () => {
        if (newSocialAccount.platform && newSocialAccount.username) {
            const platform = socialPlatforms.find(p => p.name === newSocialAccount.platform)
            if (platform) {
                setSocialAccounts(prev => [...prev, { ...newSocialAccount, icon: platform.icon }])
                setNewSocialAccount({ platform: '', username: '' })
            }
        }
    }

    const removeSocialAccount = (index: number) => {
        setSocialAccounts(prev => prev.filter((_, i) => i !== index))
    }

    const getTemplatePreview = () => {
        const baseClasses = `${selectedPalette.background} ${selectedPalette.text}`
        const linkClasses = `block p-3 rounded-md border ${selectedPalette.text} border-opacity-20 text-center hover:${selectedPalette.accent} hover:bg-opacity-10 transition-colors`

        const socialIcons = (
            <div className="flex justify-center space-x-4 mt-2">
                {socialAccounts.map((account, index) => (
                    <account.icon key={index} className="w-5 h-5" />
                ))}
            </div>
        )

        switch (selectedTemplate) {
            case 'classic':
                return (
                    <div className={`flex flex-col items-center space-y-6 p-6 ${baseClasses} min-h-full`}>
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

    return (
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
                    <Tabs defaultValue="page" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="page">Page Settings</TabsTrigger>
                            <TabsTrigger value="links">Links</TabsTrigger>
                            <TabsTrigger value="social">Social Accounts</TabsTrigger>
                        </TabsList>
                        <TabsContent value="page">
                            <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                <CardHeader>
                                    <CardTitle>Page Settings</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="username">Username</Label>
                                            <Input
                                                id="username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <Label className="mb-3 block">Layout</Label>
                                            <RadioGroup
                                                value={selectedTemplate}
                                                onValueChange={setSelectedTemplate}
                                                className="grid grid-cols-3 gap-4"
                                            >
                                                {['classic', 'portrait', 'banner'].map((template) => (
                                                    <div key={template}>
                                                        <RadioGroupItem
                                                            value={template}
                                                            id={template}
                                                            className="peer sr-only"
                                                        />
                                                        <Label
                                                            htmlFor={template}
                                                            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                        >
                                                            <div className="mb-2 capitalize">{template}</div>
                                                            <div className="w-full aspect-[1/2] rounded-lg bg-muted flex items-center justify-center p-2">
                                                                {template === 'classic' && <div className="w-8 h-8 rounded-full bg-primary" />}
                                                                {template === 'portrait' && <div className="w-full h-full bg-gradient-to-b from-transparent to-primary" />}
                                                                {template === 'banner' && (
                                                                    <>
                                                                        <div className="w-full h-1/4 bg-primary" />
                                                                        <div className="w-8 h-8 rounded-full bg-secondary absolute top-1/4" />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div>
                                            <Label className="mb-3 block">Color Palette</Label>
                                            <RadioGroup
                                                value={selectedPalette.name}
                                                onValueChange={(value) => setSelectedPalette(colorPalettes.find(p => p.name === value) || colorPalettes[0])}
                                                className="grid grid-cols-3 gap-4"
                                            >
                                                {colorPalettes.map((palette) => (
                                                    <div key={palette.name}>
                                                        <RadioGroupItem
                                                            value={palette.name}
                                                            id={palette.name}
                                                            className="peer sr-only"
                                                        />
                                                        <Label
                                                            htmlFor={palette.name}
                                                            className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                        >
                                                            <div className="mb-2">{palette.name}</div>
                                                            <div className={`w-full h-8 rounded-lg ${palette.background}`} />
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="dark-mode"
                                                checked={darkMode}
                                                onCheckedChange={setDarkMode}
                                            />
                                            <Label htmlFor="dark-mode">Dark Mode</Label>
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="block">Profile Picture</Label>
                                            <div className="relative w-32 h-32 mx-auto">
                                                <Image
                                                    src={profileImage.url}
                                                    alt="Profile"
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                                <Button
                                                    size="icon"
                                                    className="absolute bottom-0 right-0 rounded-full"
                                                    onClick={() => profileInputRef.current?.click()}
                                                >
                                                    <Camera className="w-4 h-4" />
                                                </Button>
                                                <input
                                                    ref={profileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageUpload(e, 'profile')}
                                                />
                                            </div>
                                            <p className="text-sm text-muted-foreground text-center">
                                                Profile image should be at least 600x600px
                                            </p>
                                        </div>

                                        {selectedTemplate === 'banner' && (
                                            <div className="space-y-4">
                                                <Label className="block">Banner Image</Label>
                                                <div className="relative w-full h-32">
                                                    <Image
                                                        src={bannerImage.url}
                                                        alt="Banner"
                                                        fill
                                                        className="rounded-lg object-cover"
                                                    />
                                                    <Button
                                                        size="icon"
                                                        className="absolute bottom-2 right-2 rounded-full"
                                                        onClick={() => bannerInputRef.current?.click()}
                                                    >
                                                        <Camera className="w-4 h-4" />
                                                    </Button>
                                                    <input
                                                        ref={bannerInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageUpload(e, 'banner')}
                                                    />
                                                </div>
                                                <p className="text-sm text-muted-foreground text-center">
                                                    Banner image should be at least 1200x600px
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="links">
                            <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                <CardHeader>
                                    <CardTitle>Manage Links</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="link-title">Link Title</Label>
                                            <Input
                                                id="link-title"
                                                value={newLink.title}
                                                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                                placeholder="Enter link title"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="link-url">URL</Label>
                                            <Input
                                                id="link-url"
                                                value={newLink.url}
                                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                                placeholder="Enter URL"
                                            />
                                        </div>
                                        <Button onClick={addLink} className="w-full">
                                            Add Link
                                        </Button>
                                    </div>
                                    <div className="mt-6 space-y-4">
                                        <h3 className="font-semibold">Your Links</h3>
                                        <AnimatePresence>
                                            {links.map((link, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Card className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-1 min-w-0">
                                                                    <h3 className="font-medium truncate">{link.title}</h3>
                                                                    <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                                                                </div>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => removeLink(index)}
                                                                    className="ml-2"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="social">
                            <Card className={darkMode ? 'bg-gray-800' : 'bg-white'}>
                                <CardHeader>
                                    <CardTitle>Social Accounts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="social-platform">Platform</Label>
                                            <select
                                                id="social-platform"
                                                value={newSocialAccount.platform}
                                                onChange={(e) => setNewSocialAccount({ ...newSocialAccount, platform: e.target.value })}
                                                className="w-full p-2 rounded-md border bg-background"
                                            >
                                                <option value="">Select Platform</option>
                                                {socialPlatforms.map((platform) => (
                                                    <option key={platform.name} value={platform.name}>{platform.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="social-username">Username</Label>
                                            <Input
                                                id="social-username"
                                                value={newSocialAccount.username}
                                                onChange={(e) => setNewSocialAccount({ ...newSocialAccount, username: e.target.value })}
                                                placeholder="Enter username"
                                            />
                                        </div>
                                        <Button onClick={addSocialAccount} className="w-full">
                                            Add Social Account
                                        </Button>
                                    </div>
                                    <div className="mt-6 space-y-4">
                                        <h3 className="font-semibold">Your Social Accounts</h3>
                                        <AnimatePresence>
                                            {socialAccounts.map((account, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Card className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center space-x-2">
                                                                    <account.icon className="h-5 w-5" />
                                                                    <div>
                                                                        <h3 className="font-medium">{account.platform}</h3>
                                                                        <p className="text-sm text-muted-foreground">{account.username}</p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    onClick={() => removeSocialAccount(index)}
                                                                    className="ml-2"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
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
                                {getTemplatePreview()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}