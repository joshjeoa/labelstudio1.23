import { PersonalInfo } from "./PersonalInfo";
import { EmailPreferences } from "./EmailPreferences";
import { PersonalAccessToken, PersonalAccessTokenDescription } from "./PersonalAccessToken";
import { MembershipInfo } from "./MembershipInfo";
import { HotkeysManager } from "./Hotkeys";
import type React from "react";
import { PersonalJWTToken } from "./PersonalJWTToken";
import type { AuthTokenSettings } from "../types";
import { ABILITY, type AuthPermissions } from "@humansignal/core/providers/AuthProvider";
import { ff } from "@humansignal/core";
import { Badge } from "@humansignal/ui";

export type SectionType = {
  title: string | React.ReactNode;
  id: string;
  component: React.FC;
  description?: React.FC;
};

export const accountSettingsSections = (settings: AuthTokenSettings, permissions: AuthPermissions): SectionType[] => {
  const canCreateTokens = permissions.can(ABILITY.can_create_tokens);

  return [
    {
      title: "个人信息",
      id: "personal-info",
      component: PersonalInfo,
    },
    {
      title: (
        <div className="flex items-center gap-tight">
          <span>快捷键</span>
          <Badge variant="beta" style="solid" shape="rounded">
            Beta
          </Badge>
        </div>
      ),
      id: "hotkeys",
      component: HotkeysManager,
      description: () =>
        "自定义您的键盘快捷键以加快您的工作流程。点击下方任何热键，即可分配最适合您的新组合键。",
    },
    {
      title: "电子邮件偏好设置",
      id: "email-preferences",
      component: EmailPreferences,
    },
    {
      title: "会员信息",
      id: "membership-info",
      component: MembershipInfo,
    },
    settings.api_tokens_enabled &&
      canCreateTokens &&
      ff.isActive(ff.FF_AUTH_TOKENS) && {
        title: "个人访问令牌",
        id: "personal-access-token",
        component: PersonalJWTToken,
        description: PersonalAccessTokenDescription,
      },
    settings.legacy_api_tokens_enabled &&
      canCreateTokens && {
        title: ff.isActive(ff.FF_AUTH_TOKENS) ? "旧版令牌" : "访问令牌",
        id: "legacy-token",
        component: PersonalAccessToken,
        description: PersonalAccessTokenDescription,
      },
  ].filter(Boolean) as SectionType[];
};
