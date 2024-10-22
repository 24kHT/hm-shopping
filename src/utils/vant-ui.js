import Vue from 'vue'
// 按需引入vant-ui插件

import { Button, Tabbar, TabbarItem, NavBar, Toast, Search, Swipe, SwipeItem, Grid, GridItem, Image as VanImage, Icon, Rate, ActionSheet, Checkbox, CheckboxGroup, Divider, Dialog, Form, Field, Tab, Tabs } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Form)
Vue.use(Field)
// 全局注册
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)

Vue.use(ActionSheet)
Vue.use(Rate)
Vue.use(Icon)

Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Search)
Vue.use(Toast)

Vue.use(NavBar)

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
