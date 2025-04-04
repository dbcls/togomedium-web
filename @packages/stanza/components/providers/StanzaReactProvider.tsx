import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import React, { FC, ReactElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Stanza from "togostanza/stanza";
import { EmotionCacheProvider } from "%stanza/components/providers/EmotionCacheProvider";
import { muiTheme } from "%stanza/styles/muiTheme";

const queryClient = new QueryClient();
const StanzaReactProvider: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <ThemeProvider theme={muiTheme}>
            <EmotionCacheProvider>
              <style>
                {`:host{--color-primary-dark:color-mix(in srgb, var(--color-primary), black 25%)}`}
              </style>
              {children}
            </EmotionCacheProvider>
          </ThemeProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};
const importWebFontForTogoMedium = (stanza: Stanza, name: string = "Fira Sans Condensed") => {
  name = name.replace(/ /gi, "+");
  stanza.importWebFontCSS(`https://fonts.googleapis.com/css2?family=${name}:wght@400;500;700`);
};

export abstract class TogoMediumReactStanza<T> extends Stanza {
  reactElm = this.root.querySelector("main")!;
  reactRoot = createRoot(this.reactElm as HTMLElement);
  //

  abstract makeApp(): React.ReactElement;
  async render() {
    this._render();
    importWebFontForTogoMedium(this);
  }

  handleAttributeChange() {
    this._render();
  }
  _render() {
    const children = this.makeApp();
    const main = this.reactElm;
    this.reactRoot.render(<StanzaReactProvider>{children}</StanzaReactProvider>);
    main.style.visibility = "hidden";
    setTimeout(() => {
      try {
        main.style.flexGrow = "1";
        main.style.display = "flex";
        main.style.flexDirection = "column";
        main.style.visibility = "visible";
        const wrapper = main.parentNode as HTMLElement;
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.flexGrow = "1";
        const childWrapper = main.children[0] as HTMLElement;
        childWrapper.style.display = "flex";
        childWrapper.style.flexGrow = "1";
        childWrapper.style.flexDirection = "column";
        //
      } catch (e) {
        console.log(e);
      }
    }, 100);
  }
}
