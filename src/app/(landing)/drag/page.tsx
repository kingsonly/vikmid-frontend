"use client"
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

// Create initial data
const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    content: `Quote ${k}`,
}))

const grid = 8

// Helper function to reorder the list
const reorder = (list, startIndex, endIndex) => {
    console.log(startIndex, endIndex)
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

// Quote component - renders a single draggable item
function Quote({ quote, index }) {
    return (
        <Draggable draggableId={quote.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        padding: grid,
                        marginBottom: grid,
                        backgroundColor: snapshot.isDragging ? "lightgreen" : "lightblue",
                        border: "1px solid grey",
                        ...provided.draggableProps.style,
                    }}
                >
                    {quote.content}
                </div>
            )}
        </Draggable>
    )
}

export default function QuoteApp() {
    const [quotes, setQuotes] = useState<any>(initial)

    function onDragEnd(result) {
        // Drop outside the list
        if (!result.destination) {
            return
        }

        // Dropped in the same position
        if (result.destination.index === result.source.index) {
            return
        }

        // Reorder the list
        const newQuotes = reorder(quotes, result.source.index, result.destination.index)

        // Update state
        setQuotes(newQuotes)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
                direction="vertical"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? "lightgrey" : "white",
                            padding: grid,
                            width: 250,
                        }}
                    >
                        {quotes.map((quote, index) => (
                            <Quote quote={quote} index={index} key={quote.id} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}


// "use client"
// import { useState, useEffect } from "react"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// // Create initial data
// const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => ({
//     id: `id-${k}`,
//     content: `Quote ${k}`,
// }))

// const grid = 8

// // Helper function to reorder the list
// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list)
//     const [removed] = result.splice(startIndex, 1)
//     result.splice(endIndex, 0, removed)
//     return result
// }

// // Quote component - renders a single draggable item
// function Quote({ quote, index }) {
//     return (
//         <Draggable draggableId={quote.id} index={index}>
//             {(provided, snapshot) => (
//                 <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={{
//                         userSelect: "none",
//                         padding: grid,
//                         marginBottom: grid,
//                         backgroundColor: snapshot.isDragging ? "lightgreen" : "lightblue",
//                         border: "1px solid grey",
//                         ...provided.draggableProps.style,
//                     }}
//                 >
//                     {quote.content}
//                 </div>
//             )}
//         </Draggable>
//     )
// }

// export default function QuoteApp() {
//     const [quotes, setQuotes] = useState<any>(initial)
//     // This state is used to handle the strict mode issue
//     const [enabled, setEnabled] = useState(false)

//     // Enable drag and drop after the component has mounted
//     useEffect(() => {
//         // A small delay to ensure we're past the strict mode double-mount
//         const timeout = setTimeout(() => {
//             setEnabled(true)
//         }, 500)

//         return () => clearTimeout(timeout)
//     }, [])

//     function onDragEnd(result) {
//         // Drop outside the list
//         if (!result.destination) {
//             return
//         }

//         // Dropped in the same position
//         if (result.destination.index === result.source.index) {
//             return
//         }

//         // Reorder the list
//         const newQuotes = reorder(quotes, result.source.index, result.destination.index)

//         // Update state
//         setQuotes(newQuotes)
//     }

//     // Show a loading state or non-interactive list while waiting for drag and drop to be enabled
//     if (!enabled) {
//         return (
//             <div style={{ padding: grid, width: 250 }}>
//                 {quotes.map((quote) => (
//                     <div
//                         key={quote.id}
//                         style={{
//                             userSelect: "none",
//                             padding: grid,
//                             marginBottom: grid,
//                             backgroundColor: "lightblue",
//                             border: "1px solid grey",
//                         }}
//                     >
//                         {quote.content}
//                     </div>
//                 ))}
//             </div>
//         )
//     }

//     return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <Droppable droppableId="list">
//                 {(provided, snapshot) => (
//                     <div
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         style={{
//                             backgroundColor: snapshot.isDraggingOver ? "lightgrey" : "white",
//                             padding: grid,
//                             width: 250,
//                         }}
//                     >
//                         {quotes.map((quote, index) => (
//                             <Quote quote={quote} index={index} key={quote.id} />
//                         ))}
//                         {provided.placeholder}
//                     </div>
//                 )}
//             </Droppable>
//         </DragDropContext>
//     )
// }
