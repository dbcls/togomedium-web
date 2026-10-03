import { EmotionGlobalStyles } from "%stanza/styles/EmotionGlobalStyles";
import { muiTheme } from "%stanza/styles/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Store } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import React, { FC, PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";

type Props = {
  jotai?: boolean;
  reactQuery?: boolean;
  mui?: boolean;
  tw?: boolean;
  redux?: Store;
} & PropsWithChildren;
const queryClient = new QueryClient();

const JotaiWrapper: FC<Props> = ({ children, jotai }) =>
  jotai ? <JotaiProvider>{children}</JotaiProvider> : <>{children}</>;

const ReactQueryWrapper: FC<Props> = ({ children, reactQuery }) =>
  reactQuery ? (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  ) : (
    <>{children}</>
  );

const ReduxWrapper: FC<Props> = ({ children, redux }) =>
  redux ? <ReduxProvider store={redux}>{children}</ReduxProvider> : <>{children}</>;
const MuiWrapper: FC<Props> = ({ children, mui }) =>
  mui ? (
    <MuiThemeProvider theme={muiTheme}>
      <EmotionGlobalStyles />
      {children}
    </MuiThemeProvider>
  ) : (
    <>{children}</>
  );
// Keep wrapper component types stable so parent renders preserve the story's state.
export const StoryProvider: FC<Props> = ({ children, jotai, reactQuery, mui, redux }) => {
  return (
    <ReactQueryWrapper reactQuery={reactQuery}>
      <ReduxWrapper redux={redux}>
        <JotaiWrapper jotai={jotai}>
          <MuiWrapper mui={mui}>{children}</MuiWrapper>
        </JotaiWrapper>
      </ReduxWrapper>
    </ReactQueryWrapper>
  );
};
