'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiCall } from '@/utils/useApiCall'
import { Link, Page, Section } from '../../store/link-in-bio/interface/linkInBioInterface';
import { LoadingSpinner } from '../loader/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { addLink } from '@/store/link-in-bio/linkInBioSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import ModalComponent from '../ModalComponent/ModalComponent'
interface LinkCreationModalInterface {
    isOpen: boolean
    onClose: () => void
    activeSection: Section | null
    onSave: (Link: Link) => Promise<void>
}



export default function LinkCreationModal({ isOpen, onClose, activeSection, onSave }: LinkCreationModalInterface) {
    const [section, setSection] = useState(activeSection)
    const [isLoading, setIsLoading] = useState(false)
    const [urlStatus, setUrlStatus] = useState(false)
    const [title, setTitle] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const [linkError, setLinkError] = useState<string>("")
    const { apiCall } = useApiCall();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (activeSection) {
            setSection(activeSection)
            // Extract username from link
            //setName(activeSection.)
        }
    }, [activeSection])

    useEffect(() => {
        if (!isOpen) {
            setTitle("")
            setLink("")
            setLinkError("")
        }
    }, [isOpen])

    const validateLink = (url: string): boolean => {
        if (!url.trim()) {
            setLinkError("Link is required")
            setUrlStatus(false)
            return false
        }

        // Remove spaces and normalize the URL
        let normalizedUrl = url.trim()

        // Check if it has a protocol, if not add http://
        if (!/^https?:\/\//i.test(normalizedUrl)) {
            normalizedUrl = "https://" + normalizedUrl
        }

        // Use a more comprehensive regex for URL validation
        // This checks for a valid domain name structure
        const urlPattern =
            /^(https?:\/\/)((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i

        if (!urlPattern.test(normalizedUrl)) {
            setLinkError("Please enter a valid URL (e.g., example.com or https://example.com)")
            setUrlStatus(false)
            return false
        }

        // If we get here, it's a valid URL
        setLink(normalizedUrl) // Update with the normalized version
        setLinkError("")
        setUrlStatus(true)
        return true
    }

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLink(value)
        // Clear error when user starts typing again
        if (linkError) setLinkError("")
    }

    const handleLinkBlur = () => {
        if (link.trim()) {
            validateLink(link)
        }
    }

    const handleSave = async () => {
        if (!urlStatus || !title || !link) return
        if (!section) return
        setIsLoading(true)
        try {
            const data = {
                title: title,
                link: link,
                pageSectionId: section.id,
            }

            const response = await apiCall({
                endpoint: `/links/create`,
                method: "post",
                "showToast": true,
                data: data,
                successMessage: `Link created`,
            }
            );
            if (response) {
                dispatch(addLink({ sectionId: response.data.pageSectionId, link: response.data }))
                await onSave(response.data)
                onClose()
            }

        } catch (error) {
            console.error("Error updating page name:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!activeSection) return null

    return (
        <ModalComponent
            dialogDisplay={isOpen}
            dialogDisplaySetter={onClose}
            title={"New Link"}
            handleAction={handleSave}
            withFooter={true}
            loader={isLoading}
            actionTitle={"Save"}
        >
            < div className=" " >

                <div className="space-y-2" >
                    <Label>Link Title </Label>
                    < Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)
                        }
                        className="bg-gray-700"
                        placeholder="Enter New link title"
                    />
                </div>

                <div className="space-y-2" >
                    <Label>Link  </Label>
                    < Input
                        value={link}
                        placeholder="Enter New link"
                        onChange={handleLinkChange}
                        onBlur={handleLinkBlur}
                        className={`bg-gray-700 ${linkError ? "border-red-500" : ""}`}
                    />
                    {linkError && <p className="text-red-500 text-sm mt-1">{linkError}</p>}
                </div>
            </div>

        </ModalComponent>
    )
}