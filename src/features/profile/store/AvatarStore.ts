import { create } from "zustand";

interface AvatarState {
	avatar_url: string;
}

interface AvatarAction {
	setAvatar: (avatar_url: string) => void;
}

interface AvatarStore extends AvatarState, AvatarAction {}

const useAvatarStore = create<AvatarStore>((set) => ({
	avatar_url: "",
	setAvatar: (avatar_url) =>
		set((state) => {
			if (state.avatar_url !== avatar_url) {
				return {
					...state,
					avatar_url,
				};
			}
			return state;
		}),
}));

export default useAvatarStore;
