<template>
  <div class="body-content">
    <HeadMenu
      title="云平台监控列表"
      :search="true"
      :btnarr="btnarr"
      @getValue="searchKey"
      @getEvent="judgeEvent"
    />
    <v-table :field-arr="cloudArr" :table-setting.sync="cloudSetting" class="tab_body" @edit="edit" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      getters: 'monitor/cloud/list',
      // 分页列表
      listQuery: {
        total: 36,
        page: 1,
        limit: 10
      },
      btnarr: [
        {
          id: '1',
          value: ' 管理云平台',
          eventName: 'manageHandle',
          type: 'info'
        }
      ],
      cloudSetting: {
        pagination: {
          show: true,
          rowsPerPage: [10, 20, 30]
        },
        param: {
          page: 1,
          rows: 10,
          sord: 'desc',
          _search: false,
          filters: {
            groupOp: 'AND',
            rules: []
          }
        },
        // 避免演示报错
        // apiUrl: '/cloud/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        },
        isPoll: true,
        pollTime: 300000
      }
    };
  },
  computed: {
    cloudArr: function () {
      return [
        {
          label: '序号',
          key: 'id',
          formatter: ''
        },
        {
          label: '主机信息',
          key: 'name',
          formatter: '',
          width: '140'
        },
        {
          label: '所在区域',
          key: 'area',
          filters: [
            { value: '1', text: '锦江监狱' },
            { value: '2', text: '邑州监狱' },
            { value: '3', text: '川西监狱' },
            { value: '4', text: '川北监狱' },
            { value: '5', text: '乐山监狱' }
          ]
        },
        {
          label: '运行状态',
          key: 'state',
          formatter: [
            {
              key: 1,
              label: '正常',
              color: '#15B000',
              className: 'iconicon_successfully',
              iconColor: '#15B000'
            },
            {
              key: 2,
              label: '异常',
              color: '#f00',
              className: 'iconicon_error-triangle',
              iconColor: '#f00'
            },
            {
              key: 3,
              label: '断连',
              color: '#999999',
              className: 'iconicon_power_failure',
              iconColor: '#626262'
            }
          ],
          filters: [
            { text: '正常', value: '1' },
            { text: '异常', value: '2' },
            { text: '断连', value: '3' }
          ]
        },
        {
          label: '虚拟机',
          key: 'vma'
        },
        {
          label: '磁盘',
          key: 'diskUsed',
          formatter: '(diskUsed)G/(allDisk)TB'
        },
        {
          label: '内存',
          key: 'momeryUsed',
          formatter: '(momeryUsed)G/(allMomery)TB'
        },
        {
          label: '网卡流量',
          key: 'flow',
          formatter: '(flow)kb/s'
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          width: '200',
          buttons: [
            {
              label: '查看详情',
              type: 'url',
              path: '/cloud_detail',
              query: ['id', 'name'],
              colorType: 'tableBlue'
            }
          ]
        }
      ];
    }
  },
  created () {
    this.$store.dispatch('monitor/cloud/getList');
  },
  methods: {
    searchKey (val) {
      console.log(val);
    },
    judgeEvent (val) {
      if (val === 'manageHandle') {
        this.$router.push('/cloudManage');
      }
    },
    edit (data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>
</style>
