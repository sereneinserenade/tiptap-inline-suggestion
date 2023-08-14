# InlineSuggestion

A tiptap extension that allows you to add inline suggestions to your editor.

**Live Demo**: https://sereneinserenade.github.io/tiptap-inline-suggestion/

<details open>
<summary> Video Demo </summary>

https://github.com/sereneinserenade/tiptap-inline-suggestion/assets/45892659/b69efd59-f853-4c03-9a03-85044e43f58a

</details>

## Installation

```bash
npm install @sereneinserenade/tiptap-inline-suggestion
```

## Usage

Add `InlineSuggestion` extension to your list of extension for tiptap. Add a `fetchAutocompletion` function to the configuration object. This function should return a string. This string will be shown as a suggestion to the user.

Add styles to show the suggestion that gets stored in the attribute `data-inline-suggestion`. Below are styles I used for the demo, adjust it to your liking.

```ts
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import InlineSuggestion from "@sereneinserenade/tiptap-inline-suggestion";

const editor = new Editor(
  {
    extensions: [
      StarterKit,
      // add InlineSuggestions to the array of tiptap extensions
      InlineSuggestion.configure(
        {
          fetchAutocompletion: async (query) => {
            // make request to your API or something else
            const res = await fetch(`YOUR_API_ENDPOINT?query=${query}`)

            const stringRes = res.suggestion; // or whatever your API returns

            return stringRes; // return value should always be a string
          }
        }
      ),
    ],
  }
)
```

```css
[data-inline-suggestion]::after {
  content: attr(data-inline-suggestion);
  color: #999;
}
```


