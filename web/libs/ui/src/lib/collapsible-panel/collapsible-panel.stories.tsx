import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CollapsiblePanel } from "./collapsible-panel";
import { Button } from "../button/button";
import { EmptyState } from "../empty-state/empty-state";
import { Typography } from "../typography/typography";
import { IconUserAdd } from "@humansignal/icons";

const meta: Meta<typeof CollapsiblePanel> = {
  component: CollapsiblePanel,
  title: "UI/可折叠面板",
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "default"],
    },
    disableToggle: {
      control: "boolean",
    },
    defaultExpanded: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CollapsiblePanel>;

/**
 * Default Collapsible Panel
 *
 * Basic panel with title and content.
 */
export const Default: Story = {
  args: {
    variant: "default",
    title: "面板标题",
    children: (
      <div className="p-base">
        <p className="text-sm">这是可以折叠或展开的面板内容。</p>
      </div>
    ),
  },
};

/**
 * Primary Variant
 *
 * Primary colored panel - use for important selections or actions.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    title: "请至少选择一个成员",
    children: (
      <div className="p-base">
        <p className="text-sm text-neutral-content-subtle">选定的成员将显示在这里</p>
      </div>
    ),
  },
};

/**
 * With Count Badge
 *
 * Shows a count next to the title.
 */
export const WithCount: Story = {
  args: {
    variant: "primary",
    title: "选中的成员",
    count: 5,
    children: (
      <div className="p-base">
        <p className="text-sm">John Doe, Jane Smith, Bob Johnson, Alice Brown, Charlie Wilson</p>
      </div>
    ),
  },
};

/**
 * With Actions
 *
 * Panel with action buttons in the header.
 */
export const WithActions: Story = {
  args: {
    variant: "primary",
    title: "已选择3名成员",
    actions: (
      <Button variant="neutral" look="outlined" size="small">
        清除选择
      </Button>
    ),
    children: (
      <div className="p-base">
        <p className="text-sm">John Doe, Jane Smith, Bob Johnson</p>
      </div>
    ),
  },
};

/**
 * With Empty State
 *
 * Panel containing an EmptyState component.
 */
export const WithEmptyState: Story = {
  args: {
    variant: "primary",
    title: "未选择成员",
    children: (
      <EmptyState
        className="p-widest"
        size="small"
        icon={<IconUserAdd />}
        title="从下方选择成员"
        description="选择成员以将他们分配给此资源"
      />
    ),
  },
};

/**
 * Toggle Disabled (Cannot be Collapsed/Expanded)
 *
 * Panel with disabled toggle button - useful when threshold is exceeded.
 * The toggle button is disabled but the rest of the header (title, actions) remains interactive.
 */
export const ToggleDisabled: Story = {
  args: {
    variant: "primary",
    title: "John, Jane, Bob, Alice, Charlie +10个已选择",
    disableToggle: true,
    expanded: false,
    actions: (
      <Button variant="neutral" look="outlined" size="small">
        清除选择
      </Button>
    ),
    children: null,
  },
};

/**
 * Starts Collapsed
 *
 * Panel that starts in collapsed state.
 */
export const StartsCollapsed: Story = {
  args: {
    variant: "default",
    title: "高级设置",
    defaultExpanded: false,
    children: (
      <div className="p-base">
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium mb-1 block">设置 1</label>
            <input type="text" className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">设置 2</label>
            <input type="text" className="border rounded px-2 py-1 w-full" />
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Controlled State
 *
 * Panel with externally controlled expand/collapse state.
 */
export const Controlled: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button size="small" onClick={() => setIsExpanded(true)}>
            展开
          </Button>
          <Button size="small" onClick={() => setIsExpanded(false)}>
            折叠
          </Button>
          <span className="text-sm text-neutral-content-subtle self-center">
            当前状态：{isExpanded ? "已展开" : "已折叠"}
          </span>
        </div>
        <CollapsiblePanel
          variant="default"
          title="控制面板"
          expanded={isExpanded}
          onExpandedChange={setIsExpanded}
        >
          <div className="p-base">
            <p className="text-sm">此面板的状态由上方的按钮控制。</p>
          </div>
        </CollapsiblePanel>
      </div>
    );
  },
};

/**
 * Multiple Panels
 *
 * Multiple panels stacked together.
 */
export const MultiplePanels: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-3">
        <CollapsiblePanel variant="primary" title="" count={3}>
          <div className="p-base">
            <p className="text-sm">John Doe, Jane Smith, Bob Johnson</p>
          </div>
        </CollapsiblePanel>
        <CollapsiblePanel variant="default" title="筛选器" defaultExpanded={false}>
          <div className="p-base">
            <p className="text-sm">筛选选项将放在这里</p>
          </div>
        </CollapsiblePanel>
        <CollapsiblePanel variant="default" title="设置" defaultExpanded={false}>
          <div className="p-base">
            <p className="text-sm">设置选项将放在这里</p>
          </div>
        </CollapsiblePanel>
      </div>
    );
  },
};

/**
 * Rich Content
 *
 * Panel with complex content including lists and actions.
 */
export const RichContent: Story = {
  args: {
    variant: "primary",
    title: "已选出5名成员",
    actions: (
      <div className="flex gap-2">
        <Button variant="negative" look="outlined" size="small">
          全部删除
        </Button>
        <Button variant="primary" size="small">
          分配
        </Button>
      </div>
    ),
    children: (
      <div className="divide-y divide-neutral-border">
        {["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson"].map((name) => (
          <div key={name} className="px-base py-tight flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary-background flex items-center justify-center text-xs font-medium">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="text-sm">{name}</span>
            </div>
            <Button size="smaller" variant="neutral" look="text">
              删除
            </Button>
          </div>
        ))}
      </div>
    ),
  },
};

/**
 * Real-World: Member Selection Panel
 *
 * Complete example of a member selection panel as used in the members table.
 */
export const MemberSelectionPanel: Story = {
  render: () => {
    const [selectedCount, setSelectedCount] = useState(0);
    const [isExpanded, setIsExpanded] = useState(true);

    const handleClearSelection = () => {
      setSelectedCount(0);
    };

    const handleSelect = (count: number) => {
      setSelectedCount(count);
      setIsExpanded(true);
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Button size="small" onClick={() => handleSelect(0)}>
            选择无
          </Button>
          <Button size="small" onClick={() => handleSelect(3)}>
            选择 3
          </Button>
          <Button size="small" onClick={() => handleSelect(15)}>
            选择 15（超过阈值）
          </Button>
        </div>

        <CollapsiblePanel
          variant="primary"
          title={
            selectedCount > 0
              ? `已选择${selectedCount}${selectedCount === 1 ? "" : "s"}位成员`
              : "未选择成员"
          }
          actions={
            selectedCount > 0 ? (
              <Button variant="neutral" look="outlined" size="small" onClick={handleClearSelection}>
                清除选择
              </Button>
            ) : undefined
          }
          expanded={selectedCount > 10 ? false : isExpanded}
          onExpandedChange={setIsExpanded}
          disableToggle={selectedCount > 10}
        >
          {selectedCount === 0 ? (
            <EmptyState
              className="p-widest"
              size="small"
              icon={<IconUserAdd />}
              title="Select members from below"
              description="Select members to assign them to this resource"
            />
          ) : selectedCount <= 10 ? (
            <div className="p-base">
              <Typography variant="body" size="small" className="text-neutral-content-subtle">
                已选择{selectedCount}{selectedCount === 1 ? "" : "s"}位成员
              </Typography>
            </div>
          ) : (
            <div className="p-base">
              <Typography variant="body" size="small" className="text-neutral-content-subtle">
                选择的成员过多，无法单独显示。面板无法折叠。
              </Typography>
            </div>
          )}
        </CollapsiblePanel>
      </div>
    );
  },
};
