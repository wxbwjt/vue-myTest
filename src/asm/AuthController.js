var AuthController = {};
var defaultConf = {
  placeholder:'',
  permissionList:[],
    roleList:[]
}
function validatePermissino(arg,notflag){
  let findValue = defaultConf.permissionList.find(function(item){
    return item.permission == arg;
  });
  let rvalue = findValue ? true : false;
  return notflag ? !rvalue : rvalue;
}
function validateRole(arg,notflag){
    let findValue = defaultConf.roleList.find(function(item){
        return item.name.indexOf(arg)>-1;
    });
    let rvalue = findValue ? true : false;
    return notflag ? !rvalue : rvalue;
}
AuthController.install = function(Vue,options){
  defaultConf.permissionList = options.permissionList;
    defaultConf.roleList = options.roleList;
  Vue.directive ('auth',{
    bind:function(el,binding){
      let arg = binding.arg;
      let modifs = binding.modifiers;
      //是否隐藏（有权限不隐藏为false,没权限为true）
      el.hiddenValue = !validatePermissino(arg,modifs['not']);
    },
    inserted:function(el,binding,vnode){
      if(el.hiddenValue){
        el.innerHTML=defaultConf.placeholder;
      }
    },
    componentUpdated:function(el,binding,vnode){
      if(el.hiddenValue){
        el.innerHTML=defaultConf.placeholder;
      }
    }
  });

    Vue.directive ('role',{
        bind:function(el,binding){
            let arg = binding.arg;
            let modifs = binding.modifiers;
            //是否隐藏（有权限不隐藏为false,没权限为true）
            el.hiddenValue = !validateRole(arg,modifs['not']);
        },
        inserted:function(el,binding,vnode){
            if(el.hiddenValue){
                el.innerHTML=defaultConf.placeholder;
            }
        },
        componentUpdated:function(el,binding,vnode){
            if(el.hiddenValue){
                el.innerHTML=defaultConf.placeholder;
            }
        }
    });

  Vue.component('AuthWraper',{
    functional: true,
    props:{
      permission:{
        type:String,
        default:''
      },
      nopermission:{
        type:String,
         default:''
      },
        role:{
            type:String,
            default:''
        },
        norole:{
            type:String,
            default:''
        }
    },
    render:function(h,context){
      let perm = context.props.permission;
      let nperm = context.props.nopermission;
        let role = context.props.role;
        let nrole = context.props.norole;
      let pv = perm!=''? validatePermissino(perm) : true;
      let npv = nperm!=''? validatePermissino(nperm,true) :true;
        let rv = role!=''? validateRole(role) :true;
        let nrv = nrole!=''? validateRole(nrole,true) :true;
      if(pv&&npv&&rv&&nrv){
        return context.children
      }else{
        return;
      }
    }
  })
}

export default AuthController;