import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { TaxonInput } from "./TaxonInput";
import { COLOR_WHITE, SIZE2 } from "../../../shared/styles/variables";
import { sleep } from "../../../shared/utils/promise";

const meta: Meta<typeof TaxonInput> = {
  component: TaxonInput,
  decorators: [
    (Story) => (
      <div css={wrapper}>
        <Story />
      </div>
    ),
  ],
  parameters: {},
};
export default meta;

type Story = StoryObj<typeof TaxonInput>;
export const Primary: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox");
    const wrapper = input.parentElement!.parentElement!;
    // const wrapper = canvas.getByText("Search taxon by name");
    // console.log(wrapper);
    await userEvent.click(wrapper, { delay: 100 });
    await sleep(1000);
    await userEvent.type(input, "Deinoc", { delay: 16 });
  },
};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
