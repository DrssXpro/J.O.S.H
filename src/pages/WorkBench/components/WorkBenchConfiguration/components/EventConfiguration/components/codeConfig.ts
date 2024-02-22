const computedBaseEventCode = (codes: string[]) => {
	return `// 单击
async function click (mouseEvent,components) {
${codes[0]}
},

// 双击
async function dblclick (mouseEvent,components) {
${codes[1]}
},

// 鼠标进入
async function mouseenter (mouseEvent,components) {
${codes[2]}
},

// 鼠标移出
async function mouseleave (mouseEvent,components) {
${codes[3]}
}`;
};

const initAdvancedEventCode = `// 渲染之后
async function vnodeMounted (e,components,echarts,node_modules) {

},

// 渲染之前
async function vnodeBeforeMount (e,components,echarts,node_modules) {

},
`;

export { computedBaseEventCode, initAdvancedEventCode };
