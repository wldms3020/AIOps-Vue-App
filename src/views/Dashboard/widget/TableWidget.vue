<template>
  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h6 class="text-uppercase text-muted ls-1 mb-1">Table</h6>
          <h3 class="mb-0">{{ name }}</h3>
        </b-col>
        <b-col class="text-right">
          <a :href="movePath" class="btn btn-sm btn-primary">See all</a>
        </b-col>
      </b-row>
    </template>
    <light-table :type="type" :default-paging="defaultPaging"></light-table>
  </b-card>
</template>

<script>
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown } from 'element-ui'
import LightTable from "@/views/Tables/RegularTables/LightTable";

export default {
  name: 'TableWidget',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    LightTable,
  },
  props: {
    type: {
      type: String,
      default: 'log',
    },
  },
  computed: {
    name() {
      return this.type === 'metric' ? '최신 메트릭 데이터 TOP 5' : '최신 로그 데이터 TOP 5'
    },
    movePath() {
      return this.type === 'metric' ? '/metric' : '/log';
    },
  },
  data() {
    return {
      defaultPaging: {
        pageNum: 1,
        pageSize: 5,
        total: 5,
      },
    }
  },
}
</script>

<style lang="scss">
.dashboard {
  .el-table .cell {
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
  }
}
</style>