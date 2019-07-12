<template>
  <el-form
    :ref="(props && props.ref) || 'baseForm'"
    :model="propsData.formData"
    :rules="propsData.rules || {}"
    :label-width="(props && props.labelWidth) || '100px'"
    :size="(props && props.size)"
    :inline="(props && props.inline) || false"
    :label-suffix="(props && props['label-suffix'])"
    :show-message="(props && props['show-message']) || true"
    :label-position="(props && props['label-position']) || 'right'"
    :inline-message="(props && props['inline-message']) || true"
    :status-icon="(props && props['status-icon']) || true"
    :class="(props && props.class) || 'baseForm'">
    <el-form-item
      v-for="(key, itemIndex) in Object.keys(items)"
      :key="itemIndex"
      :prop="items[key].name"
      :class="items[key].class"
      :error="errorMsg[items[key].name]"
      :label="items[key].label">
      <!-- 输入框/文本域/密码框 -->
      <template v-if="items[key].type === 'input' || items[key].type === 'textarea' || items[key].type === 'password'">
        <el-input
          :placeholder="items[key].placeholder || '请输入'"
          :class="items[key].class"
          :size="items[key].size"
          :type="items[key].type"
          :rows="items[key].rows || 1"
          :maxlength="items[key].maxlength"
          :minlength="items[key].minlength"
          :clearable="items[key].clearable || false"
          :prefix-icon="items[key]['prefix-icon']"
          :suffix-icon="items[key]['suffix-icon']"
          :disabled="items[key].disabled || false"
          :readonly="items[key].readonly || false"
          :resize="items[key].resize"
          v-model="propsData.formData[items[key].name]"
          @change="val => itemEvent(items[key].on, 'change', val)"
          @blur="val => itemEvent(items[key].on, 'blur', val)"
          @focus="val => itemEvent(items[key].on, 'focus', val)"
          @keyup.enter.native="() => itemEvent(items[key].on, 'enterEvent')"
        ></el-input>
      </template>
      <!-- 计数器 -->
      <template v-else-if="items[key].type === 'number'">
        <el-input-number
          v-model="propsData.formData[items[key].name]"
          :min="items[key].min || 1"
          :class="items[key].class"
          :size="items[key].size"
          :step="items[key].step || 1"
          :controls="items[key].controls || true"
          :controls-position="items[key]['controls-position'] || ''"
          :disabled="items[key].disabled || false"
          :debounce="items[key].debounce || 300"
          :max="items[key].max || Infinity"
          :label="items[key].label"
          @change="val => itemEvent(items[key].on, 'change', val)"
          @blur="val => itemEvent(items[key].on, 'blur', val)"
          @focus="val => itemEvent(items[key].on, 'focus', val)"
        >
        </el-input-number>
      </template>
      <!-- 级联选择器 -->
      <template v-else-if="items[key].type === 'cascader'">
        <el-cascader
          :placeholder="items[key].placeholder || '请选择'"
          :options="items[key].options"
          :props="items[key].props"
          :separator="items[key].separator"
          :disabled="items[key].disabled || false"
          :clearable="items[key].clearable || false"
          :popper-class="items[key]['popper-class']"
          :expand-trigger="items[key]['expand-trigger'] || 'click'"
          :show-all-levels="items[key]['show-all-levels'] || true"
          :filterable="items[key].filterable || false"
          :debounce="items[key].debounce || 300"
          :size="items[key].size"
          :before-filter="items[key]['before-filter'] || (() => {})"
          :change-on-select="items[key]['change-on-select'] || (() => {})"
          @change="val => itemEvent(items[key].on, 'change', val)"
          @active-item-change="array => itemEvent(items[key].on, 'active-item-change', array)"
        ></el-cascader>
      </template>
      <!-- 下拉框 -->
      <template v-else-if="items[key].type === 'select'">
        <el-select
          :placeholder="items[key].placeholder || '请选择'"
          :multiple="items[key].multiple || false"
          :value-key="items[key]['value-key'] || 'value'"
          :disabled="items[key].disabled || false"
          :filterable="items[key].filterable"
          :remote="items[key].remote || false"
          :collapse-tags="items[key]['collapse-tags'] || false"
          :multiple-limit="items[key]['multiple-limit'] || 0"
          :allow-create="items[key]['allow-create'] || false"
          :loading="items[key].loading || false"
          :loading-text="items[key]['loading-text'] || '加载中'"
          :no-match-text="items[key]['no-match-text'] || '无匹配数据'"
          :no-data-text="items[key]['no-data-text'] || '无数据'"
          :popper-class="items[key]['popper-class']"
          :reserve-keyword="items[key]['reserve-keyword'] || false"
          :default-first-option="items[key]['default-first-option'] || false"
          v-model="propsData.formData[items[key].name]"
          :class="items[key].class || ''"
          :filter-method="items[key]['filter-method'] || (() => {})"
          :size="items[key].size || ''"
          :remote-method="(items[key].on && items[key].on.remoteMethod) || (() => {})"
          @remove-tag="val => itemEvent(items[key].on, 'remove-tag', val)"
          @clear="() => itemEvent(items[key].on, 'clear', val)"
          @visible-change="val => itemEvent(items[key].on, 'visible-change', val)"
          @blur="val => itemEvent(items[key].on, 'blur', val)"
          @focus="val => itemEvent(items[key].on, 'focus', val)"
          @change="val => itemEvent(items[key].on, 'change', val)">
          <el-option
            v-for="(option, optionIndex) in items[key].options"
            :key="optionIndex"
            :label="option.name || option.label || option[items[key].labelKey]"
            :value="option.id || option.value || option[items[key].idKey]"
          ></el-option>
        </el-select>
      </template>
      <!-- 单选框/单选框组 -->
      <template v-else-if="items[key].type === 'radio'">
        <el-radio-group
          :class="items[key].class"
          :disabled="items[key].disabled || false"
          :border="items[key].border || false"
          :size="items[key].size"
          :text-color="items[key]['text-color'] || '#fff'"
          :fill="items[key].fill || '#409EFF'"
          v-model="propsData.formData[items[key].name]"
          @change="val => itemEvent(items[key].on, 'change', val)">
          <template v-if="items[key].isBtn">
            <el-radio-button
              v-for="(radio, radioIndex) in items[key].radios"
              :label="radio.id || radio.value || option[items[key].labelKey]"
              :key="radioIndex">
              {{radio.name || radio.label || option[items[key].labelKey]}}
            </el-radio-button>
          </template>
          <template v-else>
            <el-radio
              v-for="(radio, radioIndex) in items[key].radios"
              :label="radio.id || radio.value || option[items[key].labelKey]"
              :key="radioIndex">
              {{radio.name || radio.label || option[items[key].labelKey]}}
            </el-radio>
          </template>
        </el-radio-group>
      </template>
      <!-- 复选框 -->
      <template v-else-if="items[key].type === 'checkbox'">
        <el-checkbox
          v-model="propsData.formData[items[key].name]"
          :true-label="items[key]['true-label']"
          :false-label="items[key]['false-label']"
          :disabled="items[key].disabled || false"
          :border="items[key].border || false"
          :checked="items[key].checked || false"
          :indeterminate="items[key].indeterminate || false"
          :size="items[key].size"
          >
          {{items[key].label}}
        </el-checkbox>
      </template>
      <!-- 复选框组 -->
      <template v-else-if="items[key].type === 'checkbox-group'">
        <el-checkbox-group
          :class="items[key].class || ''"
          :disabled="items[key].disabled || false"
          :size="items[key].size"
          v-model="propsData.formData[items[key].name]"
          :text-color="items[key]['text-color'] || '#fff'"
          :fill="items[key].fill || '#409EFF'"
          :min="items[key].min"
          :max="items[key].max"
          @change="val => itemEvent(items[key].on, 'change', val)">
          <template v-if="items[key].isBtn">
            <el-checkbox-button
              :label="checkbox.id || checkbox.value || checkbox[items[key].idlKey]"
              v-for="(checkbox, checkboxIndex) in items[key].checkboxs"
              :true-label="items[key]['true-label']"
              :false-label="items[key]['false-label']"
              :key="checkboxIndex">
              {{checkbox.name || checkbox.label || checkbox[items[key].labelKey]}}
            </el-checkbox-button>
          </template>
          <template v-else>
            <el-checkbox
              :label="checkbox.id || checkbox.value || checkbox[items[key].idlKey]"
              v-for="(checkbox, checkboxIndex) in items[key].checkboxs"
              :true-label="items[key]['true-label']"
              :false-label="items[key]['false-label']"
              :key="checkboxIndex">
              {{checkbox.name || checkbox.label || checkbox[items[key].labelKey]}}
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </template>
      <!-- 时间选择器:只考虑基础的时间选择，不考虑周，月，特殊时间等 -->
      <template v-else-if="items[key].type === 'date' || items[key].type === 'daterange' || items[key].type === 'datetime' || items[key].type === 'datetimerange'">
        <el-date-picker
          v-model="propsData.formData[items[key].name]"
          :type="items[key].type"
          :readonly="items[key].readonly || false"
          :clearable="items[key].clearable || false"
          :size="items[key].size"
          :format="items[key].format || 'yyyy-MM-dd'"
          :disabled="items[key].disabled || false"
          :placeholder="items[key].placeholder || '请选择日期'"
          @change="val => itemEvent(items[key].on, 'change', val)"
          @blur="val => itemEvent(items[key].on, 'blur', val)"
          @focus="val => itemEvent(items[key].on, 'focus', val)">
        </el-date-picker>
      </template>
      <!-- 上传 -->
      <template v-else-if="items[key].type === 'upload'">
        <el-upload
          :class="items[key].class || ''"
          :headers="items[key].headers || {}"
          :disabled="items[key].disabled || false"
          :action="items[key].action || 'https://jsonplaceholder.typicode.com/posts/'"
          :multiple="items[key].multiple"
          :limit="items[key].limit"
          :show-file-list="!items[key].showFileList"
          :file-list="items[key].fileList"
          :on-exceed="() => itemEvent(items[key].on, 'on-exceed')"
          :on-preview="() => itemEvent(items[key].on, 'on-preview')"
          :on-remove="() => itemEvent(items[key].on, 'on-remove')"
          :on-success="() => itemEvent(items[key].on, 'on-success')"
          :before-remove="() => itemEvent(items[key].on, 'before-remove')">
          <el-button size="small" type="primary">{{items[key].uploadText || '点击上传'}}</el-button>
          <div slot="tip" class="el-upload__tip" v-if="items[key].uploadTips">{{items[key].uploadTips}}</div>
        </el-upload>
      </template>
      <!-- 非基本类型表单单个表单控件 -->
      <!-- 组合控件 -->
      <!-- 非表单控件 -->
      <template v-else>
        <slot :name="items[key].slot"></slot>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    propsData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
    console.log(this.props)
  },
  computed: {
    // props--表单基础配置
    props () {
      return this.propsData.props
    },
    // props--表单控件
    items () {
      return this.propsData.formItems
    },
    // props--错误提示
    errorMsg () {
      return (this.propsData.props && this.propsData.props.errorMsg) || {}
    }
  },
  methods: {
    itemEvent (on, event, value) {
      console.log(event)
      // (on && on[event] ? on[event](value) : (() => {}))
    }
  }
}
</script>

<style lang="less">
  @import url('./Index.less');
</style>
