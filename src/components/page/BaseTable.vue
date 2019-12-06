<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 天气</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-row>
        <el-col :span="20">
          <el-input placeholder="请输入内容" v-model="city" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" style="margin-left:20px" @click="findWeather">查询天气</el-button>
        </el-col>
      </el-row>

      <el-row>
        <ul v-for="(items,index) in weatherArr" class="weather-show">
          <li>
            <el-card shadow="hover">
              {{items.week}}--{{items.wea}}
            </el-card>
          </li>
        </ul>
      </el-row>

    </div>

  </div>
</template>

<script>
// import pinyin from "../../assets/ConvertPinyin.js";

// import "js-pinyin";
export default {
  name: "basetable",
  data() {
    return {
      city: "",
      weatherArr: [],
      url: "./vuetable.json",
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1
    };
  },
  created() {},
  computed: {},
  methods: {
    // 查询天气
    findWeather() {
      if (this.city == "") {
        this.$message({
          showClose: true,
          message: "请输入区域",
          type: "warning"
        });
      } else {
        // let fullName = pinyin.getFullChars(this.city);
        this.$axios
          .get("/weather", {
            params: {
              appid: "54581756",
              appsecret: "L7mT2buk",
              version: "v1",
              city: this.city
            }
          })
          .then(res => {
            this.weatherArr = res.data.data;
            // console.log(this.weatherArr);
          });
        // console.log(pinyin("稍等"));
      }
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}

.weather-show {
  list-style: none;
}
</style>
