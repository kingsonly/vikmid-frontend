'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiCall } from '@/utils/useApiCall'
import { SocialLink } from '../../store/link-in-bio/interface/linkInBioInterface';
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
    account: SocialLink | null
    onSave: (account: SocialLink) => Promise<void>
}



export default function SocialEditModal({ isOpen, onClose, account, onSave }: EditModalInterface) {
    const [editedAccount, setEditedAccount] = useState(account)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("")
    const { apiCall } = useApiCall();

    useEffect(() => {
        if (account) {
            setEditedAccount(account)
            // Extract username from link
            const username = splitLink(account)
            setUsername(username)
        }
    }, [account])

    const splitLink = (socialLink: any) => {
        let username: string
        switch (socialLink.socialNetworkName) {
            case 'YouTube':
            case 'TikTok':
                username = socialLink.link.split("@").pop()
                break
            default:
                username = socialLink.link.split("/").pop()

        }
        return username
    }

    const handleSave = async () => {
        if (!editedAccount) return
        setIsLoading(true)
        try {
            const platform = getSocialPlatform(editedAccount.socialNetworkName)
            const data = {
                link: platform ? `${platform.link}${username}` : username,
            }

            const response = await apiCall({
                endpoint: `/social-link/update/${editedAccount.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `Social link Updated`,
            }
            );
            if (response) {
                await onSave(response.data)
                onClose()
            }

        } catch (error) {
            console.error("Error updating social link:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!account) return null

    return (
        <ModalComponent
            dialogDisplay={isOpen}
            dialogDisplaySetter={onClose}
            title={"Edit Social Link"}
            handleAction={handleSave}
            withFooter={true}
            loader={isLoading}
            actionTitle={"Save Change"}
        >

            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label>Platform</Label>
                    <Input disabled value={account.socialNetworkName} className="bg-gray-700" />
                </div>
                <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-700"
                        placeholder="Enter username"
                    />
                </div>
            </div>

        </ModalComponent>
    )
}