<template>
  <div class="comment-page">
    <el-card>
      <div class="comment-input">
        <el-input
          type="textarea"
          :rows="2"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="messageForm.content"
        >
        </el-input>
        <el-button type="primary" round @click="addComment">发布</el-button>
      </div>
      <div class="comment-list">
        <comment-item
          v-for="item in messageList.slice(
            (pageNum - 1) * pageSize,
            pageNum * pageSize
          )"
          :key="item.id"
          :date="item.date"
          :content="item.content"
          :id="item.userId"
        ></comment-item>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[3, 5, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { onMounted, reactive, toRefs } from 'vue'
import {
  getMessagesRequest,
  addMessageRequest
} from '@/api/comment'
export default {
  name: 'Comment',
  components: {
    CommentItem
  },
  setup () {
    const state = reactive({
      messageForm: {
        content: ''
      },
      messageList: [],
      pageNum: 1,
      pageSize: 5,
      total: 0
    })
    const handleSizeChange = (newSize) => {
      state.pageSize = newSize
    }
    const handleCurrentChange = (newPage) => {
      state.pageNum = newPage
    }
    const addComment = async () => {
      await addMessageRequest(state.messageForm)
      getMessageList()
    }
    const getMessageList = async () => {
      state.messageList = await getMessagesRequest()
      state.total = state.messageList.length
    }
    onMounted(() => {
      getMessageList()
    })
    return {
      ...toRefs(state),
      addComment,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style lang="less">
.comment-page {
  .el-card {
    width: 70%;
  }
  .comment-input {
    margin: 10px;
    text-align: right;
    .el-button {
      margin-top: 10px;
    }
  }
}
</style>