<template>
  <div class="dashboard">
    <el-row class="list" :gutter="gutter">
      <el-col :span="4">
        <div class="boxs">
          <h3>
            <img src="../../assets/icon/afsb_icon.svg">
            <span class="icon iconfont iconicon_Security_maintenance"></span>
            <span>安防设备</span>
          </h3>
          <div class="content">
            <div class="left">
              <strong @click="gotoCloud('monitor')">{{ headList.safeDeviceNum || '0' }}</strong>
              <p>总个数</p>
            </div>
            <div class="right">
              <strong @click="gotoWarn('1000')">{{ headList.safeDeviceUnHealthNum || '0' }}</strong>
              <p>告警个数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="boxs">
          <h3>
            <img src="../../assets/icon/yyrj_icon.svg">
            <span class="icon iconfont iconicon_Application_software"></span>
            <span>应用软件</span>
          </h3>
          <div class="content">
            <div class="left">
              <strong @click="gotoCloud('soft')">{{ headList.appNum || '0' }}</strong>
              <p>总个数</p>
            </div>
            <div class="right">
              <strong @click="gotoWarn('1004')">{{ headList.appUnHealthNum || '0' }}</strong>
              <p>告警个数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="boxs">
          <h3>
            <img src="../../assets/icon/itsb_icon.svg">
            <span class="icon iconfont iconicon_IT_equipment"></span>
            <span>IT设备</span>
          </h3>
          <div class="content">
            <div class="left">
              <strong @click="gotoCloud('it')">{{ headList.itDeviceNum || '0' }}</strong>
              <p>总个数</p>
            </div>
            <div class="right">
              <strong @click="gotoWarn('1001')">{{ headList.itDeviceUnHealthNum || '0' }}</strong>
              <p>告警个数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="boxs">
          <h3>
            <img src="../../assets/icon/zjj_icon.svg">
            <span class="icon iconfont iconicon_Intermediate_key"></span>
            <span>中间件</span>
          </h3>
          <div class="content">
            <div class="left">
              <strong @click="gotoCloud('middle')">{{ headList.middlewareNum || '0' }}</strong>
              <p>总个数</p>
            </div>
            <div class="right">
              <strong @click="gotoWarn('1002')">{{ headList.middlewareUnHealthNum || '0' }}</strong>
              <p>告警个数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="boxs">
          <h3>
            <img src="../../assets/icon/ypt_icon.svg">
            <span class="icon iconfont iconicon_Cloud_platform"></span>
            <span>云平台</span>
          </h3>
          <div class="content">
            <div class="left">
              <strong @click="gotoCloud('cloud')">{{ headList.yunPlatformNum || '0' }}</strong>
              <p>总个数</p>
            </div>
            <div class="right">
              <strong @click="gotoWarn('1003')">{{ headList.yunPlatformUnHealthNum || '0' }}</strong>
              <p>告警个数</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="boxs">
          <h3>
            <img src="../../assets/icon/czxt-icon.svg">
            <span class="icon iconfont iconczxt_icon"></span>
            <span>操作系统和数据库</span>
          </h3>
          <div class="content">
            <div class="left">
              <strong @click="gotoCloud('system')">{{ headList.osAndDbNum || '0' }}</strong>
              <p>总个数</p>
            </div>
            <div class="right">
              <strong @click="gotoWarn('1005')">{{ headList.osAndDbUnHealthNum || '0' }}</strong>
              <p>告警个数</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="gutter" class="two">
      <el-col :span="8">
        <div class="boxs healthy">
          <h3>应用系统健康度</h3>
          <el-row>
            <el-col :span="6">
              <bar :score="50"/>
              <span class="name">刑罚执行</span>
            </el-col>
            <el-col :span="6">
              <bar :score="40"/>
              <span class="name">狱政管理</span>
            </el-col>
            <el-col :span="6">
              <bar :score="20"/>
              <span class="name">教育改造</span>
            </el-col>
            <el-col :span="6">
              <bar :score="80"/>
              <span class="name">生活卫生</span>
            </el-col>
          </el-row>
          <!-- <img src="./ui/wave.svg" alt /> -->
        </div>
      </el-col>
      <el-col :span="16">
        <div class="boxs warn">
          <h3>告警级别状态</h3>
          <el-row>
            <el-col :span="6">
              <pie :num="warnStatus[4]" :type="1" class="hoverPie" @click.native="gotoWarn(4)"/>
              <span class="name" @click="gotoWarn(4)">致命告警</span>
            </el-col>
            <el-col :span="6">
              <pie :num="warnStatus[3]" :type="2" class="hoverPie" @click.native="gotoWarn(3)"/>
              <span class="name" @click="gotoWarn(3)">严重告警</span>
            </el-col>
            <el-col :span="6">
              <pie :num="warnStatus[2]" :type="3" class="hoverPie" @click.native="gotoWarn(2)"/>
              <span class="name" @click="gotoWarn(2)">一般告警</span>
            </el-col>
            <el-col :span="6">
              <pie :num="warnStatus[1]" :type="4" class="hoverPie" @click.native="gotoWarn(1)"/>
              <span class="name" @click="gotoWarn(1)">提示告警</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="gutter" class="three">
      <el-col :span="8">
        <div class="boxs warnRank">
          <h3>
            设备告警排名
            <span class="right">起止目前排名</span>
          </h3>
          <ul ref="warnRanklist">
            <li
              v-for="(item,index) in ranking"
              :key="index"
              :style="{height:liHeight + 'px',lineHeight:liHeight+'px'}"
            >
              <!-- <img v-if="index==0" src="../../assets/icon/one_icon.svg" alt="">
              <img v-if="index==1" src="../../assets/icon/two_icon.svg" alt="">
              <img v-if="index==2" src="../../assets/icon/three_icon.svg" alt="">-->

              <span v-if="index===0" class="sort one">{{ 1 }}</span>
              <span v-if="index===1" class="sort second">{{ 2 }}</span>
              <span v-if="index===2" class="sort third">{{ 3 }}</span>
              <span v-if="index>2" class="sort">{{ index+1 }}</span>
              <span class="name">{{ item.name }}</span>
              <span class="right">{{ item.num }}个</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="boxs">
          <h3>设备完好率</h3>
          <el-row class="chooseGroup">
            <el-col :span="8">
              <div>
                <span
                  class="checkboxs"
                  :class="filterName==='week' ? 'active': ''"
                  @click="filterTab('week')"
                ></span>
                <span>周</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span
                  class="checkboxs"
                  :class="filterName==='month' ? 'active': ''"
                  @click="filterTab('month')"
                ></span>
                <span>月</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span
                  class="checkboxs"
                  :class="filterName==='year' ? 'active': ''"
                  @click="filterTab('year')"
                ></span>
                <span>年</span>
              </div>
            </el-col>
          </el-row>
          <echartBar :bar-data="pipe" :filter-name="filterName"></echartBar>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="boxs">
          <h3>监控设备告警趋势</h3>
          <el-row class="chooseGroup">
            <el-col :span="8">
              <div>
                <span
                  class="checkboxs"
                  :class="filterName2==='week' ? 'active': ''"
                  @click="filterTab2('week')"
                ></span>
                <span>周</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span
                  class="checkboxs"
                  :class="filterName2==='month' ? 'active': ''"
                  @click="filterTab2('month')"
                ></span>
                <span>月</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <span
                  class="checkboxs"
                  :class="filterName2==='year' ? 'active': ''"
                  @click="filterTab2('year')"
                ></span>
                <span>年</span>
              </div>
            </el-col>
          </el-row>
          <echartLine :charts-data="trend" :filter-name="filterName2"></echartLine>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import bar from './ui/bar.vue'
import pie from './ui/pie.vue'
import echartBar from './ui/echartBar.vue'
import echartLine from './ui/echartLine.vue'
import { getHeadList, getWarnStatus, getRanking, getPipe, getTrend } from '@/api/dashboard';
export default {
  name: 'Dashboard',
  components: { bar, pie, echartBar, echartLine },
  data () {
    return {
      // gutter: window.innerHeight / 100 * 2,
      gutter: 20,
      liHeight: 40,
      showNum: 5,
      filterName: 'week',
      filterName2: 'week',
      warnList: [{
        name: '省局一体化平台应用软件服务器',
        num: 620
      }, {
        name: '省局一楼大门-门禁',
        num: 550
      }, {
        name: '省局数据库服务器',
        num: 470
      }, {
        name: '省局网络交换机',
        num: 430
      }, {
        name: '行政办公室windows操作系统',
        num: 420
      }, {
        name: '行政楼2楼东面摄像头',
        num: 400
      }, {
        name: '行政楼1楼西面摄像头',
        num: 370
      }],
      headList: {},
      warnStatus: {},
      ranking: [],
      pipe: {},
      trend: {}
    }
  },
  mounted () {
    this.getList();
    this.changeLayout();
  },
  methods: {
    getList () {
      getHeadList().then(res => {
        this.headList = res;
      })
      getWarnStatus().then(res => {
        this.warnStatus = res;
        console.log(this.warnStatus);
      })
      getRanking().then(res => {
        const arr = []
        for (var key in res) {
          const obj = { name: '', num: 0 };
          obj.name = key;
          obj.num = res[key];
          arr.push(obj)
        }
        this.ranking = arr;
      })
      getPipe().then(res => {
        for (var key in res) {
          res[key] = res[key].replace('%', '') - 0;
        }
        this.pipe = res;
        console.log(this.pipe);
      })
      getTrend().then(res => {
        this.trend = res;
        console.log(this.trend);
      })
    },
    changeLayout () {
      const ulHeight = this.$refs.warnRanklist.clientHeight;
      // console.log(ulHeight);
      let i = 1;
      while (ulHeight / i < 35 || ulHeight / i > 45) {
        i++;
      }
      this.liHeight = ulHeight / 8;
      this.showNum = i;
    },
    filterTab (val) {
      // this.filterName = val;
    },
    filterTab2 (val) {
      // this.filterName2 = val;
    },
    gotoCloud (val) {
      this.$router.push('/' + val);
    },
    gotoWarn (val) {
      this.$router.push({
        path: '/warn',
        query: {
          filters: val
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  padding: 3vh;
  background-color: #eff0f5;
  height: calc(100vh - 64px);
  .el-col {
    height: 100%;
  }
  .boxs {
    padding: 2vh 15px;
    background-color: #fff;
    height: 100%;
    h3 {
      color: #000000;
      font-size: 16px;
    }
  }
  .list {
    font-size: 16px;
    color: #000000;
    height: 14vh;
    position: relative;
    overflow: hidden;
    .boxs {
      padding: 1vh 15px;
      position: relative;
      box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
      .content {
        font-size: 0;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 2vh;
        .left,
        .right {
          display: inline-block;
          font-size: 14px;
          color: #000000;
          width: 50%;
          text-align: center;
          strong {
            font-size: 24px;
            font-family: 'Arial-BoldMT', Arial;
            font-weight: bold;
            cursor: pointer;
          }
        }
        p {
          margin-top: 0.5vh;
        }
        .left strong {
          color: #252a39;
        }
        .right strong {
          color: #f57923;
        }
      }
    }

    .icon {
      color: #000;
      position: absolute;
      top: -10px;
      right: 5px;
      font-size: 35px;
      opacity: 0.03;
    }
  }
  .two,
  .three {
    // margin-top: 2vh;
    margin-top: 20px;
    height: calc((100vh - 24vh - 64px) / 2);
    .el-row {
      height: 100%;
    }
    .chooseGroup {
      height: auto;
      width: 30%;
      font-size: 12px;
      margin-left: 70%;
      margin-bottom: 10px;
      .checkboxs {
        display: inline-block;
        vertical-align: middle;
        width: 13px;
        height: 13px;
        border: 1px solid #acb3c6;
        border-radius: 100%;
        position: relative;
        &::after {
          content: '';
          display: inline-block;
          width: 11px;
          height: 11px;
          position: absolute;
          border: 2px solid #fff;
          background-color: #acb3c6;
          border-radius: 100%;
        }
        &.active {
          border: 1px solid #5466e0;
          &::after {
            background-color: #5466e0;
          }
        }
      }
    }
  }
  .healthy {
    padding: 2vh 15px;
    .el-row {
      margin-top: 5vh;
      text-align: center;
      .name {
        font-size: 14px;
        color: #000000;
        display: inline-block;
        margin-top: 2vh;
      }
    }
  }
  .warn {
    padding: 2vh 15px;
    .el-row {
      margin-top: 3vh;
      text-align: center;
      .hoverPie {
        cursor: pointer;
      }
      .name {
        font-size: 14px;
        color: #000000;
        display: inline-block;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
  .warnRank {
    overflow: hidden;
    h3 {
      overflow: hidden;
      margin-bottom: 1vh;
      .right {
        float: right;
        font-size: 14px;
        color: #c5c5c5;
      }
    }
    ul {
      height: calc(33vh - 32px - 18px);
      overflow: hidden;
    }
    .sort {
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      display: inline-block;
      font-size: 12px;
      background: #c1c7d9;
      border-radius: 50%;
      vertical-align: middle;
      color: #fff;
      margin-right: 5px;
    }
    .sort.one {
      background-color: #df283f;
    }
    .sort.second {
      background-color: #f57923;
    }
    .sort.third {
      background-color: #f8c51c;
    }
    li {
      color: #000000;
      font-size: 14px;
      border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
      img {
        vertical-align: middle;
        margin-right: 5px;
      }
      .right {
        float: right;
      }
    }
  }
}
</style>
