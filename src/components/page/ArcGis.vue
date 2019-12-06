<template>
  <div class="arcgis">
    <h2>arcgis</h2>
  </div>
</template>

<script>
import * as esriLoader from "esri-loader";
export default {
  name: "arcgis",
  data() {
    return {};
  },
  mounted() {
    const options = {
      url: "https://js.arcgis.com/3.24/"
    };
    esriLoader
      .loadModules(["esri/map", "dojo/domReady!"], options)
      .then(([Map]) => {
        let map = new Map("YouMapDOM", {
          basemap: "topo",
          center: [113.3209952545166, 23.090055306224895],
          zoom: 15
        });
      })
      .catch(err => {});
  }
};
</script>

<style lang="less">
</style>