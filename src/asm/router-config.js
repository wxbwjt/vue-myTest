//  配件订单
const OrderList = resolve => require.ensure([], () => resolve(require('./components/order/OrderList.vue')), 'order')
const OrderDetail = resolve => require.ensure([], () => resolve(require('./components/order/OrderDetail.vue')), 'order')
const OrderDetailTAb = resolve => require.ensure([], () => resolve(require('./components/order/info/OrderDetailTab.vue')), 'order')
const orderDetailInfo = resolve => require.ensure([], () => resolve(require('./components/order/info/orderDetail/OrderDetailInfo.vue')), 'order')
const GoodsTrack = resolve => require.ensure([], () => resolve(require('./components/order/info/goodsTrack/GoodsTrack.vue')), 'order')
const Tag = resolve => require.ensure([], () => resolve(require('./components/order/info/tag/Tag.vue')), 'order')
const Express = resolve => require.ensure([], () => resolve(require('./components/order/info/express/Express.vue')), 'order')
const MaterialForm = resolve => require.ensure([], () => resolve(require('./components/order/info/materialForm/MaterialForm.vue')), 'order')
const DeliverForm = resolve => require.ensure([], () => resolve(require('./components/order/info/deliverForm/DeliverForm.vue')), 'order')
const Billing = resolve => require.ensure([], () => resolve(require('./components/order/info/openBill/Billing.vue')), 'order')
const RemitInfo = resolve => require.ensure([], () => resolve(require('./components/order/info/remitInfo/RemitInfo.vue')), 'order')
const ChangeRecord = resolve => require.ensure([], () => resolve(require('./components/order/info/changeRecord/ChangeRecord.vue')), 'order')

const goAdd =resolve => require.ensure([], () => resolve(require('./components/order/operation/GoAdd.vue')), 'order')
const NewOrder =resolve => require.ensure([], () => resolve(require('./components/order/operation/NewOrder.vue')), 'order')
const Refund = resolve => require.ensure([], () => resolve(require('./components/order/operation/Refund.vue')), 'order')
const Reissue = resolve => require.ensure([], () => resolve(require('./components/order/operation/Reissue.vue')), 'order')
const Change = resolve => require.ensure([], () => resolve(require('./components/order/operation/Change.vue')), 'order')
const Cancel = resolve => require.ensure([], () => resolve(require('./components/order/operation/Cancel.vue')), 'order')
const ReceiveCfm = resolve => require.ensure([], () => resolve(require('./components/order/operation/ReceiveCfm.vue')), 'order')

//  配件管理
const ProductsList = resolve => require.ensure([], () => resolve(require('./components/products/ProductsList.vue')), 'products')
const ProductsDetail = resolve => require.ensure([], () => resolve(require('./components/products/ProductsDetail.vue')), 'products')

//  客户管理
const CustomerList = resolve => require.ensure([], () => resolve(require('./components/customer/CustomerList.vue')), 'customer')
const CustomerDetail = resolve => require.ensure([], () => resolve(require('./components/customer/CustomerDetail.vue')), 'customer')

//统计表
const OrderReportList = resolve => require.ensure([], () => resolve(require('./components/report/OrderReport/OrderReportList.vue')), 'report')
const DeliveryReportList = resolve => require.ensure([], () => resolve(require('./components/report/DeliveryReport/DeliveryReportList.vue')), 'report')
export default [
  //  配件订单
  { 'path': '/order', component: OrderList, name: 'order',
    children:[
      {'path':'detail/:id',component:OrderDetail,//详情
        children:[
          {path: 'allDetail', component: OrderDetailTAb,redirect:"allDetail/tab1",
            children:[
              {path: 'tab1', component: orderDetailInfo,name:'tab1'},//订单详情
              {path: 'tab2', component: GoodsTrack,name:'tab2'},//发货跟踪
              {path: 'tab3', component: Tag,name:'tab3'},//标签
              {path: 'tab4', component: Express,name:'tab4'},//快递
              {path: 'tab5', component: MaterialForm,name:'tab5'},//领料单
              {path: 'tab6', component: DeliverForm,name:'tab6'},//送货单
              {path: 'tab7', component: Billing,name:'tab7'},//开票
              {path: 'tab8', component: RemitInfo,name:'tab8'},//汇款信息
              {path: 'tab9', component: ChangeRecord,name:'tab9'},//变更记录
            ]
          },
            {'path':'refund',component:Refund,name:'refund'},//订单退货
            {'path':'reissue',component:Reissue,name:'reissue'},//订单补发
            {'path':'change',component:Change,name:'change'},//订单更换
            {'path':'cancel',component:Cancel,name:'cancel'},//订单取消
            {'path':'receiveCfm',component:ReceiveCfm,name:'receiveCfm'},//收货确认
        ]
      },
        {'path':'goAdd',component:goAdd,name:'goAdd'}, //用来强制刷新新增页
        {'path':'add',component:NewOrder,name:'oadd'},
        {'path':'edit/:id',component:NewOrder,name:'oedit'},
        {'path':'reissueEdit/:id',component:Reissue,name:'reissueEdit'},//订单补发修改
        {'path':'changeEdit/:id',component:Change,name:'changeEdit'},//订单更换修改
        {'path':'refundEdit/:id',component:Refund,name:'refundEdit'},//订单退货修改
    ]
  },

  //  配件管理
  { 'path': '/products', component: ProductsList, name: 'products',
    children:[
        {'path':'add',component:ProductsDetail,name:'padd'},
        {'path':'edit/:id',component:ProductsDetail,name:'pedit'}
    ]
  },

    //  客户管理
    { 'path': '/customer', component: CustomerList, name: 'customer',
        children:[
            {'path':'add',component:CustomerDetail,name:'cadd'},
            {'path':'edit/:id',component:CustomerDetail,name:'cedit'},
            {'path':'info/:id',component:CustomerDetail,name:'cinfo'}
        ]
    },
    //订单统计表
    {'path':'/orderReport',component:OrderReportList},
    //发货统计表
    {'path':'/deliveryReport',component:DeliveryReportList},
]
