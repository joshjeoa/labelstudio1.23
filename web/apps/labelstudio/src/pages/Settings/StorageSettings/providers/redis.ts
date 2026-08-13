import { z } from "zod";
import type { ProviderConfig } from "@humansignal/app-common/blocks/StorageProviderForm/types/provider";
import { IconCloudProviderRedis } from "@humansignal/icons";

export const redisProvider: ProviderConfig = {
  name: "redis",
  title: "Redis存储",
  description: "使用所有必需的 Label Studio 设置配置您的 Redis 存储连接",
  icon: IconCloudProviderRedis,
  fields: [
    {
      name: "db",
      type: "text",
      label: "数据库编号 (db)",
      placeholder: "1",
      schema: z.string().default("1"),
    },
    {
      name: "password",
      type: "password",
      label: "密码",
      autoComplete: "new-password",
      placeholder: "您的Redis密码",
      schema: z.string().optional().default(""),
    },
    {
      name: "host",
      type: "text",
      label: "主机",
      required: true,
      placeholder: "redis://example.com",
      schema: z.string().min(1, "Host is required"),
    },
    {
      name: "port",
      type: "text",
      label: "端口号",
      placeholder: "6379",
      schema: z.string().default("6379"),
    },
    {
      name: "prefix",
      type: "text",
      label: "存储桶前缀",
      placeholder: "文件路径",
      schema: z.string().optional().default(""),
      target: "export",
    },
  ],
  layout: [{ fields: ["host", "port", "db", "password"] }, { fields: ["prefix"] }],
};

export default redisProvider;
