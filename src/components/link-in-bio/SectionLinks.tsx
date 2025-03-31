'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiCall } from '@/utils/useApiCall'
import { getSocialPlatform } from '@/utils/helpers'
import { LoadingSpinner } from '../loader/Loader'
import { Card, CardContent } from '../ui/card'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Link } from '@/store/link-in-bio/interface/linkInBioInterface'
import LinkUpdateModal from './LinkUpdateModal'

interface linkInterface {
    link: Link
    updateLink: (link: Link) => void
    deleteLink: (link: Link) => void
}
export default function SectionLinks({ link, updateLink, deleteLink }: linkInterface) {

    return (
        <Card className={'bg-gray-700'} >
            <CardContent className="p-4" key={link.id} >
                <div className="flex items-center justify-between" >
                    <div className="flex items-center space-x-2" >
                        <div>
                            <h3 className="font-medium" > {link.title}  </h3>
                        </div>
                    </div>
                    < div className='flex' >

                        <Eye onClick={() => { }} className="h-4 w-4 ml-2 cursor-pointer text-sky-400/100" />
                        <Pencil onClick={() => { updateLink(link) }} className="h-4 w-4 ml-2 cursor-pointer text-green-500" />
                        <Trash2 onClick={() => { deleteLink(link) }} className="h-4 w-4 ml-2 cursor-pointer text-red-500" />

                    </div>

                </div>
            </CardContent>

        </Card>
    )
}