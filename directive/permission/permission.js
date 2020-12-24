export default {
  inserted (el, binding, vnode) {
    const { type, permission } = binding.value;

    if (type && typeof type === 'string' && permission && permission instanceof Array && permission.length > 0) {
      const hasPermission = permission.some(p => {
        return p === type
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`v-permission="{type: 'delete', permission: $route.meta.permission}"`);
    }
  }
};
