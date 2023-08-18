<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import InlineSuggestion from '@sereneinserenade/tiptap-inline-suggestion';
import Link from '@tiptap/extension-link'

import { initContent } from './initContent'

const editor = useEditor({
  content: initContent,
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
  editorProps: {
    attributes: {
      class: 'prose prose-invert w-[768px] focus:outline-none'
    }
  }
})
</script>

<template>
  <div className='p-8 border border-slate-100 min-h-[200px] h-fit rounded-lg'>
    <EditorContent class="focus:outline-none" :editor="editor" />
  </div>
</template>

<style>
[data-inline-suggestion]::after {
  content: attr(data-inline-suggestion);
  color: #999;
}
</style>
