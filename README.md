# InlineSuggestion

![npm downloads](https://img.shields.io/npm/dt/%40sereneinserenade%2Ftiptap-inline-suggestion?style=for-the-badge&logo=npm&color=black)

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

## My

A ⭐️ to the repo if you 👍 / ❤️  what I'm doing would be much appreciated. If you're using this extension, it'd be very kind of you to **[:heart: Sponsor me](https://github.com/sponsors/sereneinserenade)**.

I've made a bunch of extensions for Tiptap 2, some of them are **Resiable Images And Videos**, **Search and Replace**, **LanguageTool integration** with tiptap. You can check it our here https://github.com/sereneinserenade#a-glance-of-my-projects.


## License

MIT © Jeet Mandaliya(github: sereneinserenade)
