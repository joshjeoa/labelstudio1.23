import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../button/button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "用户界面/工具提示",
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="工具提示示例">
          <Button>把鼠标悬停在我上面</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithLongText: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="这是一个带有非常非常非常长文本的工具提示，文本超出了尺寸范围。">
          <Button>把鼠标悬停在我上面</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithLongTextString: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="这是一个带有非常非常非常长文本的工具提示，该文本超出了尺寸范围。">
          <Button>把鼠标悬停在我上面</Button>
        </Tooltip>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip
          {...props}
          title={
            <div>
              <button type="button" onClick={() => alert("hello there")}>
                点击我
              </button>
            </div>
          }
          interactive
        >
          <Button>把鼠标悬停在我上面</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithDisabledButton: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="此按钮被禁用是因为它被禁用了">
          <Button disabled>把鼠标悬停在我上面</Button>
        </Tooltip>
      </div>
    );
  },
};

export const WithDisabledInput: Story = {
  render: ({ children, ...props }) => {
    return (
      <div className="flex items-center gap-tight">
        <Tooltip {...props} title="此输入被禁用，原因是它被禁用了">
          <input type="text" disabled className="border p-2" />
        </Tooltip>
      </div>
    );
  },
};
