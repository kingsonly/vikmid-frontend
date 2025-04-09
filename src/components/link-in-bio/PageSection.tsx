"use client"
import { useState, useRef, useEffect } from "react"
import type { BusiestDayInterface, Link, LinkInBioState, Page, PlatformPercentageInterface, Section, TopBrowserInterface } from "../../store/link-in-bio/interface/linkInBioInterface"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronLeft, ChevronUp, Pencil, Plus, PlusIcon, Save, Trash2, X } from "lucide-react"
import { useApiCall } from "@/utils/useApiCall"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../store"
import { addSection, removeLink, removeSection, updateSection } from "../../store/link-in-bio/linkInBioSlice"
import InfiniteScroll from 'react-infinite-scroller';
import { LoadingSpinner } from "../loader/Loader"
import LinkCreationModal from "./LinkCreationModal"
import SectionLinks from "./SectionLinks"
import LinkUpdateModal from "./LinkUpdateModal"
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm"
import { Tabs } from "@radix-ui/react-tabs"
import ModalComponent from "../ModalComponent/ModalComponent"
import StatsNumberComponent from "./StatsNumberComponent"
import StatsTable from "./StatsTable"
import DragAndDropWrapper from "../dragAndDropWrapper/DragAndDropWrapper"

interface PageTabProps {
    linkInBioState: LinkInBioState
    activePage: Page | null
    backToPage: () => void
}

export default function PageSection(param: PageTabProps) {
    const { linkInBioState, activePage, backToPage } = param
    const dispatch = useDispatch<AppDispatch>()
    const { apiCall } = useApiCall()
    const [newPageSectionLoader, setNewPageSectionLoader] = useState<boolean>(false)
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [isUpdateLinkModalOpen, setIsUpdateLinkModalOpen] = useState(false)
    const [isDeleteSectionDialogOpen, setIsDeleteSectionDialogOpen] = useState(false)
    const [isDeleteLinkDialogOpen, setIsDeleteLinkDialogOpen] = useState(false)
    const [deleteLinkLoader, setDeleteLinkLoader] = useState(false)
    const [deleteSectionLoader, setDeleteSectionLoader] = useState(false)
    const [renderEditSectionTitle, setRenderEditSectionTitle] = useState(false)
    const [displaySectionTitleLoader, setDisplaySectionTitleLoader] = useState(false)
    const [activeSection, setActiveSection] = useState<Section | null>(null)
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [title, setTitle] = useState<any>("")
    const displayTitleRef = useRef<HTMLInputElement>(null)
    const [activeLink, setActiveLink] = useState<Link | null>(null)
    const [isViewStatsModalOpen, setIsViewStatsModalOpen] = useState(false)
    const [viewStatsLoader, setViewStatsLoader] = useState(false)
    const [next, setNext] = useState<string | null>(null)
    const [statsData, setStatsData] = useState<any[]>([])
    const [total, setTotal] = useState<number>(0)
    const [platformPercentage, setPlatformPercentage] = useState<PlatformPercentageInterface>({
        mobile: 0,
        desktop: 0,
    })
    const [topBrowser, setTopBrowser] = useState<TopBrowserInterface>({
        name: "",
        count: 0,
        percentage: 0,
    }
    )
    const [busiestDay, setBusiestDay] = useState<BusiestDayInterface>(
        {
            day: "",
            count: 0,
            percentage: 0,
        }
    )
    useEffect(() => {
        if (renderEditSectionTitle && displayTitleRef.current) {
            displayTitleRef.current.focus()
        }
    }, [renderEditSectionTitle])

    const toggleSection = (sectionId: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }))
    }

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
                showToast: true,
                data: data,
                successMessage: `Created new page`,
            })
            if (response) {
                console.log("new section", response.data)
                dispatch(addSection({ pageId: activePage.id, section: response.data }))

                // Auto-expand the newly created section
                setExpandedSections((prev) => ({
                    ...prev,
                    [response.data.id]: true,
                }))

                setNewPageSectionLoader(false)
            }
        } catch (error) {
            console.error("Error creating new page Section:", error)
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
                showToast: true,
                successMessage: `Deleted Page Section`,
            })
            if (response) {
                console.log("i am section delete", response)
                setIsDeleteSectionDialogOpen(false)
                const pageId = activeSection.pageId
                const sectionId = activeSection.id
                dispatch(removeSection({ pageId: pageId, sectionId: activeSection.id }))
                setActiveSection(null)
                setDeleteSectionLoader(false)
            }
        } catch (error) {
            console.error("Error deleting social link:", error)
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

    const removeASectionVerification = (section: Section) => {
        setIsDeleteSectionDialogOpen(true)
        setActiveSection(section)
    }

    const moveSocialAccount = async (dragIndex: number, hoverIndex: number) => {
        console.log(dragIndex)
        // if (!linkInBioState) return
        // if (!linkInBioState.socialLinks) return
        // const reorderSocialLink: string[] = []
        // const socialLinks = [...linkInBioState.socialLinks]
        // const [draggedAccount] = socialLinks.splice(dragIndex, 1)
        // socialLinks.splice(hoverIndex, 0, draggedAccount)
        // // update the server 
        // // update redux
        // socialLinks.map((value) => reorderSocialLink.push(value.id))
        // dispatch(reorderSocialLinks(reorderSocialLink))
        // try {
        //     const response = await apiCall({
        //         endpoint: `/social-link/reorder`,
        //         method: "put",
        //         "showToast": true,
        //         data: { socialLinksIds: reorderSocialLink },
        //         successMessage: `Social link reordered successfully `,
        //     }
        //     );
        //     if (response) {
        //         dispatch(reorderSocialLinks(reorderSocialLink))
        //     }
        // } catch (error) {
        //     console.error("Error while reordering social link:", error);

        // }
        // return socialLinks
    }

    const renderPageSection = () => {
        if (!activePage) return
        const activePageAndSections = findPage(activePage.id)
        if (!activePageAndSections) return
        if (!activePageAndSections.sections) return

        return (
            <div className="space-y-4">
                {activePageAndSections.sections.map((section, index) => (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <Card className="bg-gray-700 border-gray-600 hover:border-gray-500 transition-colors">
                            <div
                                className="p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection(section.id)}
                            >
                                {renderEditSectionTitle && index == activeIndex ? (
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex-1 mr-4">
                                            <Input
                                                id="title"
                                                ref={displayTitleRef}
                                                value={title ? title : ""}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="bg-gray-600 border-gray-500 text-white"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    updateSectionTitle()
                                                }}
                                            >
                                                {!displaySectionTitleLoader ? <Save className="h-4 w-4" /> : <LoadingSpinner />}
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setRenderEditSectionTitle(false)
                                                    setActiveIndex(0)
                                                    setActiveSection(null)
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-4 sm:gap-0 sm:flex-row flex-col justify-between items-center w-full">
                                        <div className="flex items-center">
                                            <h3 className="font-medium text-white">{section.title ? section.title : "Untitled Section"}</h3>
                                            <div className="ml-2 text-gray-400 text-sm">{section.links?.length || 0} links</div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleCreateLinkClick(section)
                                                }}
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEditSectionClick(section, index)
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeASectionVerification(section)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-full bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 ml-2"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleSection(section.id)
                                                }}
                                            >
                                                {expandedSections[section.id] ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <AnimatePresence>
                                {expandedSections[section.id] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <DragAndDropWrapper>
                                            <CardContent className="pt-0 pb-4 px-4 border-t border-gray-600">

                                                {section.links && section.links.length > 0 ? (
                                                    <div className="space-y-3 mt-3">
                                                        {section.links.map((link, index) => (
                                                            <SectionLinks
                                                                onMove={moveSocialAccount}
                                                                key={link.id}
                                                                link={link}
                                                                index={index}
                                                                updateLink={handleEditLinkClick}
                                                                deleteLink={removeALink}
                                                                viewStats={() => handleViewStatsClick(link)}
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="py-6 text-center">
                                                        <p className="text-gray-400 mb-3">No links in this section</p>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleCreateLinkClick(section)}
                                                            className="border-gray-500 text-gray-300"
                                                        >
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Add First Link
                                                        </Button>
                                                    </div>
                                                )}

                                            </CardContent>
                                        </DragAndDropWrapper>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                ))}

                {activePageAndSections.sections.length === 0 && (
                    <div className="text-center py-10 bg-gray-800 rounded-lg border border-gray-700">
                        <h3 className="text-gray-400 mb-4">No sections yet</h3>
                        <Button onClick={addNewPageSectionHandler} disabled={newPageSectionLoader}>
                            {newPageSectionLoader ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Section
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    const updateSectionTitle = async () => {
        const data = {
            title: title,
        }
        setDisplaySectionTitleLoader(true)
        try {
            const response = await apiCall({
                endpoint: `/page-section/update/${activeSection?.id}`,
                method: "put",
                showToast: true,
                data: data,
                successMessage: `Section Updated`,
            })
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
            console.error("Error updating section title :", error)
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
                showToast: true,
                successMessage: `Deleted Link`,
            })
            if (response) {
                setDeleteLinkLoader(false)
                const linkId = activeLink.id
                const sectionId = activeLink.pageSectionId
                dispatch(removeLink({ sectionId: sectionId, linkId: linkId }))
                setIsDeleteLinkDialogOpen(false)
                setActiveLink(null)
            }
        } catch (error) {
            console.error("Error deleting link:", error)
            setDeleteLinkLoader(false)
        }
    }

    const handleViewStatsClick = async (link: any) => {

        if (!link) return
        setViewStatsLoader(true)
        setIsViewStatsModalOpen(true)
        setNext(null)
        const statistics = fetchStatistics(link.id)
        if (!statistics) {
            setViewStatsLoader(false)
            setIsViewStatsModalOpen(false)
            return
        }

        try {

            const response = await apiCall({
                endpoint: `/link-stats/get-all-links-stats-by-link-id/${link.id}`,
                method: "get",
                "showToast": true,
            }
            );
            if (response) {
                setViewStatsLoader(false)
                setStatsData(response.data.data)
                if (response.data.links.next) {
                    setNext(response.data.links.next)
                }
            }

        } catch (error) {
            console.error("Error fetching stats:", error);
            setViewStatsLoader(true)
        }

    }
    const fetchMoreData = async () => {
        if (viewStatsLoader) {
            return;
        }
        if (!next) return
        setViewStatsLoader(true)

        try {

            const response = await apiCall({
                endpoint: `${next}`,
                method: "get",
                "showToast": false,
            }
            );
            if (response) {

                setStatsData(prev => [...prev, ...response.data.data]);
                if (response.data.links.next) {
                    setNext(response.data.links.next)
                } else {
                    setNext(null)
                }
                setViewStatsLoader(false)
            }

        } catch (error) {
            console.error("Error fetching stats:", error);
            setViewStatsLoader(false)

        }

        console.log("more")
    }

    const fetchStatistics = async (linkId: string) => {
        try {

            const response = await apiCall({
                endpoint: `/link-stats/analyze/${linkId}`,
                method: "get",
                "showToast": false,
            }
            );
            if (response) {
                setTotal(response.data.total)
                setPlatformPercentage(response.data.platformPercentage)
                setTopBrowser(response.data.topBrowser)
                setBusiestDay(response.data.busiestDay)
                return true
            }

        } catch (error) {
            return false

        }

        console.log("more")
    }

    return (
        <TabsContent value="pages">
            <Tabs>
                <Card className="bg-gray-800">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" className="mr-2" onClick={backToPage}>
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <span>Manage <em className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"> ( {activePage?.name} )</em> Page </span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-medium">Sections</h2>
                            <Button
                                onClick={addNewPageSectionHandler}
                                disabled={newPageSectionLoader}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                            >
                                {newPageSectionLoader ? (
                                    <LoadingSpinner />
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Section
                                    </>
                                )}
                            </Button>
                        </div>

                        <AnimatePresence>{renderPageSection()}</AnimatePresence>
                    </CardContent>
                </Card>
            </Tabs>

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

            <DeleteConfirm
                dialogDisplay={isDeleteSectionDialogOpen}
                dialogDisplaySetter={() => setIsDeleteSectionDialogOpen(false)}
                handleDelete={handleDeleteSection}
                loader={deleteSectionLoader}
                text={"Are you sure you want to delete this Page Section? This action cannot be undone."}
            />

            <DeleteConfirm
                dialogDisplay={isDeleteLinkDialogOpen}
                dialogDisplaySetter={() => setIsDeleteLinkDialogOpen(false)}
                handleDelete={handleDeleteLink}
                loader={deleteLinkLoader}
                text={"Are you sure you want to delete this Link? This action cannot be undone."}
            />

            <ModalComponent
                dialogDisplay={isViewStatsModalOpen}
                dialogDisplaySetter={() => setIsViewStatsModalOpen(false)}
                title={"Stats"}
                showInSide={true}
            >
                <StatsNumberComponent
                    total={total}
                    platformPercentage={platformPercentage}
                    topBrowser={topBrowser}
                    busiestDay={busiestDay}
                />

                <InfiniteScroll
                    pageStart={1}
                    loadMore={fetchMoreData}
                    hasMore={viewStatsLoader == false && next ? true : false}

                    useWindow={false}

                >
                    <StatsTable stats={statsData} />
                </InfiniteScroll>



            </ModalComponent>
        </TabsContent>
    )
}

