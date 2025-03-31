'use client'
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Camera, Copy, ExternalLink, Instagram, Share2, Twitter, Facebook, LinkedinIcon as LinkedIn, YoutubeIcon as YouTube, TwitterIcon as TikTok, Twitch, Github, Dribbble, Plus, Trash2, ChartColumnBig, Pencil } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageSettingsTab from './PageSettingsTab'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    reorderSocialLinks
} from "../../store/link-in-bio/linkInBioSlice"
import { useApiCall } from '@/utils/useApiCall'
import { LinkInBioState, SocialLink } from '../../store/link-in-bio/interface/linkInBioInterface';
import { getSocialPlatform, socialPlatforms } from '@/utils/helpers'
import { LoadingSpinner } from '../loader/Loader'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import SocialEditModal from './SocialEditModal'
import SocialLinkList from './SocialLinkList'
import DragAndDropWrapper from '../dragAndDropWrapper/DragAndDropWrapper'
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm'


interface SocialLinkTabProps {
    linkInBioState: LinkInBioState;
}

export default function SocialLinkTab(param: SocialLinkTabProps) {
    const { linkInBioState } = param
    const dispatch = useDispatch<AppDispatch>();
    const { apiCall } = useApiCall();
    const [newSocialAccount, setNewSocialAccount] = useState({ platform: '', username: '' })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingAccount, setEditingAccount] = useState<SocialLink | null>(null)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [deleteAccount, setDeleteAccount] = useState<SocialLink | null>(null)

    const addSocialAccount = async () => {
        if (newSocialAccount.platform && newSocialAccount.username) {
            setIsLoading(true)
            const platform = getSocialPlatform(newSocialAccount.platform)
            if (platform) {
                //setSocialAccounts(prev => [...prev, { ...newSocialAccount, icon: platform.icon }])
                // create new social account 
                const data = {
                    socialNetworkName: platform.name,
                    bioProfileId: linkInBioState.id,
                    link: `${platform.link}${newSocialAccount.username}`
                }
                try {
                    const response = await apiCall({
                        endpoint: `/social-link/create`,
                        method: "post",
                        "showToast": true,
                        data: data,
                        successMessage: `Created new social link`,
                    }
                    );
                    if (response) {
                        setNewSocialAccount({ platform: '', username: '' })
                        dispatch(addSocialLink(response.data))
                        console.log("i am social response", response)
                        setIsLoading(false)
                    }
                } catch (error) {
                    console.error("Error creating new social link:", error);
                    setNewSocialAccount({ platform: '', username: '' })
                    setIsLoading(false)
                }

            }
        }
    }

    const viewStats = (socialLink) => {

    }

    const deleteSocialLink = (socialLink) => {
        setDeleteAccount(socialLink)
        setIsDeleteDialogOpen(true)
    }

    const handleEditClick = (socialLink: any) => {
        setEditingAccount(socialLink)
        setIsEditModalOpen(true)
    }

    const handleSaveUpdate = async (account: SocialLink) => {
        // update redux state
        dispatch(updateSocialLink(account))

    }

    const handleDelete = async () => {
        if (!deleteAccount) return
        setDeleteLoader(true)
        try {


            const response = await apiCall({
                endpoint: `/social-link/${deleteAccount.id}`,
                method: "delete",
                "showToast": true,
                successMessage: `Deleted Social Link`,
            }
            );
            if (response) {
                setIsDeleteDialogOpen(false)
                dispatch(removeSocialLink(deleteAccount.id))
                setDeleteLoader(false)
            }

        } catch (error) {
            console.error("Error deleting social link:", error);
            setDeleteLoader(false)
        }
    }

    const moveSocialAccount = async (dragIndex: number, hoverIndex: number) => {
        if (!linkInBioState) return
        if (!linkInBioState.socialLinks) return
        const reorderSocialLink: string[] = []
        const socialLinks = [...linkInBioState.socialLinks]
        const [draggedAccount] = socialLinks.splice(dragIndex, 1)
        socialLinks.splice(hoverIndex, 0, draggedAccount)
        // update the server 
        // update redux
        socialLinks.map((value) => reorderSocialLink.push(value.id))
        dispatch(reorderSocialLinks(reorderSocialLink))
        try {
            const response = await apiCall({
                endpoint: `/social-link/reorder`,
                method: "put",
                "showToast": true,
                data: { socialLinksIds: reorderSocialLink },
                successMessage: `Social link reordered successfully `,
            }
            );
            if (response) {
                dispatch(reorderSocialLinks(reorderSocialLink))
            }
        } catch (error) {
            console.error("Error while reordering social link:", error);

        }
        return socialLinks
    }

    return (
        <TabsContent value="social">
            <Card className={'bg-gray-800'}>
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
                        {!isLoading ?
                            <Button onClick={addSocialAccount} className="w-full">
                                Add Social Account
                            </Button>
                            : <LoadingSpinner />}

                    </div>
                    <div className="mt-6 space-y-4">
                        <h3 className="font-semibold">Your Social Accounts</h3>
                        <DragAndDropWrapper>
                            <AnimatePresence>
                                {linkInBioState && linkInBioState.socialLinks ? linkInBioState.socialLinks.map((account, index) => (
                                    <SocialLinkList
                                        key={account.id}
                                        account={account}
                                        index={index}
                                        onMove={moveSocialAccount}
                                        onDelete={() => deleteSocialLink(account)}
                                        handleEditClick={() => handleEditClick(account)}
                                    />

                                )) : null
                                }
                            </AnimatePresence>
                        </DragAndDropWrapper>

                    </div>
                </CardContent>
            </Card>
            <SocialEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                account={editingAccount}
                onSave={handleSaveUpdate}
            />
            <DeleteConfirm
                dialogDisplay={isDeleteDialogOpen}
                dialogDisplaySetter={() => setIsDeleteDialogOpen(false)}
                handleDelete={handleDelete}
                loader={deleteLoader}
                text={"Are you sure you want to delete this social link? This action cannot be undone."} />
        </TabsContent>
    )
}