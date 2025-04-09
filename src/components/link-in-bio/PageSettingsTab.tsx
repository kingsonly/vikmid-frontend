'use client'
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Camera, Pencil, Save, Shuffle, X } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LinkInBioState } from '../../store/link-in-bio/interface/linkInBioInterface';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { useApiCall } from '@/utils/useApiCall'
import { HexColorPicker } from "react-colorful";
import {
    updateTemplate,
    updateDisplayName,
    updateBanner,
    updateThemeColors,
    updateProfilePicture,
} from "../../store/link-in-bio/linkInBioSlice"
import { LoadingSpinner } from '../loader/Loader'
import ModalComponent from '../ModalComponent/ModalComponent'
interface ImageType {
    url: string | File | any
    file: File | null
}

interface ColorPalette {
    name: string
    background: string
    text: string
    accent: string
}


const originalColorPalettes: ColorPalette[] = [
    { name: 'Modern Dark', background: '#111827', text: '#F3F4F6', accent: '#8B5CF6' }, // gray-900, gray-100, purple-500
    { name: 'Ocean Breeze', background: '#1E3A8A', text: '#DBEAFE', accent: '#2DD4BF' }, // blue-900, blue-100, teal-400
    { name: 'Sunset Vibes', background: '#7C2D12', text: '#FEF3C7', accent: '#EC4899' }, // orange-900, yellow-100, pink-500
    { name: 'Forest Dream', background: '#064E3B', text: '#D1FAE5', accent: '#FACC15' }, // green-900, green-100, yellow-400
    { name: 'Lavender Mist', background: '#581C87', text: '#EDE9FE', accent: '#F472B6' }  // purple-900, purple-100, pink-400
];
interface PageSettingsTabProps {
    linkInBioState: LinkInBioState;
    // onSave?: () => void;
    // onDelete?: () => void;
    // onReset?: () => void;
}
export default function PageSettingsTab(param: PageSettingsTabProps) {
    const { linkInBioState } = param
    const [username, setUsername] = useState('')
    const [editDisplayname, setEditDisplayname] = useState<boolean>(false)
    const [displayNameLoader, setDisplayNameLoader] = useState<boolean>(false)
    const [colorPalettes, setColorPalettes] = useState<ColorPalette[]>(originalColorPalettes);
    const [color, setColor] = useState<{ section: string, color: string } | null>();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [hidePaletteCustomizeView, setHidePaletteCustomizeView] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<string>('')
    const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>()
    const [profileImage, setProfileImage] = useState<ImageType>({ url: linkInBioState.profilePicture && linkInBioState.profilePicture?.length > 0 ? linkInBioState.profilePicture : "/public/bioprofile.jpg", file: null })
    const [bannerImage, setBannerImage] = useState<ImageType>({ url: linkInBioState.banner && linkInBioState.banner?.length > 0 ? linkInBioState.banner : "/public/bioprofile.jpg", file: null })

    const dispatch = useDispatch<AppDispatch>();
    const { apiCall } = useApiCall();

    const displayNameRef = useRef<HTMLInputElement>(null);
    const profileInputRef = useRef<HTMLInputElement>(null)
    const bannerInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!isDialogOpen) {
            setHidePaletteCustomizeView(false)
        }
    }, [isDialogOpen])
    useEffect(() => {
        if (!linkInBioState.displayName) {
            setEditDisplayname(true)
        }
        if (linkInBioState.displayName) {
            setUsername(linkInBioState.displayName)
        }

        if (linkInBioState.banner && linkInBioState.banner.length > 0) {
            setBannerImage({ url: linkInBioState.banner, file: null })
        }

        if (linkInBioState.profilePicture && linkInBioState.profilePicture.length > 0) {
            setProfileImage({ url: linkInBioState.profilePicture, file: null })
        }
        initTemplate(linkInBioState.template)


    }, [])

    useEffect(() => {
        if (editDisplayname && displayNameRef.current) {
            displayNameRef.current.focus();
        }
    }, [editDisplayname]);

    useEffect(() => {
        console.log(JSON.stringify({ name: 'Modern Dark', background: '#111827', text: '#F3F4F6', accent: '#8B5CF6' }))
        // Replace a specific palette (for example, replace "Modern Dark" with selectedPalette)
        if (linkInBioState && (linkInBioState.themeColors as string).length > 2) {
            let themeColor = JSON.parse(linkInBioState.themeColors as string)
            setSelectedPalette(themeColor)
            const newPalettes = colorPalettes.map((palette) =>
                palette.name === themeColor.name ? themeColor : palette
            );
            setColorPalettes(newPalettes);
        }

    }, [linkInBioState]);

    const saveDisplayName = async () => {
        let data = {
            displayName: username
        }
        setDisplayNameLoader(true)
        try {
            const response = await apiCall({
                endpoint: `/link-in-bio/update/${linkInBioState.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `Username Updated`,
            }
            );
            if (response) {
                dispatch(updateDisplayName(username))
                setEditDisplayname(false)
                setDisplayNameLoader(false)
                setEditDisplayname(false)
            }
        } catch (error) {
            console.error("Error updating display name:", error);
            setDisplayNameLoader(false)
        }
    }

    const closeDisplayNameEditMode = () => {
        setEditDisplayname(false)
    }

    const showDisplayNameInput = () => {
        setEditDisplayname(true)
    }

    const RenderDisplayName = () => {
        if (editDisplayname) {
            return (

                <div>
                    <Label htmlFor="username">Username</Label>
                    <div className='flex justify-between '>
                        <div className='w-[80%]'>
                            <Input
                                id="username"
                                ref={displayNameRef}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='w-[20%] flex justify-end'>
                            <div onClick={saveDisplayName}>
                                {!displayNameLoader ? <Save className='cursor-pointer text-green-500' /> : <LoadingSpinner />}
                            </div>
                            <div onClick={closeDisplayNameEditMode}>
                                {linkInBioState.displayName ? <X className='cursor-pointer text-red-500' /> : null}

                            </div>
                        </div>

                    </div>

                </div>



            )
        }
        return (

            <div>
                <Label htmlFor="username">Username</Label>
                <div className='flex justify-between '>
                    <div className='w-[100%] cursor-pointer' onClick={showDisplayNameInput}>
                        <h2 className='text-xl font-bold'>
                            {linkInBioState.displayName}
                        </h2>

                    </div>
                    <div className='w-[20%] flex justify-end'>
                        <div className='cursor-pointer' onClick={showDisplayNameInput}>
                            <Pencil />
                        </div>
                    </div>

                </div>
            </div>
        )
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

    const setNewTemplate = async (template: string) => {
        let convertedTemplate: number | string = templateConverter(template, "string")
        const data: {
            template: number
        } = {
            template: convertedTemplate as number
        }
        try {
            const response = await apiCall({
                endpoint: `/link-in-bio/update/${linkInBioState.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `TemplateUpdated`,
            }
            );
            if (response) {
                dispatch(updateTemplate(convertedTemplate as number))
                setSelectedTemplate(template)
            }
        } catch (error) {
            console.error("Error updating display name:", error);
            setDisplayNameLoader(false)
        }


    }

    const RenderTemplateSelector = () => {
        return (
            // <div>
            //     <Label className="mb-3 block">Layout</Label>
            //     <RadioGroup
            //         value={selectedTemplate}
            //         onValueChange={(e) => setNewTemplate(e)}
            //         className="grid grid-cols-3 gap-4"
            //     >
            //         {['classic', 'portrait', 'banner'].map((template) => (
            //             <div key={template}>
            //                 <RadioGroupItem
            //                     value={template}
            //                     id={template}
            //                     className="peer sr-only"
            //                 />
            //                 <Label
            //                     htmlFor={template}
            //                     className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            //                 >
            //                     <div className="mb-2 capitalize">{template}</div>
            //                     <div className="w-full aspect-[1/2] rounded-lg bg-muted flex  justify-center p-2">
            //                         {template === 'classic' && <div className="w-8 h-8 rounded-full bg-primary" />}
            //                         {template === 'portrait' && <div className="w-full h-full bg-gradient-to-b from-transparent to-primary" />}
            //                         {template === 'banner' && (
            //                             <>
            //                                 <div className="w-full h-1/4 bg-primary flex items-center  justify-center">
            //                                     <div className="w-8 h-8 rounded-full bg-secondary " />
            //                                 </div>
            //                             </>
            //                         )}
            //                     </div>
            //                 </Label>
            //             </div>
            //         ))}
            //     </RadioGroup>
            // </div>

            <div>
                <Label className="mb-3 block text-base sm:text-lg font-medium">Layout</Label>

                {/* For very small screens, enable horizontal scrolling */}
                <div className="overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
                    <div className="min-w-[400px] sm:min-w-0">
                        <RadioGroup
                            value={selectedTemplate}
                            onValueChange={(e) => setNewTemplate(e)}
                            className="grid grid-cols-3 gap-2 sm:gap-4"
                        >
                            {["classic", "portrait", "banner"].map((template) => (
                                <div key={template} className="w-full  py-8">
                                    <RadioGroupItem value={template} id={template} className="peer sr-only" />
                                    <Label
                                        htmlFor={template}
                                        className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-2 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all hover:scale-105 py-8"
                                    >
                                        <div className="mb-3 text-base sm:text-lg font-medium capitalize">{template}</div>

                                        <div className="w-full h-32 sm:h-40 rounded-lg bg-muted flex justify-center p-2 shadow-sm">
                                            {template === "classic" && (
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary mb-3" />
                                                    <div className="w-3/4 h-3 bg-primary/50 rounded-full mb-2" />
                                                    <div className="w-1/2 h-3 bg-primary/50 rounded-full" />
                                                </div>
                                            )}
                                            {template === "portrait" && (
                                                <div className="w-full h-full bg-gradient-to-b from-transparent to-primary rounded-lg flex items-end justify-center pb-4">
                                                    <div className="w-3/4 h-3 bg-white/70 rounded-full mb-2" />
                                                </div>
                                            )}
                                            {template === "banner" && (
                                                <div className="w-full h-full flex flex-col">
                                                    <div className="w-full h-1/3 bg-primary flex items-center justify-center rounded-t-lg"></div>
                                                    <div className="flex-1 flex flex-col items-center">
                                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-secondary -mt-6 border-4 border-muted" />
                                                        <div className="w-3/4 h-3 bg-primary/50 rounded-full mt-4 mb-2" />
                                                        <div className="w-1/2 h-3 bg-primary/50 rounded-full" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        )
    }

    const initTemplate = (value: number) => {
        let template: string | number = templateConverter(value, "number")
        setSelectedTemplate(template as string)
    }

    const savePalette = async (palette: ColorPalette) => {
        let color: string = JSON.stringify(palette)
        let data = {
            themeColors: color
        }
        try {
            const response = await apiCall({
                endpoint: `/link-in-bio/update/${linkInBioState.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `Theme color Updated`,
            }
            );
            if (response) {
                dispatch(updateThemeColors(color))
                setSelectedPalette(palette)
            }
        } catch (error) {
            console.error("Error updating theme color:", error);

        }

    }

    const shufflePalette = async (palette: string[], paletteName, selectedPaletteName) => {
        if (paletteName === selectedPaletteName) {
            const newColors = [palette[palette.length - 1], ...palette.slice(0, -1)];
            let newPalette = JSON.stringify({ name: paletteName, background: newColors[0], text: newColors[1], accent: newColors[2] })
            dispatch(updateThemeColors(newPalette))
            setSelectedPalette(JSON.parse(newPalette))
            let data = {
                themeColors: newPalette
            }
            try {
                const response = await apiCall({
                    endpoint: `/link-in-bio/update/${linkInBioState.id}`,
                    method: "put",
                    "showToast": true,
                    data: data,
                    successMessage: `Theme color Updated`,
                }
                );
                if (response) {
                    dispatch(updateThemeColors(newPalette))
                    setSelectedPalette(JSON.parse(newPalette))
                }
            } catch (error) {
                console.error("Error updating theme color:", error);

            }
        }

    }

    const renderColorPicker = () => {
        if (color) {
            return (
                <div className=" p-6 rounded-lg shadow-[#ccc] shadow-sm w-full space-y-4">
                    <div className='responsive'>
                        <HexColorPicker color={color?.color} onChange={e => updateCustomColor(e)} />
                    </div>
                </div>

            )
        }

    }

    const showPalette = (palette: ColorPalette) => {
        return (
            <>
                {selectedPalette ?
                    <div className='w-full'>
                        {palette.name === selectedPalette.name ?
                            <div
                                className="relative grid grid-cols-3 w-full cursor-pointer"
                                onClick={() => showPaletteCustomizationModal(palette.name)}
                            >
                                {/* Palette Colors */}
                                <div style={{ background: palette.background }} className="h-8 rounded-l-lg" />
                                <div style={{ background: palette.text }} className="h-8" />
                                <div style={{ background: palette.accent }} className="h-8 rounded-r-lg" />

                                {/* Overlay / Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-red-500 text-xs font-semibold uppercase tracking-wide pointer-events-none">
                                    chang colour
                                    {/* Customize */}
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-3 w-full' onClick={() => showPaletteCustomizationModal(palette.name)}>
                                <div style={{ background: palette.background }} className={`h-8 rounded-l-lg  `} />
                                <div style={{ background: palette.text }} className={`h-8 `} />
                                <div style={{ background: palette.accent }} className={`h-8 rounded-r-lg`} />
                            </div>
                        }

                        {palette.name === selectedPalette.name ?
                            <div className='w-full h-4 mt-2 flex justify-center z-50' onClick={() => { shufflePalette([palette.background, palette.text, palette.accent], palette.name, selectedPalette.name) }}>
                                <span className='px-2'> Shuffle</span> <Shuffle size={18} className='cursor-pointer' />
                            </div> :
                            <div className='h-4 mt-2' />
                        }

                    </div>
                    : null}
            </>



        )
    }




    // const renderColorPalettes = () => {

    //     return (
    //         <>
    //             {colorPalettes && selectedPalette ?
    //                 <div className='sm:pb-0 sm:mx-0 sm:px-0  '>
    //                     <Label className="mb-3 block">Color Palette</Label>
    //                     <RadioGroup
    //                         value={selectedPalette.name}
    //                         onValueChange={(value) => savePalette(colorPalettes.find(p => p.name === value) || colorPalettes[0])}
    //                         className=" hide-scrollbar flex  justify-center sm:grid sm:grid-cols-3 sm:gap-4 overflow-x-auto sm:overflow-visible"
    //                     >
    //                         {colorPalettes.map((palette) => (
    //                             <div key={palette.name} className=' '>
    //                                 <RadioGroupItem
    //                                     value={palette.name}
    //                                     id={palette.name}
    //                                     className="peer sr-only "
    //                                 />
    //                                 <Label
    //                                     htmlFor={palette.name}
    //                                     className="w-[150px]  flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
    //                                 >
    //                                     <div className="mb-2">{palette.name}</div>
    //                                     {showPalette(palette)}


    //                                 </Label>
    //                             </div>
    //                         ))}
    //                     </RadioGroup>
    //                 </div>
    //                 : null}
    //         </>

    //     )
    // }

    const renderColorPalettes = () => {
        return (
            <>
                {colorPalettes && selectedPalette ? (
                    <div className="sm:pb-0 sm:mx-0 sm:px-0 w-full overflow-hidden">
                        <Label className="mb-3 block">Color Palette</Label>
                        <div className="relative w-full">
                            <RadioGroup
                                value={selectedPalette.name}
                                onValueChange={(value) =>
                                    savePalette(
                                        colorPalettes.find((p) => p.name === value) || colorPalettes[0]
                                    )
                                }

                                className="sm:grid sm:grid-cols-3 sm:gap-4  sm:overflow-visible hide-scrollbar flex gap-4 overflow-x-auto whitespace-nowrap w-full"
                            >
                                {colorPalettes.map((palette) => (
                                    <div key={palette.name} className="shrink-0 w-[200px] sm:w-[150px]">
                                        <RadioGroupItem
                                            value={palette.name}
                                            id={palette.name}
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor={palette.name}
                                            className="w-full flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <div className="mb-2">{palette.name}</div>
                                            {showPalette(palette)}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                ) : null}
            </>
        );
    };



    const showPaletteCustomizationModal = (name) => {
        if (selectedPalette && selectedPalette.name === name) {
            setIsDialogOpen(true)
        }

    }

    const editSpecificColor = (section: string, color: string) => {
        setColor({ section: section, color: color })
        setHidePaletteCustomizeView(true)
    }

    const displayColorPickerSettings = () => {
        if (hidePaletteCustomizeView) {
            return renderColorPicker()
        } else {
            return (
                <div className=" p-6 rounded-lg shadow-[#ccc] shadow-sm w-full space-y-4">
                    {[
                        { label: "Background", key: "background", color: selectedPalette?.background },
                        { label: "Text", key: "text", color: selectedPalette?.text },
                        { label: "Accent", key: "accent", color: selectedPalette?.accent },
                    ].map(({ label, key, color }) => (
                        <div key={key} className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">{label}</span>
                            <div
                                onClick={() => editSpecificColor(key, color as string)}
                                style={{ backgroundColor: color }}
                                className="w-8 h-8 rounded-full cursor-pointer border border-gray-300 shadow-sm transition-transform duration-200 hover:scale-110"
                            ></div>
                        </div>
                    ))}
                </div>
            );
        }
    }

    const customColorModalHeader = () => {
        if (selectedPalette) {
            return (

                <div className='flex w-full'>
                    {hidePaletteCustomizeView ?
                        <div onClick={() => setHidePaletteCustomizeView(false)}>
                            <ArrowLeft className='cursor-pointer' />
                        </div>
                        : null}

                    <div>
                        {selectedPalette.name}
                    </div>
                </div>
            )
        }

    }

    const displayPaletteUpdateDialog = () => {
        if (selectedPalette) {
            return (
                <ModalComponent
                    dialogDisplay={isDialogOpen}
                    dialogDisplaySetter={() => setIsDialogOpen(false)}
                    title={customColorModalHeader}
                >
                    {displayColorPickerSettings()}
                </ModalComponent>
            )
        }
    }

    const updateCustomColor = (newColor: string) => {
        const colorSection: string = color?.section as string
        const selectedColorPalette: ColorPalette = selectedPalette as ColorPalette
        switch (colorSection) {
            case "background":
                selectedColorPalette.background = newColor
                break;
            case "text":
                selectedColorPalette.text = newColor
                break;
            case "accent":
                selectedColorPalette.accent = newColor
                break;

        }
        setColor({ section: colorSection, color: newColor })
        //setSelectedPalette(selectedColorPalette)
        savePalette(selectedColorPalette)

        // update selected color to the server

    }

    const renderProfileImage = () => {
        return (
            <div className="space-y-4">
                <Label className="block">Profile Picture</Label>
                <div className="relative w-32 h-32 mx-auto">
                    <Image
                        src={profileImage.url.length > 0 ? profileImage.url : "/public/bioprofile.jpg"}
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
        )

    }

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
        const file = event.target.files?.[0]

        if (file) {
            await uploadImage(file, type);
        }
    }

    const uploadImage = async (file: File, type: 'profile' | 'banner') => {
        const url = URL.createObjectURL(file)
        var data = new FormData()


        if (type === "profile") {
            data.append("profilePicture", file);
            setProfileImage({ url, file })
            dispatch(updateProfilePicture(url))
        } else {
            data.append("banner", file);
            setBannerImage({ url, file })
            dispatch(updateBanner(url))
        }

        try {
            const response = await apiCall({
                endpoint: `/link-in-bio/update/${linkInBioState.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `image Updated`,
            }
            );
            if (response) {
                if (type === "profile") {

                    setProfileImage({ url, file })
                    dispatch(updateProfilePicture(url))

                } else {
                    setBannerImage({ url, file })
                    dispatch(updateBanner(url))
                }
            }
        } catch (error) {
            console.error("Error updating theme color:", error);

        }
    }

    const renderBanner = () => {
        return (
            selectedTemplate === 'banner' && (
                <div className="space-y-4">
                    <Label className="block">Banner Image</Label>
                    <div className="relative w-full h-32">
                        <Image
                            src={bannerImage.url.length > 0 ? bannerImage.url : "/public/bioprofile.jpg"}
                            alt="Banner"
                            fill
                            priority
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
            )
        )
    }

    return (
        <TabsContent value="page-settings">
            {displayPaletteUpdateDialog()}
            <Card className={'bg-gray-800 '}>

                <CardContent>
                    <div className="space-y-6 overflow-hidden ">
                        {RenderDisplayName()}
                        {RenderTemplateSelector()}
                        {renderColorPalettes()}
                        {renderProfileImage()}
                        {renderBanner()}

                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )

}