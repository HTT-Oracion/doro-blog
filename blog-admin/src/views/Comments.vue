<template>
  <div class="comments-page">
    <el-card>
      <bread-crumb nameOne="留言管理" nameTwo="留言列表"></bread-crumb>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="queryInfo.query"
            @chage="getComments"
            @clear="getComments"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getComments"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="commentList"
        border
        striped
        :default-sort="{ prop: 'date', order: 'descending' }"
        class="comment-table"
      >
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="时间">
          <template #default="scope">
            <div>{{ Number(scope.row.date) | formatTime }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" @click="remove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[2, 5, 7, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getCommentsRequest, removeById } from '@/api/comment'
import { infoTip } from '@/utils/viewTools'
export default {
  name: 'Comments',
  data () {
    return {
      commentList: [],
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      total: 0
    }
  },
  methods: {
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getComments()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getComments()
    },
    async remove (id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') return infoTip('取消了操作')
      await removeById(id)
      this.getComments()
    },
    async getComments () {
      const { result, total } = await getCommentsRequest(this.queryInfo)
      this.commentList = result
      this.total = total
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang="less">
.comment-table {
  margin: 15px 0;
}
</style>