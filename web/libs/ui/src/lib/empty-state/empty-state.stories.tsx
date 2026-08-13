import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { Button } from "../button/button";
import {
  IconUpload,
  IconSearch,
  IconInbox,
  IconLsLabeling,
  IconLsReview,
  IconCheck,
  IconCloudProviderS3,
  IconCloudProviderGCS,
  IconCloudProviderAzure,
  IconCloudProviderRedis,
  IconExternal,
  IconRelationLink,
} from "@humansignal/icons";
import { Typography } from "../typography/typography";
import { Tooltip } from "../Tooltip/Tooltip";

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: "UI/Empty State",
  parameters: {
    docs: {
      description: {
        component:
          "一个可复用的空状态组件，用于在整个应用程序中显示各种空状态，支持不同尺寸和可自定义内容。",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["large", "medium", "small"],
      description: "空状态的大小",
    },
    variant: {
      control: "select",
      options: ["primary", "neutral", "negative", "positive", "warning", "gradient"],
      description: "空状态的颜色变体",
    },
    icon: {
      control: false,
      description: "用于显示的图标元素",
    },

    title: {
      control: "text",
      description: "主标题文本",
    },
    description: {
      control: "text",
      description: "标题下方的描述文本",
    },
    actions: {
      control: false,
      description: "操作按钮或其他交互元素",
    },
    additionalContent: {
      control: false,
      description: "在描述和操作之间显示的附加内容",
    },
    footer: {
      control: false,
      description: "底部显示的页脚内容",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

// Basic Stories
export const Default: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconInbox />,
    title: "添加您的首批项目",
    description: "通过添加新物品开始构建您的收藏",
    footer: (
      <Typography variant="label" size="small" className="text-primary-link">
        <a href="/docs/labeling-interface" className="inline-flex items-center gap-1 hover:underline">
          了解更多
          <IconExternal width={16} height={16} />
        </a>
      </Typography>
    ),
  },
};

export const WithSingleAction: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconUpload />,
    title: "上传您的数据",
    description: "从您的电脑中选择一个文件以开始",
    actions: (
      <Button variant="primary" look="filled">
        上传文件
      </Button>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconUpload />,
    title: "导入数据以开始",
    description: "连接您的云存储或从您的电脑上传文件",
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          连接云存储
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          上传文件
        </Button>
      </>
    ),
  },
};

// Size Comparison Stories
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">大号(Data Manager Style)</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-96">
          <EmptyState
            size="large"
            variant="primary"
            icon={<IconUpload />}
            title="导入数据以开始您的项目"
            description="连接您的云存储或从您的电脑上传文件"
            actions={
              <>
                <Button variant="primary" look="filled" className="flex-1">
                  连接云存储
                </Button>
                <Button variant="primary" look="outlined" className="flex-1">
                  导入
                </Button>
              </>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">中号(Home Page Style)</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-64">
          <EmptyState
            size="medium"
            variant="primary"
            icon={<IconUpload />}
            title="创建您的第一个项目"
            description="导入您的数据并设置标注界面以开始标注"
            actions={
              <Button variant="primary" look="filled">
                创建项目
              </Button>
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">小号(Sidepanel Style)</h3>
        <div className="border border-neutral-border rounded-lg p-4 h-48">
          <EmptyState
            size="small"
            variant="primary"
            icon={<IconLsLabeling />}
            title="标注区域将显示在此处"
            description="使用此面板开始标注并跟踪您的结果"
            footer={
              <Typography variant="label" size="small" className="text-primary-link">
                <a href="/docs/labeling-interface" className="inline-flex items-center gap-1 hover:underline">
                  了解更多
                  <IconExternal width={16} height={16} />
                </a>
              </Typography>
            }
          />
        </div>
      </div>
    </div>
  ),
};

// Color Variant Stories
export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="primary"
          icon={<IconUpload />}
          title="主要变体"
          description="标准空状态的默认蓝色主题"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="neutral"
          icon={<IconInbox />}
          title="中性变体"
          description="中性状态的灰色主题"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="negative"
          icon={<IconSearch />}
          title="中性变体"
          description="错误状态和失败的红色主题"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="positive"
          icon={<IconCheck />}
          title="阳性变体"
          description="成功状态的绿色主题"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="warning"
          icon={<IconSearch />}
          title="警告变体"
          description="警告状态的橙/黄色主题"
        />
      </div>

      <div className="border border-neutral-border rounded-lg p-4 h-64">
        <EmptyState
          size="medium"
          variant="gradient"
          icon={<IconLsLabeling />}
          title="梯度变体"
          description="带有特效和脉冲动画的AI渐变主题"
        />
      </div>
    </div>
  ),
};

// Data Manager Inspired Stories
export const DataManagerImport: Story = {
  args: {
    size: "large",
    variant: "primary",
    icon: <IconUpload />,
    title: "导入数据以开始您的项目",
    description: "连接您的云存储或从您的电脑上传文件",
    additionalContent: (
      <div className="flex items-center justify-center gap-base">
        <Tooltip title="Amazon S3">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderS3 width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
        <Tooltip title="Google Cloud Storage">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderGCS width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
        <Tooltip title="Azure Blob Storage">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderAzure width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
        <Tooltip title="Redis Storage">
          <div className="flex items-center justify-center p-2">
            <IconCloudProviderRedis width={32} height={32} className="text-neutral-content-subtler" />
          </div>
        </Tooltip>
      </div>
    ),
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          连接云存储
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          导入
        </Button>
      </>
    ),
    footer: (
      <Typography variant="label" size="small" className="text-primary-link hover:underline">
        <a href="/docs/import-data" className="inline-flex items-center gap-1">
          查看关于导入数据的文档
          <IconExternal width={20} height={20} />
        </a>
      </Typography>
    ),
  },
};

export const AnnotatorLabelingState: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconLsLabeling />,
    title: "开始标注任务",
    description: "在此开始标注以跟踪您的进度",
    actions: (
      <Button variant="primary" look="filled">
        标注所有任务
      </Button>
    ),
  },
};

export const ReviewerEmptyState: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconLsReview />,
    title: "开始审查任务",
    description: "导入任务到此项目以开始评审",
  },
};

export const NoResultsFound: Story = {
  args: {
    size: "medium",
    variant: "warning",
    icon: <IconSearch />,
    title: "优化您的搜索",
    description: "调整或清除您的筛选条件以查看更多结果",
    actions: (
      <Button variant="primary" look="outlined">
        清除筛选条件
      </Button>
    ),
  },
};

export const AssignedTasksEmpty: Story = {
  args: {
    size: "medium",
    variant: "neutral",
    icon: <IconInbox />,
    title: "等待任务分配",
    description: "当任务分配给你时，请回到这里查看",
  },
};

export const LabelingQueueComplete: Story = {
  args: {
    size: "medium",
    variant: "positive",
    icon: <IconCheck />,
    title: "你已看完所有内容！",
    description: "队列中的所有任务均已完成。",
    actions: (
      <Button variant="primary" look="outlined">
        转到上一个任务
      </Button>
    ),
  },
};

// Complex Content Example
export const ComplexContent: Story = {
  args: {
    size: "large",
    variant: "primary",
    icon: <IconUpload />,
    title: "上传您的文件",
    description: "从多种上传选项和格式中进行选择以开始",
    additionalContent: (
      <div className="text-center">
        <Typography variant="label" size="small" className="text-neutral-content-subtler mb-2">
          支持的格式：CSV、JSON、TSV、TXT
        </Typography>
        <div className="flex justify-center items-center gap-2 text-neutral-content-subtler">
          <div className="w-2 h-2 bg-positive-icon rounded-full" />
          <Typography variant="label" size="smallest">
            已启用拖放
          </Typography>
        </div>
      </div>
    ),
    actions: (
      <>
        <Button variant="primary" look="filled" className="flex-1">
          浏览文件
        </Button>
        <Button variant="primary" look="outlined" className="flex-1">
          连接存储
        </Button>
        <Button variant="neutral" look="outlined">
          从URL导入
        </Button>
      </>
    ),
    footer: (
      <div className="text-center space-y-1">
        <Typography variant="label" size="small" className="text-primary-link">
          <a href="/docs/import-guide" className="hover:underline">
            需要帮助？查看我们的导入指南
          </a>
        </Typography>
        <Typography variant="label" size="smallest" className="text-neutral-content-subtler">
          最大文件大小：每个文件100MB
        </Typography>
      </div>
    ),
  },
};

// Accessibility Example
export const WithAccessibility: Story = {
  args: {
    size: "medium",
    variant: "primary",
    icon: <IconInbox />,
    title: "建立你的收藏",
    description: "开始添加项目以创建您的第一个收藏",
    titleId: "accessible-empty-title",
    descriptionId: "accessible-empty-desc",
    "aria-label": "添加物品以构建你的收藏",
    "data-testid": "accessible-empty-state",
    actions: (
      <Button variant="primary" look="filled">
        添加首项
      </Button>
    ),
  },
};

// Relations Panel Example
export const RelationsPanel: Story = {
  args: {
    size: "small",
    variant: "primary",
    icon: <IconRelationLink />,
    title: "在标签之间创建关系",
    description: "添加关系以建立标注区域之间的连接",
    actions: (
      <Button variant="primary" look="outlined" size="small">
        添加关系
      </Button>
    ),
  },
};
