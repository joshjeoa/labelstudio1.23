import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { action } from "storybook/actions";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "用户界面/复选框",
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    onChange: { action: "changed" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: "默认复选框",
  },
};

export const Checked: Story = {
  args: {
    children: "已勾选的复选框",
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    children: "未勾选的复选框",
    checked: false,
  },
};

export const Indeterminate: Story = {
  args: {
    children: "不确定复选框",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "禁用的复选框",
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const WithCustomStyle: Story = {
  args: {
    children: "自定义样式复选框",
    style: { backgroundColor: "lightblue", padding: "10px" },
  },
};

export const WithChangeHandler: Story = {
  args: {
    children: "带有变更处理程序的复选框",
    onChange: action("Checkbox changed"),
  },
};
