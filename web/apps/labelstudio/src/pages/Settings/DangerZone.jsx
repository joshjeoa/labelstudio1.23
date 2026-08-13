import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Button, Typography, useToast } from "@humansignal/ui";
import { useUpdatePageTitle, createTitleFromSegments } from "@humansignal/core";
import { Label } from "../../components/Form";
import { modal } from "../../components/Modal/Modal";
import { useModalControls } from "../../components/Modal/ModalPopup";
import Input from "../../components/Form/Elements/Input/Input";
import { Space } from "../../components/Space/Space";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAPI } from "../../providers/ApiProvider";
import { useProject } from "../../providers/ProjectProvider";
import { cn } from "../../utils/bem";

export const DangerZone = () => {
  const { project } = useProject();
  const api = useAPI();
  const history = useHistory();
  const toast = useToast();
  const [processing, setProcessing] = useState(null);

  useUpdatePageTitle(createTitleFromSegments([project?.title, "Danger Zone"]));

  const showDangerConfirmation = ({ title, message, requiredWord, buttonText, onConfirm }) => {
    const isDev = process.env.NODE_ENV === "development";

    return modal({
      title,
      width: 600,
      allowClose: false,
      body: () => {
        const ctrl = useModalControls();
        const inputValue = ctrl?.state?.inputValue || "";

        return (
          <div>
            <Typography variant="body" size="medium" className="mb-tight">
              {message}
            </Typography>
            <Input
              label={`要继续，请在下方输入框中输入“${requiredWord}”：`}
              value={inputValue}
              onChange={(e) => ctrl?.setState({ inputValue: e.target.value })}
              autoFocus
              data-testid="danger-zone-confirmation-input"
              autoComplete="off"
            />
          </div>
        );
      },
      footer: () => {
        const ctrl = useModalControls();
        const inputValue = (ctrl?.state?.inputValue || "").trim().toLowerCase();
        const isValid = isDev || inputValue === requiredWord.toLowerCase();

        return (
          <Space align="end">
            <Button
              variant="neutral"
              look="outline"
              onClick={() => ctrl?.hide()}
              data-testid="danger-zone-cancel-button"
            >
              取消
            </Button>
            <Button
              variant="negative"
              disabled={!isValid}
              onClick={async () => {
                await onConfirm();
                ctrl?.hide();
              }}
              data-testid="danger-zone-confirm-button"
            >
              {buttonText}
            </Button>
          </Space>
        );
      },
    });
  };

  const handleOnClick = (type) => () => {
    const actionConfig = {
      reset_cache: {
        title: "重置缓存",
        message: (
          <>
            您即将重置<strong>{project.title}</strong>的缓存。此操作无法撤销。
          </>
        ),
        requiredWord: "cache",
        buttonText: "重置缓存",
      },
      tabs: {
        title: "关闭所有标签页",
        message: (
          <>
            您即将关闭<strong>{project.title}</strong>的所有标签页。此操作无法撤销
          </>
        ),
        requiredWord: "tabs",
        buttonText: "关闭所有标签页",
      },
      project: {
        title: "删除项目",
        message: (
          <>
            您即将删除项目<strong>{project.title}</strong>。此操作无法撤销
          </>
        ),
        requiredWord: "delete",
        buttonText: "删除项目",
      },
    };

    const config = actionConfig[type];

    if (!config) {
      return;
    }

    showDangerConfirmation({
      ...config,
      onConfirm: async () => {
        setProcessing(type);
        try {
          if (type === "reset_cache") {
            await api.callApi("projectResetCache", {
              params: {
                pk: project.id,
              },
            });
            toast.show({ message: "Cache reset successfully" });
          } else if (type === "tabs") {
            await api.callApi("deleteTabs", {
              body: {
                project: project.id,
              },
            });
            toast.show({ message: "All tabs dropped successfully" });
          } else if (type === "project") {
            await api.callApi("deleteProject", {
              params: {
                pk: project.id,
              },
            });
            toast.show({ message: "Project deleted successfully" });
            history.replace("/projects");
          }
        } catch (error) {
          toast.show({ message: `Error: ${error.message}`, type: "error" });
        } finally {
          setProcessing(null);
        }
      },
    });
  };

  const buttons = useMemo(
    () => [
      {
        type: "annotations",
        disabled: true, //&& !project.total_annotations_number,
        label: `删除${project.total_annotations_number}个标注`,
      },
      {
        type: "tasks",
        disabled: true, //&& !project.task_number,
        label: `删除${project.task_number}个任务`,
      },
      {
        type: "predictions",
        disabled: true, //&& !project.total_predictions_number,
        label: `删除${project.total_predictions_number}个预测`,
      },
      {
        type: "reset_cache",
        help:
          "重置缓存可能在以下情况下有所帮助：例如，由于与现有标签相关的验证错误，您无法修改标签配置，但您确信这些并不存在。您可以使用此操作重置缓存并重试。",
        label: "重置缓存",
      },
      {
        type: "tabs",
        help: "如果数据管理器无法加载，关闭所有数据管理器标签页可能会有所帮助。",
        label: "关闭所有标签页",
      },
      {
        type: "project",
        help: "删除项目会从数据库中移除所有任务、标注和项目数据。",
        label: "删除项目",
      },
    ],
    [project],
  );

  return (
    <div className={cn("simple-settings").toClassName()}>
      <Typography variant="headline" size="medium" className="mb-tighter">
        危险区域
      </Typography>
      <Typography variant="body" size="medium" className="text-neutral-content-subtler !mb-base">
        请自行承担风险执行这些操作。您在此页面上执行的操作无法撤销。请确保您的数据已备份。
      </Typography>

      {project.id ? (
        <div style={{ marginTop: 16 }}>
          {buttons.map((btn) => {
            const waiting = processing === btn.type;
            const disabled = btn.disabled || (processing && !waiting);

            return (
              btn.disabled !== true && (
                <div className={cn("settings-wrapper").toClassName()} key={btn.type}>
                  <Typography variant="title" size="large">
                    {btn.label}
                  </Typography>
                  {btn.help && <Label description={btn.help} style={{ width: 600, display: "block" }} />}
                  <Button
                    key={btn.type}
                    variant="negative"
                    look="outlined"
                    disabled={disabled}
                    waiting={waiting}
                    onClick={handleOnClick(btn.type)}
                    style={{ marginTop: 16 }}
                  >
                    {btn.label}
                  </Button>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <Spinner size={32} />
        </div>
      )}
    </div>
  );
};

DangerZone.title = "危险区域";
DangerZone.path = "/danger-zone";
