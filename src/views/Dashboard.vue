<template>
  <div class="dashboard">
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
            <widget widget-id="chart" type="bar"></widget>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <widget widget-id="chart" type="pie"></widget>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col xl="8" class="mb-5 mb-xl-0">
          <widget widget-id="table" type="log"></widget>
        </b-col>
        <b-col xl="4" class="mb-5 mb-xl-0">
          <widget widget-id="table" type="metric"></widget>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  // Charts
  import Widget from './Dashboard/WidgetTemplate.vue'

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  export default {
    components: {
      Widget,
      BaseProgress,
      StatsCard,
    },
    data() {
      return {
      };
    },
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
