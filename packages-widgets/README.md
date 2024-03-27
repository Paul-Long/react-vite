## Button

```text
react styled-components typescript classnames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现 Button 组件
命名：Button

Props 设置如下：
属性 type： primary -蓝色，default - 不设置颜色 但是显示 border, 默认值为 primary
size： 可选三种高度大小，也可自定义高度
width： 可设置宽度，默认看都自适应
className: 自定义 className
disabled： true ｜ false


css 设置如下：
hover 时 透明度设置为 0.8

使用export 导出 ，禁止 export default
```

## Input

```text
react styled-components typescript classnames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现组件 Input
命名： NumberInput

type=“text”
只能输入数字

使用forwardRef以便可以从父组件访问DOM元素。
将值格式化逻辑移到一个独立的函数中，以便在handleChange和useEffect中重用。
使用useCallback钩子来避免不必要的渲染。
添加注释以提高代码的可读性。
优化 NaN 展示

Props:
size: 三种高度
可以设置前缀，前缀可以是 string，也可以是 JSX.Element
可以设置后缀，后缀可以是 string，也可以是 JSX.Element
可以设置精度，默认 两位小数
可设置最大值max：若设置了 max，大于 max 则 value = max
可设置最小值 min：若设置了 min，小于 min 则 value=min
可设置 disabled，是否可编辑
可设置左边输入还是右边输入，默认右边输入 通过 class 控制
bordered： 是否显示边框 通过 bordered class 控制
className： 可自定义 className

Css：
hover或者 force 时 若 bordered === true 边框高亮为蓝色 否者不变
placeholder 颜色灰色
圆角
文字垂直居中

使用export 导出 ，禁止 export default
```

## Modal

```text
react styled-components typescript classNames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现 Modal
命名： Modal

要求
不展示时不挂在到 dom 中
将样式组件分离，使得Modal组件的主体更加清晰。
使用React Portal来渲染模态框到body标签之外，这有助于避免某些CSS继承问题，并且能够在DOM层次结构中更好地管理模态框。
添加动画效果，以便在模态框打开和关闭时提供平滑的过渡效果。
为了提高可访问性，当模态框打开时，我们应该将焦点移动到模态框上，并在模态框关闭时将焦点返回到触发它的元素上。
close 按钮放在 header 中

Props:
可设置 Title
可设置背景，背景黑色，字体白色
close 按钮可设置是否展示
size: 提供三种大小选择

css:
设置边框阴影
padding： 24px

使用export 导出 ，禁止 export default
```

## Toast

```text
react styled-components typescript classNames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现 Toast
命名：Toast

要求
全局提示组件
不实用不挂在 dom
显示页面正中，距离页面顶部 40px
进入效果渐显，3 秒自动消失，别切从 dom 移除
页面有多个 totast 时，从新到旧从上到下展示
类型分为 info、success、wran、error

最终使用方式如 Totast.info("...")

使用React.memo和useCallback来避免不必要的渲染和函数重建。
使用React.Portal确保Toast组件渲染在DOM的顶层。
不要使用 Context

支持组件外使用


布局：
 宽度自适应

Props:
content 显示内容，可以是 string 或者 element
可设置显示多久消失

css:
设置边框阴影
padding： 12px
圆角 8px


使用export 导出 ，禁止 export default

```

## Dropdown

```text
react styled-components typescript classnames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现 Dropdown 组件
命名：Dropdown

属性：
onChange?: Function
trigger?: click | hover， default click
contentStyle?: CSSProperties 可自定义 content 样式
content: JSX.Element
children: 自定义触发组件 ，children 被包裹在 DropdownButton 中
要求：
添加显示隐藏动画
鼠标从触发组件移动到Content中 下拉框不隐藏

使用export 导出 ，禁止 export default
```

## Menu

```text
react styled-components typescript classnames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现 Menu 组件
命名：Menu

布局：
垂直分布
ul li 实现，不显示 li 的点 自动优化显示方式

属性：
onClick?: (option: Option) => void
options: {text: string ｜ JSX.Element | (option: Option) => JSX.Element, key: string | number}[]
size: 三种大小  高度分别为 24px 32px 48px 默认值 medium
selectEnable: boolean 默认 true， 如果为 true ，点击的 menu 拥有选中状态

要求：

使用export 导出 ，禁止 export default
```
