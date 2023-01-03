import Vue from 'vue'
Vue.directive('imgerror', {
  inserted(el, binding) {
    if (!el.src) {
      el.src = binding.value
    }
    el.onerror = function() {
      this.src = binding.value
    }
  },
  update(el, binding) {
    if (!el.src) {
      el.src = binding.value
    }
  }
})
