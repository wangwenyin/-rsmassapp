<template>
<div class="scroll">
  <el-table
    :data="buildinglist.slice((currentpage-1)*pagesize,currentpage*pagesize)"
    style="width: 100%"  border 
    @row-click="openLink"
    :row-class-name="tableRowClassName">
    <el-table-column width="50"
      type="index"
    :index="typeIndex"
      label="序号"
      align="center"
     >
    </el-table-column>
    <el-table-column 
      prop="ldmc"
      label="名称"
     >
    </el-table-column>
    <el-table-column 
      prop="xmmc"
      label="项目名称"
     >
     </el-table-column>
      <el-table-column 
      prop="pgdj"
      label="评估价"
     >
     </el-table-column>
     <el-table-column 
      prop="jgrq"
      label="建筑年代"
     >
     <template slot-scope="scope">
      <p> {{ scope.row.jgrq | formatYear}}</p>
       </template>
    </el-table-column>
     <el-table-column 
      prop="ldjg"
      label="建筑结构"
     >
    </el-table-column>
    <el-table-column 
      prop="zcs"
      label="层数"
     >
    </el-table-column>
     <el-table-column 
      prop="zhs"
      label="户数"
     >
    </el-table-column>
     <el-table-column 
      prop="jzsd"
      label="价格时点" min-width="100px"
     > <template slot-scope="scope">
      <p> {{ scope.row.jzsd | formatDate}}</p>
       </template>
    </el-table-column>
      <el-table-column label="操作"  fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click.stop="house(scope.row)">户</el-button>
            <el-button size="mini" type="text"  v-if="selectable===true" @click.stop="select(scope.row)">选择</el-button>
          </template>
        </el-table-column>
  </el-table>
   <el-pagination 
       small
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="buildinglist.length">
    </el-pagination>
   </div>
</template>
<script>
import { formatDate } from '@/utils/date'
export default {
  props: {
    buildinglist: {
      type: Array,
      default: []
    },
    selectable: {
      type: Boolean,
      default: false
    },
    currentpage: {
      type: Number,
      default: 1
    },
    pagesize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {

    }
  },
  methods: {
    select(val) {
      this.$emit('select', val)
    },
    house(val) {
      this.$emit('house', val)
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'warning-row'
      }
      return ''
    },
    handleCurrentChange(val) {
      this.currentpage = { val }.val
    },
    typeIndex(index) {
      return index + (this.currentpage - 1) * this.pagesize + 1
    },
    openLink(row) {
      const routerData = this.$router.resolve({
        name: 'building',
        query: { lddm: row.lddm }
      })
      window.open(routerData.href, '_blank')
    }
  },
  filters: {
    formatDate(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatYear(currentDate) {
      var date = new Date(currentDate)
      return formatDate(date, 'yyyy')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>