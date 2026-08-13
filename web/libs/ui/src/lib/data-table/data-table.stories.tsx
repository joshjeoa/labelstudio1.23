import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable } from "./data-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import type { ExtendedDataTableColumnDef } from "./data-table";
import { Badge } from "../badge/badge";
import { Button } from "../button/button";
import { Tooltip } from "../Tooltip/Tooltip";
import { IconEdit, IconTrash, IconMonitors } from "@humansignal/icons";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: "用户界面/数据表",
  argTypes: {
    selectable: { control: "boolean" },
    enableSorting: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
  activeSessions?: number;
};

const sampleData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2024-01-15",
    activeSessions: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    lastActive: "2024-01-14",
    activeSessions: 1,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "inactive",
    lastActive: "2024-01-10",
    activeSessions: 0,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "active",
    lastActive: "2024-01-15",
    activeSessions: 1,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Viewer",
    status: "active",
    lastActive: "2024-01-13",
    activeSessions: 3,
  },
];

const baseColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "名称",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "邮箱",
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "角色",
    cell: ({ getValue }) => {
      const role = getValue() as string;
      return (
        <Badge variant={role === "Admin" ? "primary" : role === "Editor" ? "success" : "info"} size="small">
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant={status === "active" ? "success" : "default"} size="small">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastActive",
    header: "最近登录时间",
    enableSorting: true,
  },
];

/**
 * Basic DataTable
 *
 * Shows a simple table with data and columns.
 * Sorting is enabled with controlled state starting as empty (no sort applied).
 * Only columns with explicit `enableSorting: true` will be sortable (Name, Email, Last Active).
 */
export const Default: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    return (
      <DataTable data={sampleData} columns={baseColumns} enableSorting sorting={sorting} onSortingChange={setSorting} />
    );
  },
};

/**
 * Table with Sorting
 *
 * Default sorted by "name" ascending.
 * Click on sortable column headers to change sort direction.
 */
export const WithSorting: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([{ id: "name", desc: false }]);

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md">
          <p className="text-sm text-neutral-content-subtle">
           点击列标题进行排序。当前排序：{" "}
            {sorting.length > 0 ? `${sorting[0].id} (${sorting[0].desc ? "降序" : "升序"})` : "无"}
          </p>
        </div>
        <DataTable
          data={sampleData}
          columns={baseColumns}
          enableSorting
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
    );
  },
};

/**
 * Table with Help Tooltips
 *
 * Demonstrates the `help` property on columns, which displays an info icon with a tooltip
 * in the column header. Hover over the info icon next to "Last Active" to see the tooltip.
 */
export const WithHelpTooltips: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnsWithHelp: ExtendedDataTableColumnDef<User>[] = [
      ...baseColumns.slice(0, -1), // All columns except lastActive
      {
        accessorKey: "lastActive",
        header: "最后活跃时间",
        enableSorting: true,
        help: "用户最后一次在系统中活跃的日期。这包括任何活动，例如登录、查看内容或进行更改。",
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md">
          <p className="text-sm text-neutral-content-subtle">
            💡 将鼠标悬停在“最后活跃时间”标题旁边的信息图标上，即可查看帮助提示。
          </p>
        </div>
        <DataTable
          data={sampleData}
          columns={columnsWithHelp}
          enableSorting
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedCount = Object.keys(rowSelection).length;

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md">
          <p className="text-sm text-neutral-content-subtle">已选行：{selectedCount}</p>
        </div>
        <DataTable
          data={sampleData}
          columns={baseColumns}
          selectable
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    );
  },
};

export const WithRowClick: Story = {
  render: () => {
    const [clickedUser, setClickedUser] = useState<User | null>(null);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedCount = Object.keys(rowSelection).length;

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md flex justify-between items-center">
          <p className="text-sm text-neutral-content-subtle">
            {clickedUser ? `上次点击：${clickedUser.name}` : "点击一行"}
          </p>
          <p className="text-sm text-neutral-content-subtle">Selected: {selectedCount}</p>
        </div>
        <DataTable
          data={sampleData}
          columns={baseColumns}
          selectable
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          onRowClick={(row) => setClickedUser(row ? row.original : null)}
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const columnsWithActions: ColumnDef<User>[] = [
      ...baseColumns,
      {
        id: "actions",
        header: "操作",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              size="small"
              variant="neutral"
              look="outlined"
              leading={<IconEdit />}
              onClick={() => alert(`修改${row.original.name}`)}
            >
              修改
            </Button>
            <Button
              size="small"
              variant="negative"
              look="outlined"
              leading={<IconTrash />}
              onClick={() => alert(`删除${row.original.name}`)}
            >
              删除
            </Button>
          </div>
        ),
        meta: {
          noDivider: true,
        },
      },
    ];

    return <DataTable data={sampleData} columns={columnsWithActions} />;
  },
};

export const WithSortingAndSelection: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedCount = Object.keys(rowSelection).length;

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md flex justify-between items-center">
          <p className="text-sm text-neutral-content-subtle">
            排序：{sorting.length > 0 ? `${sorting[0].id} (${sorting[0].desc ? "降序" : "升序"})` : "无"}
          </p>
          <p className="text-sm text-neutral-content-subtle">Selected: {selectedCount}</p>
        </div>
        <DataTable
          data={sampleData}
          columns={baseColumns}
          enableSorting
          selectable
          sorting={sorting}
          onSortingChange={setSorting}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    );
  },
};

/**
 * Example with empty state when no data
 * Shows the default empty state with search icon and default messaging
 */
export const EmptyState: Story = {
  args: {
    data: [],
    columns: baseColumns,
    emptyState: {},
  },
};

/**
 * Custom Empty State with Actions
 *
 * Example showing a custom empty state with custom title, description, and action buttons.
 * Demonstrates how to provide interactive elements in the empty state.
 */
export const CustomEmptyStateWithActions: Story = {
  render: () => {
    return (
      <DataTable
        data={[]}
        columns={baseColumns}
        emptyState={{
          title: "未找到用户",
          description:
            "通过向系统中添加您的第一个用户来开始。您可以导入用户或手动创建他们。",
          actions: (
            <div className="flex gap-2">
              <Button variant="primary" size="small" onClick={() => alert("Create user clicked")}>
                创建用户
              </Button>
              <Button variant="neutral" look="outlined" size="small" onClick={() => alert("Import users clicked")}>
                导入用户
              </Button>
            </div>
          ),
        }}
      />
    );
  },
};

/**
 * Loading State
 *
 * Shows skeleton rows while data is loading.
 * Displays 5 skeleton rows by default (configurable with loadingRows prop).
 */
export const Loading: Story = {
  args: {
    data: [],
    columns: baseColumns,
    isLoading: true,
    loadingRows: 5,
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    // Generate 100 users
    const largeDataset = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "Editor", "Viewer"][i % 3],
      status: i % 3 === 0 ? ("inactive" as const) : ("active" as const),
      lastActive: new Date(2024, 0, (i % 30) + 1).toISOString().split("T")[0],
    }));

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md">
          <p className="text-sm text-neutral-content-subtle">
            显示100名用户。注意：在生产环境中，对于大型数据集，您应该使用分页或虚拟化。
          </p>
        </div>
        <div className="max-h-[500px] overflow-auto">
          <DataTable
            data={largeDataset}
            columns={baseColumns}
            enableSorting
            sorting={sorting}
            onSortingChange={setSorting}
            selectable
          />
        </div>
      </div>
    );
  },
};

export const CustomRowClassName: Story = {
  render: () => {
    return (
      <DataTable
        data={sampleData}
        columns={baseColumns}
        rowClassName={(row) => (row.original.status === "inactive" ? "opacity-50" : undefined)}
      />
    );
  },
};

export const WithColumnResizing: Story = {
  args: {
    data: sampleData,
    columns: baseColumns,
    cellSizesStorageKey: "storybook-table",
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedCount = Object.keys(rowSelection).length;

    const columnsWithActions: ColumnDef<User>[] = [
      ...baseColumns,
      {
        id: "actions",
        header: "操作",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              size="smaller"
              variant="neutral"
              look="outlined"
              leading={<IconEdit />}
              onClick={(e) => {
                e.stopPropagation();
                alert(`Edit ${row.original.name}`);
              }}
            >
              修改
            </Button>
          </div>
        ),
        meta: {
          noDivider: true,
        },
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md flex justify-between items-center">
          <p className="text-sm text-neutral-content-subtle">
            排序{sorting.length > 0 ? `${sorting[0].id} (${sorting[0].desc ? "降序" : "升序"})` : "无"}
          </p>
          <p className="text-sm text-neutral-content-subtle">Selected: {selectedCount}</p>
        </div>
        <DataTable
          data={sampleData}
          columns={columnsWithActions}
          enableSorting
          selectable
          sorting={sorting}
          onSortingChange={setSorting}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          onRowClick={(row) => {
            if (row) {
              console.log("Row clicked:", row.original);
            }
          }}
          rowClassName={(row) => (row.original.status === "inactive" ? "opacity-50" : undefined)}
          cellSizesStorageKey="storybook-full-featured-table"
        />
      </div>
    );
  },
};

/**
 * Conditional Row Selection
 *
 * Use `isRowSelectable` to control which rows can be selected.
 * The checkbox will be hidden for non-selectable rows.
 *
 * In this example, inactive users cannot be selected.
 */
export const ConditionalRowSelection: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
    const selectedCount = Object.keys(rowSelection).length;

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md">
          <p className="text-sm text-neutral-content-subtle mb-2">
            已选择：<strong>{selectedCount}</strong> user{selectedCount !== 1 ? "s" : ""}
          </p>
          <p className="text-sm text-neutral-content-subtle">
            💡 非活跃用户（Bob Johnson）无法被选中 - 他们的复选框已被隐藏
          </p>
        </div>
        <DataTable
          data={sampleData}
          columns={baseColumns}
          selectable
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          isRowSelectable={(row) => row.original.status === "active"}
        />
      </div>
    );
  },
};

/**
 * Custom React Node Headers
 *
 * Demonstrates using custom React nodes as column headers instead of text.
 * The header property accepts any React node - icons, buttons, dropdowns, or any
 * custom component. Simply pass a function that returns your custom header content.
 *
 * This example shows an icon wrapped in a Tooltip for a compact column, but you can
 * use any React component as a header (buttons, dropdowns, badges, etc.).
 *
 * Hover over the monitors icon to see the tooltip explaining the column.
 */
export const WithCustomHeaders: Story = {
  render: () => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columnsWithCustomHeaders: ColumnDef<User>[] = [
      {
        accessorKey: "name",
        header: "名称",
        enableSorting: true,
      },
      {
        accessorKey: "email",
        header: "邮箱",
        enableSorting: true,
      },
      {
        accessorKey: "role",
        header: "角色",
        cell: ({ getValue }) => {
          const role = getValue() as string;
          return (
            <Badge variant={role === "Admin" ? "primary" : role === "Editor" ? "success" : "info"} size="small">
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: "activeSessions",
        // Icon-only header with tooltip - wrap icon in Tooltip directly
        header: () => (
          <Tooltip title="活动会话：活动浏览器会话的数量。" alignment="top-center">
            <div className="flex items-center cursor-help">
              <IconMonitors width={24} height={24} />
            </div>
          </Tooltip>
        ),
        size: 32,
        minSize: 30,
        cell: ({ getValue }) => {
          const sessions = getValue() as number;
          return (
            <div className="flex items-center justify-center">
              <Badge variant={sessions > 1 ? "warning" : "default"} size="small">
                {sessions}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: "lastActive",
        header: "Last Active",
        enableSorting: true,
      },
    ];

    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-neutral-surface rounded-md">
          <p className="text-sm text-neutral-content-subtle">
            💡 “角色”和“最后活跃”之间的列使用包裹在工具提示中的图标作为标题。将鼠标悬停在显示器图标上即可查看工具提示。
          </p>
        </div>
        <DataTable
          data={sampleData}
          columns={columnsWithCustomHeaders}
          enableSorting
          sorting={sorting}
          onSortingChange={setSorting}
        />
      </div>
    );
  },
};
