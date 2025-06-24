import { CatalogView } from './CatalogView.tsx';
import { expect, within } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';


const meta = {
  title: 'Example/CatalogView',
  component: CatalogView,
} satisfies Meta<typeof CatalogView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CatalogStory: Story = {
  name: 'Default',
  args: {
    di: {
      ProductList: function () { return <span>mock</span> }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByTestId('CatalogView');
    await expect(element).toBeInTheDocument();
  },
};
