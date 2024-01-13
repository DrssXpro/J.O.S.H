class EventBus {
	private events: Record<string, Array<(...args: any[]) => any>>;
	constructor() {
		this.events = {};
	}

	on(eventName: string, callback: (...args: any[]) => any) {
		if (this.events[eventName]) {
			this.events[eventName].push(callback);
		} else {
			this.events[eventName] = [callback];
		}
	}

	emit(eventName: string, ...args: any[]) {
		if (this.events[eventName]) {
			const cbs = this.events[eventName];
			cbs.forEach((cb) => cb(...args));
		}
	}

	off(eventName: string, callback: (...args: any[]) => any) {
		if (this.events[eventName]) {
			const cbs = this.events[eventName];
			this.events[eventName] = cbs.filter((cb) => cb !== callback);
		}
	}

	once(eventName: string, callback: (...args: any[]) => any) {
		const onceFn = (...args: any[]) => {
			this.off(eventName, onceFn);
			callback(...args);
		};
		this.on(eventName, onceFn);
	}

	clear() {
		this.events = {};
	}

	hasEvent(eventName: string) {
		return Object.keys(this.events).includes(eventName);
	}
}

export default EventBus;
