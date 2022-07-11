<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal"> Horizontal </a-radio-button>
        <a-radio-button value="vertical"> Vertical </a-radio-button>
        <a-radio-button value="inline"> Inline </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
    //在用v- decorator这个新指令，接收的是一个数组，第一个是字段的名称，第二个是配置的规则，包括传递我们的初始值，
    //初始值为initialValue，载是规则，是必填的。fieldA就托管给form了，fieldB的话只是收集数据不用做校验
          'fieldA',
          {
            initialValue: fieldA,
            rules: [{ required: true, min: 6, message: '必须大于5个字符' }],
          },
        ]"
        placeholder="input placeholder"
      />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { objectExpression } from '@babel/types';

export default {
  data() {
    // 新建一个form的实例，$form也是是在main.js通过vue.use的形式，
    //载组件内部把$form挂载到vuve的原型上面就可以直接访问到了，
    //createFrom传递的一个this主要是用于组件底层内部，当数据改变时，会调用这样this，直接去更新 this.formUpdate
    //然后传递我们的组件，到 <a-form :layout="formLayout" :form="form">
   
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      fieldB: "",
    };
  },
  //如果说想通过接口，返回过来数据之后，动态的改变form表单的值的话，
  //同样需要使用form表单提供的api去更改这个值，
mounted() {
  setTimeout(()=>{
    this.form.setFieldsValue({fieldA:"hello zhuzhu"});
  },3000)
},
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
   
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
     //然后提交的时候，我们通过我们通过this.form.validateFields，去校验
    //第一个参数是错误信息，第二个是我们收集到的值
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // this.fieldA = values.fieldA;
          //如果说数据改变了，我们想要同步给data里面的fieldA和filedB这样一个原始数据
          //同步的话就是说校验通过了，给后台法请求了，或者说后台也通过校验了，我们就可以同步给其他组件使用了
          //后面表单会越来越大，就直接assign往this上赋值就可以了，这样的话就把值同步给fieldA和filedB了

          Object.assign(this,values);

        }
      });
      // if (this.fieldA.length <= 5) {
      //   this.fieldAStatus = "error";
      //   this.fieldAHelp = "必须大于5个字符";
      // } else {
      //   console.log({
      //     fieldA: this.fieldA,
      //     fieldB: this.fieldB,
      //   });
      // }
    },
  },
};
</script>
