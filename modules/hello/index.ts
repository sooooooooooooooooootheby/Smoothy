import { defineNuxtModule, createResolver, addComponentsDir, addPlugin } from "@nuxt/kit";

export default defineNuxtModule({
	meta: {
		name: "my-module",
		configKey: "myModule",
	},
	defaults: {
		mdc: true,
	},
	setup(options, nuxt) {
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
		nuxt.options.css = nuxt.options.css || [];
		nuxt.options.css.push(runtimeStylesPath);
		nuxt.options.css.push(shikiStylesPath);
		nuxt.options.css.push(componentsPath);

		// 钩子：检查 markdown 文件是否用到 MDC 语法
		nuxt.hook("pages:extend", (pages) => {
			if (options.mdc) {
				nuxt.options.runtimeConfig.public.mdcEnabled = true;
			}
		});
	},
});
