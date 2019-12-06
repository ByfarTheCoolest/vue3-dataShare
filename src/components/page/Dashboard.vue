<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt="" height="40px">
            <div class="user-info-cont">
              <div class="user-info-name">{{name}}</div>
              <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">登录时间：<span>{{currDate}}</span></div>
          <div class="user-info-list">登录地点：<span>{{currCity}}</span></div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <!-- <div slot="header" class="clearfix">
            <span>语言详情</span>
          </div>
          Vue
          <el-progress :percentage="71.3" color="#42b983"></el-progress>
          JavaScript
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          CSS
          <el-progress :percentage="3.7"></el-progress>
          HTML
          <el-progress :percentage="0.9" color="#f56c6c"></el-progress> -->
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <!-- <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1234</div>
                  <div>用户访问量</div>
                </div> -->

                <DigitRoll :rollDigits='digits1' />

              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <!-- <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div> -->
                <DigitRoll :rollDigits='digits2' />

              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <!-- <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div> -->
                <DigitRoll :rollDigits='digits3' />

              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" style="height:403px;position:relative">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
            <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
          </div>
          <!-- 百度地图 -->
          <div id="allmap"></div>
          <div>
            <!-- 文字 -->
            <!-- {{content}} -->

            <el-button @click="flag=!flag">加入购物车</el-button>
            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <div class="ball" v-show="flag"></div>
            </transition>
            <p class="gwc">购物车</p>

          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <!-- <schart ref="bar" class="schart" canvasId="bar" :data="data" type="bar" :options="options"></schart> -->
          <el-button @click="intTest">test</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <!-- <schart ref="line" class="schart" canvasId="line" :data="data" type="line" :options="options2"></schart> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
import bus from "../common/bus";
import DigitRoll from "@huoyu/vue-digitroll";

import BMap from "BMap";
export default {
  name: "dashboard",
  data() {
    return {
      digits1: 0,
      digits2: 0,
      digits3: 0,
      currDate: "",
      currCity: "",
      content: "",
      conIndex: 0,
      contentCon: "要稳， 要加油",
      name: localStorage.getItem("ms_username"),

      options: {
        title: "最近七天每天的用户访问量",
        showValue: false,
        fillColor: "rgb(45, 140, 240)",
        bottomPadding: 30,
        topPadding: 30
      },

      options2: {
        title: "最近七天用户访问趋势",
        fillColor: "#FC6FA1",
        axisColor: "#008ACD",
        contentColor: "#EEEEEE",
        bgColor: "#F5F8FD",
        bottomPadding: 30,
        topPadding: 30
      },
      location: null,
      flag: false
    };
  },
  components: {
    Schart,
    DigitRoll
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  },
  created() {
    this.getTime();
  },
  mounted() {
    // var map = new BMap.Map("allmap");
    // var point = new BMap.Point(116.331398, 39.897445);
    // map.centerAndZoom(point, 12);
    // let _this = this;
    // function myFun(result) {
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   // console.log("当前定位城市:" + cityName);
    //   _this.currCity = cityName;
    // }
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
    // setInterval(this.showContent, 300);
    // setInterval(this.changeTime, 1000);
  },
  activated() {},
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    // 接口测试
    intTest() {
      // console.log(1);
      this.$axios.get("/nodeinterface/testNode").then(res => {
        console.log(res);
      });
    },
    getTime() {
      let date = new Date().toLocaleString();
      // console.log(date);
      this.currDate = date;
      // console.log(this.currDate)
    },
    showContent() {
      this.content = this.contentCon.substring(0, this.conIndex++);
    },
    // 时间
    // changeTime() {
    //   let nowTimeH =
    //     new Date().getHours() > 9
    //       ? new Date().getHours()
    //       : "0" + new Date().getHours(); //0-23
    //   let nowTimeM =
    //     new Date().getMinutes() > 9
    //       ? new Date().getMinutes()
    //       : "0" + new Date().getMinutes();
    //
    //   let nowTimeS =
    //     new Date().getSeconds() > 9
    //       ? new Date().getSeconds()
    //       : "0" + new Date().getSeconds(); //0-59
    //   this.digits1 = nowTimeH;
    //   this.digits2 = nowTimeM;
    //   this.digits3 = nowTimeS;
    // },
    addCart() {
      console.log("sdz  ");
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)"; //小球初始位置
    },
    enter(el, done) {
      el.offsetWidth; //动画过渡
      el.style.transform = "translate(150px,450px)"; //最终位置
      el.style.transition = "all 2s ease"; //所花时间
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  /* margin-left: 70px; */
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}

.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: blueviolet;
}

.gwc {
  position: absolute;
  /* top: 362px; */
  bottom: 0;
  left: 100px;
  display: inline-block;
  padding: 10px;
  border-radius: 4px;
  background-color: #777;
  color: #fff;
}
</style>
