const strictOptions = [
  "strict",
  "alwaysStrict",
  "strictNullChecks",
  "strictBindCallApply",
  "strictFunctionTypes",
  "strictPropertyInitialization",
  "noImplicitAny",
  "noImplicitThis",
  "useUnknownInCatchVariables",
];

function init(modules: {
  typescript: typeof import("typescript/lib/tsserverlibrary");
}) {
  const ts = modules.typescript;

  // This (seems to be) called once per project.
  function create(info: ts.server.PluginCreateInfo) {
    // Get initial compilerOptions for comparison later:
    const initialCompilerOptions = info.project.getCompilerOptions();

    // Get overrides from plugin config:
    const pluginOverrides = info.config.overrides || {};

    // Diagnostic logging
    info.project.projectService.logger.info(
      "ts-ide-overrides: " +
        JSON.stringify({
          initialCompilerOptions,
          pluginOverrides,
        })
    );

    // Set up decorator object
    const proxy: ts.LanguageService = Object.create(null);
    for (let k of Object.keys(info.languageService) as Array<
      keyof ts.LanguageService
    >) {
      const x = info.languageService[k]!;
      // @ts-expect-error - JS runtime trickery which is tricky to type tersely
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
    }

    // getSemanticDiagnostics is a convenient hook to check and set compilerOptions
    proxy.getSemanticDiagnostics = function (filePath) {
      // Get overrides from comments with in the file::
      const fileOverrides = info.languageService
        .getTodoComments(filePath, [{ text: "@ts-ide", priority: 0 }])
        .reduce((acc, comment) => {
          const directives = comment.message.match(
            /@ts-ide-(enable|disable)-\S+/g
          );
          directives &&
            directives.forEach((directive) => {
              const enable = directive.startsWith("@ts-ide-enable-");
              // kebab-case to camelCase
              const property = directive
                .slice("@ts-ide-enable-".length + (enable ? 0 : 1))
                .toLowerCase()
                .replace(/-./g, (str) => str.slice(1).toUpperCase());
              if (strictOptions.includes(property)) {
                acc[property] = enable;
              }
            });
          return acc;
        }, {} as Record<string, boolean>);

      info.project.projectService.logger.info(
        "ts-ide-overrides: " + JSON.stringify({ filePath, fileOverrides })
      );

      info.project.setCompilerOptions(
        Object.assign(
          {},
          initialCompilerOptions,
          pluginOverrides,
          fileOverrides
        )
      );

      return info.languageService.getSemanticDiagnostics(filePath);
    };

    return proxy;
  }

  return { create };
}

export = init;
