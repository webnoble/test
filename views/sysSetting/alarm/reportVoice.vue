<template>
  <div class="body-content">
    <HeadMenu title="告警声音设置" />
    <el-row :gutter="30">
      <el-col v-for="(item,key) in list" :key="key" :span="12" style="margin-bottom:30px">
        <div class="grid-content bg-purple-left">
          <el-row>
            <el-col :span="7">
              <div class="level levelDeadly">
                <span class="col-title">级别</span>
                <div>
                  <i class="iconfont" :class="setClass(item.levelId)"></i>
                  <span>{{ item.alarmLevelName }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="changeVoice">
                <span class="col-title">选择声音</span>
                <el-upload
                  ref="upload"
                  class="upload-demo"
                  :limit="1"
                  :on-success="handleAvatarSuccess"
                  :before-upload="(file) => beforeUpload(file,item)"
                  :with-credentials="true"
                  :action="`${uploadSimpleFile}?businessId=${item.id}`"
                  :auto-upload="true"
                >
                  <el-button
                    slot="trigger"
                    size="small"
                    type="text"
                  >{{ item.data ? item.data.fileName +'.'+ item.data.fileSuffix: '上传声音' }}</el-button>
                </el-upload>
                <!-- <div>报警声音1.mp3</div> -->
              </div>
            </el-col>
            <el-col :span="7">
              <div class="switchVoice">
                <span class="col-title">开启/关闭声音</span>
                <div class="switch-body">
                  <div
                    :class="{ 'switch-open': item.isStart==1,'isSwitchLeft': true }"
                    @click="switchOpen(item)"
                  >已开启</div>
                  <div
                    :class="{'switch-close': item.isStart==0,'isSwitchRight': true}"
                    @click="switchOpen(item)"
                  >已关闭</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSimpleFileInfoList, apiUrlfun, uploadSimpleFileUrl, deleteSimpleFileInfo } from '@/api/simpleFileInfo'
export default {
  data () {
    return {
      list: [],
      uploadSimpleFile: uploadSimpleFileUrl()
    }
  },
  computed: {
    showName () {
      return this.switchName === '1' ? '开启' : '关闭'
    }
  },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      this.$request.get('/alarm/audio/queryPage').then((res) => {
        const promise = [];
        res.items.forEach((item) => {
          promise.push(this.getSimpleFileInfoList(item))
        })
        Promise.all(promise).then((values) => {
          this.list = values;
          sessionStorage.setItem('voiceList', JSON.stringify(this.list));
          this.$EventBus.$emit('update')
        })
      })
    },
    getSimpleFileInfoList (item) {
      const promise = new Promise((resolve, reject) => {
        getSimpleFileInfoList(item.id).then(res => {
          const data = res[0];
          if (data && data.id) {
            data.url = apiUrlfun() + 'static/' + data.id;
          }
          item.data = data;
          resolve(item)
          // this.$forceUpdate();
        })
      });
      return promise;
    },
    setClass (id) {
      if (id === 1) {
        return 'iconicon_Friendship_tips'
      }
      if (id === 2) {
        return 'iconicon_General_warning'
      }
      if (id === 3) {
        return 'iconicon_Critical_warning'
      }
      if (id === 4) {
        return 'iconicon_Fatal_warning'
      }
    },
    switchOpen (item) {
      item.isStart = item.isStart === 0 ? 1 : 0;
      this.$request.post(`/alarm/audio/reset?id=${item.id}&isStart=${item.isStart}`).then(() => {
        this.getList();
      })
    },
    handleAvatarSuccess (file) {
      this.getList();
    },
    beforeUpload (file, item) {
      if (item.data) {
        deleteSimpleFileInfo([item.data.id]).then((res) => {
          this.getList();
        })
      }
    }
  }
}
</script>
<style lang="scss">
.grid-content {
  .changeVoice {
    .el-upload-list {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
.grid-content {
  width: 100%;
  height: 127px;
  border-radius: 5px;
  background-color: #fff;
  padding: 10px 20px;
  .col-title {
    font-size: 14px;
    color: #a1a1a1;
    display: inline-block;
    margin-bottom: 20px;
  }

  .level {
    font-size: 20px;
    div {
      height: 56px;
      line-height: 56px;
      i {
        display: inline-block;
        font-size: 48px;
        vertical-align: middle;
        margin-top: -5px;
        margin-right: 20px;
      }
      span {
        display: inline-block;
      }
    }
  }
  .levelDeadly {
    i {
      color: red;
      display: inline-block;
      width: 48px;
      height: 48px;
      border-radius: 48px;
      // transform: rotate(45deg);
      margin-left: 3px;
      margin-top: -11px !important;
      // -ms-transform: rotate(45deg); /* IE 9 */
      // -moz-transform: rotate(45deg); /* Firefox */
      // -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
      // -o-transform: rotate(45deg); /* Opera */
    }
    .iconicon_Fatal_warning {
      transform: rotate(45deg);
    }
    .iconicon_Friendship_tips {
      color: #fa7c00;
    }
    .iconicon_General_warning {
      color: #ffc600;
    }
    .iconicon_Critical_warning {
      color: #a09116;
    }
  }
  .changeVoice div {
    height: 56px;
    line-height: 56px;
    color: #5466e0;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  .switch-body {
    position: relative;
    width: 125px;
    height: 42px;
    line-height: 42px;
    background-color: #e6e6f5;
    border-radius: 21px;
    font-size: 14px;
    color: #fff;
    margin-top: 7px;
    cursor: pointer;
    .isSwitchLeft {
      position: absolute;
      top: 0;
      left: 0;
      width: 70px;
      height: 100%;
      text-align: center;
      padding-right: 10px;
      border-radius: 21px;
      background-color: #e6e6f5;
    }
    .isSwitchRight {
      position: absolute;
      top: 0;
      right: 0;
      width: 70px;
      height: 100%;
      text-align: center;
      padding-left: 10px;
      border-radius: 21px;
      background-color: #e6e6f5;
    }
    .switch-open {
      padding: 0;
      background-color: #5466e0;
      z-index: 2;
    }
    .switch-close {
      padding: 0;
      background-color: #8a8a8a;
    }
  }
}
</style>
