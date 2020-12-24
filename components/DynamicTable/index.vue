<template>
  <div class="dynamicTable">
    <el-table v-infinite-scroll="load" :data="tableData" :max-height="height" border @selection-change="handleSelectionChange">
      <el-table-column v-if="showCheckBox" type="selection" width="55" label="全选" />
      <el-table-column
        v-for="(item,index) in fieldArr"
        :key="index"
        :prop="item.key"
        :width="item.width"
      >
        <template slot="header">
          <filtersDrop :item="item" />
          <!-- <span>{{ item.label }}</span>
          <span v-if="item.filters" class="arrow_triangle-down" />-->
        </template>
        <template slot-scope="scope">
          <div v-if="item.key=='operation'">
            <el-button
              v-for="(i,k) in item.buttons"
              :key="k"
              type="text"
              :class="setClass(i.colorType)"
              @click="handleClick(i,scope.row)"
            >{{ i.label }}</el-button>
          </div>
          <div v-else-if="item.formatter">
            <div v-format="[scope.row[item.key],item.formatter,scope.row,themeGroup]"></div>
          </div>
          <div v-else>{{ scope.row[item.key] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination
      v-show="listQuery.total>0 && listQuery.total/listQuery.limit > 1"
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="pagination"
    /> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import filtersDrop from './filter'
import { dateFormat } from '../../utils/date-format'
function format (el, bingind, vnode) {
  const key = bingind.value[0];
  const arr = bingind.value[1];
  const data = bingind.value[2];
  const themeGroup = bingind.value[3];
  // const value = getValue(data, key);
  // console.log(key);
  if (typeof arr === 'string') {
    const reg = /[^\(\)]+(?=\))/g;
    const arrName = arr.match(reg);
    let str = arr;
    arrName.forEach((item) => {
      str = str.replace(`(${item})`, data[item])
    })
    el.innerHTML = `<span>${str}</span>`
  } else if (arr.type === 'time') {
    const time = dateFormat(
      'yyyy-MM-dd hh:mm:ss', new Date(key - 0)
    );
    el.innerHTML = `<span title="${time}">${time}</span>`;
  } else {
    const obj = arr.find((item) => { return item.key === key });
    const color = obj.color ? themeGroup[obj.color] : themeGroup.tableFontColor;
    const className = obj.className;
    const iconColor = obj.iconColor ? themeGroup[obj.iconColor] : themeGroup.tableFontColor;
    el.innerHTML = `<span style="color:${color};"><i class="iconfont ${className}" style="color:${iconColor};position:relative;top:-1px;margin:-2px 6px 0 0;font-size:12px;${className ? '' : 'display:none;'}"></i >${obj.label}</span>`
  }
}
export default {
  directives: {
    format: {
      inserted: function (el, bingind, vnode) {
        format(el, bingind, vnode)
      },
      bind: function () {
      },
      update: function (el, bingind, vnode) {
        if (JSON.stringify(bingind.oldValue) !== JSON.stringify(bingind.value)) {
          format(el, bingind, vnode)
        }
      },
      componentUpdated: function (el, bingind, vnode) {
      },
      unbind: function () {
      }
    }
  },
  components: {
    filtersDrop
  },
  props: {
    getters: {
      type: String,
      default: ''
    },
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showCheckBox: {
      type: Boolean,
      default: false
    },
    fieldArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 分页列表
      listQuery: {
        total: 9,
        page: 1,
        limit: 10
      },
      count: 0
    }
  },
  computed: {
    ...mapGetters({
      'themeGroup': 'themeGroup'
    })
    // 注释原因： 方便在详情页可以直接传递值过来进行显示
    // tableData: function () {
    //   return this.$store.getters[this.getters]
    // }
  },
  methods: {
    load () {
      this.count += 2
    },
    setClass (item) {
      const obj = {};
      obj[item] = true;
      return obj;
    },
    handleClick (i, data) {
      if (i.type === 'url') {
        const query = {};
        i.query.forEach((item) => {
          query[item] = data[item]
        })
        this.$router.push({ path: i.path, query: query })
      }
      if (i.type === 'button') {
        this.$emit(i.method, data)
      }
    },
    filterTag () {
      console.log(1)
    },
    handleSelectionChange () {

    },
    pagination (val) {
      this.listQuery.page = val.page;
      this.listQuery.limit = val.limit;
    }
  }
}
</script>
<style lang="scss" scope>
.dynamicTable {
  .el-table--medium th {
    padding: 0;
    background-color: #e8ebf3;
  }
  .el-table th.gutter {
    display: table-cell !important;
  }
  .el-table th > .cell {
    padding: 0 !important;
  }
  .el-table thead {
    color: #25243e;
    background-color: #e8ebf3;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-color: #dedfe3;
    text-align: center;
  }
  .edit {
    color: #7f83d8;
  }
  .delete {
    color: #fe9c02;
  }
  .tableBlue {
    color: #7f83d8;
  }
  .stop {
    color: #ff0000;
  }
}
</style>
