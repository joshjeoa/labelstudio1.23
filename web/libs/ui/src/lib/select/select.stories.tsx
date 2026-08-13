import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";
import { BadgeGroup } from "../badge-group";
import { Button } from "../button/button";

const thousandOptions = (() => {
  return Array.from({ length: 1000 }, (_, i) => `Option ${i}`);
})();

const meta = {
  title: "用户界面/选择",
  component: Select,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: "选择一种水果",
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    label: "默认",
  },
};

export const Searchable: Story = {
  args: {
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    placeholder: "可搜索选择",
    searchable: true,
  },
};

export const Inline: Story = {
  args: {
    placeholder: "内联选择",
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    isInline: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: "选择一种水果",
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    label: "必须的",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "选择一种水果",
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    label: "不可选",
    disabled: true,
  },
};

export const WithComplexOptions: Story = {
  args: {
    placeholder: "选择一种水果",
    value: "Blueberry",
    searchable: true,
    options: [
      {
        value: "Apple",
        disabled: true,
      },
      {
        value: "Banana",
        label: (
          <>
            <span>香蕉</span>
            <span className="text-sm"> - 10</span>
            <span className="text-lg"> 其他元素</span>
          </>
        ),
      },
      {
        value: "Blueberry",
        label: (
          <>
            <span>蓝莓</span>
            <span className="text-sm"> - 15</span>
          </>
        ),
        disabled: true,
      },
      "Grapes",
      "Pineapple",
    ] as any[],
    label: "高级选项",
  },
};

export const WithCustomTestId: Story = {
  args: {
    placeholder: "自定义测试ID",
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    "data-testid": "my-select",
  } as any,
};

export const WithManyOptions: Story = {
  args: {
    options: thousandOptions as any[],
    label: "千种选择",
  },
};

export const WithManyOptionsSearchableVirtualList: Story = {
  args: {
    options: thousandOptions as any[],
    label: "千种选项（可搜索虚拟列表）",
    searchable: true,
    isVirtualList: true,
  },
};

export const Loading: Story = {
  args: {
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    label: "进行中",
    isLoading: true,
  },
};

export const MultipleSelect: Story = {
  args: {
    placeholder: "多重选择器",
    options: [
      "Apple",
      "Banana",
      "Blueberry",
      { label: "葡萄", children: ["Small", "Large", "Green", "Red"] },
      "Pineapple",
    ] as any[],
    multiple: true,
    searchable: true,
  },
};

export const MultipleSelectWithValues: Story = {
  args: {
    value: ["Blueberry", "Banana"],
    options: ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"] as any[],
    multiple: true,
  },
};

export const BooleanValues: Story = {
  args: {
    options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ] as any[],
    label: "布尔值",
  },
};

export const WithRenderSelected: Story = {
  args: {
    options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ] as any[],
    label: "Boolean values with renderSelected",
    renderSelected: (selectedOptions, placeholder) => {
      if (selectedOptions.length > 0) {
        return `${selectedOptions
          .map((option) => (typeof option === "string" ? option : (option as any).label))
          .join(", ")} and such`;
      }
      return placeholder;
    },
    multiple: true,
  },
};

export const WithCustomRenderSelected: Story = {
  args: {
    options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ] as any[],
    label: "带有 renderSelected 的布尔值",
    renderSelected: () => "始终显示此项",
  },
};

export const MultipleWithBadges: Story = {
  render: () => {
    return (
      <div className="w-[350px] border border-dashed border-neutral-border p-tight">
        <Select
          multiple
          searchable
          value={["javascript", "react", "typescript", "vue", "angular"]}
          options={[
            { value: "javascript", label: "JavaScript" },
            { value: "typescript", label: "TypeScript" },
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "angular", label: "Angular" },
            { value: "node", label: "Node.js" },
            { value: "python", label: "Python" },
            { value: "django", label: "Django" },
          ]}
          placeholder="选择技术..."
          renderSelected={(selectedOptions) => {
            if (!selectedOptions || selectedOptions?.length === 0) return null;
            return (
              <BadgeGroup
                items={
                  selectedOptions?.map((opt: any) => ({
                    id: opt?.value ?? opt,
                    label: opt?.label ?? opt?.value ?? opt,
                  })) ?? []
                }
              />
            );
          }}
        />
      </div>
    );
  },
};

const techOptions = Array.from({ length: 100 }, (_, i) => ({
  value: `tech-${i}`,
  label: `技术 ${i}`,
}));

/**
 * Multiple Select with Virtual List and Search - Base Demo
 *
 * This story demonstrates the new "Selected Items Group" feature that appears
 * at the top of the dropdown when:
 * - multiple={true}
 * - searchable={true}
 * - isVirtualList={true}
 * - Items are selected
 *
 * The group starts collapsed by default. Click the caret to expand and see
 * all selected items. Selected items also appear in their normal position
 * in the list (dual representation).
 */
export const MultipleSelectWithVirtualListAndSearch: Story = {
  args: {
    multiple: true,
    searchable: true,
    isVirtualList: true,
    value: ["tech-5", "tech-12", "tech-23", "tech-45", "tech-67"],
    options: techOptions as any[],
    placeholder: "选择技术...",
    label: "带选中项分组的多选",
  },
};

/**
 * Demonstrates the controlled `open` prop with a footer Apply button.
 *
 * The dropdown stays open while the user makes selections. Clicking Apply
 * commits the pending selection and closes the dropdown by setting
 * `open={false}` via the controlled prop. Clicking outside or pressing
 * Escape also closes via the `onClose` callback.
 */
export const ControlledOpenWithFooterApply: Story = {
  render: () => {
    const options = [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "node", label: "Node.js" },
      { value: "python", label: "Python" },
      { value: "django", label: "Django" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [pending, setPending] = useState<string[]>([]);
    const [applied, setApplied] = useState<string[]>([]);

    const handleApply = () => {
      setApplied(pending);
      setIsOpen(false);
    };

    const hasChanges = pending.length !== applied.length || pending.some((v) => !applied.includes(v));

    return (
      <div className="flex flex-col gap-4 w-[350px]">
        <Select
          multiple
          searchable
          open={isOpen}
          value={isOpen ? pending : applied}
          options={options as any[]}
          placeholder="选择技术..."
          label="受控打开+页脚应用"
          onOpen={() => {
            setPending(applied);
            setIsOpen(true);
          }}
          onClose={() => setIsOpen(false)}
          onChange={(vals: any) => setPending(Array.isArray(vals) ? vals.map((v: any) => v?.value ?? v) : [])}
          footer={
            <Button
              variant="primary"
              look="filled"
              size="small"
              className="w-full"
              disabled={!hasChanges}
              onClick={handleApply}
            >
              应用
            </Button>
          }
        />
        <p className="text-sm text-neutral-content">应用的：{applied.length > 0 ? applied.join(", ") : "无"}</p>
      </div>
    );
  },
};
