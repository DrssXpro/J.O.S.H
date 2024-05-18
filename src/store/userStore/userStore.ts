import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IUserAction, IUserState } from "./types";
import { StorageEnum } from "@/types/StorageTypes";
import { clearLocalStorage } from "@/utils/storages";

const useUserStore = create(
	persist<IUserState & IUserAction>(
		(set) => ({
			userInfo: undefined,
			setUserInfo: (user) => {
				set(() => ({ userInfo: user }));
			},
			outAndClearInfo: () => {
				clearLocalStorage(StorageEnum.J_USER_ACCESS_TOKEN);
				clearLocalStorage(StorageEnum.J_USER_REFRESH_TOKEN);
				set(() => ({
					userInfo: undefined
				}));
			}
		}),

		{
			name: StorageEnum.J_USER_INFO,
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useUserStore;
