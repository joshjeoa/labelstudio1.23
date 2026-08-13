export default {
  enableHotkeys: {
    newUI: {
      title: "标签热键",
      description: "启用使用热键快速选择标签",
    },
    description: "启用标签热键",
    onChangeEvent: "toggleHotkeys",
    defaultValue: true,
  },
  enableTooltips: {
    newUI: {
      title: "在工具提示中显示快捷键",
      description: "在工具和操作的工具提示中显示快捷键",
    },
    description: "显示快捷键提示",
    onChangeEvent: "toggleTooltips",
    checked: "",
    defaultValue: false,
  },
  enableLabelTooltips: {
    newUI: {
      title: "在标签上显示快捷键",
      description: "在标签上显示快捷键",
    },
    description: "显示标签快捷键提示",
    onChangeEvent: "toggleLabelTooltips",
    defaultValue: true,
  },
  showLabels: {
    newUI: {
      title: "显示区域标签",
      description: "显示区域标签名称",
    },
    description: "在区域内显示标签",
    onChangeEvent: "toggleShowLabels",
    defaultValue: false,
  },
  continuousLabeling: {
    newUI: {
      title: "创建区域后保持标签选中状态",
      description: "允许使用所选标签进行连续区域创建",
    },
    description: "创建区域后保持标签选中状态",
    onChangeEvent: "toggleContinuousLabeling",
    defaultValue: false,
  },
  selectAfterCreate: {
    newUI: {
      title: "创建后选择区域",
      description: "自动选择新创建的区域",
    },
    description: "创建后选择区域",
    onChangeEvent: "toggleSelectAfterCreate",
    defaultValue: false,
  },
  showLineNumbers: {
    newUI: {
      tags: "Text Tag",
      title: "显示行号",
      description: "识别并引用您文档中的特定文本行",
    },
    description: "显示文本的行号",
    onChangeEvent: "toggleShowLineNumbers",
    defaultValue: false,
  },
  preserveSelectedTool: {
    newUI: {
      tags: "Image Tag",
      title: "保留所选工具",
      description: "在任务之间保留所选工具",
    },
    description: "记住所选工具",
    onChangeEvent: "togglepreserveSelectedTool",
    defaultValue: true,
  },
  enableSmoothing: {
    newUI: {
      tags: "Image Tag",
      title: "缩放时的像素平滑",
      description: "放大时平滑图像像素",
    },
    description: "缩放时启用图像平滑",
    onChangeEvent: "toggleSmoothing",
    defaultValue: true,
  },
  invertedZoom: {
    newUI: {
      tags: "Image Tag",
      title: "反转缩放方向",
      description: "反转滚动缩放的方向",
    },
    description: "启用反向缩放方向",
    onChangeEvent: "toggleInvertedZoom",
    defaultValue: false,
  },
};
