import type { TipsCollection } from "./types";

export const defaultTipsCollection: TipsCollection = {
  projectCreation: [
    {
      title: "新存储连接器",
      content: "您可以将 Label Studio Enterprise 连接到 Databricks Unity Catalog (UC) Volumes，以导入文件作为任务并导出标注。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/storage.html#Databricks-Files-UC-Volumes",
        params: {
          experiment: "project_creation_tip",
          treatment: "databricks_uc_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content: "尝试 Label Studio Starter Cloud，专为小型团队和项目优化。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "project_creation_tip",
          treatment: "starter_cloud_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content: "您可以使用 Label Studio Enterprise 来控制内部团队成员和外部标注员对特定项目和工作区的访问权限。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "project_creation_tip",
          treatment: "access_to_projects_live"
        }
      }
    },
    {
      title: "生成式人工智能标注",
      content: "Label Studio 提供适用于监督式大语言模型微调、RAG检索排序、RLHF、聊天机器人评估等任务的模板。",
      closable: true,
      link: {
        label: "探索模板",
        url: "https://labelstud.io/templates/gallery_generative_ai",
        params: {
          experiment: "project_creation_tip",
          treatment: "genai_templates_live"
        }
      }
    },
    {
      title: "解锁更快速的访问权限配置",
      content:
        "通过在 Label Studio Enterprise 中将员工分配到工作区，简化将员工分配到多个项目的流程。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_projects#Add-or-remove-members-to-a-workspace",
        params: {
          experiment: "project_creation_tip",
          treatment: "faster_provisioning",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "在企业平台中，管理员可以查看标注员绩效仪表盘，以优化资源分配、改善团队管理并为薪酬提供参考。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/dashboard_annotator",
        params: {
          experiment: "project_creation_tip",
          treatment: "annotator_dashboard",
        },
      },
    },
    {
      title: "你知道吗？",
      content:
        "你可以使用或修改数十个模板来配置你的标注界面，或者使用简单的类XML标签从头开始创建自定义配置。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://labelstud.io/guide/setup",
        params: {
          experiment: "project_creation_tip",
          treatment: "templates",
        },
      },
    },
  ],
  organizationPage: [
    {
      title: "看起来你的团队正在壮大！",
      content: "使用 Label Studio Enterprise 为您的团队分配角色，并在项目和工作区级别控制对敏感数据的访问。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/manage_users#Roles-in-Label-Studio-Enterprise",
        params: {
          experiment: "organization_page_tip",
          treatment: "team_growing_live"
        }
      }
    },
    {
      title: "想要简化并确保登录安全吗？",
      content: "使用 Label Studio Enterprise，通过 SAML、SCIM2 或 LDAP 为您的团队启用单点登录。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/auth_setup",
        params: {
          experiment: "organization_page_tip",
          treatment: "enable_sso_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content: "Label Studio 现在推出了针对小型团队和项目优化的 Starter Cloud 服务。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "organization_page_tip",
          treatment: "starter_cloud_live"
        }
      }
    },
    {
      title: "想要自动化任务分配吗？",
      content:
        "创建规则，自动化任务分配给标注员的方式，并且仅在每个标注员的视图中显示分配给他们的任务；同时控制每个标注员的任务性。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/setup_project#Set-up-annotation-settings-for-your-project",
        params: {
          experiment: "organization_page_tip",
          treatment: "automate_distribution",
        },
      },
    },
    {
      title: "与社区分享知识",
      content: "有任何问题或想与其他 Label Studio 用户分享心得吗？加入社区 Slack 频道以获取最新动态。",
      closable: true,
      link: {
        label: "加入社区",
        url: "https://label-studio.slack.com",
        params: {
          experiment: "organization_page_tip",
          treatment: "share_knowledge_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content: "Label Studio 支持与云存储、机器学习模型以及流行工具进行多点集成，以实现机器学习流水线的自动化。",
      closable: true,
      link: {
        label: "查看集成目录",
        url: "https://labelstud.io/integrations/",
        params: {
          experiment: "organization_page_tip",
          treatment: "integration_points_live"
        }
      }
    },
    {
      title: "需要合规吗？",
      content: "Label Studio 企业版完全符合 SOC 2 和 HIPAA 标准。想要更多控制权？将其本地部署以获得最大的灵活性。",
      closable: true,
      link: {
        label: "联系我们",
        url: "https://humansignal.com/contact-sales/",
        params: {
          experiment: "organization_page_tip",
          treatment: "compliance_live"
        }
      }
    }
  ],
  projectSettings: [
    {
      title: "将您的 AWS 支出应用于 Label Studio Enterprise",
      content: "Label Studio Enterprise 现已在 AWS Marketplace 上架，您可以使用承诺支出（committed spend）来简化数据标注工作流程。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://aws.amazon.com/marketplace/pp/prodview-wjac3msf77tny",
        params: {
          experiment: "project_settings_tip",
          treatment: "aws_marketplace"
        }
      }
    },
    {
      title: "使用自动标注节省时间",
      content: "在企业平台中，利用自动化技术即时标注大规模数据集，且不牺牲质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/prompts_overview#Auto-labeling-with-Prompts",
        params: {
          experiment: "project_settings_tip",
          treatment: "auto_labeling_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content:
        "您可以使用 Label Studio Enterprise 的审核工作流和任务一致性评分来提高标注数据的质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/quality",
        params: {
          experiment: "project_settings_tip",
          treatment: "quality_and_agreement",
        },
      },
    },
    {
      title: "评估生成式人工智能模型",
      content: "结合自动化与人工监督，在企业平台中评估并确保大语言模型的质量。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/evals/",
        params: {
          experiment: "project_settings_tip",
          treatment: "evals_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content:
        "通过使用企业级云服务，您可以节省管理基础设施和升级的时间，并获得更多用于自动化、质量和团队管理的功能。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://humansignal.com/platform/",
        params: {
          experiment: "project_settings_tip",
          treatment: "infrastructure_and_upgrades",
        },
      },
    },
    {
      title: "你知道吗？",
      content: "尝试 Label Studio Starter Cloud，专为小型团队和项目优化。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "project_settings_tip",
          treatment: "starter_cloud_live"
        }
      }
    },
    {
      title: "你知道吗？",
      content: "您可以使用后端SDK连接机器学习模型，以节省预标注或主动学习的时间。",
      closable: true,
      link: {
        label: "了解更多",
        url: "https://labelstud.io/guide/ml",
        params: {
          experiment: "project_settings_tip",
          treatment: "connect_ml_models_live"
        }
      }
    },
    {
      title: "原生PDF支持即将到来！",
      content: "Label Studio Enterprise 提供原生 PDF 支持。",
      closable: true,
      link: {
        label: "申请早期访问",
        url: "https://humansignal.com/pdf-interest-signup",
        params: {
          experiment: "project_settings_tip",
          treatment: "lse_pdf_live"
        }
      }
    }
  ],
  // 新增登录页面提示分组 authPage
  authPage: [
    {
      title: "12月10日直播活动",
      description: "加入 Label Studio 产品团队，快速浏览今年最重大的发布内容",
      link: {
        label: "2025年12月10日 上午9点（太平洋标准时间）",
        url: "https://humansignal.com/webinars/label-studio-wrapped-2025/",
        params: {
          experiment: "login_revamp",
          treatment: "wrapped_webinar_2025_live"
        }
      }
    },
    {
      title: "提示词自动标注",
      description: "使用大语言模型瞬间为数千个任务进行预标注，并提供准确的预测。",
      link: {
        label: "了解更多",
        url: "https://docs.humansignal.com/guide/prompts_overview",
        params: {
          experiment: "login_revamp",
          treatment: "prompts_auto_labeling_live"
        }
      }
    },
    {
      title: "基准背后",
      description: "了解 Legalbenchmarks.ai 如何在 Label Studio Enterprise 中，利用“LLM 作为评判者”和人工审核，构建并扩展一个针对实际起草任务的基准测试。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/blog/how-legalbenchmarks-ai-built-a-domain-specific-ai-benchmark/",
        params: {
          experiment: "login_revamp",
          treatment: "legalbench_live"
        }
      }
    },
    {
      title: "新企业功能！",
      description: "聊天对话现在已成为 Label Studio 中创建和评估基于聊天的 AI 体验的原生数据类型。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/blog/introducing-chat-4-use-cases-to-ship-a-high-quality-chatbot/",
        params: {
          experiment: "login_revamp",
          treatment: "chat_live"
        }
      }
    },
    {
      title: "你知道吗？",
      description: "尝试 Label Studio Starter Cloud，专为小型团队和项目优化。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/pricing/",
        params: {
          experiment: "login_revamp",
          treatment: "starter_cloud_live"
        }
      }
    },
    {
      title: "你知道吗？",
      description: "Label Studio 有一个企业版本，它集成了更多功能和自动化工具，能够在确保最高质量的同时更快地标注数据。",
      link: {
        label: "了解更多",
        url: "https://humansignal.com/goenterprise/",
        params: {
          experiment: "login_revamp",
          treatment: "enterprise_platform_live"
        }
      }
    }
  ]
};