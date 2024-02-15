const initBaseEventCode = `// 单击
async click (mouseEvent,components) {

},

// 双击
async dblclick (mouseEvent,components) {

},

// 鼠标进入
async mouseenter (mouseEvent,components) {

},

// 鼠标移出
async mouseleave (mouseEvent,components) {

},`;

const initAdvancedEventCode = `// 渲染之后
async vnodeMounted (e,components,echarts,node_modules) {

},

// 渲染之前
async vnodeBeforeMount (e,components,echarts,node_modules) {

},
`;

export { initBaseEventCode, initAdvancedEventCode };
