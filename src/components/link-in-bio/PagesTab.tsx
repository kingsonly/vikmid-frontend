'use client'
import { useState, useRef, useEffect } from 'react'
import { LinkInBioState, Page } from '../../store/link-in-bio/interface/linkInBioInterface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useApiCall } from '@/utils/useApiCall';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    addPage,
    removePage,
    updatePage,
} from "../../store/link-in-bio/linkInBioSlice"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"

import { LoadingSpinner } from '../loader/Loader';
import PageEditModal from './PageEditModal';
import PageSection from './PageSection';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';


interface PageTabProps {
    linkInBioState: LinkInBioState;
}


export default function PagesTab(param: PageTabProps) {
    const { linkInBioState } = param
    const dispatch = useDispatch<AppDispatch>();
    const { apiCall } = useApiCall();
    const [newPageTitle, setNewPageTitle] = useState<string>("")
    const [newPageTitleLoader, setNewPageTitleLoader] = useState<boolean>(false)
    const [editingPage, setEditingPage] = useState<Page | null>(null)
    const [activePage, setActivePage] = useState<Page | null>(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteLoader, setDeleteLoader] = useState(false)
    const [deletePage, setDeletePage] = useState<Page | null>(null)
    const [showActivePage, setShowActivePage] = useState(false)

    const addNewPage = async () => {
        if (!newPageTitle.trim()) {
            // toast({
            //     title: "Error",
            //     description: "Please enter a page title",
            //     variant: "destructive",
            // })
            return
        }
        setNewPageTitleLoader(true)
        let pageName = newPageTitle.trim()
        const data = {
            name: pageName,
            bioProfileId: linkInBioState.id,
        }
        try {
            const response = await apiCall({
                endpoint: `/pages/create`,
                method: "post",
                "showToast": true,
                data: data,
                successMessage: `Created new page`,
            }
            );
            if (response) {
                setNewPageTitle("")
                dispatch(addPage(response.data))
                setNewPageTitleLoader(false)
            }
        } catch (error) {
            console.error("Error creating new page:", error);
            setNewPageTitleLoader(false)
        }
    }

    const handleEditClick = (page: any) => {
        setEditingPage(page)
        setIsEditModalOpen(true)
    }

    const handleSaveUpdate = async (page: Page) => {
        // update redux state
        dispatch(updatePage(page))

    }

    const removeAPage = (page) => {
        setDeletePage(page)
        setIsDeleteDialogOpen(true)
    }

    const handleDelete = async () => {
        if (!deletePage) return
        setDeleteLoader(true)
        try {


            const response = await apiCall({
                endpoint: `/pages/${deletePage.id}`,
                method: "delete",
                "showToast": true,
                successMessage: `Deleted Page`,
            }
            );
            if (response) {
                setIsDeleteDialogOpen(false)
                dispatch(removePage(deletePage.id))
                setDeleteLoader(false)
            }

        } catch (error) {
            console.error("Error deleting social link:", error);
            setDeleteLoader(false)
        }
    }

    const goToPage = (page: Page) => {
        setActivePage(page)
        setShowActivePage(true)
    }
    const backToPage = () => {
        setActivePage(null)
        setShowActivePage(false)
    }
    const setIsDeleteDialogOpenHandler = () => {
        setIsDeleteDialogOpen(false)
    }

    return (
        <TabsContent value="pages">
            {!showActivePage ?
                <Card className={'bg-gray-800'}>
                    <CardHeader>
                        <CardTitle>Manage Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4  flex-col md:flex-row  ">
                            <Input
                                placeholder="Enter page title"
                                value={newPageTitle}
                                className='border border-[#bbc]'
                                onChange={(e) => setNewPageTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault()
                                        addNewPage()
                                    }
                                }}
                            />
                            {
                                !newPageTitleLoader ?
                                    <Button onClick={addNewPage}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Page
                                    </Button>
                                    :
                                    <LoadingSpinner />
                            }


                        </div>

                        <div className="mt-6 space-y-4">
                            <h3 className="font-semibold">Your Pages</h3>
                            <AnimatePresence>
                                {linkInBioState.pages.map((page, index) => (
                                    <motion.div
                                        key={page.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className={'bg-gray-700'}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <div>
                                                            <h3 className="font-medium">{page.name}</h3>
                                                        </div>
                                                    </div>
                                                    <div className='flex'>

                                                        <Eye onClick={() => { goToPage(page) }} className="h-4 w-4 ml-2 cursor-pointer text-sky-400/100" />
                                                        <Pencil onClick={() => { handleEditClick(page) }} className="h-4 w-4 ml-2 cursor-pointer text-green-500" />
                                                        <Trash2 onClick={() => { removeAPage(page) }} className="h-4 w-4 ml-2 cursor-pointer text-red-500" />

                                                    </div>

                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
                : <PageSection linkInBioState={linkInBioState} activePage={activePage} backToPage={backToPage} />}
            <PageEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                page={editingPage}
                onSave={handleSaveUpdate}
            />

            <DeleteConfirm
                dialogDisplay={isDeleteDialogOpen}
                dialogDisplaySetter={setIsDeleteDialogOpenHandler}
                handleDelete={handleDelete}
                loader={deleteLoader}
                text={"Are you sure you want to delete this Page? This action cannot be undone."} />
        </TabsContent>
    )
}