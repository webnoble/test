<template>
  <div>
    <div style="padding:10px">
      <el-button @click="dialogVisible = true">添加</el-button>
    </div>
    <el-table :data="list" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="序号" type="index" />
      <el-table-column label="设备名称" prop="mename" />
      <el-table-column label="JIT编译器" prop="jitCompileName" />
      <el-table-column label="管理接口的规范版本" prop="managementSpecVersion" />
      <el-table-column label="虚拟机名称" prop="jvmName" />
      <el-table-column label="虚拟机规范名称" prop="specName" />
      <el-table-column label="虚拟机规范供应商" prop="specVendor" />
      <el-table-column label="虚拟机规范版本" prop="specVersion" />
    </el-table>
    <el-dialog title="添加设备" :visible.sync="dialogVisible" width="30%">
      <span>设备身份别名:</span>
      <el-select v-model="actualId">
        <el-option
          v-for="(item,key) in baseList"
          :key="key"
          :value="item.actualId"
          :label="item.actualName"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <pagination v-if="total" :total="total" :page="page" :limit="limit" @pagination="getList" /> -->
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination';
import request from '@/utils/request';
export default {

  data () {
    return {
      dialogVisible: false,
      list: [],
      baseList: [],
      total: 1,
      actualId: ''
    }
  },
  created () {

  },
  mounted () {
    this.timeRun = window.setInterval(() => {
      this.getData();
      this.getList();
    }, 600000)
    this.getData();
    this.getList();
  },
  destroyed () {
    window.clearInterval(this.timeRun)
  },
  methods: {
    getData () {
      request({
        url: `cmme/list`,
        method: 'get'
      }).then((data) => {
        this.list = data;
        console.log(data)
      })
    },
    getList () {
      request({
        url: `cmme/meBaseList`,
        method: 'get'
      }).then((data) => {
        this.baseList = data;
        console.log(data)
      })
    },
    sure () {
      if (this.actualId) {
        const data = this.baseList.find((item) => { return item.actualId === this.actualId })
        // const params = {
        //   actualID: data.actualId,
        //   actualName: data.actualName,
        //   connectState: data.connectState,
        //   mEId: data.meId,
        //   mEName: data.meModel,
        //   mETypeID: data.meTypeId
        // }
        request({
          url: `cmme/add`,
          method: 'post',
          data: data
        }).then((data) => {
          this.$message({ type: 'success', message: '新增成功' });
          this.dialogVisible = false;
        })
      }
    }
  }
}
</script>
