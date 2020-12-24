<template>
  <div class="body-content">
    <HeadMenu title="操作系统和数据库" :smalltitle="smalltitle" :btnarr="btnarr" @getEvent="judgeEvent" />
    <el-tabs v-model="activeName" type="card" class="tab_body" @tab-click="handleClick">
      <el-tab-pane label="操作系统" name="first">
        <v-table
          ref="table"
          :field-arr="fieldArr"
          :table-setting.sync="tableSetting"
          :show-check-box="true"
          class="pdNone"
          @edit="edit"
          @delete="deleteItem"
          @selection-change="handleSelectionChange"
        />
      </el-tab-pane>
      <el-tab-pane label="数据库" name="second">
        <v-table
          ref="table2"
          :field-arr="databaseArr"
          :table-setting.sync="tableSetting2"
          :show-check-box="true"
          class="pdNone"
          @edit="edit2"
          @delete="deleteItem2"
          @selection-change="handleSelectionChange2"
        />
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="changeType"
      :visible.sync="dialogVisible"
      custom-class="addHandleWidth"
      :before-close="resetForm"
    >
      <el-form :model="ruleForm" label-position="right" label-width="100px">
        <el-row v-if="!isEdit" class="inlineSelect" :gutter="50">
          <el-col :span="24">
            <el-form-item label="请选择类型:">
              <el-select v-model="changeType" @change="selectChange">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row v-if="changeType ==='操作系统'" class="inlineSelect" :gutter="50">
          <el-col :span="12">
            <el-form-item label="系统类型:">
              <el-select v-model="ruleForm.meTypeId">
                <el-option
                  v-for="(item,index) in deviceType"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
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
            <el-form-item label="接入系统:">
              <el-select v-model="ruleForm.meId" @change="chooseDevice">
                <el-option
                  v-for="(item,index) in gatewayIdAndMeIdAndName"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作系统名称:">
              <el-input v-model="ruleForm.meName" placeholder="操作系统名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在区域:">
              <el-input v-model="areaName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在服务器:">
              <el-input v-model="serverObj.linkName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作系统描述:">
              <el-input v-model="ruleForm.comments" type="textarea" placeholder="操作系统描述" />
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row class="inlineSelect" :gutter="50">
          <el-col :span="12">
            <el-form-item :label="changeType + '类型:'">
              <el-select v-model="ruleForm.meTypeId">
                <el-option
                  v-for="(item,index) in deviceType"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
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
            <el-form-item :label="'接入' + changeType + ':'">
              <el-select v-model="ruleForm.meId" @change="chooseDevice">
                <el-option
                  v-for="(item,index) in gatewayIdAndMeIdAndName"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="changeType + '名称:'">
              <el-input v-model="ruleForm.meName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在区域:">
              <el-input v-model="areaName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所在服务器:">
              <el-input v-model="serverObj.linkName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="changeType + '描述:'">
              <el-input v-model="ruleForm.comments" type="textarea" placeholder="数据库描述" />
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
  data () {
    return {
      activeName: 'first',
      btnarr: [
        { id: '1', value: '新增', eventName: 'addHandle', type: 'primary' },
        { id: '2', value: '删除', eventName: 'deleteHandle', type: 'warning' }
      ],
      smalltitle: { name: '监控列表', path: '/system' },
      dialogVisible: false,
      dialogVisible2: false,
      // 判断是否为编辑事件
      isEdit: false,
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
                data: '1005'
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
      tableSetting2: {
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
                data: '1006'
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
      options: [{
        value: '操作系统',
        label: '操作系统'
      }, {
        value: '数据库',
        label: '数据库'
      }],
      changeType: '操作系统',
      ruleForm: {
        meTypeGroupId: '1005',
        meName: '',
        meTypeId: '',
        meId: '',
        linkId: '',
        gatewayId: '',
        location: '',
        areaId: '',
        comments: ''
      },
      // ruleForm2: {
      //   meTypeGroupId: '1006',
      //   meName: '',
      //   meTypeId: '',
      //   meId: '',
      //   linkId: '',
      //   gatewayId: '',
      //   location: '',
      //   areaId: '',
      //   comments: ''
      // },
      // 选中数据ID
      ids: [],
      ids2: []
    };
  },
  computed: {
    deviceType: function () {
      if (this.changeType === '操作系统') {
        return this.$store.getters['layout/deviceType']('1005');
      } else {
        return this.$store.getters['layout/deviceType']('1006');
      }
    },
    // deviceType2: function () {
    //   return this.$store.getters['layout/deviceType']('1006');
    // },
    gatewayIdAndName: function () {
      const id = this.ruleForm.meTypeId;
      return this.$store.getters['layout/gatewayIdAndName'](id);
    },
    // gatewayIdAndName2: function () {
    //   const id = this.ruleForm2.meTypeId;
    //   // console.log(this.$store.getters['layout/gatewayIdAndName'](id))
    //   return this.$store.getters['layout/gatewayIdAndName'](id);
    // },
    allGateway: function () {
      if (this.changeType === '操作系统') {
        return this.$store.getters['layout/allGateway']('1005');
      } else {
        return this.$store.getters['layout/allGateway']('1006');
      }
    },
    // allGateway2: function () {
    //   return this.$store.getters['layout/allGateway']('1006');
    // },
    gatewayIdAndMeIdAndName: function () {
      const gatewayId = this.ruleForm.gatewayId;
      const meTypeId = this.ruleForm.meTypeId;
      return this.$store.getters['layout/gatewayIdAndMeIdAndName'](meTypeId, gatewayId);
    },
    // gatewayIdAndMeIdAndName2: function () {
    //   const gatewayId = this.ruleForm2.gatewayId;
    //   const meTypeId = this.ruleForm2.meTypeId;
    //   return this.$store.getters['layout/gatewayIdAndMeIdAndName'](meTypeId, gatewayId);
    // },
    area: function () {
      return this.$store.getters['layout/area'];
    },
    areaName: function () {
      const gatewayId = this.ruleForm.gatewayId;
      const area = this.$store.getters['layout/getarea'](gatewayId);
      this.ruleForm.areaId = area ? area.areaId : '';
      return area ? area.areaName : ''
    },
    // areaName2: function () {
    //   const gatewayId = this.ruleForm2.gatewayId;
    //   const area = this.$store.getters['layout/getarea'](gatewayId);
    //   this.ruleForm2.areaId = area ? area.areaId : '';
    //   return area ? area.areaName : ''
    // },
    serverObj: function () {
      const meId = this.ruleForm.meId;
      if (meId) {
        return this.$store.getters['layout/serverObj'](meId);
      } else {
        return ''
      }
    },
    // serverObj2: function () {
    //   const meId = this.ruleForm2.meId;
    //   if (meId) {
    //     return this.$store.getters['layout/serverObj'](meId);
    //   } else {
    //     return ''
    //   }
    //   // return this.$store.getters['layout/serverObj'][meId];
    // },
    fieldArr: function () {
      return [
        {
          label: '操作系统名称',
          key: 'meName',
          formatter: ''
        },
        {
          label: '系统类型',
          key: 'meTypeName',
          filters: this.deviceType
        },
        {
          label: '采集网关',
          key: 'gatewayId',
          formatter: this.allGateway,
          filters: this.allGateway
        },
        {
          label: '接入系统',
          key: 'meAlias'
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
    },
    databaseArr: function () {
      return [
        {
          label: '数据库名称',
          key: 'meName'
        },
        {
          label: '数据库类型',
          key: 'meTypeName',
          filters: this.deviceType
        },
        {
          label: '采集网关',
          key: 'gatewayId',
          formatter: this.allGateway,
          filters: this.allGateway
        },
        {
          label: '接入数据库',
          key: 'meAlias',
          width: '210'
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
    }
  },
  created () { },
  methods: {
    handleClick () { },
    selectChange (val) {
      if (this.changeType === '操作系统') {
        this.ruleForm = {
          meTypeGroupId: '1005',
          meName: '',
          meTypeId: '',
          meId: '',
          linkId: '',
          gatewayId: '',
          location: '',
          areaId: '',
          comments: ''
        }
      } else {
        this.ruleForm = {
          meTypeGroupId: '1006',
          meName: '',
          meTypeId: '',
          meId: '',
          linkId: '',
          gatewayId: '',
          location: '',
          areaId: '',
          comments: ''
        }
      }
    },
    chooseDevice (data) {
      this.gatewayIdAndMeIdAndName.forEach((item) => {
        if (item.value === data) {
          this.ruleForm.meName = item.text;
        }
      })
    },
    // chooseDevice2 (data) {
    //   this.gatewayIdAndMeIdAndName2.forEach((item) => {
    //     if (item.value === data) {
    //       this.ruleForm2.meName = item.text;
    //     }
    //   })
    // },
    onSubmit () {
      this.ruleForm.linkId = this.serverObj.linkId;
      if (this.changeType === '操作系统') {
        this.ruleForm.meTypeGroupId = '1005';
      } else {
        this.ruleForm.meTypeGroupId = '1006';
      }
      if (!this.ruleForm.id) {
        this.$request.post('/cmMe/addMe', this.ruleForm).then(() => {
          if (this.changeType === '操作系统') {
            this.$refs.table.getList();
          } else {
            this.$refs.table2.getList();
          }
          this.resetForm();
        });
      } else {
        this.$request.post('/cmMe/updateMe', this.ruleForm).then(() => {
          if (this.changeType === '操作系统') {
            this.$refs.table.getList();
          } else {
            this.$refs.table2.getList();
          }
          this.resetForm();
        });
      }
    },
    // onSubmit2 () {
    //   this.ruleForm2.linkId = this.serverObj2.linkId;
    //   if (!this.ruleForm2.id) {
    //     this.$request.post('/cmMe/addMe', this.ruleForm2).then(() => {
    //       this.$refs.table2.getList();
    //       this.resetForm2();
    //     });
    //   } else {
    //     this.$request.post('/cmMe/updateMe', this.ruleForm2).then(() => {
    //       this.$refs.table2.getList();
    //       this.resetForm2();
    //     });
    //   }
    // },
    resetForm () {
      this.dialogVisible = false;
      this.ruleForm = {
        meTypeGroupId: '1005',
        meName: '',
        meTypeId: '',
        meId: '',
        linkId: '',
        gatewayId: '',
        location: '',
        areaId: '',
        comments: ''
      };
    },
    // resetForm2 () {
    //   this.dialogVisible2 = false;
    //   this.ruleForm2 = {
    //     meTypeGroupId: '1006',
    //     meName: '',
    //     meTypeId: '',
    //     meId: '',
    //     linkId: '',
    //     gatewayId: '',
    //     location: '',
    //     areaId: '',
    //     comments: ''
    //   };
    // },
    // add () {
    //   this.dialogVisible = true;
    // },
    // add2 () {
    //   this.dialogVisible = true;
    // },
    edit (data) {
      this.changeType = '操作系统';
      this.isEdit = true;
      this.dialogVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(data));
    },
    edit2 (data) {
      this.changeType = '数据库';
      this.isEdit = true;
      this.dialogVisible = true;
      this.ruleForm = JSON.parse(JSON.stringify(data));
    },
    deleteItem (data) {
      const deleteIds = [];
      deleteIds.push(data.id);
      this.$refs.table.deleteItem(deleteIds);
    },
    deleteItem2 (data) {
      console.log(data);
      const deleteIds = [];
      deleteIds.push(data.id);
      this.$refs.table2.deleteItem(deleteIds);
    },
    remove () {
      this.$refs.table.deleteItem(this.ids);
    },
    remove2 () {
      this.$refs.table2.deleteItem(this.ids2);
    },
    handleSelectionChange (data) {
      this.chooseData = data;
      data.forEach(item => {
        this.ids.push(item.id);
      });
    },
    handleSelectionChange2 (data) {
      this.chooseData2 = data;
      data.forEach(item => {
        this.ids2.push(item.id);
      });
    },
    judgeEvent (event) {
      if (event === 'addHandle') {
        this.addHandle();
      } else if (event === 'deleteHandle' && this.activeName === 'first') {
        this.deleteHandle();
      } else if (event === 'addHandle' && this.activeName === 'second') {
        this.addHandle2();
      } else if (event === 'deleteHandle' && this.activeName === 'second') {
        this.deleteHandle2();
      }
    },
    addHandle () {
      this.isEdit = false;
      this.dialogVisible = true;
    },
    deleteHandle () {
      this.remove();
    },
    deleteHandle2 () {
      this.remove2();
    }
  }
};
</script>

<style lang="scss" scoped>
.tab_body {
  padding: 17px 12px;
  background-color: #fff;
  .pdNone {
    padding: 0 !important;
  }
}
</style>
