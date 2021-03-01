# 封装 mavonEditor 组件
markdown在线编辑器，封装mavon-editor

### ====== 版本说明 ======
- 1.0.0 : 初始化git库
- 1.0.1 : 对 mavon-editor 进行封装
- 1.0.2 : 修复 isText=true 时 navigation 的多个显示问题

## 1. 安装
```
npm install @qingbing/vue-markdown
```

## 2. 使用方法
### 2.1 main.js 全局引用 mavon-editor
```js
// markdown 在线编辑器
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
```

### 2.3 在需要使用 md-editor 的组件中
```js
# 导入组件
import Markdown from "@qingbing/vue-markdown";

export default {
  data() {
    return {
      fromData: {
        remark: "",
      },
    };
  },
  components: {
    mdEditor: Markdown,
  },
}
```
```html
<md-editor :formData="formData" field="remark" :isText="false"></md-editor>
```

## 3. 支持参数

| 参数字段 | 参数类型 | 必填  | 默认值 | 描述 |
|:--|:--|:--|:--|:--|
| editable | Boolean | true | - | 是否允许编辑 |
| toolbarsFlag | Boolean | true  | - | 工具栏是否显示 |
| subfield | Boolean | true  | - | 编辑器栏位 - true : 双栏，编辑预览同屏； false : 单栏，编辑预览分屏 |
| defaultOpen | String | edit  | - | 初始化编辑器显示方式 - edit : 默认展示编辑区域； preview : 默认展示预览区域； 其他 = edit |
| language | String | zh-CN  | - | 语言选择 - 支持 zh-CN: 中文简体 ， en: 英文 ， fr: 法语, pt-BR: 葡萄牙语 |
| placeholder | String | 开始编辑...  | - | 输入框为空时默认提示文本 |
| codeStyle | String | tomorrow-night  | - | markdown样式 : 参考 [github参考](https://github.com/hinesboy/mavonEditor/blob/master/src/lib/core/hljs/lang.hljs.css.js) |
| navigation | Boolean | false  | - | 是否展示目录 |
| ishljs | Boolean | true  | - | 是否代码高亮 |
| imageFilter | Function |   | - | 图片过滤函数，参数为一个File Object，要求返回一个Boolean, true表示文件合法，false表示文件不合法 |
| imageClick | Function |   | - | 图片点击事件，默认为预览 |
| change | Function |   | - | 编辑区发生变化的回调事件(render: value 经过markdown解析后的结果) |
| save | Function |   | - | ctrl + s 的回调事件(保存按键,同样触发该回调) |
| imgAdd | Function |   | - | 图片文件添加回调事件(filename: 写在md中的文件名, File: File Object) |
| imgDel | Function |   | - | 图片文件删除回调事件(filename: 写在md中的文件名) |
| toolbars | Object |   | - | 显示的工具栏项目 |
| **++==isText==++** | Boolean | false  | - | 是否表单组件，表示是否为表单编辑器 |
| **++==formData==++** | Object |  | 是 | 整个表单的数据 |
| **++==field==++** | String |  | 是 | 在表单数据中要显示的字段名 |
