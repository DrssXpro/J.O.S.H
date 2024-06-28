import { ProjectInfo, TemplateInfo } from "@/service/types/requestTypes";

const ProjectListData: ProjectInfo[] = [
	{
		id: 1,
		title: "测试项目1",
		cover: "",
		detail: "",
		status: false,
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString()
	},
	{
		id: 2,
		title: "测试项目2",
		cover: "",
		detail: "",
		status: true,
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString()
	},
	{
		id: 3,
		title: "测试项目3",
		cover: "",
		detail: "",
		status: false,
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString()
	},
	{
		id: 4,
		title: "测试项目4",
		cover: "",
		detail: "",
		status: false,
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString()
	}
];

const TemplateListData: TemplateInfo[] = [
	{
		id: 1,
		title: "测试模板1",
		cover: "",
		detail: "",
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString(),
		user: {
			id: 1,
			username: "討厭吃香菜",
			createTime: new Date().getTime().toString()
		}
	},
	{
		id: 2,
		title: "测试模板2",
		cover: "",
		detail: "",
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString(),
		user: {
			id: 1,
			username: "討厭吃香菜",
			createTime: new Date().getTime().toString()
		}
	},
	{
		id: 1,
		title: "测试模板3",
		cover: "",
		detail: "",
		createTime: new Date().getTime().toString(),
		updateTime: new Date().getTime().toString(),
		user: {
			id: 1,
			username: "討厭吃香菜",
			createTime: new Date().getTime().toString()
		}
	}
];

export { ProjectListData, TemplateListData };
