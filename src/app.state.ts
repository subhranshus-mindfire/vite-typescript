
type State = Record<string, any>;
type Listener = () => void;
type ListenerMap = Record<string, Listener[]>;

const state: State = {};
const listeners: ListenerMap = {};

export function getState<T = any>(key: string): T | undefined {
  return state[key];
}

export function setState<T = any>(key: string, value: T): void {
  state[key] = value;

  if (listeners[key]) {
    listeners[key].forEach(listener => listener());
  }
}

export function observe(key: string, func: Listener): void {
  if (!listeners[key]) {
    listeners[key] = [func];
  } else if (!listeners[key].includes(func)) {
    listeners[key].push(func);
  }
}
