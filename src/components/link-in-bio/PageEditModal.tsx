'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiCall } from '@/utils/useApiCall'
import { Page } from '../../store/link-in-bio/interface/linkInBioInterface';
import { getSocialPlatform } from '@/utils/helpers'
import { LoadingSpinner } from '../loader/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import ModalComponent from '../ModalComponent/ModalComponent'

interface EditModalInterface {
    isOpen: boolean
    onClose: () => void
    page: Page | null
    onSave: (page: Page) => Promise<void>
}



export default function PageEditModal({ isOpen, onClose, page, onSave }: EditModalInterface) {
    const [editedPage, setEditedPage] = useState(page)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState("")
    const { apiCall } = useApiCall();

    useEffect(() => {
        if (page) {
            setEditedPage(page)
            // Extract username from link
            setName(page.name)
        }
    }, [page])


    const handleSave = async () => {
        if (!editedPage) return
        setIsLoading(true)
        try {
            const data = {
                name: name,
            }

            const response = await apiCall({
                endpoint: `/pages/update/${editedPage.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `Page Name Updated`,
            }
            );
            if (response) {
                await onSave(response.data)
                onClose()
            }

        } catch (error) {
            console.error("Error updating page name:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!page) return null

    return (
        <ModalComponent
            dialogDisplay={isOpen}
            dialogDisplaySetter={onClose}
            title={"Edit Social Link"}
            handleAction={handleSave}
            withFooter={true}
            loader={isLoading}
            actionTitle={"Save Changes"}
        >
            <div className=" ">
                <div className="space-y-2">
                    <Label>Page Name</Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-700"
                        placeholder="Enter New Page Name"
                    />
                </div>
            </div>
        </ModalComponent>

    )
}