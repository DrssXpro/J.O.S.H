const computedBaseEventCode = (codes: string[]) => {
	return `// 单击
async function click (components) {
${codes[0]}
},

// 双击
async function dblclick (components) {
${codes[1]}
},

// 鼠标移动
async function mousemove (components) {
${codes[2]}
},

// 鼠标移出
async function mouseout (components) {
${codes[3]}
}`;
};

const computedAdvancedEventCode = (codes: string[]) => {
	return `// 渲染之后
async function onChartReady (component,components,echarts) {
${codes[0]}
},
`;
};

export { computedBaseEventCode, computedAdvancedEventCode };
