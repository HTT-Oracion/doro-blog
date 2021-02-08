<template>
  <div class="comment-item">
    <div class="user">
      <img src="../assets/img/avatar.png" alt="" />
      <span>{{ username }}</span>
    </div>
    <div class="comment-content">{{ content }}</div>
    <div class="comment-date">{{ format(Number(date)) }}</div>
  </div>
</template>

<script>
import { getUserById } from '@/api/user'
import { onMounted, reactive, toRefs } from 'vue'
import { formatDate } from '@/utils/viewTools'
export default {
  name: 'CommentItem',
  props: {
    id: {
      type: String
    },
    avatar: {
      type: String,
      default: '../assets/img/avatar.png'
    },
    content: {
      type: String,
      default: ''
    },
    date: {
      type: String
    }
  },
  setup (props) {
    const state = reactive({
      username: 'doro'
    })
    const format = (dateTime) => {
      return formatDate(dateTime)
    }
    const getCurrentUser = async () => {
      const { username } = await getUserById(props.id)
      state.username = username
    }
    onMounted(() => {
      getCurrentUser()
    })
    return {
      ...toRefs(state),
      format
    }
  }
}
</script>

<style lang="less">
.comment-item {
  background-color: rgba(230, 238, 232, 0.65);
  margin: 10px;
  border-radius: 4px;
  padding: 5px;
  .user {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 10px;
      display: inline-block;
      vertical-align: middle;
      object-fit: cover;
    }
    span {
      box-sizing: border-box;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .comment-content {
    margin: 10px;
  }
  .comment-date {
    margin: 10px;
    text-align: right;
  }
}
</style>