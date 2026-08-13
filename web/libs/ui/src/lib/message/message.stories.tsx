import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "./message";
import { Button } from "../button/button";
import { IconUpload, IconExternal, IconInfoOutline } from "@humansignal/icons";
import { Typography } from "../typography/typography";
import { useState } from "react";

const meta: Meta<typeof Message> = {
  component: Message,
  title: "用户界面/消息",
  parameters: {
    docs: {
      description: {
        component:
          "一个用于显示内联消息、通知和警报的可复用消息组件，支持不同的变体和可自定义的内容。",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "neutral", "negative", "positive", "warning", "info", "success", "error"],
      description:
        "消息的视觉变体。主要变体：主要、中性、负面、正面、警告。别名：信息（→主要）、成功（→正面）、错误（→反面）",
    },
    size: {
      control: "select",
      options: ["medium", "small"],
      description:
        "消息的大小。中号：标准内边距和24px图标（默认）；小号：紧凑内边距和20px图标（仅在空间有限时使用）",
    },
    icon: {
      control: false,
      description: "要显示的图标元素。如果未提供，则根据变体默认显示。",
    },
    iconSize: {
      control: "number",
      description: "图标的像素大小。如果未提供，则根据 size 属性设置默认值（medium: 20, small: 18）。",
    },
    title: {
      control: "text",
      description: "显示在主内容上方的可选标题。可以是字符串或用于丰富内容的 ReactNode。",
    },
    children: {
      control: "text",
      description: "消息的主要内容",
    },
    closable: {
      control: "boolean",
      description: "用户是否可以关闭该消息",
    },
    onClose: {
      control: false,
      description: "当点击关闭按钮时的回调函数",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

// Basic Stories - Primary Variants
export const Default: Story = {
  args: {
    variant: "primary",
    children: "这是一条包含重要细节的通知信息。",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    title: "信息",
    children: "这是一个带有标题的主要信息消息。",
  },
};

export const Neutral: Story = {
  args: {
    variant: "neutral",
    title: "注意",
    children: "这是一条中性消息，提供一般信息，不带强调。",
  },
};

export const Negative: Story = {
  args: {
    variant: "negative",
    title: "错误",
    children: "处理您的请求时发生错误。请重试。",
  },
};

export const Positive: Story = {
  args: {
    variant: "positive",
    title: "成功",
    children: "您的更改已成功保存。",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "警告",
    children: "您的会话将在5分钟内过期。请保存您的工作。",
  },
};

// Feature Stories
export const WithTitle: Story = {
  args: {
    variant: "primary",
    title: "重要更新",
    children: "我们更新了服务条款。请在继续之前查看更改内容。",
  },
};

export const WithRichTitle: Story = {
  args: {
    variant: "warning",
    title: (
      <>
        您的<strong>个人沙盒</strong>是私有的
      </>
    ),
    children: "将此项目移至工作区，以便与组织中的其他人共享访问权限。",
  },
};

export const WithActions: Story = {
  args: {
    variant: "warning",
    title: "未保存的更改",
    children: (
      <>
        <Typography>您有未保存的更改。您想在离开前保存它们吗？</Typography>
        <div className="flex gap-tight">
          <Button variant="primary" look="filled" size="small">
            保存更改
          </Button>
          <Button variant="neutral" look="outlined" size="small">
            丢弃
          </Button>
        </div>
      </>
    ),
  },
};

export const Closable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <Button variant="neutral" look="outlined" onClick={() => setVisible(true)}>
          显示消息
        </Button>
      );
    }

    return (
      <Message variant="primary" title="可关闭的消息" closable onClose={() => setVisible(false)}>
        点击X按钮即可关闭此消息。
      </Message>
    );
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "primary",
    icon: <IconUpload />,
    title: "需要上传",
    children: "请上传文件以继续该流程。",
  },
};

export const WithCustomIconSize: Story = {
  render: () => (
    <div className="space-y-4">
      <Message variant="primary" icon={<IconInfoOutline />} iconSize={16}>
        小图标 (16px)
      </Message>
      <Message variant="primary" icon={<IconInfoOutline />} iconSize={32}>
        大图标 (32px)
      </Message>
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">中号（默认）</h3>
        <Message variant="primary" size="medium" title="Medium Message">
          这是一个带有标准内边距和24px图标的中型消息。默认使用此尺寸。
        </Message>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">小号（紧凑）</h3>
        <Message variant="primary" size="small" title="Small Message">
          这是一个带有减少内边距和20px图标的小尺寸消息。仅在垂直空间有限时使用。
        </Message>
      </div>
    </div>
  ),
};

// Real-world Examples
export const WithLink: Story = {
  args: {
    variant: "primary",
    title: "需要帮助吗？",
    children: (
      <>
        <Typography>访问我们的文档以了解更多关于此功能的信息。</Typography>
        <Typography variant="label" size="small" className="text-primary-link">
          <a href="/docs" className="inline-flex items-center gap-1 hover:underline">
            查看文档
            <IconExternal width={16} height={16} />
          </a>
        </Typography>
      </>
    ),
  },
};

// Comparison Stories
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Message variant="primary" title="主要">
        这是一条主要的信息消息。
      </Message>

      <Message variant="neutral" title="中性">
        这是一个中性消息。
      </Message>

      <Message variant="negative" title="负面">
        这是一个负面错误消息。
      </Message>

      <Message variant="positive" title="正面">
        这是一个正面成功消息。
      </Message>

      <Message variant="warning" title="警告">
        这是一个警告消息。
      </Message>
    </div>
  ),
};
