'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    const options = typeof script === 'function' ? script.options : script;
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        hook = function(context) {
            context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        options._ssrRegister = hook;
    } else if (style) {
        hook = shadowMode ? function(context) {
            style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
            style.call(this, createInjector(context));
        };
    }
    if (hook) {
        if (options.functional) {
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        } else {
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [ hook ];
        }
    }
    return script;
}

var __vue_inject_styles__ = undefined;

var __vue_scope_id__ = undefined;

var __vue_module_identifier__ = undefined;

var __vue_is_functional_template__ = undefined;

var __vue_component__ = normalizeComponent({}, __vue_inject_styles__, {}, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

exports.default = __vue_component__;
//# sourceMappingURL=three-dimensional-slider.cjs.js.map
