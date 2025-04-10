// "use client"

// import type React from "react"

// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import { LoadingSpinner } from "../loader/Loader"
// import { useMobile } from "./useMobile"
// import { MobileBottomSheet } from "./MobileBottomSheet"

// interface ModalComponentInterface {
//     dialogDisplay: boolean;
//     dialogDisplaySetter: () => any;
//     handleAction?: () => void;
//     loader?: boolean;
//     title?: string | (() => React.ReactNode);
//     withFooter?: boolean;
//     children: React.ReactNode;
//     actionTitle?: string;
// }

// export default function ModalComponent({
//     dialogDisplay,
//     dialogDisplaySetter,
//     handleAction,
//     loader,
//     title,
//     withFooter,
//     children,
//     actionTitle,
// }: ModalComponentInterface) {
//     const isMobile = useMobile()

//     // Render mobile bottom sheet for mobile devices
//     if (isMobile) {
//         return (
//             <MobileBottomSheet
//                 isOpen={dialogDisplay}
//                 onClose={dialogDisplaySetter}
//                 title={title}
//                 withFooter={withFooter}
//                 handleAction={handleAction}
//                 loader={loader}
//                 actionTitle={actionTitle}
//             >
//                 {children}
//             </MobileBottomSheet>
//         )
//     }

//     // Render standard dialog for desktop
//     return (
//         <Dialog open={dialogDisplay} onOpenChange={dialogDisplaySetter}>
//             <DialogContent>
//                 <DialogHeader>
//                     {title && <DialogTitle>{typeof title === "function" ? title() : title}</DialogTitle>}
//                 </DialogHeader>
//                 {children}
//                 {withFooter && (
//                     <DialogFooter>
//                         <Button variant="outline" onClick={dialogDisplaySetter}>
//                             Cancel
//                         </Button>
//                         {!loader ? (
//                             <Button variant="destructive" onClick={handleAction}>
//                                 {actionTitle}
//                             </Button>
//                         ) : (
//                             <LoadingSpinner />
//                         )}
//                     </DialogFooter>
//                 )}
//             </DialogContent>
//         </Dialog>
//     )
// }



"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { LoadingSpinner } from "../loader/Loader"
import { useMobile } from "./useMobile"
import { MobileBottomSheet } from "./MobileBottomSheet"
import { cn } from "@/lib/utils"

interface ModalComponentInterface {
    dialogDisplay: boolean
    dialogDisplaySetter: () => any
    handleAction?: () => void
    loader?: boolean
    title?: string | (() => React.ReactNode)
    withFooter?: boolean
    children: React.ReactNode
    actionTitle?: string
    showInSide?: boolean
}

export default function ModalComponent({
    dialogDisplay,
    dialogDisplaySetter,
    handleAction,
    loader,
    title,
    withFooter,
    children,
    actionTitle = "Delete",
    showInSide = false,
}: ModalComponentInterface) {
    const isMobile = useMobile()

    // Render mobile bottom sheet for mobile devices
    if (isMobile) {
        return (
            <MobileBottomSheet
                isOpen={dialogDisplay}
                onClose={dialogDisplaySetter}
                title={title}
                withFooter={withFooter}
                handleAction={handleAction}
                loader={loader}
                actionTitle={actionTitle}
            >
                {children}
            </MobileBottomSheet>
        )
    }

    // Render standard dialog for desktop
    return (
        <Dialog open={dialogDisplay} onOpenChange={dialogDisplaySetter}>
            {showInSide ? (
                // Side drawer implementation
                <div className={`${dialogDisplay ? "fixed" : null} inset-0 z-50 bg-black/50`}>
                    <div
                        className={cn(
                            "fixed inset-y-0 right-0 h-full w-full max-w-[40%] shadow-lg",
                            "transform transition-all duration-300 ease-in-out",
                            dialogDisplay ? "translate-x-0" : "translate-x-full",
                        )}
                    >
                        <div className="flex h-full flex-col">
                            <div className="flex items-center justify-between border-b px-6 py-4">
                                {title && <h2 className="text-lg font-semibold">{typeof title === "function" ? title() : title}</h2>}
                                <Button variant="ghost" size="icon" onClick={dialogDisplaySetter} className="rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                    <span className="sr-only">Close</span>
                                </Button>
                            </div>
                            <div className="flex-1 overflow-auto p-6">{children}</div>
                            {withFooter && (
                                <div className="border-t p-6">
                                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                        <Button variant="outline" onClick={dialogDisplaySetter}>
                                            Cancel
                                        </Button>
                                        {!loader ? (
                                            <Button variant="destructive" onClick={handleAction}>
                                                {actionTitle}
                                            </Button>
                                        ) : (
                                            <LoadingSpinner />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // Standard modal implementation
                <DialogContent className="bg-black/50 text-white">
                    <DialogHeader>
                        {title && <DialogTitle>{typeof title === "function" ? title() : title}</DialogTitle>}
                    </DialogHeader>
                    {children}
                    {withFooter && (
                        <DialogFooter className="bg-black/50" >

                            <Button variant="outline" onClick={dialogDisplaySetter} className=" text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" >
                                Cancel
                            </Button>
                            {!loader ? (
                                <Button variant="destructive" onClick={handleAction}>
                                    {actionTitle}
                                </Button>
                            ) : (
                                <LoadingSpinner />
                            )}
                        </DialogFooter>
                    )}
                </DialogContent>
            )}
        </Dialog>
    )
}

