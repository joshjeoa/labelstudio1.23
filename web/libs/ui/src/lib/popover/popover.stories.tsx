import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./popover";
import { Button } from "@humansignal/ui";

const meta = {
  title: "用户界面/弹出框",
  component: Popover,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button>点击我</Button>,
    children: <div className="p-4">弹出框内容</div>,
  },
};

export const WithForm: Story = {
  args: {
    trigger: <Button>Open Form</Button>,
    children: (
      <div className="p-4 w-80">
        <h4 className="mb-4 font-medium">设置</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">名称</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="输入您的名称" />
          </div>
          <div>
            <label className="text-sm font-medium">邮箱</label>
            <input type="email" className="w-full mt-1 px-3 py-2 border rounded-md" placeholder="输入您的邮箱" />
          </div>
          <Button className="w-full">保存</Button>
        </div>
      </div>
    ),
  },
};

export const WithList: Story = {
  args: {
    trigger: <Button>查看选项</Button>,
    children: (
      <div className="p-2 w-48">
        <ul className="space-y-1">
          <li>
            <span className="block w-full px-2 py-1.5 text-left hover:bg-accent rounded-sm cursor-pointer">
              选项 1
            </span>
          </li>
          <li>
            <span className="block w-full px-2 py-1.5 text-left hover:bg-accent rounded-sm cursor-pointer">
              选项 2
            </span>
          </li>
          <li>
            <span className="block w-full px-2 py-1.5 text-left hover:bg-accent rounded-sm cursor-pointer">
              选项 3
            </span>
          </li>
        </ul>
      </div>
    ),
  },
};

export const WithCustomAlignment: Story = {
  args: {
    trigger: <Button>自定义对齐</Button>,
    align: "start",
    sideOffset: 8,
    children: (
      <div className="p-4">
        <p>此弹出框对齐到起始位置，并且偏移量较大。</p>
      </div>
    ),
  },
};
