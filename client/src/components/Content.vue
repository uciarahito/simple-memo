<template lang="html">
  <el-row>
    <el-col :span="8" v-for="(memo, index) in this.$store.state.dataMemo" :key="index">
      <div class="grid-content">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{memo.title}}</span>
            <el-button-group style="float: right;" v-show="statusLogin">
              <el-button type="primary" icon="edit" @click="editMemoAuth(memo)"></el-button>
              <el-button type="danger" icon="delete" @click="deleteMemo(memo)"></el-button>
            </el-button-group>
          </div>
          <div class="text item">
            <span>{{memo.user.name}} | {{memo.created_at}}</span>
            <hr>
            <p>{{memo.content}}</p>
          </div>
        </el-card>
      </div>

      <el-dialog title="Edit Article" v-model="dialogFormVisibleEdit">
        <el-form :model="edit_memo">
          <el-form-item>
            <el-input v-model="edit_memo.title" placeholder="Title"></el-input>
            <el-input v-model="edit_memo.id" placeholder="Id" type="hidden"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="edit_memo.content" placeholder="Content"></el-input>
            <el-input v-model="edit_memo.user" placeholder="User" type="hidden"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">Cancel</el-button>
          <el-button type="primary" @click="editMemo(edit_memo);dialogFormVisibleEdit = false;">Confirm</el-button>
        </span>
      </el-dialog>

    </el-col>

  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialogFormVisibleEdit: false,
      edit_memo: {
        title: '',
        content: '',
        id: '',
        user: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'editMemo', 'deleteMemo'
    ]),
    editMemoAuth(data) {
      if (data.user.username !== window.localStorage.getItem('user')) {
        this.notification("not authorized to edit")
      } else {
        this.dialogFormVisibleEdit = true
        this.edit_memo.title = data.title
        this.edit_memo.content = data.content
        this.edit_memo.id = data._id
        this.edit_memo.user = window.localStorage.getItem('id')
      }
    },
    notification(notif=""){
      if (notif == 'not authorized to edit') {
        this.$notify({
          title: 'Error',
          message: 'Sorry, you are not authorized to edit this memo!',
          type: 'error'
        })
      }
    }
  },
  created() {
    this.$store.dispatch("dataMemoByUser")
  },
  computed: {
    ...mapGetters({
      dataMemo: 'dataMemo',
      statusLogin: 'isLogin'
    })
  }
}
</script>

<style lang="css">
  .el-card {
    margin: 15px;
  }
  .el-row {
    margin-top: 20px;
  }
  .el-col{
    text-align: left;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
