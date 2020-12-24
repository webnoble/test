<template>
  <G6Editor
    :mode="'edit'"
    :data="topo"
    :name="topoName"
    :edit-node-item="nodeItem"
    :image-types="imageTypes"
    :globe-param="globeParam"
    @save="save"
  />
</template>
<script>
import G6Editor from '@/components/topo';
import { Message } from 'element-ui';
import { pack, unPack } from '@/utils/parse.js';
import { getTopoDetail, getImageTypeList, updateTopo } from '@/api/topo';

export default {
  name: 'EditTopo',
  components: {
    G6Editor
  },
  data () {
    return {
      topo: null,
      nodeItem: null, // 图元类型
      topoId: '',
      topoName: '',
      originTopo: null,
      globeParam: {
        areaId: ''
      }
    }
  },
  computed: {
    imageTypes () {
      return this.$store.getters.imageTypes;
    }
  },
  created () {
    this.topoId = this.$route.query.id;
    this.topoName = this.$route.query.name;
    getImageTypeList(this.$route.query.topoTypeId).then((resp) => {
      this.nodeItem = resp;
    });
    getTopoDetail(this.topoId).then((topoData) => {
      this.globeParam.areaId = topoData.areaId;
      this.originTopo = topoData;
      const temp = unPack(topoData, 'edit');
      this.topo = ((temp.nodes && temp.nodes.length > 0) || (temp.groups && temp.groups.length > 0) || (temp.combos && temp.combos.length > 0)) ? temp : {
        nodes: [],
        edges: [],
        combos: [],
        groups: []
      };
    });
    if (this.$store.getters.topological) {
      const temp = unPack(this.$store.getters.topological, 'edit');
      this.topo = ((temp.nodes && temp.nodes.length > 0) || (temp.groups && temp.groups.length > 0) || (temp.combos && temp.combos.length > 0)) ? temp : {
        nodes: [],
        edges: [],
        combos: [],
        groups: []
      };
    }
  },
  methods: {
    save (data) {
      data = pack(data);
      const temp = { ...this.originTopo, ...data };
      updateTopo(temp).then(() => {
        Message.success('保存成功');
      }).finally(() => {
        this.$router.push({
          path: 'edit_topo'
        });
      });
    }
  }
}
</script>
<style scoped lang="scss">
</style>
