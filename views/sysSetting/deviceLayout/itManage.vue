<template>
  <div class="body-content">
    <HeadMenu title="IT设备" :smalltitle="smalltitle" :btnarr="btnarr" @getEvent="judgeEvent" />
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
      title="IT设备"
      :visible.sync="dialogVisible"
      custom-class="addHandleWidth"
      :before-close="resetForm"
    >
      <el-form :model="ruleForm" label-position="right" label-width="100px">
        <el-row class="inlineSelect" :gutter="50">
          <el-col :span="12">
            <el-form-item label="设备类型:">
              <el-select v-model="currentType">
                <el-option label="服务器" :value="10000"></el-option>
                <el-option label="交换机" :value="20000"></el-option>
                <!-- <el-option label="防火墙" value="防火墙"></el-option>
                <el-option label="存储" value="存储"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <addServer v-show="currentType === 10000" ref="server" />
        <addSwitch v-show="currentType === 20000" ref="switch" />
        <addFirewall v-if="currentType === '防火墙'" />
        <addStorage v-if="currentType === '存储'" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="resetForm">关 闭</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addServer from './itDialog/addServer';
import addSwitch from './itDialog/addSwitch';
import addStorage from './itDialog/addStorage';
import addFirewall from './itDialog/addFirewall';
export default {
  components: {
    addServer,
    addSwitch,
    addStorage,
    addFirewall
  },
  data () {
    return {
      btnarr: [
        { id: '1', value: '新增', eventName: 'addHandle', type: 'primary' },
        { id: '2', value: '删除', eventName: 'deleteHandle', type: 'warning' }
      ],
      smalltitle: { name: '监控列表', path: '/it' },
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
                data: '1001'
              }
            ]
          }
        },
        apiUrl: '/cmMe/list',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        }
      },
      ruleForm: {
        name: '',
        type: '',
        gateway: '',
        accessEquipment: '',
        area: '',
        location: '',
        des: ''
      },
      // 选中数据ID
      ids: [],
      currentType: 10000
    };
  },
  computed: {
    deviceType: function () {
      return this.$store.getters['layout/deviceType']('1001');
    },
    gatewayIdAndName: function () {
      const id = this.ruleForm.meTypeId;
      return this.$store.getters['layout/gatewayIdAndName'](id);
    },
    allGateway: function () {
      return this.$store.getters['layout/allGateway']('1002');
    },
    serverList: function () {
      return this.$store.getters['layout/serverList'];
    },
    gatewayIdAndMeIdAndName: function () {
      const id = this.ruleForm.gatewayId;
      return this.$store.getters['layout/gatewayIdAndMeIdAndName'](id);
    },
    area: function () {
      return this.$store.getters['layout/area'];
    },
    fieldArr: function () {
      const arr = [
        {
          label: '设备名称',
          key: 'meName',
          formatter: ''
        },
        {
          label: '设备类型',
          key: 'meTypeId',
          formatter: this.deviceType,
          filters: this.deviceType
        },
        {
          label: '采集网关',
          key: 'gatewayId',
          formatter: this.allGateway,
          filters: this.allGateway
        },
        {
          label: '接入设备',
          key: 'meAlias',
          formatter: ''
        },
        {
          label: '所在区域',
          key: 'areaId',
          formatter: this.area,
          filters: this.area
        },
        {
          label: '所在位置',
          key: 'location',
          formatter: ''
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
  created () { },
  methods: {
    changeType (val) {
      this.currentType = val;
    },
    onSubmit () {
      let form;
      if (this.currentType === 10000) {
        form = this.$refs.server;
      }
      if (this.currentType === 20000) {
        form = this.$refs.switch;
      }
      if (!form.ruleForm.id) {
        this.$request.post('/cmMe/addMe', form.ruleForm).then(() => {
          this.$refs.table.getList();
          form.resetForm();
          this.dialogVisible = false;
        });
      } else {
        this.$request.post('/cmMe/updateMe', form.ruleForm).then(() => {
          this.$refs.table.getList();
          form.resetForm();
          this.dialogVisible = false;
        });
      }
    },
    resetForm () {
      this.dialogVisible = false;
      this.ruleForm = {
        name: '',
        collecting: '',
        area: '',
        des: ''
      };
    },
    add () {
      this.dialogVisible = true;
    },
    edit (data) {
      this.dialogVisible = true;
      this.$nextTick(()=>{
        let form = '';
        if(data.meTypeId === 10000) {
          form = this.$refs.server;
        }
        if(data.meTypeId === 20000) {
          form = this.$refs.switch;
        }
        this.currentType = data.meTypeId;
        form.ruleForm = JSON.parse(JSON.stringify(data));
      })
      
    },
    deleteItem (data) {
      const deleteIds = [];
      deleteIds.push(data.id);
      this.$refs.table.deleteItem(deleteIds);
    },
    remove () {
      this.$refs.table.deleteItem(this.ids);
    },
    handleSelectionChange (data) {
      this.chooseData = data;
      data.forEach(item => {
        this.ids.push(item.id);
      });
    },
    judgeEvent (event) {
      if (event === 'addHandle') {
        this.addHandle();
      } else if (event === 'importHandle') {
        this.importHandle();
      } else if (event === 'deleteHandle') {
        this.deleteHandle();
      }
    },
    addHandle () {
      this.dialogVisible = true;
    },
    importHandle () {
      console.log('我是批量导入事件');
    },
    deleteHandle () {
      this.remove();
    }
  }
};
</script>

<style scoped>
</style>
