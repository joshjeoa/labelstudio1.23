import { EnterpriseBadge, IconSpark } from "@humansignal/ui";
import { Alert, AlertTitle, AlertDescription } from "@humansignal/shad/components/ui/alert";
import { IconCloudProviderAzure } from "@humansignal/icons";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";

const azureSpiProvider: ProviderConfig = {
  name: "azure_spi",
  title: "Azure Blob 存储\n使用服务主体",
  description:
    "使用服务主体身份验证配置您的 Azure Blob 存储连接，以增强安全性（仅限代理）",
  icon: IconCloudProviderAzure,
  disabled: true,
  badge: <EnterpriseBadge />,
  fields: [
    {
      name: "enterprise_info",
      type: "message",
      content: (
        <Alert variant="gradient">
          <IconSpark />
          <AlertTitle>Enterprise Feature</AlertTitle>
          <AlertDescription>
            Azure Blob Storage with Service Principal is available in Label Studio Enterprise.{" "}
            <a
              href="https://docs.humansignal.com/guide/storage.html#Azure-Blob-Storage-with-Service-Principal-authentication"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              了解更多
            </a>
          </AlertDescription>
        </Alert>
      ),
    },
  ],
  layout: [{ fields: ["enterprise_info"] }],
};

export default azureSpiProvider;
