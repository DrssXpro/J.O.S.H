import { UserInfo } from "@/service/types/requestTypes";

export interface IUserState {
	userInfo: UserInfo | undefined;
}

export interface IUserAction {
	setUserInfo: (user: UserInfo | undefined) => void;
	outAndClearInfo: () => void;
}
