import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker } from "./date-range-picker";
import { DateRangePickerTrigger } from "./date-range-picker-trigger";
import { convertDateToNumbers, dateWithoutTime, formatDateString, type DateOrDateTimeRange } from "./date-utils";
import { Button } from "../button/button";
import { DropdownTrigger } from "../dropdown/dropdown-trigger";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: "UI/日期范围选择器",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    creationDate: {
      control: "date",
      description: "‘所有时间’范围选项的可创建日期",
    },
    initialDates: {
      control: false,
      description: "要显示的初始日期范围",
    },
    setAppliedDates: {
      action: "dates-applied",
      description: "日期应用时的回调函数",
    },
    setFloatingNowRange: {
      action: "floating-range-set",
      description: "设置浮动范围时的回调函数",
    },
    floatingRangeKey: {
      control: "text",
      description: "当前选中的浮动范围的键",
    },
    standalone: {
      control: "boolean",
      description: "选择器是否以模式显示（添加边框）",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const today = new Date();
const todayNumbers = convertDateToNumbers(today);
// Remove time to match legacy behavior (time mode OFF by default)
const todayNumbersNoTime = dateWithoutTime(todayNumbers);

const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
const lastWeekNumbers = convertDateToNumbers(lastWeek);
// Remove time to match legacy behavior (time mode OFF by default)
const lastWeekNumbersNoTime = dateWithoutTime(lastWeekNumbers);

const defaultInitialDates: DateOrDateTimeRange = {
  start: lastWeekNumbersNoTime,
  end: todayNumbersNoTime,
};

// Basic Example
export const Default: Story = {
  render: (args) => {
    const [dates, setDates] = useState<DateOrDateTimeRange | null>(defaultInitialDates);
    const [appliedDates, setAppliedDates] = useState<{ fromString: string; toString: string } | null>(null);

    return (
      <div className="flex flex-col gap-base">
        <DateRangePickerTrigger selected={dates}>
          <DateRangePicker
            {...args}
            initialDates={dates ?? defaultInitialDates}
            setAppliedDates={(selected, datesString) => {
              setDates(selected);
              setAppliedDates(datesString);
              args.setAppliedDates?.(selected, datesString);
            }}
          />
        </DateRangePickerTrigger>
        {appliedDates && (
          <div className="text-body-small text-neutral-content-subtle">
            已选择：{appliedDates.fromString} 至 {appliedDates.toString}
          </div>
        )}
      </div>
    );
  },
  args: {
    initialDates: defaultInitialDates,
  },
};

// With Time Mode
export const WithTimeMode: Story = {
  render: (args) => {
    const todayWithTime = convertDateToNumbers(new Date());
    const yesterdayWithTime = convertDateToNumbers(new Date());
    yesterdayWithTime.day -= 1;
    yesterdayWithTime.hour = 9;
    yesterdayWithTime.minute = 0;
    todayWithTime.hour = 17;
    todayWithTime.minute = 30;

    const [dates, setDates] = useState<DateOrDateTimeRange | null>({
      start: yesterdayWithTime,
      end: todayWithTime,
    });
    const [appliedDates, setAppliedDates] = useState<{ fromString: string; toString: string } | null>(null);

    return (
      <div className="flex flex-col gap-base">
        <DateRangePickerTrigger selected={dates}>
          <DateRangePicker
            {...args}
            initialDates={dates ?? defaultInitialDates}
            setAppliedDates={(selected, datesString) => {
              setDates(selected);
              setAppliedDates(datesString);
              args.setAppliedDates?.(selected, datesString);
            }}
          />
        </DateRangePickerTrigger>
        {appliedDates && (
          <div className="text-body-small text-neutral-content-subtle">
           已选择：{appliedDates.fromString} 至 {appliedDates.toString}
          </div>
        )}
      </div>
    );
  },
  args: {
    initialDates: {
      start: { ...convertDateToNumbers(new Date()), hour: 9, minute: 0 },
      end: { ...convertDateToNumbers(new Date()), hour: 17, minute: 30 },
    },
  },
};

// With Creation Date (All Time option)
export const WithCreationDate: Story = {
  render: (args) => {
    const creationDate = new Date();
    creationDate.setFullYear(creationDate.getFullYear() - 2);

    const [dates, setDates] = useState<DateOrDateTimeRange | null>(defaultInitialDates);
    const [appliedDates, setAppliedDates] = useState<{ fromString: string; toString: string } | null>(null);

    return (
      <div className="flex flex-col gap-base">
        <DateRangePickerTrigger selected={dates}>
          <DateRangePicker
            {...args}
            creationDate={creationDate}
            initialDates={dates ?? defaultInitialDates}
            setAppliedDates={(selected, datesString) => {
              setDates(selected);
              setAppliedDates(datesString);
              args.setAppliedDates?.(selected, datesString);
            }}
          />
        </DateRangePickerTrigger>
        {appliedDates && (
          <div className="text-body-small text-neutral-content-subtle">
            已选择：{appliedDates.fromString} 至 {appliedDates.toString}
          </div>
        )}
      </div>
    );
  },
  args: {
    creationDate: new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
    initialDates: defaultInitialDates,
  },
};

// Standalone (not in dropdown)
export const Standalone: Story = {
  render: (args) => {
    const [dates, setDates] = useState<DateOrDateTimeRange>(defaultInitialDates);
    const [appliedDates, setAppliedDates] = useState<{ fromString: string; toString: string } | null>(null);

    return (
      <div className="flex flex-col gap-base">
        <DateRangePicker
          {...args}
          standalone
          initialDates={dates}
          setAppliedDates={(selected, datesString) => {
            setDates(selected);
            setAppliedDates(datesString);
            args.setAppliedDates?.(selected, datesString);
          }}
        />
        {appliedDates && (
          <div className="text-body-small text-neutral-content-subtle">
            已选择：{appliedDates.fromString} 至 {appliedDates.toString}
          </div>
        )}
      </div>
    );
  },
  args: {
    initialDates: defaultInitialDates,
  },
};

// With Clear Functionality
export const WithClear: Story = {
  render: (args) => {
    const [dates, setDates] = useState<DateOrDateTimeRange | null>(defaultInitialDates);
    const [appliedDates, setAppliedDates] = useState<{ fromString: string; toString: string } | null>({
      fromString: formatDateString({
        date: defaultInitialDates.start,
        useTime: defaultInitialDates.start.hour !== undefined,
        showMeridian: true,
      }),
      toString: formatDateString({
        date: defaultInitialDates.end,
        useTime: defaultInitialDates.end.hour !== undefined,
        showMeridian: true,
      }),
    });
    const [hasSelection, setHasSelection] = useState(true);

    const handleClear = () => {
      setDates(null);
      setAppliedDates(null);
      setHasSelection(false);
      args.onClear?.();
    };

    return (
      <div className="flex flex-col gap-base">
        <DateRangePickerTrigger selected={dates}>
          <DateRangePicker
            {...args}
            initialDates={dates ?? defaultInitialDates}
            hasSelection={hasSelection}
            onClear={handleClear}
            setAppliedDates={(selected, datesString) => {
              setDates(selected);
              setAppliedDates(datesString);
              setHasSelection(true);
              args.setAppliedDates?.(selected, datesString);
            }}
          />
        </DateRangePickerTrigger>
        {appliedDates ? (
          <div className="text-body-small text-neutral-content-subtle">
            已选择：{appliedDates.fromString} 至 {appliedDates.toString}
          </div>
        ) : (
          <div className="text-body-small text-neutral-content-subtle">未选择日期范围（已清除）</div>
        )}
        <div className="text-body-small text-neutral-content-subtle">
          清除按钮是{hasSelection ? "启用" : "禁用"}
        </div>
      </div>
    );
  },
  args: {
    initialDates: defaultInitialDates,
    onClear: () => {
      console.log("清除按钮被点击");
    },
  },
};

/**
 * With Custom Button Trigger
 *
 * Example showing how to use DateRangePicker with a custom Button trigger
 * instead of the default DateRangePickerTrigger component.
 * This demonstrates flexibility in trigger implementation.
 */
export const WithCustomButtonTrigger: Story = {
  render: (args) => {
    const [dates, setDates] = useState<DateOrDateTimeRange>(defaultInitialDates);
    const [appliedDates, setAppliedDates] = useState<{ fromString: string; toString: string } | null>(null);

    return (
      <div className="flex flex-col gap-base">
        <DropdownTrigger
          content={
            <DateRangePicker
              {...args}
              initialDates={dates}
              setAppliedDates={(selected, datesString) => {
                setDates(selected);
                setAppliedDates(datesString);
                args.setAppliedDates?.(selected, datesString);
              }}
            />
          }
        >
          <Button>
            {appliedDates ? `${appliedDates.fromString} - ${appliedDates.toString}` : "选择日期范围"}
          </Button>
        </DropdownTrigger>
        {appliedDates && (
          <div className="text-body-small text-neutral-content-subtle">
            已选择：{appliedDates.fromString} 至 {appliedDates.toString}
          </div>
        )}
      </div>
    );
  },
  args: {
    initialDates: defaultInitialDates,
  },
};
