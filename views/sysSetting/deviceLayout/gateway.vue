<template>
  <div>
    <HeadMenu title="网关配置" :btnarr="btnarr" @getEvent="judgeEvent" />
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
      title="网关配置"
      :visible.sync="dialogVisible"
      custom-class="addHandleWidth"
      :before-close="resetForm"
    >
      <el-form :model="ruleForm" label-position="right" label-width="100px">
        <el-form-item label="采集网关名称:">
          <el-input v-model="ruleForm.gatewayName" placeholder="网关名称" />
        </el-form-item>
        <el-row class="inlineSelect" :gutter="50">
          <el-col :span="12">
            <el-form-item label="采集源:">
              <el-select v-model="ruleForm.gatewayId">
                <el-option
                  v-for="(item,index) in collectorSource"
                  :key="index"
                  :label="item.text"
                  :value="item.value"
                ></el-option>
              </el-select>
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
        </el-row>
        <el-form-item label="网关描述:">
          <el-input v-model="ruleForm.comments" type="textarea" placeholder="网关名称" />
        </el-form-item>
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
      btnarr: [
        { id: '1', value: '新增', eventName: 'addHandle' },
        { id: '2', value: '删除', eventName: 'deleteHandle' }
      ],
      showCheckBox: true,
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
            rules: []
          }
        },
        apiUrl: 'cmGateway',
        socket: {
          url: 'http://localhost:9999/echo',
          subscribe: 'data',
          tagName: 'id'
        }
      },
      ruleForm: {
        areaId: '',
        comments: '',
        gatewayId: '',
        gatewayName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入采集网关名称', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        collecting: [
          { required: true, message: '请输入采集源', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ],
        area: [{ required: true, message: '请选择所在区域', trigger: 'blur' }],
        desc: [{ message: '请输入网关描述', trigger: 'blur' }]
      },
      // 选中数据ID
      ids: []
    };
  },
  computed: {
    collectorSource: function () {
      return this.$store.getters['layout/collectorSource']
    },
    area: function () {
      return this.$store.getters['layout/area'];
    },
    areaName: function () {
      const gatewayId = this.ruleForm.gatewayId;
      const area = this.$store.getters['layout/getarea'](gatewayId);
      this.ruleForm.areaId = area ? area.areaId : '';
      return area ? area.areaName : ''
    },
    fieldArr: function () {
      const arr = [
        {
          label: '采集网关名称',
          key: 'gatewayName'
        },
        {
          label: '采集源',
          key: 'gatewayId',
          formatter: this.collectorSource
        },
        {
          label: '所在区域',
          key: 'areaId',
          formatter: this.area,
          filters: this.area
        },
        {
          label: '网关描述',
          key: 'comments',
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
              method: 'edit'
            },
            {
              label: '删除',
              type: 'button',
              method: 'delete'
            }
          ]
        }
      ];
      return arr;
    }
  },
  created () {
    console.log(this.area)
  },
  methods: {
    onSubmit () {
      if (this.ruleForm.id) {
        this.$refs.table.update(this.ruleForm).then(() => {
          this.resetForm();
        });
      } else {
        this.$refs.table.add(this.ruleForm).then(() => {
          this.resetForm();
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
      this.ruleForm = JSON.parse(JSON.stringify(data));
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
    judgeEvent (val) {
      if (val === 'addHandle') {
        this.dialogVisible = true;
      }
      if (val === 'deleteHandle') {
        this.remove();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
