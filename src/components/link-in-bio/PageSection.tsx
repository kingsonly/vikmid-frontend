'use client'
import { useState, useRef, useEffect } from 'react'
import { Link, LinkInBioState, Page, Section } from '../../store/link-in-bio/interface/linkInBioInterface';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Eye, Pencil, Plus, PlusIcon, Save, Trash2, X } from 'lucide-react';
import { useApiCall } from '@/utils/useApiCall';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
    addLink,
    addPage,
    addSection,
    removeLink,
    removePage,
    removeSection,
    updatePage,
    updateSection,
} from "../../store/link-in-bio/linkInBioSlice"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { LoadingSpinner } from '../loader/Loader';
import LinkCreationModal from './LinkCreationModal';
import SectionLinks from './SectionLinks';
import LinkUpdateModal from './LinkUpdateModal';
import DeleteConfirm from '../DeleteConfirm/DeleteConfirm';



interface PageTabProps {
    linkInBioState: LinkInBioState;
    activePage: Page | null;
    backToPage: () => void;
}


export default function PageSection(param: PageTabProps) {
    const { linkInBioState, activePage, backToPage } = param
    const dispatch = useDispatch<AppDispatch>();
    const { apiCall } = useApiCall();
    const [newPageTitle, setNewPageTitle] = useState<string>("")
    const [newPageSectionLoader, setNewPageSectionLoader] = useState<boolean>(false)
    const [editingPage, setEditingPage] = useState<Page | null>(null)
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [isUpdateLinkModalOpen, setIsUpdateLinkModalOpen] = useState(false)
    const [isDeleteSectionDialogOpen, setIsDeleteSectionDialogOpen] = useState(false)
    const [isDeleteLinkDialogOpen, setIsDeleteLinkDialogOpen] = useState(false)
    const [deleteLinkLoader, setDeleteLinkLoader] = useState(false)
    const [deleteSectionLoader, setDeleteSectionLoader] = useState(false)
    const [showActivePage, setShowActivePage] = useState(true)
    const [renderEditSectionTitle, setRenderEditSectionTitle] = useState(false)
    const [displaySectionTitleLoader, setDisplaySectionTitleLoader] = useState(false)
    const [activeSection, setActiveSection] = useState<Section | null>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [title, setTitle] = useState<any>("")
    const displayTitleRef = useRef<HTMLInputElement>(null);
    const [activeLink, setActiveLink] = useState<Link | null>(null)

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (renderEditSectionTitle && displayTitleRef.current) {
            displayTitleRef.current.focus();
        }
    }, [renderEditSectionTitle]);

    const addNewPageSectionHandler = async () => {
        if (!activePage) return
        setNewPageSectionLoader(true)
        const data = {
            pageId: activePage.id,
        }
        try {
            const response = await apiCall({
                endpoint: `/page-section/create`,
                method: "post",
                "showToast": true,
                data: data,
                successMessage: `Created new page`,
            }
            );
            if (response) {
                console.log("new section", response.data)

                dispatch(addSection({ pageId: activePage.id, section: response.data }))
                setNewPageSectionLoader(false)
            }
        } catch (error) {
            console.error("Error creating new page Section:", error);
            setNewPageSectionLoader(false)
        }
    }

    const handleCreateLinkClick = (section: Section) => {
        setActiveSection(section)
        setIsCreateLinkModalOpen(true)
    }

    const handleSaveUpdate = async (link: Link) => {
        if (!link) return
        // update redux state
        //dispatch(addLink({ sectionId: link.pageSectionId, link }))
        //close modal and remove loader 
        // if (!activePage) return
        // const activePageAndSections = findPage(activePage.id)
        // if (!activePageAndSections) return
        // console.log("Current Sections:", activePageAndSections.sections);
    }

    const handleDeleteSection = async () => {
        if (!activeSection) return
        setDeleteSectionLoader(true)
        try {


            const response = await apiCall({
                endpoint: `/page-section/${activeSection.id}`,
                method: "delete",
                "showToast": true,
                successMessage: `Deleted Page Section`,
            }
            );
            if (response) {
                console.log("i am section delete", response)
                setIsDeleteSectionDialogOpen(false)
                let pageId = activeSection.pageId
                let sectionId = activeSection.id
                dispatch(removeSection({ pageId: pageId, sectionId: activeSection.id }))
                setActiveSection(null)
                setDeleteSectionLoader(false)
            }

        } catch (error) {
            console.error("Error deleting social link:", error);
            setDeleteSectionLoader(false)
        }
    }


    const findPage = (id: string) => {
        return linkInBioState.pages.find((page) => page.id === id)
    }

    const handleEditSectionClick = (section: Section, index: number) => {
        setRenderEditSectionTitle(true)
        setActiveSection(section)
        setActiveIndex(index)
        setTitle(section.title)

    }

    const handleEditLinkClick = (link: Link) => {
        setIsUpdateLinkModalOpen(true)
        setActiveLink(link)
    }

    const removeALink = (link: Link) => {
        setIsDeleteLinkDialogOpen(true)
        setActiveLink(link)
    }
    const handleViewLinkStatsClick = (link: Link) => {

    }

    const removeASectionVerification = (section: Section) => {
        setIsDeleteSectionDialogOpen(true)
        setActiveSection(section)

    }
    const removeASection = () => {

    }

    const renderPageSection = () => {
        if (!activePage) return
        const activePageAndSections = findPage(activePage.id)
        if (!activePageAndSections) return
        if (!activePageAndSections.sections) return

        return (
            <Accordion key={activePageAndSections.sections.length} type="single" collapsible className="w-full">
                {activePageAndSections.sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >

                        <AccordionItem value={section.id} key={section.id}>
                            <AccordionTrigger>
                                {renderEditSectionTitle && index == activeIndex ?
                                    <div className="flex justify-between items-center w-[80%] ">
                                        <div className='w-[60%]'>
                                            <Input
                                                id="title"
                                                ref={displayTitleRef}
                                                value={title ? title : ""}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className='w-[30%]  flex justify-between items-center'>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateSectionTitle()
                                                }}
                                                className="cursor-pointer text-blue-500 mr-2"
                                            >
                                                {!displaySectionTitleLoader ? <Save className='cursor-pointer text-green-500' /> : <LoadingSpinner />}

                                            </span>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRenderEditSectionTitle(false)
                                                    setActiveIndex(0)
                                                    setActiveSection(null)
                                                }}
                                                className="cursor-pointer text-blue-500 mr-2"
                                            >
                                                <X className='cursor-pointer text-red-500' />

                                            </span>
                                        </div>
                                    </div>
                                    :
                                    <div className="flex justify-between items-center w-[80%] ">

                                        <div className='w-[60%]'>

                                            {section.title ? section.title : "Untitled Section"}
                                        </div>
                                        <div className="w-[30%]  flex justify-between items-center">

                                            <span
                                                onClick={(e) => {
                                                    // e.stopPropagation();
                                                    handleCreateLinkClick(section)
                                                    // Execute your update logic here
                                                }}
                                                className="cursor-pointer text-blue-500 mr-2"
                                            >
                                                <PlusIcon className="h-4 w-4 ml-2 cursor-pointer text-green-500" />

                                            </span>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log('Update clicked');
                                                    // Execute your update logic here
                                                }}
                                                className="cursor-pointer text-blue-500 mr-2"
                                            >
                                                <Pencil onClick={() => { handleEditSectionClick(section, index) }} className="h-4 w-4 ml-2 cursor-pointer text-green-500" />

                                            </span>
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeASectionVerification(section)
                                                }}
                                                className="cursor-pointer text-red-500"
                                            >
                                                <Trash2 onClick={() => { removeASection() }} className="h-4 w-4 ml-2 cursor-pointer text-red-500" />
                                            </span>
                                        </div>
                                    </div>
                                }
                            </AccordionTrigger>
                            <AccordionContent>
                                {section.links?.map((link, index) => (
                                    <SectionLinks
                                        key={link.id}
                                        link={link}
                                        updateLink={handleEditLinkClick}
                                        deleteLink={removeALink}
                                    />

                                ))}
                            </AccordionContent>
                        </AccordionItem>


                    </motion.div>))}
            </Accordion >
        )
    }

    const updateSectionTitle = async () => {
        let data = {
            title: title
        }
        setDisplaySectionTitleLoader(true)
        try {
            const response = await apiCall({
                endpoint: `/page-section/update/${activeSection?.id}`,
                method: "put",
                "showToast": true,
                data: data,
                successMessage: `Section Updated`,
            }
            );
            if (response) {
                console.log("this is section update ", response)
                dispatch(updateSection({ pageId: response.data.pageId, section: response.data }))
                setRenderEditSectionTitle(false)
                setActiveSection(null)
                setActiveIndex(0)
                setTitle("")
                setDisplaySectionTitleLoader(false)
            }
        } catch (error) {
            console.error("Error updating section title :", error);
            setDisplaySectionTitleLoader(false)
        }
    }

    const closeLinkUpdateModal = () => {
        setActiveLink(null)
        setIsCreateLinkModalOpen(false)
    }

    const handleDeleteLink = async () => {

        if (!activeLink) return
        setDeleteLinkLoader(true)
        try {


            const response = await apiCall({
                endpoint: `/links/${activeLink.id}`,
                method: "delete",
                "showToast": true,
                successMessage: `Deleted Link`,
            }
            );
            if (response) {
                setDeleteLinkLoader(false)
                let linkId = activeLink.id
                let sectionId = activeLink.pageSectionId
                dispatch(removeLink({ sectionId: sectionId, linkId: linkId }))
                setIsDeleteLinkDialogOpen(false)
                setActiveLink(null)
                //loader here

            }

        } catch (error) {
            console.error("Error deleting link:", error);
            setDeleteLinkLoader(false)
        }
    }

    return (
        <TabsContent value="pages">

            <Card className={'bg-gray-800'}>
                <CardHeader>
                    <CardTitle>
                        <div className='flex  '>
                            <div className='w-[30px] cursor-pointer' onClick={() => backToPage()}>
                                <ChevronLeft />
                            </div>

                            <div>
                                Manage {activePage?.name}
                            </div>
                        </div>


                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4  flex-col md:flex-row  ">
                        {
                            !newPageSectionLoader ?
                                <Button onClick={addNewPageSectionHandler}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Section
                                </Button>
                                :
                                <LoadingSpinner />
                        }


                    </div>

                    <div className="mt-6 space-y-4">
                        <h3 className="font-semibold">Your Pages Sections</h3>
                        <AnimatePresence>
                            {renderPageSection()}
                        </AnimatePresence>
                    </div>
                </CardContent>
            </Card>

            <LinkCreationModal
                isOpen={isCreateLinkModalOpen}
                onClose={closeLinkUpdateModal}
                activeSection={activeSection}
                onSave={handleSaveUpdate}
            />

            <LinkUpdateModal
                isOpen={isUpdateLinkModalOpen}
                onClose={() => setIsUpdateLinkModalOpen(false)}
                activeLink={activeLink}
            />

            {/* <Dialog open={isDeleteSectionDialogOpen} onOpenChange={setIsDeleteSectionDialogOpen}>
                <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you sure you want to delete this Page Section? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteSectionDialogOpen(false)}>
                            Cancel
                        </Button>
                        {!deleteSectionLoader ?
                            <Button variant="destructive" onClick={handleDeleteSection}>
                                Delete
                            </Button>
                            : <LoadingSpinner />
                        }

                    </DialogFooter>
                </DialogContent>
            </Dialog> */}

            <DeleteConfirm
                dialogDisplay={isDeleteSectionDialogOpen}
                dialogDisplaySetter={() => setIsDeleteSectionDialogOpen(false)}
                handleDelete={handleDeleteSection}
                loader={deleteSectionLoader}
                text={"Are you sure you want to delete this Page Section? This action cannot be undone."} />

            <DeleteConfirm
                dialogDisplay={isDeleteLinkDialogOpen}
                dialogDisplaySetter={() => setIsDeleteLinkDialogOpen(false)}
                handleDelete={handleDeleteLink}
                loader={deleteLinkLoader}
                text={"Are you sure you want to delete this Link? This action cannot be undone."} />
        </TabsContent>
    )
}