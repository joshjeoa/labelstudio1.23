import type { Meta, StoryObj } from "@storybook/react";
import { EnterpriseUpgradeOverlay } from "./enterprise-upgrade-overlay";

const meta: Meta<typeof EnterpriseUpgradeOverlay> = {
  component: EnterpriseUpgradeOverlay,
  title: "UI/EnterpriseUpgradeOverlay",
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    feature: { control: "text" },
    learnMoreUrl: { control: "text" },
    primaryButtonLabel: { control: "text" },
    secondaryButtonLabel: { control: "text" },
    showLearnMore: { control: "boolean" },
    className: { control: "text" },
    "data-testid": { control: "text" },
    onContactSales: { action: "contact sales clicked" },
    onLearnMore: { action: "learn more clicked" },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "600px", background: "var(--color-neutral-background)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EnterpriseUpgradeOverlay>;

/**
 * Default overlay with standard messaging
 */
export const Default: Story = {
  args: {},
};

/**
 * Overlay customized for Project Dashboards feature
 */
export const ProjectDashboards: Story = {
  args: {
    title: "获取项目仪表板的访问权限！",
    description:
      "性能分析功能可在企业版计划中使用。请联系我们的销售团队以获取此功能及更多内容！",
    feature: "项目仪表板",
    learnMoreUrl: "https://docs.humansignal.com/guide/dashboards.html",
  },
};

/**
 * Overlay for SSO & Security features
 */
export const SSOAndSecurity: Story = {
  args: {
    title: "单点登录与高级安全",
    description: "使用我们的企业版计划，启用单点登录、高级安全功能和合规工具。",
    feature: "单点登录与安全功能",
    learnMoreUrl: "https://docs.humansignal.com/guide/security.html",
    secondaryButtonLabel: "了解更多",
  },
};

/**
 * Overlay for Custom Workflows
 */
export const CustomWorkflows: Story = {
  args: {
    title: "高级工作流",
    description: "使用我们的企业版计划创建自定义自动化工作流和高级标注流水线。",
    feature: "高级工作流",
    learnMoreUrl: "https://docs.humansignal.com/guide/workflows.html",
  },
};

/**
 * Overlay without the "Learn More" button
 */
export const WithoutLearnMore: Story = {
  args: {
    title: "高级功能",
    description: "此功能仅限我们的企业版计划使用。请联系销售人员了解更多信息。",
    feature: "高级功能",
    showLearnMore: false,
  },
};

/**
 * Overlay with custom button labels
 */
export const CustomButtonLabels: Story = {
  args: {
    title: "升级至企业版",
    description: "访问所有高级功能和专属支持。",
    feature: "企业版",
    primaryButtonLabel: "联系销售",
    secondaryButtonLabel: "查看价格",
    learnMoreUrl: "https://humansignal.com/pricing",
  },
};

/**
 * Overlay shown in context over blurred content
 */
export const InContext: Story = {
  render: () => (
    <div style={{ position: "relative", height: "600px", background: "var(--color-neutral-background)" }}>
      <div style={{ padding: "32px", opacity: 0.5, filter: "blur(2px)" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px", color: "var(--color-neutral-content)" }}>
            项目绩效仪表板
          </h2>
          <p style={{ color: "var(--color-neutral-content-subtler)", marginBottom: "24px" }}>
            跟踪您团队的标注进度和质量指标
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px" }}>
          <div style={{ padding: "20px", background: "var(--color-neutral-background-subtle)", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "var(--color-neutral-content-subtler)", marginBottom: "8px" }}>
              总任务数
            </div>
            <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--color-neutral-content)" }}>1,247</div>
          </div>
          <div style={{ padding: "20px", background: "var(--color-neutral-background-subtle)", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "var(--color-neutral-content-subtler)", marginBottom: "8px" }}>
              已完成
            </div>
            <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--color-positive-content)" }}>892</div>
          </div>
          <div style={{ padding: "20px", background: "var(--color-neutral-background-subtle)", borderRadius: "8px" }}>
            <div style={{ fontSize: "14px", color: "var(--color-neutral-content-subtler)", marginBottom: "8px" }}>
              一致性得分
            </div>
            <div style={{ fontSize: "32px", fontWeight: 600, color: "var(--color-neutral-content)" }}>94%</div>
          </div>
        </div>

        <div style={{ padding: "24px", background: "var(--color-neutral-background-subtle)", borderRadius: "8px" }}>
          <h3
            style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "var(--color-neutral-content)" }}
          >
            标注速度
          </h3>
          <div
            style={{
              height: "120px",
              background: "var(--color-neutral-background)",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-neutral-content-subtler)",
            }}
          >
            图表可视化将显示在此处
          </div>
        </div>
      </div>
      <EnterpriseUpgradeOverlay
        title="获取项目仪表板的访问权限！"
        description="性能分析功能可在企业版计划中使用。请联系我们的销售团队以获取此功能及更多内容！"
        feature="仪表板"
      />
    </div>
  ),
};
