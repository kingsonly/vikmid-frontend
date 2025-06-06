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
    reorderPages,
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
import ListComponent from '../ListComponent/ListComponent';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { scrollToTop } from '@/utils/helpers';


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

    useEffect(() => {
        if (showActivePage) {
            // Double requestAnimationFrame ensures DOM is fully updated
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })

                    // Fallback method
                    document.body.scrollTop = 0
                    document.documentElement.scrollTop = 0
                })
            })
        }
    }, [showActivePage])

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
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })

                // Fallback method if the above doesn't work
                document.body.scrollTop = 0 // For Safari
                document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
            })
        })


    }
    const backToPage = () => {
        setActivePage(null)
        setShowActivePage(false)
    }
    const setIsDeleteDialogOpenHandler = () => {
        setIsDeleteDialogOpen(false)
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const reorderPage = async (result) => {
        // Drop outside the list
        if (!result.destination) {
            return
        }

        // Dropped in the same position
        if (result.destination.index === result.source.index) {
            return
        }


        if (!linkInBioState) return
        if (!linkInBioState.pages) return
        const reorderPage: string[] = []
        const pages = [...linkInBioState.pages]
        const [draggedPage] = pages.splice(result.source.index, 1)
        pages.splice(result.destination.index, 0, draggedPage)
        // update the server 
        // update redux
        pages.map((value) => reorderPage.push(value.id))
        dispatch(reorderPages(reorderPage))
        try {
            const response = await apiCall({
                endpoint: `/pages/reorder`,
                method: "put",
                "showToast": true,
                data: { pageIds: reorderPage },
                successMessage: `Page reordered successfully `,
            }
            );
            if (response) {
                dispatch(reorderPages(reorderPage))
            }
        } catch (error) {
            console.error("Error while reordering Page:", error);

        }
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
                            <DragDropContext onDragEnd={reorderPage}>
                                <Droppable droppableId="social-link-list"
                                    isDropDisabled={false}
                                    isCombineEnabled={false}
                                    ignoreContainerClipping={false}
                                    direction="vertical"
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <AnimatePresence>
                                                {linkInBioState.pages.map((page, index) => (
                                                    <ListComponent
                                                        key={page.id}
                                                        view={() => { goToPage(page) }}
                                                        edit={() => { handleEditClick(page) }}
                                                        deleteData={() => { removeAPage(page) }}
                                                        title={page.name}
                                                        data={page}
                                                        capitalize
                                                        index={index}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
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