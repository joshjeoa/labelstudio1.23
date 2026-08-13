import { htmlEscape } from "./html";

const URL_CORS_DOCS = "https://labelstud.io/guide/storage.html#Troubleshoot-CORS-and-access-problems";
const URL_TAGS_DOCS = "https://labelstud.io/tags";

export default {
  DONE: "完成！",
  NO_COMP_LEFT: "没有更多标注",
  NO_NEXT_TASK: "队列中没有剩余任务",
  NO_ACCESS: "你没有权限访问该任务",

  CONFIRM_TO_DELETE_ALL_REGIONS: "确认删除所有标注区域？",

  // Tree validation messages
  ERR_REQUIRED: ({ modelName, field }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 为必填项`;
  },

  ERR_UNKNOWN_TAG: ({ modelName, field, value }) => {
    return `标签 <b>${value}</b> 未注册，被 <b>${modelName}#${field}</b> 引用`;
  },

  ERR_TAG_NOT_FOUND: ({ modelName, field, value }) => {
    return `配置中不存在名称为 <b>${value}</b> 的标签，被 <b>${modelName}#${field}</b> 引用`;
  },

  ERR_TAG_UNSUPPORTED: ({ modelName, field, value, validType }) => {
    return `<b>${modelName}</b> 的属性 <b>${field}</b> 设置无效：引用标签 <b>${value}</b>，但 <b>${modelName}</b> 仅支持控制标签：<b>${[]
      .concat(validType)
      .join(", ")}</b>`;
  },

  ERR_PARENT_TAG_UNEXPECTED: ({ validType, value }) => {
    return `标签 <b>${value}</b> 必须作为以下标签的子标签：<b>${[].concat(validType).join(", ")}</b>`;
  },

  ERR_BAD_TYPE: ({ modelName, field, validType }) => {
    return `标签 <b>${modelName}</b> 的属性 <b>${field}</b> 类型无效。合法类型：<b>${validType}</b>`;
  },

  ERR_INTERNAL: ({ value }) => {
    return `内部错误。详情查看浏览器控制台。请重试或联系开发人员。<br/>${value}`;
  },

  ERR_GENERAL: ({ value }) => {
    return value;
  },

  // Object loading errors
  URL_CORS_DOCS,
  URL_TAGS_DOCS,

  ERR_LOADING_AUDIO({ attr, url, error }) {
    return (
      <div data-testid="error:audio">
        <p>加载音频失败，请检查任务数据中的 <code>{attr}</code> 字段。</p>
        <p>详细信息：{error}</p>
        <p>资源地址：{htmlEscape(url)}</p>
      </div>
    );
  },

  ERR_LOADING_S3({ attr, url }) {
    return `
    <div>
      <p>
        从 <code>${attr}</code> 字段读取地址加载资源失败。
        请求参数无效。
        如果你使用S3存储，请确认填写了正确的存储桶区域。
      </p>
      <p>资源地址：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_CORS({ attr, url }) {
    return `
    <div>
      <p>
        无法加载 <code>${attr}</code> 字段对应的资源地址。
        大概率是静态资源服务器跨域(CORS)配置限制。
        <a href="${URL_CORS_DOCS}" target="_blank">点击查看官方文档说明</a>。
      </p>
      <p>
        同时请确认：
        <ul>
          <li>资源地址有效</li>
          <li>网络能够正常访问该地址</li>
        </ul>
      </p>
      <p>资源地址：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code></p>
    </div>`;
  },

  ERR_LOADING_HTTP({ attr, url, error }) {
    return `
    <div data-testid="error:http">
      <p>
        从 <code>${attr}</code> 字段读取地址加载资源失败
      </p>
      <p>
        排查方向：
        <ul>
          <li>资源地址格式正确</li>
          <li>请求协议与服务协议保持一致（http ↔ https）</li>
          <li>静态资源服务器开启跨域访问CORS，
            <a href=${URL_CORS_DOCS} target="_blank">查看文档</a>
          </li>
        </ul>
      </p>
      <p>
        详细错误信息：<code>${error}</code>
        <br />
        资源地址：<code><a href="${encodeURI(url)}" target="_blank" rel="noreferrer">${htmlEscape(url)}</a></code>
      </p>
    </div>`;
  },
};