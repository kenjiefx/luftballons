/** All configuration you can pass when creating an instance of the app. */
export type PluncAppConfiguration = {
  /**
   * Prefix for Plunc-related HTML attributes.
   * By default, the application assumes using `plunc-`,
   * i.e., `plunc-if`, `plunc-repeat`.
   **/
  prefix?: string;
  /**
   * You can hook a function that will execute before the app kernel
   * starts booting. The function should return a Promise,
   * and must return `true`, otherwise, the kernel will not start.
   * @returns Promise that resolves to boolean value
   */
  startFn?: () => Promise<boolean>;
  /**
   * Hook a function that executes after the app completes
   * rendering.
   */
  endFn?: () => Promise<void>;
};

/**
 * Requires all fields of a type to be non-optional.
 */
export type RequireAllFields<T> = {
  [K in keyof T]-?: T[K];
};

/**
 * All expected return types of handler functions
 */
export type ResolvedHandlers =
  | null
  | (new (...args: any[]) => any)
  | { [key: string]: any }
  | void;

/** Service and component handler functions */
export type HandlerFunction<TDependecies extends any[], TObject> = (
  ...args: TDependecies
) => TObject;

/** Factory handler function */
export type FactoryHandlerFunction<TDependecies extends any[]> = (
  ...args: TDependecies
) => new (...args: any[]) => any;

/** Helper handler function */
export type HelperHandlerFunction<
  TDependecies extends any[],
  TObject,
> = HandlerFunction<TDependecies, TObject | void>;

/** All types of handlers */
export type PluncHandlers = {
  [K in keyof PluncAppInstance]: PluncAppInstance[K] extends (
    ...args: any[]
  ) => any
    ? K
    : never;
}[keyof PluncAppInstance];

export type PluncAppInstance = {
  /**
   * Registers a component in your application. You can pass the type or interface of the
   * component `<TComponent>`.
   * @param name - The name of the component
   * @param handler - The callback function that returns methods and properties implemented by `TComponent`
   */
  component: <TComponent>(
    name: string,
    handler: HandlerFunction<any[], TComponent>,
  ) => void;

  /**
   * Registers a service in your application. You can pass the type or interface
   * of the service `<TService>`
   * @param name  - The name of the service
   * @param handler - The callback function that returns methods and properties implemented by `TService`
   */
  service: <TService>(
    name: string,
    handler: HandlerFunction<any[], TService>,
  ) => void;

  /**
   * Registers a factory in your application. You can pass the type or interface
   * of the factory `<TFactory>`
   * @param name - The name of the factory
   * @param handler - The callback function that returns methods and properties implemented by `TFactory`
   */
  factory: <TFactory>(
    name: string,
    handler: FactoryHandlerFunction<any[]>,
  ) => void;

  /**
   * Registers a helper in your application. You can pass the type or interface
   * of the service `<THelper>`
   * @param name  - The name of the service
   * @param handler - The callback function that returns methods and properties implemented by `THelper`
   */
  helper: <THelper>(
    name: string,
    handler: HelperHandlerFunction<unknown[], THelper>,
  ) => void;
};

/**
 * Component unique identifier
 */
export type ComponentId = string & { separator: "." };

/**
 * Component scope type
 */
export type ComponentScope = Record<string, unknown>;

/**
 * Plunc attribute key type
 */
export type PluncAttributeKey = string & { plunc_prefix: true };

/**
 * HTML5 Date type in the format of "YYYY-MM-DD"
 */
export type HTML5Date = string & { format: "YYYY-MM-DD" };

/**
 * HTML5 Time type in the format of "HH:MM"
 */
export type HTML5Time = string & { format: "HH:MM" };

/**
 * All supported DOM events by PluncJS as of now
 */
export type PluncSupportedEvents = "click" | "change" | "keyup";

export interface PluncElementInterface<TElement extends HTMLElement> {
  /**
   * A reference to the element itself.
   * (Shouldn't be minified, as publicly-accessible)
   */
  $element: TElement;
  /**
   * A reference to parent element, wrapped in this `PluncElement` object
   * (Shouldn't be minified, as publicly-accessible)
   */
  $parent: PluncElementInterface<TElement>;
  /** Retrieves the $element */
  get(): TElement;
  /** Retrieves the state */
  getState(): string | null;
  /** Sets the state */
  setState(state: string): void;
  /** Adds a class */
  addClass(className: string): void;
  /** List existing classes */
  listClass(): Array<string>;
  /** Removes a class */
  removeClass(className: string): void;
  /** Toggle class names */
  toggleClass(className: string): void;
}

/** Block API requires call back function */
export type BlockCallback<TElement extends HTMLElement> = (
  element: PluncElementInterface<TElement> | null,
) => void;

export type BlockAPI = <TElement extends HTMLElement>(
  elementName: string,
  callback: BlockCallback<TElement>,
) => void;

/**
 * Staging HTMLElements are used during rendering before they are
 * injected into the actual DOM.
 */
export type StagingHTMLElement = HTMLElement & {
  /**
   * Indicates whether the staging element has been committed to the DOM.
   * plStgCS: Plunc Staging Committed Status
   */
  $plStgCS: boolean;
};

/**
 * A library of handler functions for components, services, factories, and helpers.
 * Implementation details are hidden to prevent external manipulation.
 */
export const LibraryBrand: unique symbol = Symbol("LibraryBrand");
export type Library = {
  readonly [LibraryBrand]: true;
};

/**
 * Holds a map of component's parents and keys, each represented
 * by its own component id. Implementation details are hidden to prevent
 * external manipulation.
 **/
export const ComponentFamilyTreeBrand: unique symbol = Symbol(
  "ComponentFamilyTreeBrand",
);
export type ComponentFamilyTree = {
  readonly [ComponentFamilyTreeBrand]: true;
};

/**
 * Holds a registry of ComponentInternalRepresentations and
 * ServiceInternalRepresentations. Implementation details are hidden
 * to prevent external manipulation.
 */
export const RegistryBrand: unique symbol = Symbol("RegistryBrand");
export type Registry = {
  readonly [RegistryBrand]: true;
};

/**
 * Represents a proxy for accessing a component's exposed members.
 * This proxy is what users interact with when they use a component.
 */
export type ComponentExposedAPIProxy = Record<string, unknown> & {
  __brand__: Symbol;
};

/**
 * Internal representation of a component within the application.
 * This is not the component that users interact with directly.
 */
export type ComponentInternalRepresentation = {
  readonly id: ComponentId;
  readonly name: string;
  readonly alias: string | null;
  scope: ComponentScope;
  __setProxy(proxy: ComponentExposedAPIProxy): void;
  __getProxy(): ComponentExposedAPIProxy | null;
  __setTemplate(template: string): void;
  __getTemplate(): string;
};

export type ServiceName = string & { __brand__: Symbol };

/**
 * The resulting object after invoking a service handler.
 * This is what users interact with when they use a service.
 */
export type ServiceExternalAPI = {
  [key: string]: any;
} & {
  __brand__: Symbol;
};

/**
 * Internal representation of a service within the application.
 * This is not the app instance that users interact with directly.
 */
export type PluncAppInternalRepresentation = {
  config: Readonly<RequireAllFields<PluncAppConfiguration>>;
  library: Library;
  registry: Registry;
  name: string;
  id: number;
  __getReadyListeners: () => Array<() => Promise<void>>;
  __emitReady: () => void;
  __isReady: () => boolean;
  __onReady: (listener: () => Promise<void>) => void;
};

export type TemplatesMap = Map<string, string>;

export const app: PluncAppInstance = {
  component: <TComponent extends any>(
    name: string,
    handler: HandlerFunction<any[], TComponent>,
  ) => {
    // Implementation goes here
  },
  service: () => {
    // Implementation goes here
  },
  factory: () => {
    // Implementation goes here
  },
  helper: () => {
    // Implementation goes here
  },
};
