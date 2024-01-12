type DomEventOptions = boolean | { capture?: boolean; once?: boolean; passive?: boolean; signal?: AbortSignal };

type ElementEventHandler<K extends keyof HTMLElementEventMap> = (
	this: HTMLElement,
	event: HTMLElementEventMap[K]
) => any;

type WindowEventHandler<K extends keyof WindowEventMap> = (this: Window, event: WindowEventMap[K]) => any;

export function listen<K extends keyof WindowEventMap>(
	target: Window & typeof globalThis,
	event: K,
	handler: WindowEventHandler<K>,
	options?: DomEventOptions
): () => void;

export function listen<K extends keyof HTMLElementEventMap>(
	target: HTMLElement,
	event: K,
	handler: ElementEventHandler<K>,
	options?: DomEventOptions
): () => void;

export function listen(target: any, event: any, handler: any, options: any): any {
	target.addEventListener(event, handler, options);
	return () => {
		target.removeEventListener(event, handler, options);
	};
}
