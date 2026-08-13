import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button";
import { Space } from "../space/space";
import { Label } from "../label/label";
import { Dropdown } from "./dropdown";
import { DropdownTrigger } from "./dropdown-trigger";
import type { Align } from "@humansignal/core/lib/utils/dom";
import { IconUserEdit, IconSettings, IconCross, IconBell, IconChevronDown } from "@humansignal/icons";

const meta = {
  component: DropdownTrigger,
  title: "用户界面/下拉菜单",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    animated: {
      control: "boolean",
      description: "在打开/关闭时启用动画",
      defaultValue: true,
    },
    alignment: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "下拉菜单相对于触发器的对齐方式",
    },
    enabled: {
      control: "boolean",
      description: "启用/禁用下拉菜单（禁用时，防止打开）",
      defaultValue: true,
    },
    disabled: {
      control: "boolean",
      description: "禁用下拉触发器",
      defaultValue: false,
    },
    inline: {
      control: "boolean",
      description: "内联渲染，而不是使用传送门",
    },
    syncWidth: {
      control: "boolean",
      description: "同步下拉框宽度以匹配触发器宽度",
    },
    constrainHeight: {
      control: "boolean",
      description: "限制下拉框高度以防止溢出",
    },
    closeOnClickOutside: {
      control: "boolean",
      description: "点击外部时关闭下拉菜单",
      defaultValue: true,
    },
    toggle: {
      control: "boolean",
      description: "如果为假，点击触发器仅打开下拉菜单（不切换状态）",
      defaultValue: true,
    },
  },
} satisfies Meta<typeof DropdownTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dropdown content using semantic tokens - styled like Select component
const MenuContent = ({ items = 3, fullWidth = false }: { items?: number; fullWidth?: boolean }) => (
  <div className={`p-tight flex flex-col gap-tightest ${fullWidth ? "w-full" : "w-max"}`}>
    {Array.from({ length: items }, (_, i) => (
      <button
        key={i}
        type="button"
        className={`w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle ${fullWidth ? "" : "whitespace-nowrap"}`}
        onClick={() => console.log(`Item ${i + 1} clicked`)}
      >
       菜单项 {i + 1}
      </button>
    ))}
  </div>
);

// Basic Examples
export const Default: Story = {
  args: {
    alignment: "bottom-left",
    animated: true,
    enabled: true,
    disabled: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>Click to Open</Button>
    </Dropdown.Trigger>
  ),
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      content={
        <div className="w-80 p-base flex flex-col gap-base">
          <div>
            <h3 className="text-heading-small font-medium text-primary-foreground mb-tight">自定义下拉菜单</h3>
            <p className="text-body-small text-secondary-foreground">
              这是一个包含文本和交互元素的富内容自定义下拉菜单。
            </p>
          </div>
          <div className="flex flex-col gap-tight">
            <input
              type="text"
              placeholder="搜索..."
              className="w-full px-base py-tight border border-neutral-border rounded-base bg-primary-background text-primary-foreground"
            />
            <Button className="w-full">提交</Button>
          </div>
        </div>
      }
    >
      <Button>打开自定义下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

// Alignment Examples
export const AllAlignments: Story = {
  render: (args) => {
    const alignmentShorthand: Record<string, string> = {
      "top-left": "↑←",
      "top-center": "↑↕",
      "top-right": "↑→",
      "bottom-left": "↓←",
      "bottom-center": "↓↕",
      "bottom-right": "↓→",
    };

    return (
      <div className="grid grid-cols-3 gap-loose">
        {(["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"] as Align[]).map(
          (alignment) => (
            <div key={alignment} className="flex justify-center">
              <Dropdown.Trigger {...args} alignment={alignment} content={<MenuContent />}>
                <Button>{alignmentShorthand[alignment]}</Button>
              </Dropdown.Trigger>
            </div>
          ),
        )}
      </div>
    );
  },
};

// Width and Height Constraints
export const SyncWidth: Story = {
  args: {
    syncWidth: true,
    alignment: "bottom-left",
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent fullWidth />}>
      <Button className="w-80">宽按钮 - 下拉菜单同步宽度</Button>
    </Dropdown.Trigger>
  ),
};

export const ConstrainHeight: Story = {
  args: {
    constrainHeight: true,
    alignment: "bottom-left",
  },
  render: (args) => (
    <div className="h-[200px] flex items-center">
      <Dropdown.Trigger {...args} content={<MenuContent items={100} />}>
        <Button>受限高度（多项）</Button>
      </Dropdown.Trigger>
    </div>
  ),
};

// Animation Examples
export const WithAnimation: Story = {
  args: {
    animated: true,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>动画下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

export const WithoutAnimation: Story = {
  args: {
    animated: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>无动画下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

// State Examples
export const DisabledTrigger: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button disabled>已禁用触发器</Button>
    </Dropdown.Trigger>
  ),
};

export const DisabledDropdown: Story = {
  args: {
    enabled: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>下拉菜单已禁用（点击无法打开）</Button>
    </Dropdown.Trigger>
  ),
};

export const ControlledVisibility: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(false);

    return (
      <Space direction="vertical" size="base">
        <Space direction="horizontal" size="tight">
          <Button onClick={() => setVisible(true)}>打开下拉菜单</Button>
          <Button onClick={() => setVisible(false)}>关闭下拉菜单</Button>
          <Button onClick={() => setVisible(!visible)}>切换下拉菜单</Button>
        </Space>
        <Dropdown.Trigger {...args} visible={visible} onToggle={setVisible} content={<MenuContent />}>
          <Button>受控下拉菜单</Button>
        </Dropdown.Trigger>
      </Space>
    );
  },
};

// Behavior Examples
export const OpenOnlyMode: Story = {
  args: {
    toggle: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>Click Only Opens (Doesn't Toggle)</Button>
    </Dropdown.Trigger>
  ),
};

export const NoCloseOnClickOutside: Story = {
  args: {
    closeOnClickOutside: false,
  },
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <Button>点击外部不会关闭</Button>
    </Dropdown.Trigger>
  ),
};

// Nested Dropdowns
export const NestedDropdowns: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      alignment="bottom-left"
      content={
        <div className="p-tight flex flex-col gap-tightest w-max">
          <button
            type="button"
            className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
          >
            常规项目
          </button>
          <Dropdown.Trigger
            style={{
              left: "calc(anchor(right) + 4px)",
              top: "anchor(top)",
              right: "auto",
              bottom: "auto",
            }}
            content={
              <div className="p-tight flex flex-col gap-tightest w-max">
                <button
                  type="button"
                  className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
                >
                  嵌套项 1
                </button>
                <button
                  type="button"
                  className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
                >
                  嵌套项 2
                </button>
                <button
                  type="button"
                  className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
                >
                  嵌套项 3
                </button>
              </div>
            }
          >
            <button
              type="button"
              className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
            >
              嵌套下拉菜单 →
            </button>
          </Dropdown.Trigger>
          <button
            type="button"
            className="w-full text-left px-base py-tight text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle whitespace-nowrap"
          >
            另一个项目
          </button>
        </div>
      }
    >
      <Button>嵌套下拉菜单</Button>
    </Dropdown.Trigger>
  ),
};

// Inline Rendering
export const InlineDropdown: Story = {
  args: {
    inline: true,
  },
  render: (args) => (
    <div className="relative border border-dashed border-neutral-border p-loose rounded-base">
      <p className="text-body-small text-secondary-foreground mb-base">
        此下拉菜单在带边框的容器内内联渲染（无传送门）。
      </p>
      <Dropdown.Trigger {...args} content={<MenuContent />}>
        <Button>内联下拉菜单</Button>
      </Dropdown.Trigger>
    </div>
  ),
};

// Advanced Use Cases
export const WithCustomTrigger: Story = {
  render: (args) => (
    <Dropdown.Trigger {...args} content={<MenuContent />}>
      <div className="cursor-pointer bg-accent-background text-accent-foreground px-base py-tight rounded-base hover:bg-accent-surface-hover transition-colors">
        自定义触发元素
      </div>
    </Dropdown.Trigger>
  ),
};

export const WithCallbacks: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      content={<MenuContent />}
      onToggle={(visible) => console.log("onToggle:", visible)}
      onVisibilityChanged={(visible) => console.log("onVisibilityChanged:", visible)}
    >
      <Button>带回调的下拉菜单（检查控制台）</Button>
    </Dropdown.Trigger>
  ),
};

// Complex Content Example - User Profile Menu
export const UserProfileMenu: Story = {
  render: (args) => (
    <Dropdown.Trigger
      {...args}
      content={
        <div className="w-96 p-base flex flex-col gap-base">
          <div className="pb-base border-b border-neutral-border">
            <h3 className="text-heading-small font-medium text-primary-foreground">用户资料</h3>
          </div>
          <div className="flex items-center gap-base pb-base border-b border-neutral-border">
            <div className="w-12 h-12 bg-accent-background rounded-full flex items-center justify-center text-accent-foreground font-medium text-body-large">
              JD
            </div>
            <div className="flex flex-col gap-tightest">
              <div className="text-body-medium font-medium text-primary-foreground">John Doe</div>
              <div className="text-body-small text-secondary-foreground">john.doe@example.com</div>
            </div>
          </div>
          <div className="flex flex-col gap-tight">
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle"
            >
              <IconUserEdit className="w-4 h-4" />
              查看个人资料
            </button>
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle"
            >
              <IconSettings className="w-4 h-4" />
              设置
            </button>
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-neutral-content-subtle hover:bg-primary-emphasis-subtle hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-primary-emphasis-subtle"
            >
              <IconBell className="w-4 h-4" />
              通知
            </button>
          </div>
          <div className="pt-base border-t border-neutral-border">
            <button
              type="button"
              className="flex items-center gap-tight w-full text-left px-base py-1 text-body-small text-danger-foreground hover:bg-danger-surface hover:cursor-pointer rounded-base transition-all duration-150 ease-out outline-none focus-visible:bg-danger-surface"
            >
              <IconCross className="w-4 h-4" />
              退出登录
            </button>
          </div>
        </div>
      }
    >
      <Button trailing={<IconChevronDown />}>User Menu</Button>
    </Dropdown.Trigger>
  ),
};

// Multiple Dropdowns
export const MultipleDropdowns: Story = {
  render: (args) => (
    <Space direction="horizontal" size="base" wrap>
      <Dropdown.Trigger {...args} alignment="bottom-left" content={<MenuContent />}>
        <Button>Dropdown 1</Button>
      </Dropdown.Trigger>
      <Dropdown.Trigger {...args} alignment="bottom-center" content={<MenuContent />}>
        <Button>Dropdown 2</Button>
      </Dropdown.Trigger>
      <Dropdown.Trigger {...args} alignment="bottom-right" content={<MenuContent />}>
        <Button>Dropdown 3</Button>
      </Dropdown.Trigger>
    </Space>
  ),
};

// With Labels
export const WithLabels: Story = {
  render: (args) => (
    <Space direction="vertical" size="small" style={{ gridGap: "var(--spacing-base)" }}>
      <Label>选择一个选项</Label>
      <Dropdown.Trigger {...args} content={<MenuContent items={5} />}>
        <Button>打开菜单</Button>
      </Dropdown.Trigger>
    </Space>
  ),
};
