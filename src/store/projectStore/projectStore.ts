import { create } from "zustand";
import { IProjectAction, IProjectState } from "./types";

const useProjectStore = create<IProjectState & IProjectAction>((set, get) => ({
	projectInfo: undefined,
	updateProjectInfo: (projectInfo) => {
		set(() => {
			return { projectInfo };
		});
	},
	getProjectInfo: () => {
		return get().projectInfo!;
	}
}));

export default useProjectStore;
