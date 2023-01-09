// eslint-disable-next-line  import/no-named-as-default
import Debug from 'debug';

export function debugGenerator(namespace: string): Debug.IDebugger {
	return Debug(namespace);
}

export function edizzyDebugGenerator(namespace: string): Debug.IDebugger {
	return debugGenerator(`edizzy:${namespace}`);
}
