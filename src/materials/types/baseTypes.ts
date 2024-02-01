// 物料组件统一配置
export interface IMaterialConfigType {
	// 组件 key
	key: string;
	// 画布组件 key
	chartCanvasKey: string;
	// 配置面板 key
	configKey: string;
	// 组件名
	title: string;
	// 所属分类
	category: string;
	// 分类名称
	categoryName: string;
	// 所处菜单分类
	menu: string;
	// 组件预览图
	image: string;
	// 配置事件
	configEvents?: Record<string, (...args: any[]) => any>;
	// component
	component?: JSX.Element;
	// configElement
	componentConfig?: JSX.Element;
}
