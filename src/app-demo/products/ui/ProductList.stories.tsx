import { ProductListView } from './ProductListView.tsx';
import { expect, fn, within } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { data } from '../mock.ts';


const meta = {
  title: 'Example/ProductList',
  component: ProductListView,
} satisfies Meta<typeof ProductListView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProductListStory: Story = {
  name: 'Default',
  args: {
    title: "Test",
    items: data,
    onClick: fn()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByTestId('ProductList');
    await expect(element).toBeInTheDocument();
    await expect(element.textContent).toBe("Test");
  },
};
