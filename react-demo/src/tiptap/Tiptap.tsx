import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'

import { initContent } from './initContent'
import { InlineSuggestion } from '../../../src'

import './tiptap.css'

export const Tiptap = () => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        InlineSuggestion.configure(
          {
            fetchAutocompletion: async () => 'A suggestion fetched from the API',
          }
        ),
        Link.configure({
          autolink: true,
        }),
      ],
      content: initContent,
      editorProps: {
        attributes: {
          class: 'prose prose-invert w-[768px] focus:outline-none'
        }
      }
    }
  )

  return (
    <div className='p-8 border border-slate-100 min-h-[200px] h-fit rounded-lg'>
      <EditorContent className='focus:outline-none' editor={editor} />
    </div>
  )
}
