import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineSuggestion: {
      /**
       * fetch inline suggestions
       */
      fetchSuggestion: () => ReturnType;
    };
  }
}

export const inlineSuggestionPluginKey = new PluginKey("inlineSuggestion");

export interface InlineSuggestionOptions {
  /**
   * fetch inline suggestions
   */
  fetchAutocompletion: (existingText: string) => Promise<string>;
}

export interface InlineSuggestionStorage {
  data: {
    currentSuggestion?: string;
    nodeDetails?: {
      from: number;
      to: number;
    };
  };
}

const chunkString = (str: string): string[] => {
  const words = str.split(" ");
  const chunks = [];

  for (let i = 0; i < words.length; i += 5) {
    chunks.push(words.slice(i, i + 5).join(" "));
  }

  return chunks;
};

export const InlineSuggestion = Extension.create<
  InlineSuggestionOptions,
  InlineSuggestionStorage
>({
  name: "inlineSuggestion",

  addOptions() {
    return {
      fetchAutocompletion: async (existingText: string) => {
        const message =
          "[@sereneinserenade/tiptap-inline-suggestions] Please add a fetchSuggestion function to fetch suggestions from.";

        console.warn(message);

        return message;
      },
    };
  },

  addStorage() {
    return {
      data: {},
    };
  },

  addCommands() {
    return {
      fetchSuggestion:
        () =>
        ({ state, chain, editor }) => {
          if (this.storage.data.currentSuggestion) {
            return chain()
              .command(() => {
                const chunkifiedSuggestion =
                  this.storage.data.currentSuggestion.split("");

                this.storage.data = {};

                for (let i = 0; i < chunkifiedSuggestion.length; i++) {
                  setTimeout(
                    () =>
                      editor
                        .chain()
                        .insertContent(chunkifiedSuggestion[i])
                        .focus()
                        .run(),
                    2 * i
                  );
                }

                return true;
              })
              .run();
          }

          const { $from } = state.selection;

          const node = $from.parent;
          const [from, to] = [
            $from.start($from.depth - 1),
            $from.end($from.depth - 1),
          ];

          const existingText = node.textContent;

          if (existingText) {
            this.options.fetchAutocompletion(existingText).then((res) => {
              this.storage.data = {
                currentSuggestion: res,
                nodeDetails: {
                  from,
                  to,
                },
              };

              editor.view.dispatch(
                editor.view.state.tr.setMeta("addToHistory", false)
              );
            });

            return true;
          }

          return false;
        },
    };
  },

  addProseMirrorPlugins() {
    const getStorage = () => this.storage;

    const fetchSuggestion = () => this.editor.commands.fetchSuggestion();

    const handleNonTabKey = () => (this.storage.data = {});

    return [
      new Plugin({
        key: inlineSuggestionPluginKey,
        state: {
          init() {
            return DecorationSet.empty;
          },
          apply(tr) {
            const storage = getStorage().data;

            if (storage.currentSuggestion && storage.nodeDetails) {
              const { from, to } = storage.nodeDetails;

              const decoration = Decoration.node(from, to, {
                "data-inline-suggestion": storage.currentSuggestion,
              });

              return DecorationSet.create(tr.doc, [decoration]);
            }

            return DecorationSet.empty;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
          handleKeyDown(view, event) {
            if (event.key === "Tab") {
              event.preventDefault();

              fetchSuggestion();

              return true;
            }

            handleNonTabKey();
          },
        },
      }),
    ];
  },
});
