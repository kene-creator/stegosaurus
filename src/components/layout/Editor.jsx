import React, { useCallback, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import DOMPurify from 'dompurify'
import 'quill/dist/quill.snow.css'

let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
]

export default function Editor() {
    const quillRef = useRef(null)

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper === null) return
        wrapper.innerHTML = ''
        const editor = document.createElement('div')
        wrapper.append(editor)
        const quill = new Quill(editor, {
            theme: 'snow',
            modules: { toolbar: toolbarOptions },
        })
        quillRef.current = quill
    }, [])

    useEffect(() => {
        const quill = quillRef.current

        quill.on('selection-change', (range) => {
            if (range) {
                const text = quill.getText(range.index, range.length)
                if (text) {
                    document.addEventListener('keydown', handleKeyDown)
                } else {
                    document.removeEventListener('keydown', handleKeyDown)
                }
            }
        })

        const handleKeyDown = (event) => {
            if (event.key === 's' && event.ctrlKey) {
                quill.format('strike', true)
                event.preventDefault()
            }
            if (event.key === 'w' && event.ctrlKey) {
                quill.format('strike', false)
                event.preventDefault()
            }
        }

        return () => {
            quill.off('selection-change')
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    

    const handleSelectStrikeThrough = async () => {
        if (quillRef.current) {
            const quill = quillRef.current
            const contents = quill.getContents()
            const newContents = []

            const data = contents.ops.map((e) => {
                if (e.attributes && e.attributes.strike) {
                    return `${e.insert}`
                }
            })
            const wordings = data.filter((e) => {
                return e !== undefined
            })
            const result = await findLinks(wordings)
            console.log(result)
            if (result) {
                contents.ops.forEach((op) => {
                    if (op.attributes && op.attributes.strike) {
                        const text = op.insert
                        const res = result.findLinks.find(
                            (obj) => obj.word === text,
                        )
                        console.log(res)
                        const a = ['data']
                        const link = createLink(text)
                        const sanitizedLink = DOMPurify.sanitize(link, {
                            ALLOWED_TAGS: ['a'],
                            ALLOWED_ATTR: ['href'],
                        })
                        const stringToHTML = function (str) {
                            const parser = new DOMParser()
                            const doc = parser.parseFromString(str, 'text/html')
                            return doc.body
                        }
                        const linkNode = stringToHTML(sanitizedLink).firstChild

                        if (res.links.length > 1) {
                            newContents.push({
                                insert: text,
                            })
                        } else {
                            newContents.push({
                                attributes: {
                                    link: res.links.length
                                        ? res.links[0].link
                                        : text,
                                },
                                insert: text,
                                link: linkNode,
                            })
                        }
                    } else {
                        newContents.push(op)
                    }
                })
                quill.setContents(newContents)
            }
        }
    }

    return (
        <>
            <div className='container-q' ref={wrapperRef}></div>
            <div className='w-full flex justify-center items-center mb-8'>
                <button
                    onClick={handleSelectStrikeThrough}
                    className='p-2 bg-blue-400 text-white rounded-lg'
                >
                    Wikify
                </button>
            </div>
        </>
    )
}
