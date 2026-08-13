import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "用户界面/标签页",
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "flat"],
      description: "标签页的视觉变体",
    },
    defaultValue: {
      control: "text",
      description: "默认活动标签页",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/**
 * Default variant with pill-style tabs in a bordered container.
 * This variant features rounded corners, background colors, and a distinct active state.
 */
export const Default: Story = {
  args: {
    variant: "default",
    defaultValue: "tab1",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">账户</TabsTrigger>
        <TabsTrigger value="tab2">密码</TabsTrigger>
        <TabsTrigger value="tab3">设置</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">账户设置</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            管理您的账户设置并设置电子邮件偏好。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">密码</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            在此更改您的密码。保存后，您将被退出登录。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">设置</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            配置您的应用程序偏好设置和通知。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Flat variant with underline indicator for active tabs.
 * This variant features a minimalist design with no background container,
 * perfect for navigation-style tabs.
 */
export const Flat: Story = {
  args: {
    variant: "flat",
    defaultValue: "existing",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="existing">添加现有成员</TabsTrigger>
        <TabsTrigger value="invite">邀请成员</TabsTrigger>
      </TabsList>
      <TabsContent value="existing">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">添加现有成员</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            从组织中选择成员添加到此项目中。
          </p>
        </div>
      </TabsContent>
      <TabsContent value="invite">
        <div className="p-wide border border-neutral-border rounded-smaller">
          <h3 className="text-heading-regular font-semibold mb-tight">邀请成员</h3>
          <p className="text-body-regular text-neutral-content-subtle">
            向新成员发送电子邮件邀请，以加入此项目。
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Example with custom className overrides to demonstrate styling flexibility
 */
export const CustomStyling: Story = {
  args: {
    variant: "flat",
    defaultValue: "custom1",
  },
  render: (args) => (
    <div className="max-w-3xl p-widest bg-neutral-surface rounded-smaller">
      <Tabs {...args}>
        <TabsList className="border-b-4 border-neutral-300 gap-widest">
          <TabsTrigger
            value="custom1"
            className="text-heading-regular font-bold uppercase tracking-wide data-[state=active]:border-b-4 data-[state=active]:border-success data-[state=active]:text-success"
          >
            控制面板
          </TabsTrigger>
          <TabsTrigger
            value="custom2"
            className="text-heading-regular font-bold uppercase tracking-wide data-[state=active]:border-b-4 data-[state=active]:border-success data-[state=active]:text-success"
          >
            分析
          </TabsTrigger>
          <TabsTrigger
            value="custom3"
            className="text-heading-regular font-bold uppercase tracking-wide data-[state=active]:border-b-4 data-[state=active]:border-success data-[state=active]:text-success"
          >
            报告
          </TabsTrigger>
        </TabsList>
        <TabsContent value="custom1" className="mt-widest p-wider bg-success-surface rounded-small">
          <h3 className="text-heading-large font-bold text-success mb-tight">仪表板概览</h3>
          <p className="text-body-large text-neutral-content">
            本示例展示了如何自定义具有不同颜色、边框、间距和排版样式的标签页。
          </p>
        </TabsContent>
        <TabsContent value="custom2" className="mt-widest p-wider bg-success-surface rounded-small">
          <h3 className="text-heading-large font-bold text-success mb-tight">分析数据</h3>
          <p className="text-body-large text-neutral-content">
            带有粗体排版和更大间距的自定义绿色主题展示了该组件的灵活性。
          </p>
        </TabsContent>
        <TabsContent value="custom3" className="mt-widest p-wider bg-success-surface rounded-small">
          <h3 className="text-heading-large font-bold text-success mb-tight">详细报告</h3>
          <p className="text-body-large text-neutral-content">
            您可以覆盖标签页样式的任何方面，以符合您的特定设计要求。
          </p>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
