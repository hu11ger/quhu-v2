var VM = new Vue({
  el: '#app',
  data: {
    siteUrl:
      'https://static-mp-f069a595-b856-4970-895a-a3c3cd52557c.next.bspapp.com/',
    //frog\frog-active\pig\panda
    patterns: {
      beat1: {
        1: 'ip01',
        2: 'ip02',
        3: 'ip03',
        4: 'ip04',
      },
      beat2: {
        1: 'ip05',
        2: 'ip06',
        3: 'ip07',
        4: 'ip01',
      },
      beat3: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat4: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat5: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat6: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat7: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat8: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat9: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat10: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat11: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
      beat12: {
        1: '',
        2: '',
        3: '',
        4: '',
      },
    },
    currentPatternUrl: '/assets/img/Frame 5.png',
    currentPattern: 'Frame 5.png',
    inAnimation: false,
    playBtnColor: '#ffd38a',
    connectText: '连接设备',
    visible: false,
    hidden: false,
    // 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    //C D E F G H A B
    notes: {
      beat1: {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
      },
      beat2: {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
      },
      beat3: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat4: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat5: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat6: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat7: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat8: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat9: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat10: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat11: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
      beat12: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
      },
    },
    //Tone.js的实例
    synth: null,
    sampler: null,
    sampler1: null,
    sampler2: null,
    sampler3: null,
    sampler4: null,
    sampler5: null,
    loop: null,
    //控制播放的参数
    notesObj: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    },
    running: false,
    reset: false,
    pause: false,
    part: null,
    isRepeat: true,
    speed: 50,

    noteLength: '4n', //音符长度 4n 8n 16n
    volume: -10,
    instrument: '马林巴',
    //水球特效option
    hygroOption: {},
    indicatorAnim: '',
    //模拟吹气
    simulate: '',
  },
  mounted() {
    // this.drawLiquidfill()
  },
  created() {
    this.initSampler()
  },
  updated() {
    this.updateIndicatorAnim()
  },
  computed: {
    speedFactor() {
      if (this.speed == 50) {
        return 0.5
      } else if (this.speed == 40) {
        return 0.6
      } else if (this.speed == 30) {
        return 0.7
      } else if (this.speed == 20) {
        return 0.8
      } else if (this.speed == 10) {
        return 0.9
      } else if (this.speed == 60) {
        return 0.4
      } else if (this.speed == 70) {
        return 0.3
      } else if (this.speed == 80) {
        return 0.2
      } else if (this.speed == 90) {
        return 0.1
      }
    },
    getTransport() {
      return Tone.Transport
    },
    instrumentEng() {
      if (this.instrument == '马林巴') {
        return 'marimba'
      } else if (this.instrument == '钢琴') {
        return 'piano'
      } else if (this.instrument == '电子乐器') {
        return 'synth'
      } else if (this.instrument == '弦乐器') {
        return 'strings'
      } else if (this.instrument == '木管乐器') {
        return 'woodwind'
      }
    },
  },
  watch: {
    running: function (newValue, oldValue) {
      console.log(newValue)
    },
  },
  mounted() {
    if (this.isMobile()) {
      if (confirm('您似乎正在使用手机访问网站，使用ipad或pc设备体验更佳噢~')) {
        this.$message({
          message:
            '手机端使用可能出现网页布局错位、无法创作乐谱等问题，建议使用ipad或电脑端进行访问~',
          type: 'info',
          duration: 7000,
        })
      }
    } else {
      this.$message({
        message: '尚未进行实体设备连接，尝试上传模拟吹气数据进行乐谱创作吧~',
        type: 'info',
        duration: 6000,
      })
    }
  },
  methods: {
    isMobile() {
      let flag = navigator.userAgent.match(/(phone|iPhone|Android)/i)
      return flag
    },
    simulateBlow() {
      let value = this.simulate
      this.handleSeriValue(value)
    },
    updateIndicatorAnim() {
      if (this.running) {
        if (this.speedFactor == 1) {
          this.$refs.indicator.style.animation = 'radar81 12s linear infinite'
        } else if (this.speedFactor == 0.9) {
          this.$refs.indicator.style.animation = 'radar81 10.8s linear infinite'
        } else if (this.speedFactor == 0.8) {
          this.$refs.indicator.style.animation = 'radar81 9.6s linear infinite'
        } else if (this.speedFactor == 0.7) {
          this.$refs.indicator.style.animation = 'radar81 8.4s linear infinite'
        } else if (this.speedFactor == 0.6) {
          this.$refs.indicator.style.animation = 'radar81 7.2s linear infinite'
        } else if (this.speedFactor == 0.5) {
          this.$refs.indicator.style.animation = 'radar81 6s linear infinite'
        } else if (this.speedFactor == 0.4) {
          this.$refs.indicator.style.animation = 'radar81 4.8s linear infinite'
        } else if (this.speedFactor == 0.3) {
          this.$refs.indicator.style.animation = 'radar81 3.6s linear infinite'
        } else if (this.speedFactor == 0.2) {
          this.$refs.indicator.style.animation = 'radar81 2.4s linear infinite'
        } else if (this.speedFactor == 0.1) {
          this.$refs.indicator.style.animation = 'radar81 1.2s linear infinite'
        }
      } else {
        this.$refs.indicator.style.animation = ''
      }
    },
    updateSampler() {
      if (this.instrument == '马林巴') {
        this.sampler = this.sampler1
      } else if (this.instrument == '钢琴') {
        this.sampler = this.sampler2
      } else if (this.instrument == '电子乐器') {
        this.sampler = this.sampler3
      } else if (this.instrument == '弦乐器') {
        this.sampler = this.sampler4
      } else if (this.instrument == '木管乐器') {
        this.sampler = this.sampler5
      }

      this.sampler.volume.value = this.volume
    },
    initSampler() {
      this.sampler1 = new Tone.Sampler({
        urls: {
          A2: 'A2.mp3',
          A3: 'A3.mp3',
          A4: 'A4.mp3',
          A5: 'A5.mp3',
          A6: 'A6.mp3',
          C2: 'C2.mp3',
          C3: 'C3.mp3',
          C4: 'C4.mp3',
          C5: 'C5.mp3',
          C6: 'C6.mp3',
          'D#2': 'Ds2.mp3',
          'D#3': 'Ds3.mp3',
          'D#4': 'Ds4.mp3',
          'D#5': 'Ds5.mp3',
          'D#6': 'Ds6.mp3',
          'F#2': 'Fs2.mp3',
          'F#3': 'Fs3.mp3',
          'F#4': 'Fs4.mp3',
          'F#5': 'Fs5.mp3',
          'F#6': 'Fs6.mp3',
        },
        release: 1,
        baseUrl: `assets/audio/marimba/`,
      }).toDestination()

      this.sampler2 = new Tone.Sampler({
        urls: {
          A2: 'A2.mp3',
          A3: 'A3.mp3',
          A4: 'A4.mp3',
          A5: 'A5.mp3',
          A6: 'A6.mp3',
          C2: 'C2.mp3',
          C3: 'C3.mp3',
          C4: 'C4.mp3',
          C5: 'C5.mp3',
          C6: 'C6.mp3',
          'D#2': 'Ds2.mp3',
          'D#3': 'Ds3.mp3',
          'D#4': 'Ds4.mp3',
          'D#5': 'Ds5.mp3',
          'D#6': 'Ds6.mp3',
          'F#2': 'Fs2.mp3',
          'F#3': 'Fs3.mp3',
          'F#4': 'Fs4.mp3',
          'F#5': 'Fs5.mp3',
          'F#6': 'Fs6.mp3',
        },
        release: 1,
        baseUrl: `assets/audio/piano/`,
      }).toDestination()

      this.sampler3 = new Tone.Sampler({
        urls: {
          A2: 'A2.mp3',
          A3: 'A3.mp3',
          A4: 'A4.mp3',
          A5: 'A5.mp3',
          A6: 'A6.mp3',
          C2: 'C2.mp3',
          C3: 'C3.mp3',
          C4: 'C4.mp3',
          C5: 'C5.mp3',
          C6: 'C6.mp3',
          'D#2': 'Ds2.mp3',
          'D#3': 'Ds3.mp3',
          'D#4': 'Ds4.mp3',
          'D#5': 'Ds5.mp3',
          'D#6': 'Ds6.mp3',
          'F#2': 'Fs2.mp3',
          'F#3': 'Fs3.mp3',
          'F#4': 'Fs4.mp3',
          'F#5': 'Fs5.mp3',
          'F#6': 'Fs6.mp3',
        },
        release: 1,
        baseUrl: `assets/audio/synth/`,
      }).toDestination()

      this.sampler4 = new Tone.Sampler({
        urls: {
          A2: 'A2.mp3',
          A3: 'A3.mp3',
          A4: 'A4.mp3',
          A5: 'A5.mp3',
          A6: 'A6.mp3',
          C2: 'C2.mp3',
          C3: 'C3.mp3',
          C4: 'C4.mp3',
          C5: 'C5.mp3',
          C6: 'C6.mp3',
          'D#2': 'Ds2.mp3',
          'D#3': 'Ds3.mp3',
          'D#4': 'Ds4.mp3',
          'D#5': 'Ds5.mp3',
          'D#6': 'Ds6.mp3',
          'F#2': 'Fs2.mp3',
          'F#3': 'Fs3.mp3',
          'F#4': 'Fs4.mp3',
          'F#5': 'Fs5.mp3',
          'F#6': 'Fs6.mp3',
        },
        release: 1,
        baseUrl: `assets/audio/strings/`,
      }).toDestination()

      this.sampler5 = new Tone.Sampler({
        urls: {
          A2: 'A2.mp3',
          A3: 'A3.mp3',
          A4: 'A4.mp3',
          A5: 'A5.mp3',
          A6: 'A6.mp3',
          C2: 'C2.mp3',
          C3: 'C3.mp3',
          C4: 'C4.mp3',
          C5: 'C5.mp3',
          C6: 'C6.mp3',
          'D#2': 'Ds2.mp3',
          'D#3': 'Ds3.mp3',
          'D#4': 'Ds4.mp3',
          'D#5': 'Ds5.mp3',
          'D#6': 'Ds6.mp3',
          'F#2': 'Fs2.mp3',
          'F#3': 'Fs3.mp3',
          'F#4': 'Fs4.mp3',
          'F#5': 'Fs5.mp3',
          'F#6': 'Fs6.mp3',
        },
        release: 1,
        baseUrl: `assets/audio/woodwind/`,
      }).toDestination()

      this.sampler1.volume.value = this.volume
      this.sampler2.volume.value = this.volume
      this.sampler3.volume.value = this.volume
      this.sampler4.volume.value = this.volume
      this.sampler5.volume.value = this.volume
    },
    toggleInstrument() {
      if (this.instrument == '马林巴') {
        this.instrument = '钢琴'
      } else if (this.instrument == '钢琴') {
        this.instrument = '电子乐器'
      } else if (this.instrument == '电子乐器') {
        this.instrument = '弦乐器'
      } else if (this.instrument == '弦乐器') {
        this.instrument = '木管乐器'
      } else if (this.instrument == '木管乐器') {
        this.instrument = '马林巴'
      }
    },
    decodeId(id) {
      barId = id.split('-')[0]
      dotId = id.split('-')[1]
      return {
        barId: `this.notes.beat${barId}`,
        dotId,
        id: `this.notes.beat${barId}[${dotId}]`,
      }
    },
    test() {},

    play() {
      
      if (this.running) {
        return false
      }
      this.updateSampler() //更新采样器设定：音量、乐器
      let count = 0 //计算乐谱时长系数
      console.log(this.notes)
      //初始化采样器
      let now = Tone.now()
      let speedFactor = this.speedFactor //速度系数，系数越大，播放速度越慢
      let noteLength = this.noteLength //音符长度 4n 8n 16n

      this.running = true //标记播放状态

      this.playBtnColor = '#ffbba6'
      this.inAnimation = true

      for (var i = 0; i < 12; i++) {
        for (var j = 1; j < 5; j++) {
          if (eval(`this.notes.beat${i + 1}[${j}]`) != 0) {
            count = i + 1

            this.sampler.triggerAttackRelease(
              eval(`this.notes.beat${i + 1}[${j}]`),
              noteLength,
              now + i * speedFactor,
            )
          }
        }
      }
      if (count == 0) {
        this.$message({
          message: '先尝试通过吹气来创作乐谱吧~',
          type: 'warning',
        })
      }

      //设定定时器，重复操作
      let nIntervId
      let intervCount = 1
      eval('this.patterns.beat' + intervCount)[1] += '_active'
      eval('this.patterns.beat' + intervCount)[2] += '_active'
      eval('this.patterns.beat' + intervCount)[3] += '_active'
      eval('this.patterns.beat' + intervCount)[4] += '_active'
      intervCount += 1

      nIntervId = setInterval(() => {
        if (intervCount <= count){
        
        //this.patterns.beat1[1]+='_active'
        eval('this.patterns.beat' + intervCount)[1] += '_active'
        eval('this.patterns.beat' + intervCount)[2] += '_active'
        eval('this.patterns.beat' + intervCount)[3] += '_active'
        eval('this.patterns.beat' + intervCount)[4] += '_active'
        }
        
        eval('this.patterns.beat' + (intervCount-1))[1]=eval('this.patterns.beat' + (intervCount-1))[1].replace("_active", "")
        console.log(eval('this.patterns.beat' + (intervCount-1))[1].replace("_active", ""))
        eval('this.patterns.beat' + (intervCount-1))[2]=eval('this.patterns.beat' + (intervCount-1))[2].replace("_active","")
        eval('this.patterns.beat' + (intervCount-1))[3]=eval('this.patterns.beat' + (intervCount-1))[3].replace("_active","")
        eval('this.patterns.beat' + (intervCount-1))[4]=eval('this.patterns.beat' + (intervCount-1))[4].replace("_active","")

        intervCount += 1
      }, 500)

      //播放时间
      setTimeout(() => {
        //清除定时器
        clearInterval(nIntervId)
        nIntervId = null

        this.running = false
        this.playBtnColor = '#ffd38a'
        this.inAnimation = false
      }, speedFactor * count * 1000)
    },

    drawLiquidfill() {
      // let hygrometer
      // let hygroClick = this.hygroClick
      // for (var i = 1; i < 13; i++) {
      //   for (var j = 1; j < 5; j++) {
      //     let refCmd = 'this.$refs.' + `beat${5}_${j}`
      //     let refCmdWithID = 'this.$refs.' + `beat${5}_${j}.id`
      //     // 基于准备好的dom，初始化echarts实例
      //     hygrometer = echarts.init(eval(refCmd))
      //     let name = eval(refCmdWithID) //传递id参数,触发onclick事件
      //     // 使用指定的配置项和数据显示图表
      //     hygrometer.setOption({
      //       tooltip: {
      //         show: false,
      //       },
      //       series: [
      //         {
      //           name,
      //           type: 'liquidFill',
      //           radius: '46px',
      //           data: [0.7],
      //           label: {
      //             show: false,
      //           },
      //           backgroundStyle: {
      //             color: 'transparent',
      //           },
      //           color: [
      //             {
      //               type: 'solid',
      //               x: 0,
      //               y: 1,
      //               x2: 0,
      //               y2: 0,
      //               colorStops: [
      //                 {
      //                   offset: 1,
      //                   color: ['#ff8764'], // 0% 处的颜色
      //                 },
      //               ],
      //             },
      //           ],
      //           outline: {
      //             show: true,
      //             borderDistance: 2,
      //             itemStyle: {
      //               borderColor: '#FFBBA7',
      //               borderWidth: 2,
      //             },
      //           },
      //         },
      //       ],
      //     })
      //     hygrometer.on('click', function (e) {
      //       // console.log(e.seriesName)
      //       hygroClick(e.seriesName)
      //     })
      //   }
      // }
      // 基于准备好的dom，初始化echarts实例
      let hygrometer = echarts.init(this.$refs.beat1_4)
      let name = this.$refs.beat1_4.id //传递id参数,触发onclick事件
      let hygroClick = this.hygroClick
      // 使用指定的配置项和数据显示图表
      hygrometer.setOption({
        tooltip: {
          show: false,
        },
        series: [
          {
            name,
            type: 'liquidFill',
            radius: '46px',
            data: [0.7],
            label: {
              show: false,
            },
            backgroundStyle: {
              color: 'transparent',
            },
            color: [
              {
                type: 'solid',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 1,
                    color: ['#ff8764'], // 0% 处的颜色
                  },
                ],
              },
            ],
            outline: {
              show: true,
              borderDistance: 2,
              itemStyle: {
                borderColor: '#FFBBA7',
                borderWidth: 2,
              },
            },
          },
        ],
      })
      hygrometer.on('click', function (e) {
        // console.log(e.seriesName)
        hygroClick(e.seriesName)
      })
    },
    hygroClick(seriesName) {
      // console.log('click')
      let id = this.decodeId(seriesName)
      console.log(id)
      if (eval(id.id) == 1) {
        eval(id.id + '=0')
      } else if (eval(id.id) == 0) {
        eval(id.id + '=1')
      }
    },
    // handleBar1(event) {
    //   if (this.notes.bar1[eval(event.target.id)] == 1) {
    //     Vue.set(this.notes.bar1, eval(event.target.id), 0)
    //   } else {
    //     if (event.target.id == '0') {
    //       this.sampler.triggerAttackRelease('C4', 1)
    //     } else if (event.target.id == '1') {
    //       this.sampler.triggerAttackRelease('D4', 1)
    //     } else if (event.target.id == '2') {
    //       this.sampler.triggerAttackRelease('E4', 1)
    //     } else if (event.target.id == '3') {
    //       this.sampler.triggerAttackRelease('F4', 1)
    //     } else if (event.target.id == '4') {
    //       this.sampler.triggerAttackRelease('G4', 1)
    //     } else if (event.target.id == '5') {
    //       this.sampler.triggerAttackRelease('A4', 1)
    //     } else if (event.target.id == '6') {
    //       this.sampler.triggerAttackRelease('B4', 1)
    //     } else if (event.target.id == '7') {
    //       this.sampler.triggerAttackRelease('C5', 1)
    //     } else if (event.target.id == '8') {
    //       this.sampler.triggerAttackRelease('D5', 1)
    //     } else if (event.target.id == '9') {
    //       this.sampler.triggerAttackRelease('E5', 1)
    //     } else if (event.target.id == '10') {
    //       this.sampler.triggerAttackRelease('F5', 1)
    //     } else if (event.target.id == '11') {
    //       this.sampler.triggerAttackRelease('G5', 1)
    //     }

    //     // this.synth.triggerAttackRelease('C4', '8n') //
    //     Vue.set(this.notes.bar1, eval(event.target.id), 1)
    //   }
    // },
    // handleBar2(event) {
    //   if (this.notes.bar2[eval(event.target.id)] == 1) {
    //     Vue.set(this.notes.bar2, eval(event.target.id), 0)
    //   } else {
    //     Vue.set(this.notes.bar2, eval(event.target.id), 1)

    //     if (event.target.id == '0') {
    //       this.sampler.triggerAttackRelease('C4', 1)
    //     } else if (event.target.id == '1') {
    //       this.sampler.triggerAttackRelease('D4', 1)
    //     } else if (event.target.id == '2') {
    //       this.sampler.triggerAttackRelease('E4', 1)
    //     } else if (event.target.id == '3') {
    //       this.sampler.triggerAttackRelease('F4', 1)
    //     } else if (event.target.id == '4') {
    //       this.sampler.triggerAttackRelease('G4', 1)
    //     } else if (event.target.id == '5') {
    //       this.sampler.triggerAttackRelease('A4', 1)
    //     } else if (event.target.id == '6') {
    //       this.sampler.triggerAttackRelease('B4', 1)
    //     } else if (event.target.id == '7') {
    //       this.sampler.triggerAttackRelease('C5', 1)
    //     } else if (event.target.id == '8') {
    //       this.sampler.triggerAttackRelease('D5', 1)
    //     } else if (event.target.id == '9') {
    //       this.sampler.triggerAttackRelease('E5', 1)
    //     } else if (event.target.id == '10') {
    //       this.sampler.triggerAttackRelease('F5', 1)
    //     } else if (event.target.id == '11') {
    //       this.sampler.triggerAttackRelease('G5', 1)
    //     }
    //   }
    // },
    // handleBar3(event) {
    //   if (this.notes.bar3[eval(event.target.id)] == 1) {
    //     Vue.set(this.notes.bar3, eval(event.target.id), 0)
    //   } else {
    //     Vue.set(this.notes.bar3, eval(event.target.id), 1)

    //     if (event.target.id == '0') {
    //       this.sampler.triggerAttackRelease('C4', 1)
    //     } else if (event.target.id == '1') {
    //       this.sampler.triggerAttackRelease('D4', 1)
    //     } else if (event.target.id == '2') {
    //       this.sampler.triggerAttackRelease('E4', 1)
    //     } else if (event.target.id == '3') {
    //       this.sampler.triggerAttackRelease('F4', 1)
    //     } else if (event.target.id == '4') {
    //       this.sampler.triggerAttackRelease('G4', 1)
    //     } else if (event.target.id == '5') {
    //       this.sampler.triggerAttackRelease('A4', 1)
    //     } else if (event.target.id == '6') {
    //       this.sampler.triggerAttackRelease('B4', 1)
    //     } else if (event.target.id == '7') {
    //       this.sampler.triggerAttackRelease('C5', 1)
    //     } else if (event.target.id == '8') {
    //       this.sampler.triggerAttackRelease('D5', 1)
    //     } else if (event.target.id == '9') {
    //       this.sampler.triggerAttackRelease('E5', 1)
    //     } else if (event.target.id == '10') {
    //       this.sampler.triggerAttackRelease('F5', 1)
    //     } else if (event.target.id == '11') {
    //       this.sampler.triggerAttackRelease('G5', 1)
    //     }
    //   }
    // },
    // handleBar4(event) {
    //   if (this.notes.bar4[eval(event.target.id)] == '4-4') {
    //     Vue.set(this.notes.bar4, eval(event.target.id), 0)
    //   } else {
    //     Vue.set(this.notes.bar4, eval(event.target.id), 1)

    //     if (event.target.id == '0') {
    //       this.sampler.triggerAttackRelease('C4', 1)
    //     } else if (event.target.id == '1') {
    //       this.sampler.triggerAttackRelease('D4', 1)
    //     } else if (event.target.id == '2') {
    //       this.sampler.triggerAttackRelease('E4', 1)
    //     } else if (event.target.id == '3') {
    //       this.sampler.triggerAttackRelease('F4', 1)
    //     } else if (event.target.id == '4') {
    //       this.sampler.triggerAttackRelease('G4', 1)
    //     } else if (event.target.id == '5') {
    //       this.sampler.triggerAttackRelease('A4', 1)
    //     } else if (event.target.id == '6') {
    //       this.sampler.triggerAttackRelease('B4', 1)
    //     } else if (event.target.id == '7') {
    //       this.sampler.triggerAttackRelease('C5', 1)
    //     } else if (event.target.id == '8') {
    //       this.sampler.triggerAttackRelease('D5', 1)
    //     } else if (event.target.id == '9') {
    //       this.sampler.triggerAttackRelease('E5', 1)
    //     } else if (event.target.id == '10') {
    //       this.sampler.triggerAttackRelease('F5', 1)
    //     } else if (event.target.id == '11') {
    //       this.sampler.triggerAttackRelease('G5', 1)
    //     }
    //   }
    // },

    transformNote(beatId, dotId, extent) {
      this.updateSampler() //更新采样器设定：音量、乐器

      let now = Tone.now()
      let speedFactor = this.speedFactor //速度系数，系数越大，播放速度越慢
      let noteLength = this.noteLength //音符长度 4n 8n 16n
      if (dotId == 1) {
        if (extent <= 0.25) {
          eval(`this.notes.beat${beatId}[1] = 'C4'`)
          this.sampler.triggerAttackRelease('C4', noteLength, now)
        } else if (extent <= 0.5) {
          eval(`this.notes.beat${beatId}[1] = 'D4'`)
          this.sampler.triggerAttackRelease('D4', noteLength, now)
        } else if (extent <= 0.75) {
          eval(`this.notes.beat${beatId}[1] = 'E4'`)
          this.sampler.triggerAttackRelease('E4', noteLength, now)
        } else if (extent <= 1) {
          eval(`this.notes.beat${beatId}[1] = 'F4'`)
          this.sampler.triggerAttackRelease('F4', noteLength, now)
        }
      } else if (dotId == 2) {
        if (extent <= 0.25) {
          eval(`this.notes.beat${beatId}[2] = 'G4'`)
          this.sampler.triggerAttackRelease('G4', noteLength, now)
        } else if (extent <= 0.5) {
          eval(`this.notes.beat${beatId}[2] = 'A4'`)
          this.sampler.triggerAttackRelease('A4', noteLength, now)
        } else if (extent <= 0.75) {
          eval(`this.notes.beat${beatId}[2] = 'B4'`)
          this.sampler.triggerAttackRelease('B4', noteLength, now)
        } else if (extent <= 1) {
          eval(`this.notes.beat${beatId}[2] = 'C5'`)
          this.sampler.triggerAttackRelease('C5', noteLength, now)
        }
      } else if (dotId == 3) {
        if (extent <= 0.25) {
          eval(`this.notes.beat${beatId}[3] = 'B4'`)
          this.sampler.triggerAttackRelease('B4', noteLength, now)
        } else if (extent <= 0.5) {
          eval(`this.notes.beat${beatId}[3] = 'C5'`)
          this.sampler.triggerAttackRelease('C5', noteLength, now)
        } else if (extent <= 0.75) {
          eval(`this.notes.beat${beatId}[3] = 'D5'`)
          this.sampler.triggerAttackRelease('D5', noteLength, now)
        } else if (extent <= 1) {
          eval(`this.notes.beat${beatId}[3] = 'E5'`)
          this.sampler.triggerAttackRelease('E5', noteLength, now)
        }
      } else if (dotId == 4) {
        if (extent <= 0.25) {
          eval(`this.notes.beat${beatId}[4] = 'F5'`)
          this.sampler.triggerAttackRelease('F5', noteLength, now)
        } else if (extent <= 0.5) {
          eval(`this.notes.beat${beatId}[4] = 'G5'`)
          this.sampler.triggerAttackRelease('G5', noteLength, now)
        } else if (extent <= 0.75) {
          eval(`this.notes.beat${beatId}[4] = 'A5'`)
          this.sampler.triggerAttackRelease('A5', noteLength, now)
        } else if (extent <= 1) {
          eval(`this.notes.beat${beatId}[4] = 'B5'`)
          this.sampler.triggerAttackRelease('B5', noteLength, now)
        }
      }
    },

    //处理从串口获得的信息，转化为圆点位置信息和吹气值
    handleSeriValue(value) {
      console.log(value)
      if (value.length == 1) {
        return false
      }
      let location = value.split(',')[0]
      let locationX = location.split('_')[0]
      if (locationX == '') {
        return false
      }
      let locationY = location.split('_')[1]

      if (locationY == '') {
        return false
      }

      let extent = value.split(',')[1]

      this.transformNote(eval(locationX), eval(locationY), eval(extent))

      let radius, color
      if (eval(locationY) == 4) {
        radius = '45px'
        color = '#ff8764'
      } else if (eval(locationY) == 3) {
        radius = '35px'
        color = '#feb557'
      } else if (eval(locationY) == 2) {
        radius = '30px'
        color = '#fee557'
      } else if (eval(locationY) == 1) {
        radius = '22px'
        color = '#a0dc9c'
      }
      console.log(locationX, locationY, extent)
      let notesCmd = `this.notes.beat${locationX}[${locationY}]`

      console.log(notesCmd + '=' + extent)
      // eval(notesCmd + '=' + extent) //修改 data的数值
      let id = `beat${location}`
      let refCmd = `this.$refs.beat${location}`
      let refCmdWithID = `this.$refs.beat${location}.id`
      console.log(refCmd, refCmdWithID)
      let hygrometer = echarts.getInstanceByDom(eval(refCmd))
      if (hygrometer == null) {
        hygrometer = echarts.init(eval(refCmd))
      }
      // let name = eval(refCmdWithID) //传递id参数,触发onclick事件
      // let hygroClick = this.hygroClick

      // 使用指定的配置项和数据显示图表
      // hygrometer.setOption({
      //   tooltip: {
      //     show: false,
      //   },
      //   series: [
      //     {
      //       name,
      //       type: 'liquidFill',
      //       radius,
      //       data: [eval(extent)],
      //       label: {
      //         show: false,
      //       },
      //       backgroundStyle: {
      //         color: 'transparent',
      //       },
      //       color: [
      //         {
      //           type: 'solid',
      //           x: 0,
      //           y: 1,
      //           x2: 0,
      //           y2: 0,
      //           colorStops: [
      //             {
      //               offset: 1,
      //               color: [color], // 0% 处的颜色
      //             },
      //           ],
      //         },
      //       ],
      //       outline: {
      //         show: true,
      //         borderDistance: 0,
      //         itemStyle: {
      //           borderColor: color,
      //           borderWidth: 2,
      //         },
      //       },
      //     },
      //   ],
      // })

      // hygrometer.on('click', function (e) {
      //   // console.log(e.seriesName)
      //   hygroClick(e.seriesName)
      // })
    },

    async callSerial() {
      // const ports = await navigator.serial.getPorts(); //获取之前所有允许过的串口

      if ('serial' in navigator) {
        // The Web Serial API is supported.

        var loading = document.getElementById('loading')
        loading.style.visibility = 'visible'

        var mask = document.getElementById('mask')
        mask.style.visibility = 'visible'

        // 过滤设备与Arduino Uno USB供应商/产品id。
        const filters = [
          { usbVendorId: 0x2341, usbProductId: 0x0043 },
          { usbVendorId: 0x2341, usbProductId: 0x0001 },
        ]

        const port = await navigator.serial
          .requestPort({ filters })
          .catch(() => {
            loading.style.visibility = 'hidden'
            mask.style.visibility = 'hidden'
          })
        // Prompt user to select any serial port.

        if (port != null) {
          this.$message({
            message: '设备连接成功！',
            type: 'success',
          })
          this.connectText = '已配对'
          loading.style.visibility = 'hidden'
          mask.style.visibility = 'hidden'
          // const { usbProductId, usbVendorId } = port.getInfo();
          // console.log(usbProductId,usbVendorId)
        } else {
          this.$message({
            message: '似乎没有找到可供连接的设备~',
            type: 'warning',
          })
        }
        // Wait for the serial port to open.
        await port.open({ baudRate: 9600 })

        const textDecoder = new TextDecoderStream()
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
        const reader = textDecoder.readable.getReader()

        // Listen to data coming from the serial device.
        while (true) {
          const { value, done } = await reader.read()
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock()
            break
          }
          // value is a string.
          this.handleSeriValue(value) //处理串口信息数据
        }
      } else {
        this.$message({
          message: '您的设备似乎不支持串行端口连接~尝试一下模拟吹气输入吧~',
          type: 'warning',
        })
      }
    },
  },
})
