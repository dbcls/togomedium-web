import { EmotionGlobalStyles } from "%stanza/styles/EmotionGlobalStyles";
import { muiTheme } from "%stanza/styles/muiTheme";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as JotaiProvider } from "jotai";
import React, { FC, PropsWithChildren } from "react";

type Props = {
  jotai?: boolean;
  reactQuery?: boolean;
  mui?: boolean;
  tw?: boolean;
  redux?: boolean;
} & PropsWithChildren;
const queryClient = new QueryClient();

export const StoryProvider: FC<Props> = ({ children, jotai, reactQuery, mui }) => {
  const JotaiWrapper: FC<PropsWithChildren> = ({ children }) =>
    jotai ? <JotaiProvider>{children}</JotaiProvider> : <>{children}</>;

  const ReactQueryWrapper: FC<PropsWithChildren> = ({ children }) =>
    reactQuery ? (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    ) : (
      <>{children}</>
    );
  const MuiWrapper: FC<PropsWithChildren> = ({ children }) =>
    mui ? (
      <MuiThemeProvider theme={muiTheme}>
        <EmotionGlobalStyles />
        {children}
      </MuiThemeProvider>
    ) : (
      <>{children}</>
    );
  return (
    <ReactQueryWrapper>
      <JotaiWrapper>
        <MuiWrapper>{children}</MuiWrapper>
      </JotaiWrapper>
    </ReactQueryWrapper>
  );
};
