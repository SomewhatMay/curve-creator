interface module {
	cleanRequire: (module: ModuleScript) => any;
}

declare const module: module;

export = module;
