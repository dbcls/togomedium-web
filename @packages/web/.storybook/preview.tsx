import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
import { StoryProvider, type StoryEnvironment } from "./StoryProvider";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <StoryProvider key={context.id} {...(context.parameters.web as StoryEnvironment)}>
        <Story />
      </StoryProvider>
    ),
  ],
};
export default preview;
