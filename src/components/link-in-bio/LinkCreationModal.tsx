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
    const [title, setTitle] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const { apiCall } = useApiCall();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (activeSection) {
            setSection(activeSection)
            // Extract username from link
            //setName(activeSection.)
        }
    }, [activeSection])

    function formatURL(str) {
        try {
            // Try creating a URL object to check if it's already valid
            new URL(str);
            return str;
        } catch (e) {
            // If invalid, check if adding 'http://' makes it valid
            try {
                let fixedUrl = "http://" + str;
                new URL(fixedUrl);
                return fixedUrl;
            } catch (e) {
                return null; // Return null if still invalid
            }
        }
    }
    const handleSave = async () => {
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
                        onChange={(e) => setLink(e.target.value)
                        }
                        className="bg-gray-700"
                        placeholder="Enter New link"
                    />
                </div>
            </div>

        </ModalComponent>
    )
}