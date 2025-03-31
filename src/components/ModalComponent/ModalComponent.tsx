// 'use client'
// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog"
// import { LoadingSpinner } from "../loader/Loader"

// interface ModalComponentInterface {
//     dialogDisplay: boolean;
//     dialogDisplaySetter: () => any;
//     handleAction?: () => void;
//     loader?: boolean;
//     title?: string | (() => React.ReactNode);
//     withFooter?: boolean;
//     children: React.ReactNode;
// }

// export default function ModalComponent({ dialogDisplay, dialogDisplaySetter, handleAction, loader, title, withFooter, children }: ModalComponentInterface) {
//     return (
//         <Dialog open={dialogDisplay} onOpenChange={dialogDisplaySetter}>
//             <DialogContent

//             >
//                 <DialogHeader>
//                     {title && <DialogTitle>{typeof title === 'function' ? title() : title}</DialogTitle>
//                     }
//                 </DialogHeader>
//                 {children}
//                 {withFooter &&
//                     <DialogFooter>
//                         <Button variant="outline" onClick={dialogDisplaySetter}>
//                             Cancel
//                         </Button>
//                         {!loader ? (
//                             <Button variant="destructive" onClick={handleAction}>
//                                 Delete
//                             </Button>
//                         ) : (
//                             <LoadingSpinner />
//                         )}
//                     </DialogFooter>
//                 }
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

interface ModalComponentInterface {
    dialogDisplay: boolean;
    dialogDisplaySetter: () => any;
    handleAction?: () => void;
    loader?: boolean;
    title?: string | (() => React.ReactNode);
    withFooter?: boolean;
    children: React.ReactNode;
    actionTitle?: string;
}

export default function ModalComponent({
    dialogDisplay,
    dialogDisplaySetter,
    handleAction,
    loader,
    title,
    withFooter,
    children,
    actionTitle,
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
            <DialogContent>
                <DialogHeader>
                    {title && <DialogTitle>{typeof title === "function" ? title() : title}</DialogTitle>}
                </DialogHeader>
                {children}
                {withFooter && (
                    <DialogFooter>
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
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

