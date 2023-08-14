import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { initContent } from './initContent'
import { InlineSuggestion } from '../../../src'

import './tiptap.css'

export const Tiptap = () => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        InlineSuggestion,
      ],
      content: initContent,
      editorProps: {
        attributes: {
          class: 'prose w-[768px] focus:outline-none text-slate-200'
        }
      }
    }
  )

  return (
    <div className='p-4 border border-slate-100 min-h-[200px] h-fit rounded-lg'>
      <EditorContent className='text-slate-200 focus:outline-none' editor={editor} />
    </div>
  )
}
