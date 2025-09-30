import { defineNuxtModule, addPlugin, createResolver, addComponentsDir } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: "nuxt-smoothy",
		configKey: "nuxtSmoothy",
	},
	// Default configuration options of the Nuxt module
	defaults: {
		mdc: true,
	},
	setup(_options: any, _nuxt: any) {
		// 解析 runtime 路径
		const resolver = createResolver(import.meta.url);
		const runtimeDir = resolver.resolve("./runtime");
		const runtimeStylesPath = resolver.resolve("./runtime/styles/content-enhancer.css");
		const shikiStylesPath = resolver.resolve("./runtime/styles/shiki.css");
		const componentsPath = resolver.resolve("./runtime/styles/components/index.css");

		// 注册组件
		addComponentsDir({
			path: resolver.resolve(runtimeDir, "components"),
			global: true,
			pathPrefix: false,
		});

		// 注册插件
		addPlugin(resolver.resolve("./runtime/mediumZoom.client.ts"));

		// 添加样式文件
		_nuxt.options.css = _nuxt.options.css || [];
		_nuxt.options.css.push(runtimeStylesPath);
		_nuxt.options.css.push(shikiStylesPath);
		_nuxt.options.css.push(componentsPath);

		// 钩子：检查 markdown 文件是否用到 MDC 语法
		_nuxt.hook("pages:extend", () => {
			if (_options.mdc) {
				_nuxt.options.runtimeConfig.public.mdcEnabled = true;
			}
		});
	},
});
