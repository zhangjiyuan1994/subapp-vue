export default {
  data() {
    return {
      loading: false,
      rowSelection: [],
      tableData: [],
      formData: {
        form: {}
      },
      pageConfig: {
        currentPageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    get() {
      console.warn("未实现get方法");
    },
    genParams(params) {
      return Object.assign({}, params, this.formData.form, this.pageConfig);
    },
    tableChange(pagination) {
      this.pageConfig.currentPageNum = pagination.current;
      this.pageConfig.pageSize = pagination.pageSize;
      if (this.get) {
        this.get();
      }
    }
  },
  mounted() {
    this.get();
  }
};
