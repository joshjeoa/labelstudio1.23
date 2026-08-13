import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagAutocomplete } from "./tag-autocomplete";
import type { TagOption } from "./types";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";

const meta: Meta<typeof TagAutocomplete> = {
  component: TagAutocomplete,
  title: "UI/标签自动补全",
  argTypes: {
    disabled: {
      control: "boolean",
    },
    isLoading: {
      control: "boolean",
    },
    minSearchLength: {
      control: "number",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A tag-like autocomplete component that allows users to select multiple tags from a predefined list.

## Features
- **Typeahead search** - Filter options by typing (minimum 2 characters by default)
- **Keyboard navigation** - Full keyboard support for selecting and removing tags
- **Multiline tags** - Tags automatically wrap to multiple lines when needed
- **Highlighted search** - Search text is highlighted in matching options
- **Tag creation** - Allow users to create new tags on the fly (with allowCreate prop)
- **Loading state** - Displays a spinner in the dropdown while fetching options
- **Form integration** - Works with standard HTML forms via name prop

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Arrow Left/Right | Navigate between tags |
| Arrow Up/Down | Navigate dropdown options |
| Enter / Comma | Select highlighted option or create new tag |
| Backspace/Delete | Remove focused tag |
| Escape | Close dropdown |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagAutocomplete>;

const sampleTags: TagOption<string>[] = [
  { value: "frontend", label: "前端" },
  { value: "backend", label: "后端" },
  { value: "devops", label: "开发运维" },
  { value: "design", label: "设计" },
  { value: "qa", label: "问答" },
  { value: "mobile", label: "移动" },
  { value: "data-science", label: "数据科学" },
  { value: "machine-learning", label: "机器学习" },
  { value: "security", label: "安全" },
  { value: "cloud", label: "云" },
];

const simpleTags = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix", "Astro"];

/**
 * Default TagAutocomplete
 *
 * Basic usage with a list of options. Users need to type at least 2 characters to see the dropdown.
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-full">
        <TagAutocomplete
          triggerClassName="w-96"
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          placeholder="输入至少2个字符进行搜索..."
        />
        <div className="mt-base">
          <Typography variant="body" size="small" className="text-neutral-content-subtle">
            <strong>可用的：</strong> {sampleTags.map((tag) => tag.label).join(", ")}
          </Typography>
          <Typography variant="body" size="small" className="text-neutral-content-subtle">
            <strong>已选择：</strong> {value.length > 0 ? value.join(", ") : "None"}
          </Typography>
        </div>
        <div className="mt-base p-base bg-neutral-surface rounded text-sm w-[400px]">
          <Typography variant="body" size="small" className="mb-tight">
            <strong>键盘快捷键：</strong>
          </Typography>
          <ul className="space-y-tight text-neutral-content-subtle">
            <li>
              • <kbd className="px-tight bg-neutral-surface-bold rounded">←</kbd> /{" "}
              <kbd className="px-tight bg-neutral-surface-bold rounded">→</kbd> 在标签间导航
            </li>
            <li>
              • <kbd className="px-tight bg-neutral-surface-bold rounded">↑</kbd> /{" "}
              <kbd className="px-tight bg-neutral-surface-bold rounded">↓</kbd> 导航下拉选项
            </li>
            <li>
              • <kbd className="px-tight bg-neutral-surface-bold rounded">Enter</kbd> /{" "}
              <kbd className="px-tight bg-neutral-surface-bold rounded">,</kbd> 选择突出显示的选项或创建新项
              tag
            </li>
            <li>
              • <kbd className="px-tight bg-neutral-surface-bold rounded">Backspace</kbd> 移除标签或聚焦最后一个标签
            </li>
            <li>
              • <kbd className="px-tight bg-neutral-surface-bold rounded">Delete</kbd> 移除聚焦标签
            </li>
            <li>
              • <kbd className="px-tight bg-neutral-surface-bold rounded">Esc</kbd> 关闭下拉菜单
            </li>
          </ul>
        </div>
      </div>
    );
  },
};

/**
 * With Simple String Options
 *
 * Options can be simple strings instead of objects.
 */
export const SimpleStrings: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["React", "Next.js"]);
    return (
      <div className="w-96">
        <TagAutocomplete
          options={simpleTags}
          value={value}
          onChange={setValue as any}
          placeholder="选择框架..."
        />
      </div>
    );
  },
};

/**
 * Multiple Tags - Multiline Wrapping
 *
 * When many tags are selected, they automatically wrap to multiple lines.
 */
export const MultipleTagsWrapping: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([
      "frontend",
      "backend",
      "devops",
      "design",
      "qa",
      "mobile",
      "data-science",
      "machine-learning",
    ]);
    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          placeholder="输入以搜索..."
        />
        <Typography variant="body" size="small" className="mt-tight text-neutral-content-subtle">
          所有{value.length}个标签均已显示，并自动换行至多行。
        </Typography>
      </div>
    );
  },
};

/**
 * Form Validation Pattern
 *
 * Shows how to integrate with form validation. The component is purely controlled -
 * all validation (max tags, required, etc.) is handled by the parent using libraries
 * like Zod, Yup, or React Hook Form.
 */
export const FormValidationPattern: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["frontend"]);
    const [error, setError] = useState<string>("");
    const [touched, setTouched] = useState(false);
    const [submittedTags, setSubmittedTags] = useState<string[]>([]);

    // Validation logic (could be Zod, Yup, etc.)
    const validate = (values: string[]) => {
      if (values.length === 0) return "至少需要一个标签";
      if (values.length > 3) return "最多允许3个标签";
      return "";
    };

    const handleChange = (newValues: string[]) => {
      setValue(newValues);
      setTouched(true);
      const validationError = validate(newValues);
      setError(validationError);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        setTouched(true);
        return;
      }
      setSubmittedTags(value);
    };

    return (
      <form onSubmit={handleSubmit} className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={handleChange as any}
          placeholder="选择1-3个技能..."
        />
        {touched && error && <div className="mt-tight text-xs text-danger-content">{error}</div>}
        <Typography variant="body" size="small" className="mt-tight text-neutral-content-subtle">
          {value.length}/3 已选择
        </Typography>
        <Button type="submit" variant="primary" className="mt-base">
          提交
        </Button>

        {submittedTags.length > 0 && (
          <div className="mt-base p-base bg-neutral-surface rounded">
            <Typography variant="body" size="small" className="font-medium mb-tight">
              已提交的标签：
            </Typography>
            <Typography variant="body" size="small" className="text-neutral-content-subtle">
              {submittedTags.join(", ")}
            </Typography>
          </div>
        )}
      </form>
    );
  },
};

/**
 * Loading State
 *
 * Shows a spinner in the dropdown while options are being loaded.
 */
export const LoadingState: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["frontend"]);
    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          placeholder="输入以搜索..."
          isLoading={true}
          minSearchLength={1}
        />
        <Typography variant="body" size="small" className="mt-tight text-neutral-content-subtle">
          输入以在下拉菜单中查看加载动画
        </Typography>
      </div>
    );
  },
};

/**
 * Async Search Simulation
 *
 * Simulates loading options from an API based on search query.
 */
export const AsyncSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [options, setOptions] = useState(sampleTags);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const filtered = sampleTags.filter((tag) =>
          (tag.label ?? tag.value).toLowerCase().includes(query.toLowerCase()),
        );
        setOptions(filtered);
        setIsLoading(false);
      }, 500);
    };

    return (
      <div className="w-96">
        <TagAutocomplete
          options={options}
          value={value}
          onChange={setValue as any}
          onSearch={handleSearch}
          isLoading={isLoading}
          placeholder="输入以搜索（模拟500毫秒延迟）..."
        />
      </div>
    );
  },
};

/**
 * With Tag Creation
 *
 * Allow users to create new tags that don't exist in the list.
 */
export const WithTagCreation: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["frontend"]);

    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          allowCreate={true}
          placeholder="输入以搜索或创建新标签..."
        />
        <Typography variant="body" size="small" className="mt-base text-neutral-content-subtle">
          已选择：{value.join(", ")}
        </Typography>
      </div>
    );
  },
};

/**
 * Disabled State
 *
 * Component in disabled state.
 */
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={["frontend", "backend"]}
          onChange={() => {}}
          placeholder="选择标签..."
          disabled
        />
      </div>
    );
  },
};

/**
 * Empty State
 *
 * Component with no pre-selected values.
 */
export const EmptyState: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          placeholder="点击或输入以添加标签..."
        />
      </div>
    );
  },
};

/**
 * With Disabled Options
 *
 * Some options can be disabled.
 */
export const DisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["frontend"]);
    const optionsWithDisabled = [
      { value: "frontend", label: "前端" },
      { value: "backend", label: "后端" },
      { value: "devops", label: "开发运维", disabled: true },
      { value: "design", label: "设计" },
      { value: "qa", label: "问答", disabled: true },
      { value: "mobile", label: "移动" },
    ];

    return (
      <div className="w-96">
        <TagAutocomplete
          options={optionsWithDisabled}
          value={value}
          onChange={setValue as any}
          placeholder="选择标签..."
        />
        <Typography variant="body" size="small" className="mt-tight text-neutral-content-subtle">
          DevOps和QA选项已被禁用
        </Typography>
      </div>
    );
  },
};

/**
 * In a Form Context
 *
 * Example of TagAutocomplete with tag creation and submission.
 */
export const InFormContext: Story = {
  render: () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [submittedTags, setSubmittedTags] = useState<string[]>([]);

    const handleSkillsChange = (values: string[]) => {
      setSkills(values);
    };

    const handleAdd = () => {
      // Validation checks
      if (skills.length === 0) return;

      // Distinguish between existing and new tags
      const existingSkills = skills.filter((skill) => sampleTags.some((tag) => tag.value === skill));
      const newSkills = skills.filter((skill) => !sampleTags.some((tag) => tag.value === skill));

      console.log("Existing skills:", existingSkills);
      console.log("New skills to create:", newSkills);
      console.log("All skills:", skills);

      setSubmittedTags(skills);
      setSkills([]);
    };

    return (
      <div className="w-full max-w-2xl space-y-wide">
        <div>
          <Typography variant="body" size="small" className="font-medium mb-tight">
            技能
          </Typography>
          <form
            className="flex gap-tight items-start"
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <div className="flex-1">
              <TagAutocomplete
                name="skills"
                options={sampleTags}
                value={skills}
                onChange={handleSkillsChange as any}
                allowCreate={true}
                placeholder="输入以添加技能..."
              />
            </div>
            <Button type="submit" variant="primary" disabled={skills.length === 0}>
              添加
            </Button>
          </form>
        </div>

        <div className="mt-base">
          <Typography variant="body" size="small" className="text-neutral-content-subtle">
            可用的：{sampleTags.map((tag) => tag.label).join(", ") || "All selected"}
          </Typography>
        </div>

        {submittedTags.length > 0 && (
          <div className="p-base bg-neutral-surface rounded">
            <Typography variant="body" size="small" className="font-medium mb-tight">
              已提交的标签：
            </Typography>
            <Typography variant="body" size="small" className="text-neutral-content-subtle">
              {submittedTags.join(", ")}
            </Typography>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Long Labels
 *
 * Tags with long labels are truncated.
 */
export const LongLabels: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["long-1", "long-2"]);
    const longOptions = [
      { value: "long-1", label: "这是一个非常长的标签，应该被截断" },
      { value: "long-2", label: "另一个用于演示的极长标签" },
      { value: "long-3", label: "短的" },
      { value: "long-4", label: "中等长度标签" },
    ];

    return (
      <div className="w-96">
        <TagAutocomplete options={longOptions} value={value} onChange={setValue as any} placeholder="选择标签..." />
      </div>
    );
  },
};

/**
 * Many Options
 *
 * Component with a large list of options.
 */
export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const manyOptions = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }));

    return (
      <div className="w-96">
        <TagAutocomplete
          options={manyOptions}
          value={value}
          onChange={setValue as any}
          placeholder="搜索50个选项..."
        />
        <Typography variant="body" size="small" className="mt-tight text-neutral-content-subtle">
          50个选项可用 - 使用搜索进行筛选
        </Typography>
      </div>
    );
  },
};

/**
 * Custom Filter
 *
 * Using a custom search filter function.
 */
export const CustomFilter: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    // Custom filter that matches start of string only
    const startsWithFilter = (option: any, query: string) => {
      const label = option.label || option;
      return label.toLowerCase().startsWith(query.toLowerCase());
    };

    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          searchFilter={startsWithFilter}
          placeholder="自定义筛选器：仅匹配开头（输入'f'表示前端）..."
        />
      </div>
    );
  },
};

/**
 * Custom Minimum Search Length
 *
 * Configure the minimum number of characters required before showing the dropdown.
 */
export const CustomMinSearchLength: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-96">
        <TagAutocomplete
          options={sampleTags}
          value={value}
          onChange={setValue as any}
          minSearchLength={3}
          placeholder="至少输入3个字符进行搜索..."
        />
        <Typography variant="body" size="small" className="mt-base text-neutral-content-subtle">
          <strong>可用的：</strong> {sampleTags.map((tag) => tag.label).join(", ")}
        </Typography>
      </div>
    );
  },
};
