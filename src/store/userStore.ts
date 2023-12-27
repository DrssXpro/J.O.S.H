import { create } from "zustand";

interface IUserState {
	count: number;
	increment: () => void;
	decrement: () => void;
}

const userStore = create<IUserState>((set) => ({
	count: 0,
	increment: () => set((state: { count: number }) => ({ count: state.count + 1 })),
	decrement: () => set((state: { count: number }) => ({ count: state.count - 1 }))
}));

export default userStore;
