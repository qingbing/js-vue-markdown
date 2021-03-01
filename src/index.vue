<template>
  <mavon-editor
    v-model="formData[field]"
    :class="navigationClass"
    :editable="mdEditable"
    :subfield="mdSubfield"
    :navigation="navigation"
    :default-open="mdDefaultOpen"
    :toolbars="mdToolbars"
    :toolbarsFlag="mdToolbarsFlag"
    :language="language"
    :placeholder="placeholder"
    :codeStyle="codeStyle"
    :ishljs="ishljs"
    :imageFilter="imageFilter"
    :imageClick="imageClick"
    @change="change"
    @save="mdSave"
    @imgAdd="imgAdd"
    @imgDel="imgDel"
  />
</template>

<script>
// 导入包
import { isUndefined, isEmpty, isFunction, copy } from "@qingbing/helper";

const modeToolbars = {
  header: true, // 标题
  bold: true, // 粗体
  italic: true, // 斜体
  underline: true, // 下划线
  strikethrough: true, // 中划线
  superscript: true, // 上角标
  subscript: true, // 下角标
  mark: true, // 标记
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  // fullscreen: true, // 全屏编辑
  // readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: true, // 清空
  // save: true, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  /* 2.2.1 */
  subfield: true, // 单双栏模式
  preview: true, // 预览
  help: true, // 帮助
};
// 导出
export default {
  props: {
    /**
     * 编辑器配置
     */
    // 是否允许编辑
    editable: {
      type: Boolean,
      default: true,
    },
    // 工具栏是否显示
    toolbarsFlag: {
      type: Boolean,
      default: true,
    },
    // true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
    subfield: {
      type: Boolean,
      default: true,
    },
    // edit : 默认展示编辑区域 ， preview : 默认展示预览区域 , 其他 = edit
    defaultOpen: {
      type: String,
      default: "edit",
    },
    // 语言选择，支持 zh-CN: 中文简体 ， en: 英文 ， fr: 法语, pt-BR: 葡萄牙语
    language: {
      type: String,
      default: "zh-CN",
    },
    // 输入框为空时默认提示文本
    placeholder: {
      type: String,
      default: "开始编辑...",
    },
    // markdown样式： 默认github, https://github.com/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.css.js
    codeStyle: {
      type: String,
      default: "tomorrow-night",
    },
    // 默认展示目录
    navigation: {
      type: Boolean,
      default: false,
    },
    // 是否代码高亮
    ishljs: {
      type: Boolean,
      default: true,
    },
    // 图片过滤函数，参数为一个File Object，要求返回一个Boolean, true表示文件合法，false表示文件不合法
    imageFilter: {
      type: Function,
      default: null,
    },
    // 图片点击事件，默认为预览，可覆盖
    imageClick: {
      type: Function,
      default: null,
    },
    // 编辑区发生变化的回调事件(render: value 经过markdown解析后的结果)
    change: {
      type: Function,
      default: (value, render) => {},
    },
    // ctrl + s 的回调事件(保存按键,同样触发该回调)
    save: {
      type: Function,
      default: null,
    },
    // 图片文件添加回调事件(filename: 写在md中的文件名, File: File Object)
    imgAdd: {
      type: Function,
      default: (filename, imgfile) => {},
    },
    // 图片文件删除回调事件(filename: 写在md中的文件名)
    imgDel: {
      type: Function,
      default: (filename) => {},
    },
    toolbars: {
      // 工具栏
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * 组件配置
     */
    // 是否表单组件，表示是否为表单编辑器
    isText: {
      type: Boolean,
      default: false,
    },
    // 整个表单的数据
    formData: {
      type: Object,
      required: true,
    },
    // 字段名
    field: {
      type: String,
      required: true,
    },
  },
  data() {
    if (isUndefined(this.formData[this.field])) {
      throw new Error(`在传递对象中不存在的字段:${this.field}`);
    }
    if (isEmpty(this.label)) {
      this.isForm = true;
    } else {
      this.isForm = false;
    }
    this.mdSave = () => {};
    // 判断字段渲染的类型
    if (this.isText) {
      this.mdEditable = false; // 是否可编辑
      this.mdSubfield = false; // 双栏
      this.mdDefaultOpen = "preview"; // 编辑器加载方式
      this.mdToolbarsFlag = false; // 工具栏是否显示
      this.mdToolbars = {};
      this.navigationClass = "qb-md-view-navigation";
    } else {
      this.navigationClass = "";
      this.mdEditable = this.editable;
      this.mdSubfield = this.subfield;
      this.mdDefaultOpen = this.defaultOpen;
      this.mdToolbarsFlag = this.toolbarsFlag;
      if (isEmpty(this.toolbars)) {
        this.mdToolbars = modeToolbars;
      } else {
        this.mdToolbars = this.toolbars;
      }
      if (isFunction(this.save)) {
        const mdToolbars = copy(this.mdToolbars);
        mdToolbars.save = true;
        this.mdToolbars = mdToolbars;
        this.mdSave = this.save;
      }
    }
    return {};
  },
};
</script>

<style>
/* 内容显示时右边空出，安放悬停的 导航目录 */
.qb-md-view-navigation.v-note-wrapper
  .v-note-panel
  .v-note-show
  .v-show-content {
  padding-right: 270px;
}
/* 隐藏导航目录的关闭按钮 */
.qb-md-view-navigation.v-note-wrapper
  .v-note-panel
  .v-note-navigation-wrapper
  .v-note-navigation-title
  .v-note-navigation-close {
  display: none;
}
</style>