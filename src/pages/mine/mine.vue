<template>
    <uni-forms ref="formRef" :modelValue="formData">
        <uni-forms-item label="姓名" name="name">
            <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="图片" name="imgs">
            <pro-upload v-model="formData.imgs" />
        </uni-forms-item>
    </uni-forms>
    <button @click="submitForm">Submit</button>
</template>

<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const formRef = ref()
const formData = ref({
    name: '',
    imgs: [
        {
            key: 'asd',
            path: 'https://pic2.zhimg.com/v2-416700a012d964dbddc14a444369c571_1440w.jpg',
            name: '图片1',
        }
    ],
})

const rules = {
    name: {
        rules: [
            {
                required: true,
                errorMessage: '请输入姓名',
            },
            {
                minLength: 3,
                maxLength: 5,
                errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
            }
        ],
    },
    imgs: {
        rules: [
            {
                required: true,
                errorMessage: '请上传图片',
            },
        ],
    },
}

const submitForm = () => {
    formRef.value.validate().then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log('err', err)
    })
}

onReady(() => {
    formRef.value.setRules(rules)
})
</script>