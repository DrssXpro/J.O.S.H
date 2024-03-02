const computedBaseEventCode = (codes: string[]) => {
	return `// 单击
async function click (mouseEvent,components) {
${codes[0]}
},

// 双击
async function dblclick (mouseEvent,components) {
${codes[1]}
},

// 鼠标移动
async function mousemove (mouseEvent,components) {
${codes[2]}
},

// 鼠标移出
async function mouseout (mouseEvent,components) {
${codes[3]}
}`;
};

const computedAdvancedEventCode = (codes: string[]) => {
	return `// 渲染之后
async function onChartReady (e,components,echarts,node_modules) {
${codes[0]}
},
`;
};

export { computedBaseEventCode, computedAdvancedEventCode };
