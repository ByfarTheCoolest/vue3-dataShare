<template>
  <div class="fzaxios">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVueTableData, getJsonHolder } from "../../api/request.js";

export default {
  name: "fzaxios",
  data() {
    return {
      tableData: []
    };
  },
  methods: {},
  created() {
    // this.$axios.get("/vuetable.json").then(res => {
    //   console.log(res);
    //   this.tableData = res.data.list;
    // });

    getVueTableData().then(res => {
      // console.log(res);
      this.tableData = res.data.list;
    });

    getJsonHolder().then(res => {
      // console.log(res);
    });
  }
};
</script>


<style lang="less">
</style>
