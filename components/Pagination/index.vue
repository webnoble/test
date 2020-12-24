<template>
  <div :class="{'hidden':total === 0}" class="pagination-container">
    <div class="pagination-btn">
      <i :class="{'iconDisable': page===1}" class="iconfont iconicon_firstPage" @click="firstPage"></i>
      <i
        :class="{'iconDisable': page===1}"
        class="iconfont iconicon_beforePage"
        @click="previousPage"
      ></i>
      <el-input v-model="currentPage" @blur="handleCurrentChange" @input="setOnlyNumber" />
      <span class="totalPage">共{{ totalPage }}页</span>
      <i
        :class="{'iconDisable': page===totalPage}"
        class="iconfont iconicon_afterpage"
        @click="nextPage"
      ></i>
      <i
        :class="{'iconDisable': page===totalPage}"
        class="iconfont iconicon_lastpage"
        @click="lastPage"
      ></i>
    </div>
    <div class="pagination-total">
      <span>每页显示</span>
      <el-select v-model="selectValue" placeholder="请选择" @change="selectHandle">
        <el-option
          v-for="item in pageSizes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span>条，总共{{ total }}条</span>
    </div>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to';

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return [
          { value: 10, label: '10' },
          { value: 20, label: '20' },
          { value: 30, label: '30' },
          { value: 50, label: '50' }
        ];
      }
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1,
      selectValue: this.limit
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.total / this.limit);
    }
  },
  created () {
  },
  methods: {
    setOnlyNumber (val) {
      // 正则表达式，限制输入数字
      this.currentPage = val.replace(/[^\d]/g, '');
    },
    handleCurrentChange () {
      if (parseInt(this.currentPage) > this.totalPage) {
        this.currentPage = this.totalPage;
        this.$emit('pagination', { page: this.currentPage, limit: this.limit });
      } else if (parseInt(this.currentPage) >= 1 && parseInt(this.currentPage) <= this.totalPage) {
        this.$emit('pagination', { page: parseInt(this.currentPage), limit: this.limit });
      } else {
        this.currentPage = 1;
        this.$emit('pagination', { page: this.currentPage, limit: this.limit });
      }
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    firstPage () {
      this.currentPage = 1;
      this.$emit('pagination', { page: 1, limit: this.limit });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    previousPage () {
      this.currentPage = this.page === 1 ? 1 : this.page - 1;
      this.$emit('pagination', { page: this.page === 1 ? 1 : this.page - 1, limit: this.limit });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    nextPage () {
      this.currentPage = this.page === this.totalPage ? this.page : this.page + 1;
      this.$emit('pagination', { page: this.page === this.totalPage ? this.page : this.page + 1, limit: this.limit });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    lastPage () {
      this.currentPage = this.totalPage;
      this.$emit('pagination', { page: this.totalPage, limit: this.limit });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    selectHandle (val) {
      this.currentPage = 1;
      this.$emit('pagination', { page: 1, limit: val });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  position: relative;
  font-size: 16px;
  color: #2c2b40;
  background-color: #fff;
  height: 88px;
  padding: 24px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}
.pagination-container.hidden {
  display: none;
}
.pagination-btn {
  width: 460px;
  height: 66px;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}
.pagination-btn i {
  display: inline-block;
  font-size: 16px;
  margin-right: 12px;
  color: #7583e4;
  cursor: pointer;
}
.pagination-btn .totalPage {
  margin: 0 12px;
}
.pagination-btn .el-input {
  width: 101px;
  height: 33px;
  box-sizing: border-box;
}
.pagination-btn .el-input >>> .el-input__inner {
  height: 33px;
}
.pagination-total {
  position: absolute;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  right: 0;
}
.el-select {
  width: 78px;
  margin: 0 16px;
}
.el-select >>> .el-input {
  width: 78px;
  height: 33px;
  box-sizing: border-box;
}
.el-select >>> .el-input__inner {
  height: 33px;
  padding-right: 0;
}
.pagination-btn .iconDisable {
  color: #bbb;
  cursor: not-allowed;
}
</style>
