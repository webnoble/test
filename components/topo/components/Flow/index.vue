<template>
  <div></div>
</template>

<script>
import customNode from './customNode';
import customEdge from './customEdge';
import customCombo from './customCombo';
import teamNode from './teamNode'
export default {
  name: 'Flow',
  props: {
    mode: {
      type: String,
      default: () => {
        return 'view'
      }
    },
    imageTypes: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      page: null
    };
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      customNode.init(this.mode, this.imageTypes);
      customEdge.init();
      customCombo.init();
      teamNode.init();
    }
  }
};
</script>
