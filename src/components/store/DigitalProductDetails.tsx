'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DigitalProductDetails({ productData, isEditing, onUpdate }) {
  const [downloadLink, setDownloadLink] = React.useState(productData.downloadLink)
  const [accessInstructions, setAccessInstructions] = React.useState(productData.accessInstructions)
  const [fileSize, setFileSize] = React.useState(productData.fileSize)
  const [format, setFormat] = React.useState(productData.format)

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedProductData = {
      downloadLink,
      accessInstructions,
      fileSize,
      format,
    }
    onUpdate(updatedProductData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {productData.type === 'digital-downloadable' ? (
        <div>
          <Label htmlFor="downloadLink">Download Link</Label>
          <Input
            id="downloadLink"
            name="downloadLink"
            type="url"
            value={downloadLink}
            onChange={(event) => setDownloadLink(event.target.value)}
            required
          />
        </div>
      ) : (
        <div>
          <Label htmlFor="accessInstructions">Access Instructions</Label>
          <Textarea
            id="accessInstructions"
            name="accessInstructions"
            value={accessInstructions}
            onChange={(event) => setAccessInstructions(event.target.value)}
            required
          />
        </div>
      )}
      <div>
        <Label htmlFor="fileSize">File Size (if applicable)</Label>
        <Input
          id="fileSize"
          name="fileSize"
          value={fileSize}
          onChange={(event) => setFileSize(event.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="format">Format</Label>
        <Input
          id="format"
          name="format"
          value={format}
          onChange={(event) => setFormat(event.target.value)}
          placeholder="e.g., PDF, Video, Course"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
        {isEditing ? 'Update' : 'Next'}
      </Button>
    </form>
  )
}