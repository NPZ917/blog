1. 生成 ssh 密钥
   - 分别生成 github 和 gitee 的 ssh 密钥 id_rsa_github 和 id_rsa_gitee
   - 目录：`~/.ssh/`

```bash
ssh-keygen -t rsa -C "your_email@example.com"
ssh-keygen -t rsa -C "your_email@example.com"
```

2. 配置 ssh 密钥

   - 将 .pub 添加至 github/gitee 的 ssh 密钥中，取名任意

3. 配置 config 文件
   - 目录：`~/.ssh/config`

```bash
# gitee

    Host gitee.com
    HostName gitee.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_gitee
    User 邮箱/用户名

# github

    Host github.com
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_github
    User 邮箱/用户名

```

4. 设置当前文件夹 git 账号

```bash
git config user.name "your_name"
git config user.email "your_email@example.com"
```

5. 拉取项目

```bash
git clone `ssh链接`
git clone git@github.com:your_name/your_project.git
```
