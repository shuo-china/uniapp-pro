<template>
    <view>
        <view v-if="fileMediatype === 'image'" class="image-picker-container">
            <view class="image-picker-box" v-for="(item, index) in fileList" :key="item.key">
                <image class="file-image" :src="item.path" mode="aspectFill" @tap.stop="prviewImage(index)" />
                <view class="icon-del-box" @tap.stop="del(index, item.key)">
                    <uni-icons type="closeempty" size="18" color="#fff" />
                </view>
            </view>
            <view class="image-picker-box is-add" @tap.stop="choose">
                <uni-icons type="plusempty" size="64" color="#f1f1f1" />
            </view>
        </view>
        <view v-else class="file-picker-container">
            <button type="primary" size="mini" @tap.stop="choose">选择文件</button>
            <view class="file-picker-box" v-for="(item, index) in fileList" :key="item.key">
                <view class="file-picker-name">{{ item.name }}</view>
                <view class="icon-del-icon" @tap.stop="del(index, item.key)">
                    <uni-icons type="closeempty" size="18" color="#999" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { deleteFileApi, uploadFileApi } from '@/api/file'

interface UploadFile {
    key: string
    path: string
    name: string
}

const fileList = defineModel<UploadFile[]>({ required: true, default: () => [] })

const props = withDefaults(defineProps<{
    limit: number
    fileMediatype: 'image' | 'all'
    sourceType: ('album' | 'camera')[]
    sizeType: ('compressed' | 'original')[]
}>(), {
    limit: 9,
    fileMediatype: 'image',
    sourceType: () => ['album', 'camera'],
    sizeType: () => ['compressed'],
})


const choose = () => {
    if (fileList.value.length >= props.limit) {
        uni.showToast({
            title: `您最多选择 ${props.limit} 个文件`,
            icon: 'none'
        })
        return
    }

    if (props.fileMediatype === 'image') {
        uni.chooseImage({
            mediaType: props.fileMediatype,
            sourceType: props.sourceType,
            sizeType: props.sizeType,
            count: props.limit - fileList.value.length,
            success: async (res) => {
                const tempFiles = res.tempFiles as UniApp.ChooseImageSuccessCallbackResultFile[]
                uni.showLoading({
                    title: '上传中...',
                    mask: true
                })
                for (let i = 0; i < tempFiles.length; i++) {
                    try {
                        const result = await uploadFileApi(tempFiles[i].path);
                        fileList.value.push({
                            key: result.key,
                            path: result.path,
                            name: result.name,
                        })
                    } catch { }
                }
                uni.hideLoading()
            }
        })
    } else {
        uni.chooseMessageFile({
            count: props.limit - fileList.value.length,
            success: async (res) => {
                const tempFiles = res.tempFiles as UniApp.ChooseFileSuccessCallbackResultFile[]
                uni.showLoading({
                    title: '上传中...',
                    mask: true
                })
                for (let i = 0; i < tempFiles.length; i++) {
                    try {
                        const result = await uploadFileApi(tempFiles[i].path);
                        fileList.value.push({
                            key: result.key,
                            path: result.path,
                            name: result.name,
                        })
                    } catch { }
                }
                uni.hideLoading()
            }
        })
    }


}

const del = (index: number, key: string) => {
    fileList.value.splice(index, 1);
    deleteFileApi(key);
}

const prviewImage = (index: number) => {
    uni.previewImage({
        urls: fileList.value.map(item => item.path),
        current: index
    });
}
</script>

<style lang="scss" scoped>
.image-picker-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .image-picker-box {
        box-sizing: border-box;
        width: calc((100% - 20px) / 3);
        aspect-ratio: 1 / 1;
        border: 1px solid #eee;
        background: #fff;
        border-radius: 3px;
        overflow: hidden;
        position: relative;

        .file-image {
            width: 100%;
            height: 100%;
            display: block;
        }

        .icon-del-box {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 3px;
            right: 3px;
            height: 26px;
            width: 26px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 2;
        }
    }

    .is-add {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.file-picker-container {
    .file-picker-box {
        overflow: hidden;
        display: flex;
        align-items: stretch;
        margin-top: 5px;
        border: 1px solid #eee;
        border-radius: 5px;

        .file-picker-name {
            flex: 1;
            padding: 8px 10px;
            color: #666;
            font-size: 14px;
            word-break: break-all;
            word-wrap: break-word;
        }

        .icon-del-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
        }
    }
}
</style>