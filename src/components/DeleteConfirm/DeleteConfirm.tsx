'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "../loader/Loader"

interface DeleteConfirmInterface {
    dialogDisplay: boolean;
    dialogDisplaySetter: () => any;
    handleDelete: () => {}
    loader: boolean;
    text: string
}
export default function DeleteConfirm({ dialogDisplay, dialogDisplaySetter, handleDelete, loader, text }: DeleteConfirmInterface) {
    return (
        <Dialog open={dialogDisplay} onOpenChange={dialogDisplaySetter}>
            <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {text}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={dialogDisplaySetter} className=" text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        Cancel
                    </Button>
                    {!loader ?
                        <Button variant="destructive" onClick={handleDelete} className="mb-2 sm:mb-0">
                            Delete
                        </Button>
                        : <LoadingSpinner />
                    }

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



