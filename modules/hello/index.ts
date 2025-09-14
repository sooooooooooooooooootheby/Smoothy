// modules/my-module/src/module.ts
import { defineNuxtModule, createResolver, addComponentsDir, addPlugin } from "@nuxt/kit";

export default defineNuxtModule({
	meta: {
		name: "my-module",
		configKey: "myModule",
	},
	defaults: {},
	setup(_, nuxt) {
		// 解析 runtime 路径（相对于当前文件）
		const resolver = createResolver(import.meta.url);
		const runtimeDir = resolver.resolve("./runtime");
		const runtimeStylesPath = resolver.resolve("./runtime/styles/content-enhancer.css");

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
	},
});
