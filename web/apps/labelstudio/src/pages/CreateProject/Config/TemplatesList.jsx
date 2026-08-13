import React from "react";
import { Spinner } from "../../../components";
import { useAPI } from "../../../providers/ApiProvider";
import { cn } from "../../../utils/bem";
import "./Config.scss";
import { IconInfo } from "@humansignal/icons";
import { Button, EnterpriseBadge } from "@humansignal/ui";

const listClass = cn("templates-list");

// 分组中英文映射表
const groupTranslateMap = {
  "Computer Vision": "计算机视觉",
  "Natural Language Processing": "自然语言处理",
  "Audio/Speech Processing": "音频/语音处理",
  "Conversational AI": "对话式人工智能",
  "Chat": "对话",
  "Ranking & Scoring": "排序与打分",
  "Structured Data Parsing": "结构化数据解析",
  "Time Series Analysis": "时序分析",
  "Videos": "视频",
  "Generative AI": "生成式AI",
  "Community Contributions": "社区模板"
};

const Arrow = () => (
  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Arrow Icon</title>
    <path opacity="0.9" d="M2 10L6 6L2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

const TemplatesInGroup = ({ templates, group, onSelectRecipe, isEdition }) => {
  const picked = templates
    .filter((recipe) => recipe.group === group)
    // templates without `order` go to the end of the list
    .sort((a, b) => (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY));

  const isCommunityEdition = isEdition === "Community";

  return (
    <ul>
      {picked.map((recipe) => {
        const isEnterpriseTemplate = recipe.type === "enterprise";
        const isDisabled = isCommunityEdition && isEnterpriseTemplate;

        return (
          <li
            key={recipe.title}
            onClick={() => !isDisabled && onSelectRecipe(recipe)}
            className={listClass.elem("template").mod({ disabled: isDisabled }).toClassName()}
            title={isDisabled ? "企业版功能，仅Label Studio企业版可用" : ""}
          >
            <img src={recipe.image} alt={""} />
            <div className="flex flex-col items-center w-full">
              <h3 className="flex flex-1 justify-center text-center w-full">{recipe.title}</h3>
              {isEnterpriseTemplate && isCommunityEdition && <EnterpriseBadge className="mb-base" />}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export const TemplatesList = ({ selectedGroup, selectedRecipe, onCustomTemplate, onSelectGroup, onSelectRecipe }) => {
  const [groups, setGroups] = React.useState([]);
  const [templates, setTemplates] = React.useState();
  const api = useAPI();
  const isEdition = window?.APP_SETTINGS?.version_edition;

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await api.callApi("configTemplates");

      if (!res) return;
      const { templates, groups } = res;

      setTemplates(templates);
      setGroups(groups);
    };
    fetchData();
  }, []);

  const selected = selectedGroup || groups[0];

  return (
    <div className={listClass}>
      <aside className={listClass.elem("sidebar").toClassName()}>
        <ul>
          {groups.map((group) => {
            // 匹配中文，无匹配则显示原始英文
            const displayGroupName = groupTranslateMap[group] ?? group;
            return (
              <li
                key={group}
                onClick={() => onSelectGroup(group)}
                className={listClass
                  .elem("group")
                  .mod({
                    active: selected === group,
                    selected: selectedRecipe?.group === group,
                  })
                  .toClassName()}
              >
                {displayGroupName}
                <Arrow />
              </li>
            );
          })}
        </ul>
        <Button
          type="button"
          align="left"
          look="string"
          size="small"
          onClick={onCustomTemplate}
          className="w-full"
          aria-label="创建自定义模板"
        >
          自定义模板
        </Button>
      </aside>
      <main>
        {!templates && <Spinner style={{ width: "100%", height: 200 }} />}
        <TemplatesInGroup
          templates={templates || []}
          group={selected}
          onSelectRecipe={onSelectRecipe}
          isEdition={isEdition}
        />
      </main>
      <footer className="flex items-center justify-center gap-1">
        <IconInfo className={listClass.elem("info-icon").toClassName()} width="20" height="20" />
        <span>
          查看文档以{" "}
          <a href="https://labelstud.io/guide" target="_blank" rel="noreferrer">
            贡献模板
          </a>
          。
        </span>
      </footer>
    </div>
  );
};