import { pick } from "lodash-es";
import { useRef } from "react";
import { shallow } from "zustand/shallow";

type Many<T> = T | readonly T[];

function useStoreSelector<S extends object, P extends keyof S>(paths: Many<P>): (state: S) => Pick<S, P> {
	const prev = useRef<Pick<S, P>>({} as Pick<S, P>);

	return (state: S) => {
		if (state) {
			const next = pick(state, paths);
			return shallow(prev.current, next) ? prev.current : (prev.current = next);
		}
		return prev.current;
	};
}

export default useStoreSelector;
