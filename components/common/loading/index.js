// components/common/loading/index.js

Component({
  props: {
    show: {
      type: Boolean,
      value: true
    },
    // 是否为全屏
    fullscreen: Boolean,
    tips: String
  },
  data: {},
  onInit() { },
  deriveDataFromProps(nextProps) { console.log(nextProps) },
  didMount() { },
  didUpdate(prevProps, prevData) { console.log(prevProps, prevData) },
  didUnmount() { },
  methods: {}
})