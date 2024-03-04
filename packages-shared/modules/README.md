## Page

```text
react styled-components typescript classnames
styled-components 引入方式为 import {styled} from 'styled-components'
组件命名： Page
页面布局，Header 固定在最上方，页面滚动，header 不动
Content 展示最大宽度 1280，padding 左右 40px
响应式，屏幕宽度小于 640px content 宽度 是 100% padding 左右 20px，header 高度 40px
不要分文件
可以设置 Header 是否展示
可以通过 title 属性设置页面的 title
可以通过 desc 设置页面的描述
不要使用 export default
```

## Header

```text
react styled-components typescript classnames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现页面 Header 导航栏
命名： Header
背景设置为毛玻璃效果
高度设置为 60px screen < 640px 高度设置为 40px
padding 左右 40px ，小屏幕 padding 左右 20px

布局 左中右，
最左侧为 Logo
中间为 Navgation
右侧为 UserInfo 和 language

使用export 导出 ，禁止 export default
输出完整代码
```

## Navigation

```text
react styled-components typescript classnames

styled-components 引入方式为 import {styled} from 'styled-components'
styled-components 定义的元素组件额外属性命名方式为 $**

实现 Navigation 组件
命名：Navigation

要求：
水平布局
isMobile： screen <640px
高度默认 60px, isMobile 高度 设置为 40px
padding： 0 12px


计算 NavContainer 宽度 containerWidth，逐个计算 Menu dom实际宽度累加 获得 showWidth，当计算到第 n 个 Menu 若 showWidth > containerWidth 则只展示前 n-1 个 Menu，剩下的 Menu 放在数组 hiddenMenuList 中，若 hiddenMenuList.length > 0 这展示 Dropdown 按钮，内容为 hiddenMenuList

属性：
menus： [{text: string, value: any}, ...]
onClick: Function 


优化：
使用 React.useMemo 来避免在每次组件渲染时都重新计算可见和隐藏的菜单项。
使用 React.useCallback 来包装事件处理函数，以避免不必要的重新渲染。
使用 ResizeObserver 而不是 resize 事件监听器，以更高效地监听容器尺寸的变化。
移除直接操作 DOM 的部分，改用 ref 和 state 来控制组件的行为。

使用export 导出 ，禁止 export default
```
