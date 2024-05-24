import { ProjectInfo } from "@/service/types/requestTypes";

export interface IProjectState {
	projectInfo: ProjectInfo | undefined;
}

export interface IProjectAction {
	updateProjectInfo: (project: ProjectInfo) => void;
	getProjectInfo: () => ProjectInfo;
}
