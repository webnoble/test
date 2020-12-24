<template>
  <div class="body-content">
    <HeadMenu title="云平台" :smalltitle="smalltitle" :btnarr="btnarr" @getEvent="judgeEvent" />
    <v-table
      ref="table"
      :field-arr="fieldArr"
      :table-setting.sync="tableSetting"
      :show-check-box="true"
      class="tab_body"
      @edit="edit"
      @delete="deleteItem"
      @selection-change="handleSelectionChange"
    />
    <el-dialog
      title="云平台"
      :visible.sync="dialogVisible"
      custom-class="addHandleWidth"
      :before-close="resetForm"
    >
      <el-form :model="ruleForm" label-position="right" label-width="100px">
        <el-row class="inlineSelect" :gutter="50">
          <el-col :span="12">
            <el-form-item label="云平台名称:">
              <el-input v-model="ruleForm.meName" placeholder="云平台名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采集网关:">
              <el-select v-model="ruleForm.gatewayId">
                <el-option
                  v-for="(item,index) in gatewayIdAndName"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接入平台:">
              <el-input v-model="ruleForm.accessCloud" placeholder="接入平台名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在区域:">
              <el-select v-model="ruleForm.areaId">
                <el-option
                  v-for="(item,index) in area"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在服务器:">
              <el-input v-model="serverObj.linkName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="云平台描述:">
              <el-input v-model="ruleForm.comments" type="textarea" placeholder="云平台描述" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="resetForm">关 闭</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnarr: [
        { id: '1', value: '新增', eventName: 'addHandle', type: 'primary' },
        { id: '3', value: '删除', eventName: 'deleteHandle', type: 'warning' }
      ],
      smalltitle: { name: '监控列表', path: '/cloud' },
      dialogVisible: false,
      tableSetting: {
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
            rules: [
              {
                field: 'meTypeGroupId',
                op: 'eq',
                data: '1003'
              }
            ]
          }
        },
        apiUrl: '/cmMe/list'
      },
      ruleForm: {
        meTypeGroupId: '1003',
        meName: '',
        meTypeId: '',
        meId: '',
        linkId: '',
        gatewayId: '',
        location: '',
        areaId: '',
        comments: ''
      },
      // 选中数据ID
      ids: []
    };
  },
  computed: {
    deviceType: function() {
      return this.$store.getters['layout/deviceType']('1003');
    },
    gatewayIdAndName: function() {
      return this.$store.getters['layout/gatewayIdAndName'];
    },
    serverList: function() {
      return this.$store.getters['layout/serverList'];
    },
    gatewayIdAndMeIdAndName: function() {
      const id = this.ruleForm.gatewayId;
      return this.$store.getters['layout/gatewayIdAndMeIdAndName'](id);
    },
    serverObj: function () {
      const meId = this.ruleForm.meId;
      return this.$store.getters['layout/serverObj'](meId);
    },
    area: function() {
      return this.$store.getters['layout/area'];
    },
    fieldArr: function() {
      const arr = [
        {
          label: '云平台名称',
          key: 'meName'
        },
        {
          label: '采集网关',
          key: 'gatewayName',
          filters: this.gatewayIdAndName
        },
        {
          label: '接入平台',
          key: 'meAlias',
          width: '200'
        },
        {
          label: '所在区域',
          key: 'areaId',
          formatter: this.area,
          filters: this.area
        },
        {
          label: '所在服务器',
          key: 'linkMeName'
        },
        {
          label: '云平台描述',
          key: 'comments'
        },
        {
          label: '操作',
          key: 'operation',
          needTemp: true,
          width: '230',
          buttons: [
            {
              label: '编辑',
              type: 'button',
              method: 'edit',
              colorType: 'edit'
            },
            {
              label: '删除',
              type: 'button',
              method: 'delete',
              colorType: 'delete'
            }
          ]
        }
      ];
      return arr;
    }
  },
  created() {},
  methods: {
    onSubmit() {
      this.ruleForm.linkId = this.serverObj.linkId;
      if (!this.ruleForm.id) {
        this.$request.post('/cmMe/addMe', this.ruleForm).then(() => {
          this.$refs.table.getList();
          this.resetForm();
        });
      } else {
        this.$request.post('/cmMe/updateMe', this.ruleForm).then(() => {
          this.$refs.table.getList();
          this.resetForm();
        });
      }
    },
    resetForm() {
      this.dialogVisible = false;
      this.ruleForm = {
        name: '',
        collecting: '',
        area: '',
        des: ''
      };
    },
    add() {
      this.dialogVisible = true;
    },
    edit(data) {
      this.dialogVisible = true;
      this.ruleForm = data;
    },
    deleteItem(data) {
      const deleteIds = [];
      deleteIds.push(data.id);
      this.$refs.table.deleteItem(deleteIds);
    },
    remove() {
      this.$refs.table.deleteItem(this.ids);
    },
    handleSelectionChange(data) {
      this.chooseData = data;
      data.forEach(item => {
        this.ids.push(item.id);
      });
    },
    judgeEvent(event) {
      if (event === 'addHandle') {
        this.addHandle();
      } else if (event === 'importHandle') {
        this.importHandle();
      } else if (event === 'deleteHandle') {
        this.deleteHandle();
      }
    },
    addHandle() {
      this.dialogVisible = true;
    },
    importHandle() {
      console.log('我是批量导入事件');
    },
    deleteHandle() {
      this.remove();
    }
  }
};
</script>

<style scoped>
</style>
