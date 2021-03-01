# 封装 vue-element-ui 的组件
对 vue-element-ui 进行封装简单易用的组件

## 1. 修改 package.json 中的信息
- name ： @qingbing/{{element-demo}} : 尤其重要
- version 
- description
- keywords

## 2. 修改 ./src/index.js
```js
# 主要修改下面的 compoentId
Vue.component('ElementDemo', CComponent) // Vue 中组件的 id
```

## 3. 修改  ./src/component.vue
这里需要根据自己要实现的组件的功能需求修改功能代码

## 4. 完成以上代码后，执行组件的npm包发布
```
npm publish --access public
```

## 5. 代码发布以后稍等一会就可以在其它项目中安装使用了
### 5.1 安装
```
npm install @qingbing/{{element-demo}}
```

### 5.2 包导入，在vue的main.js中确认加入如下代码
```js
// 注意引入element-ui在Vue下，因为可能会被其他组件使用到
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局引入组件包（也可以局部引用）
import ElementDemo from "@qingbing/{{element-demo}}";
Vue.use(ElementDemo);
```

### 5.3 vue文件中使用
```
<element-demo></element-demo>
```