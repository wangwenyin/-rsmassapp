<template>
 <div id="echarts"  :style="{height:height,width:width}" ></div> 
</template>
<script>
import echarts from 'echarts'
export default {
  components: {
    echarts
  },
  props: {
    height: {
      type: String,
      'default': '350px'
    },
    width: {
      type: String,
      'default': '100%'
    },
    hgyt: {
      type: String,
      'default': ''
    },
    tjsj: {
      type: Array,
      'default': []
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    SetSerie() {
      var serie = []
      if (this.hgyt !== '' && this.tjsj !== null) {
        const yts = this.hgyt.split(';')
        yts.forEach(element => {
          if (element !== '') {
            var y = []
            this.tjsj.forEach(element1 => {
              if (element1.wyyt === element) {
                y.push(element1.pgdj)
              }
            })
            var item = {
              name: element,
              type: 'line',
              data: y
            }
            serie.push(item)
          }
        })
      } else {
        var y = []
        if (this.tjsj !== null) {
          this.tjsj.forEach(element1 => {
            y.push(element1.pgdj)
          })
          var item = {
            name: '',
            type: 'line',
            data: y
          }
          serie.push(item)
        }
      }
      return serie
    },
    SetX() {
      const x = []
      if (this.tjsj !== null) {
        this.tjsj.forEach(element => {
          if (x.indexOf(element.jzsd) === -1) { x.push(element.jzsd) }
        })
      }
      return x
    },
    draw: function() {
      try {
        const echart = echarts.init(document.getElementById('echarts'))
        if (this.json) {
          for (var i = 0; i < this.json.length; i++) {
            this.name.push(this.json[i].name)
            this.num.push(this.json[i].num)
          }
        }
        var option = {
          title: {
            subtext: '均价元(平米)'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {

          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.SetX()
          },
          yAxis: {
            type: 'value',
            min: 50000,
            axisLabel: {
              formatter: '{value} '
            }
          },
          series: this.SetSerie()
        }
        echart.setOption(option)
      } catch (e) {
        console.log('出错')
        console.log(e)
      }
    }
  }
}
</script>

