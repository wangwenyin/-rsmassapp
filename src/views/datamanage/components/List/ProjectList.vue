<template>
<div class="scroll">
  <el-table
    :data="projectlist.slice((currentpage-1)*pagesize,currentpage*pagesize)"
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
      prop="xmmc"
      label="名称"
     >
    </el-table-column>
     <el-table-column 
      prop="pgdj"
      label="评估价">
    </el-table-column>
    <el-table-column 
      prop="xzq"
      label="行政区"
     >
    </el-table-column>
    <el-table-column 
      prop="jdb"
      label="街道办"
     >
    </el-table-column>
    <el-table-column 
      prop="zlds"
      label="总栋数"
     >
    </el-table-column>
    <el-table-column 
      prop="zhs"
      label="总户数"
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
      prop="jzsd"
      label="价格时点" min-width="100px"
     > <template slot-scope="scope">
      <p> {{ scope.row.jzsd | formatDate}}</p>
       </template>
    </el-table-column>
       <el-table-column label="操作"  fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click.stop="building(scope.row)">楼栋</el-button>
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
      :total="projectlist.length">
    </el-pagination>
 </div>
</template>
<script>
import { formatDate } from '@/utils/date'
export default {
  props: {
    projectlist: {
      type: Array,
      default: []
    },
    query: {
      type: String,
      default: null
    },
    pagesize: {
      type: Number,
      default: 20
    },
    selectable: {
      type: Boolean,
      default: false
    },
    currentpage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      listHight: 1000
    }
  },
  methods: {
    select(val) {
      this.$emit('select', val)
    },
    building(val) {
      this.$emit('building', val)
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
        name: 'project',
        query: { xmdm: row.xmdm }
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
 .scroll{
   height:  100%;
   // overflow-y: auto;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>