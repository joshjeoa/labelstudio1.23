import { z } from "zod";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";
import { IconFolderOpen } from "@humansignal/icons";
import { Alert, AlertDescription, AlertTitle } from "@humansignal/shad/components/ui/alert";

const localFilesDocumentRoot =
  typeof window === "undefined" ? undefined : window.APP_SETTINGS?.local_files_document_root;
const localFilesServingEnabled =
  typeof window === "undefined" ? true : window.APP_SETTINGS?.local_files_serving_enabled !== false;
const isCommunityEdition =
  typeof window === "undefined" ? false : window.APP_SETTINGS?.version?.edition === "Community";
const trimTrailingSeparators = (value?: string) => value?.replace(/[/\\]+$/, "");
const defaultPathExample = localFilesDocumentRoot
  ? `${trimTrailingSeparators(localFilesDocumentRoot)}/your-subdirectory`
  : undefined;

const pathSchema = defaultPathExample
  ? z.string().min(1, "Path is required").default(defaultPathExample)
  : z.string().min(1, "Path is required");

const LocalFilesServingWarning = () => {
  if (localFilesServingEnabled) return null;
  return (
    <>
      <Alert variant="destructive">
        <AlertTitle>Local file serving is disabled</AlertTitle>
        <AlertDescription>
          将环境变量"LOCAL_FILES_SERVING_ENABLED"设置为"true"并重启Label Studio以启用本地文件存储。详情请参阅文档{" "}
          <a href="https://labelstud.io/guide/storage.html#Local-storage" target="_blank" rel="noreferrer">
            本地存储文档
          </a>
          {isCommunityEdition && (
            <Alert variant="info">
              <AlertDescription>
                <p>
                  提示：在运行 Label Studio 的命令所在目录下创建一个“mydata”或“label-studio-data”目录，即可自动启用本地文件服务。
                </p>
                <p>
                  如果您运行该 Docker 镜像，应用程序将在 "/label-studio" 目录下启动，因此您可以将宿主机文件夹绑定挂载到容器内的 "/labelstudio/mydata" 或 "/label-studio/label-studio-data"，从而无需额外配置即可实现本地文件服务。
                </p>
              </AlertDescription>
            </Alert>
          )}
        </AlertDescription>
      </Alert>
    </>
  );
};

export const localFilesProvider: ProviderConfig = {
  name: "localfiles",
  title: "本地文件",
  description: "使用所有必需的 Label Studio 设置配置您的本地文件存储连接",
  icon: () => (
    <IconFolderOpen
      width={40}
      height={40}
      style={{
        color: "var(--color-accent-canteloupe-base)",
        filter: "drop-shadow(0px 0px 12px var(--color-accent-canteloupe-base))",
      }}
    />
  ),
  fields: [
    {
      name: "serving_warning",
      type: "message",
      content: LocalFilesServingWarning,
    },
    {
      name: "path",
      type: "text",
      label: "绝对本地路径",
      required: true,
      placeholder: defaultPathExample || "/data/my-folder/subdirectory",
      schema: pathSchema,
      defaultValue: defaultPathExample,
      description: `此路径必须是运行 Label Studio 的主机上的绝对路径，并且必须以 \n"${localFilesDocumentRoot}" (LOCAL_FILES_DOCUMENT_ROOT 开头。`,
    },
  ],
  layout: [{ fields: ["serving_warning"] }, { fields: ["path"] }],
};

export default localFilesProvider;
