// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Copy, Eye, Share2 } from 'lucide-react'
// import PageSettingsTab from './PageSettingsTab'
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../store';
// import {
//     setLinkInBioState
// } from "../../store/link-in-bio/linkInBioSlice"
// import { useApiCall } from '@/utils/useApiCall'
// import SocialLinkTab from './SocialLinkTab'
// import PagesTab from './PagesTab'
// import LinkInBioTemplate from './LinkInBioTemplate'
// import { useMobile } from '../ModalComponent/useMobile'
// import { PageLoader } from '../loader/PageLoader'


// export default function LinkInBio() {
//     const linkInBioState = useSelector((state: RootState) => state.linkInBio);
//     const userDetails = useSelector((state: RootState) => state.userDetails);
//     const dispatch = useDispatch<AppDispatch>();
//     const { apiCall } = useApiCall();
//     const isMobile = useMobile()
//     useEffect(() => {
//         getLinkInBio()
//     }, [])

//     const [loader, setLoader] = useState<boolean>(false)
//     const [showPreview, setShowPreview] = useState<boolean>(false)


//     const getLinkInBio = async () => {

//         try {
//             const linkInBioData = await apiCall({
//                 endpoint: `/link-in-bio/init/${userDetails.activeHub}`,
//                 method: "get",
//                 "showToast": false,
//             }
//             );
//             if (linkInBioData) {
//                 console.log("link in bio real api data", linkInBioData.data)
//                 dispatch(setLinkInBioState(linkInBioData.data))
//                 setLoader(true)

//             }
//         } catch (error) {
//             console.error("Error fetching link in bio:", error);
//         }
//     }

//     const templateConverter = (template: string | number, type: "string" | "number") => {
//         var template: string | number
//         if (type === "string") {
//             switch (template) {
//                 case "classic":
//                     template = 1
//                     break;
//                 case "portrait":
//                     template = 2
//                     break;
//                 case "banner":
//                     template = 3
//                     break;

//                 default:
//                     template = 1
//                     break;
//             }
//         } else {
//             switch (template) {
//                 case 1:
//                     template = "classic"
//                     break;
//                 case 2:
//                     template = "portrait"
//                     break;
//                 case 3:
//                     template = "banner"
//                     break;

//                 default:
//                     template = "classic"
//                     break;
//             }
//         }

//         return template;
//     }

//     const renderPreview = () => {
//         if (isMobile) {
//             if (showPreview) {
//                 return (
//                     <div className="relative">
//                         <div className="sticky top-6">
//                             <div className="mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-[14px] border-zinc-800 overflow-hidden shadow-xl">
//                                 <div className="relative h-full">
//                                     {/* Phone Notch */}
//                                     <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl" />
//                                     <LinkInBioTemplate
//                                         linkInBioState={linkInBioState}
//                                         selectedTemplate={templateConverter(linkInBioState.template, "number") as string}
//                                         selectedPalette={JSON.parse(linkInBioState.themeColors as string)}
//                                         profileImage={{ url: linkInBioState.profilePicture }}
//                                         bannerImage={{ url: linkInBioState.banner }}
//                                         username={linkInBioState.displayName}
//                                         socialAccounts={linkInBioState.socialLinks}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )
//             }
//             return null

//         }
//         return (
//             <div className="relative flex justify-end">
//                 <div className="sticky top-6">
//                     <div className="mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-[14px] border-zinc-800 overflow-hidden shadow-xl">
//                         <div className="relative h-full">
//                             {/* Phone Notch */}
//                             <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl" />
//                             <LinkInBioTemplate
//                                 linkInBioState={linkInBioState}
//                                 selectedTemplate={templateConverter(linkInBioState.template, "number") as string}
//                                 selectedPalette={JSON.parse(linkInBioState.themeColors as string)}
//                                 profileImage={{ url: linkInBioState.profilePicture }}
//                                 bannerImage={{ url: linkInBioState.banner }}
//                                 username={linkInBioState.displayName}
//                                 socialAccounts={linkInBioState.socialLinks}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )

//     }



//     return (
//         <>
//             {loader ?
//                 <div className={`space-y-6 dark bg-gray-900 text-white min-h-screen p-6 transition-colors duration-200`}>
//                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 justify-between items-center">
//                         <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
//                             Manage Link in Bio Profile
//                         </h1>
//                         <div className="flex gap-2">
//                             <Button variant="outline" className="bg-purple-800 text-white border-purple-600 hover:bg-purple-700">
//                                 <Copy className="w-4 h-4 mr-2" />
//                                 Copy URL
//                             </Button>
//                             {isMobile &&
//                                 <Button onClick={() => setShowPreview(!showPreview)} className=" text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
//                                     <Eye className="w-4 h-4 mr-2" />
//                                     {showPreview ? "Settings" : "Preview"}
//                                 </Button>
//                             }

//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         {/* Editor Section */}
//                         {!showPreview &&
//                             (
//                                 <div className="space-y-6">
//                                     <Tabs defaultValue="page-settings" className="w-full">
//                                         <TabsList className="grid w-full grid-cols-3">
//                                             <TabsTrigger value="page-settings">Page Settings</TabsTrigger>
//                                             <TabsTrigger value="pages">Pages</TabsTrigger>
//                                             <TabsTrigger value="social">Social Links</TabsTrigger>
//                                         </TabsList>
//                                         <PageSettingsTab linkInBioState={linkInBioState} />
//                                         <PagesTab linkInBioState={linkInBioState} />
//                                         <SocialLinkTab linkInBioState={linkInBioState} />

//                                     </Tabs>
//                                 </div>
//                             )
//                         }


//                         {/* Phone Preview Section */}
//                         {renderPreview()}

//                     </div>


//                 </div> :
//                 <PageLoader />
//             }
//         </>
//     )
// }


"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Eye } from "lucide-react"
import PageSettingsTab from "./PageSettingsTab"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "../../store"
import { setLinkInBioState } from "../../store/link-in-bio/linkInBioSlice"
import { useApiCall } from "@/utils/useApiCall"
import SocialLinkTab from "./SocialLinkTab"
import PagesTab from "./PagesTab"
import LinkInBioTemplate from "./LinkInBioTemplate"
import { useMobile } from "../ModalComponent/useMobile"
import { PageLoader } from "../loader/PageLoader"
import { Input } from "@/components/ui/input"
import { Check, Pencil, X } from "lucide-react"


export default function LinkInBio() {
    const linkInBioState = useSelector((state: RootState) => state.linkInBio)
    const userDetails = useSelector((state: RootState) => state.userDetails)
    const dispatch = useDispatch<AppDispatch>()
    const { apiCall } = useApiCall()
    const isMobile = useMobile()
    useEffect(() => {
        getLinkInBio()
    }, [])

    const [loader, setLoader] = useState<boolean>(false)
    const [showPreview, setShowPreview] = useState<boolean>(false)
    const [bioUrl, setBioUrl] = useState<string>("")
    const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false)
    const [subdomain, setSubdomain] = useState<string>("")
    const [domain, setDomain] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (linkInBioState.displayName) {
            const formattedSubdomain = linkInBioState.hub.hubUrl.split(".")
            setSubdomain(formattedSubdomain[0])
            setBioUrl(`${linkInBioState.hub.hubUrl}`)
            setDomain(formattedSubdomain.slice(1).join("."))
        }
    }, [])

    useEffect(() => {
        if (isEditingUrl && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditingUrl])

    const getLinkInBio = async () => {
        try {
            const linkInBioData = await apiCall({
                endpoint: `/link-in-bio/init/${userDetails.activeHub}`,
                method: "get",
                showToast: false,
            })
            if (linkInBioData) {
                console.log("link in bio real api data", linkInBioData.data)
                dispatch(setLinkInBioState(linkInBioData.data))
                setLoader(true)
            }
        } catch (error) {
            console.error("Error fetching link in bio:", error)
        }
    }

    const templateConverter = (template: string | number, type: "string" | "number") => {
        var template: string | number
        if (type === "string") {
            switch (template) {
                case "classic":
                    template = 1
                    break
                case "portrait":
                    template = 2
                    break
                case "banner":
                    template = 3
                    break

                default:
                    template = 1
                    break
            }
        } else {
            switch (template) {
                case 1:
                    template = "classic"
                    break
                case 2:
                    template = "portrait"
                    break
                case 3:
                    template = "banner"
                    break

                default:
                    template = "classic"
                    break
            }
        }

        return template
    }

    const renderPreview = () => {
        if (isMobile) {
            if (showPreview) {
                return (
                    <div className="relative">
                        <div className="sticky top-6">
                            <div className="mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-[14px] border-zinc-800 overflow-hidden shadow-xl">
                                <div className="relative h-full">
                                    {/* Phone Notch */}
                                    <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl" />
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
                )
            }
            return null
        }
        return (
            <div className="relative flex justify-end">
                <div className="sticky top-6">
                    <div className="mx-auto w-[300px] h-[600px] bg-black rounded-[3rem] border-[14px] border-zinc-800 overflow-hidden shadow-xl">
                        <div className="relative h-full">
                            {/* Phone Notch */}
                            <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl" />
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
        )
    }

    const [isCopied, setIsCopied] = useState<boolean>(false)

    const copyUrlToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`https://${bioUrl}`)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }

    const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow alphanumeric characters and hyphens
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
        setSubdomain(value)
    }

    const saveSubdomain = async () => {
        if (!subdomain) {
            // toast({
            //     title: "Invalid subdomain",
            //     description: "Subdomain cannot be empty",
            //     variant: "destructive",
            // })
            return
        }

        // Here you would typically make an API call to update the subdomain
        // For now, we'll just update the local state
        setBioUrl(`${subdomain}.${domain}`)
        setIsEditingUrl(false)

        // toast({
        //     title: "Subdomain updated",
        //     description: `Your link is now ${subdomain}.vikmid.com`,
        // })

        // Uncomment and adapt this code when you have the API endpoint ready

        try {
            await apiCall({
                endpoint: `/hub/update/${linkInBioState.hub.id}`,
                method: "put",
                data: { hubUrl: `${subdomain}.${domain}` },
                showToast: true,
                successMessage: "Subdomain updated successfully"
            })
            setBioUrl(`${subdomain}.${domain}`)
            setIsEditingUrl(false)
        } catch (error) {
            console.error("Error updating subdomain:", error)
            //   toast({
            //     title: "Update failed",
            //     description: "Could not update subdomain",
            //     variant: "destructive"
            //   })
        }

    }

    return (
        <>
            {loader ? (
                <div className={`space-y-6 dark bg-gray-900 text-white min-h-screen p-6 transition-colors duration-200`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 justify-between items-center">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                            Manage Link in Bio Profile
                        </h1>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="bg-purple-800 text-white border-purple-600 hover:bg-purple-700"
                                    onClick={copyUrlToClipboard}
                                >
                                    {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                    {isCopied ? "Copied!" : "Copy URL"}
                                </Button>
                                {isMobile && (
                                    <Button
                                        onClick={() => setShowPreview(!showPreview)}
                                        className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        {showPreview ? "Settings" : "Preview"}
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center w-full">
                                {isEditingUrl ? (
                                    <div className="flex items-center w-full">
                                        <Input
                                            ref={inputRef}
                                            value={subdomain}
                                            onChange={handleSubdomainChange}
                                            className="bg-gray-800 border-gray-700 text-white pr-16"
                                        />
                                        <span className="text-gray-400 ml-1">.{domain}</span>
                                        <div className="flex ml-2">
                                            <Button size="icon" variant="ghost" onClick={saveSubdomain} className="h-8 w-8 text-green-500">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => setIsEditingUrl(false)}
                                                className="h-8 w-8 text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center w-full">
                                        <Input value={bioUrl} disabled className="bg-gray-800 border-gray-700 text-white" />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => setIsEditingUrl(true)}
                                            className="ml-2 h-8 w-8 text-blue-500"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Editor Section */}
                        {!showPreview && (
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
                        )}

                        {/* Phone Preview Section */}
                        {renderPreview()}
                    </div>
                </div>
            ) : (
                <PageLoader />
            )}
        </>
    )
}
