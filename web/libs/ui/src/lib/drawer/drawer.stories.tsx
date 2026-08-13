import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer, DrawerClose } from "./drawer";
import { Button } from "../button/button";
import { Typography } from "../typography/typography";
import { IconPersonInCircle, IconSettings, IconTrash } from "@humansignal/icons";

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  title: "用户界面/抽屉",
  argTypes: {
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    showCloseButton: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Default Drawer
 *
 * Basic drawer that slides in from the right side.
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开抽屉</Button>
        <Drawer open={open} onOpenChange={setOpen} title="抽屉标题" description="抽屉描述">
          <div className="p-base">
            <Typography variant="body" size="small">
              这是抽屉内容。你可以在这里放置任何内容。
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer with Footer
 *
 * Drawer with action buttons in the footer.
 */
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开抽屉</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="确认操作"
          description="您确定要继续吗？"
          footer={
            <div className="flex gap-2 w-full">
              <Button variant="neutral" look="outlined" onClick={() => setOpen(false)} className="flex-1">
                取消
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)} className="flex-1">
                确认
              </Button>
            </div>
          }
        >
          <div className="p-base">
            <Typography variant="body" size="small">
              此操作无法撤销。请确认您的选择。
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer from Left Side
 *
 * Drawer that slides in from the left side.
 */
export const FromLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开左侧抽屉</Button>
        <Drawer open={open} onOpenChange={setOpen} side="left" title="导航" description="主导航菜单">
          <div className="p-base">
            <nav className="flex flex-col gap-2">
              <Button variant="neutral" look="string" align="left" className="justify-start">
                <IconPersonInCircle className="mr-2" />
                个人资料
              </Button>
              <Button variant="neutral" look="string" align="left" className="justify-start">
                <IconSettings className="mr-2" />
                设置
              </Button>
              <Button variant="neutral" look="string" align="left" className="justify-start">
                <IconTrash className="mr-2" />
                删除
              </Button>
            </nav>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer from Top
 *
 * Drawer that slides in from the top.
 */
export const FromTop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开顶层抽屉</Button>
        <Drawer open={open} onOpenChange={setOpen} side="top" title="通知">
          <div className="p-base">
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-base border-neutral-border border rounded">
                  <Typography variant="body" size="small" className="font-medium">
                    通知 {i}
                  </Typography>
                  <Typography variant="body" size="small" className="text-neutral-content-subtle">
                    这是通知内容 {i}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer from Bottom
 *
 * Drawer that slides in from the bottom.
 */
export const FromBottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开底层抽屉</Button>
        <Drawer open={open} onOpenChange={setOpen} side="bottom" title="快速操作">
          <div className="p-base">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="neutral" look="outlined" className="h-20 flex-col">
                <IconPersonInCircle className="mb-2" />
                个人资料
              </Button>
              <Button variant="neutral" look="outlined" className="h-20 flex-col">
                <IconSettings className="mb-2" />
                设置
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer without Close Button
 *
 * Drawer without the default close button in the header.
 */
export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开抽屉</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="自定义关闭"
          showCloseButton={false}
          footer={
            <Button variant="primary" onClick={() => setOpen(false)} className="w-full">
              关闭抽屉
            </Button>
          }
        >
          <div className="p-base">
            <Typography variant="body" size="small">
              此抽屉在页脚使用自定义的关闭按钮，而不是默认的页眉按钮。
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer with Scrollable Content
 *
 * Drawer with long content that scrolls.
 */
export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开可滚动抽屉</Button>
        <Drawer open={open} onOpenChange={setOpen} title="长内容" description="滚动查看更多">
          <div className="p-base">
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} className="mb-base p-base border-neutral-border border rounded">
                <Typography variant="body" size="small">
                  项目 {i + 1}
                </Typography>
                <Typography variant="body" size="small" className="text-neutral-content-subtle">
                  这是长列表中的项目{i + 1}。
                </Typography>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer with Trigger
 *
 * Using DrawerTrigger component for declarative control.
 * Note: Since Drawer creates its own Sheet context, DrawerTrigger should be used
 * with a separate Sheet wrapper, or use controlled state (open/onOpenChange) instead.
 */
export const WithTrigger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开抽屉</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="触发式抽屉"
          description="此抽屉通过点击按钮打开"
          footer={
            <DrawerClose asChild>
              <Button variant="primary" className="w-full">
                关闭
              </Button>
            </DrawerClose>
          }
        >
          <div className="p-base">
            <Typography variant="body" size="small">
             此抽屉使用受控状态（open/onOpenChange）来管理可见性。若要使用 DrawerTrigger，请将 DrawerTrigger 和 Drawer 都在 Sheet 组件中。
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer without Title
 *
 * Drawer without a visible title. A hidden "Drawer" title is automatically rendered for accessibility.
 */
export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开无标题抽屉</Button>
        <Drawer open={open} onOpenChange={setOpen}>
          <div className="p-base">
            <Typography variant="body" size="small">
              这个抽屉没有可见的标题，但为了屏幕阅读器的无障碍访问，渲染了一个隐藏的标题。
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer with Custom Content Class
 *
 * Drawer with custom contentClassName to customize positioning, width, and other styles.
 * This example demonstrates both custom width and top offset.
 */
export const WithCustomContentClass: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>打开抽屉（自定义内容类）</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          side="right"
          title="自定义内容类"
          contentClassName="top-[48px] w-1/2"
          description="此抽屉使用 contentClassName 来自定义位置（顶部偏移量）和宽度"
        >
          <div className="p-base">
            <Typography variant="body" size="small">
              此抽屉使用 contentClassName 来：
            </Typography>
            <ul className="list-none list-inside mt-base space-y-tight">
              <li>
                <Typography variant="body" size="small">
                  添加48px的顶部偏移量，将其定位在固定导航栏下方
                </Typography>
              </li>
              <li>
                <Typography variant="body" size="small">
                  在移动端设置50%的自定义宽度，在较大屏幕上设置2xl的最大宽度。
                </Typography>
              </li>
            </ul>
          </div>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer with Custom Body Class
 *
 * Drawer with custom styling applied to the body content wrapper.
 */
export const WithCustomBodyClass: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>使用自定义主体打开抽屉</Button>
        <Drawer
          open={open}
          onOpenChange={setOpen}
          title="定制主体造型"
          bodyClassName="bg-neutral-surface-subtle"
        >
          <div className="p-base">
            <Typography variant="body" size="small">
              此抽屉通过bodyClassName对body包装器应用了自定义背景颜色。
            </Typography>
          </div>
        </Drawer>
      </div>
    );
  },
};
