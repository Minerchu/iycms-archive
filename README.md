# IYCMS 2.3.4 Archive

IYCMS（`iycms.com`）官方站点已无法访问。本仓库保存一份从运行实例导出的 **IYCMS 2.3.4** 可运行程序备份，以及配套的安装 / 运维文档。

- 文档站：https://minerchu.github.io/iycms-archive/
- 归档日期：2026-11-07
- 程序版本：2.3.4（从实例二进制中提取）
- 主程序：`package/cms`，85 MB，ELF 64-bit x86-64，Go 编译，stripped

## 仓库内容

```
package/
  cms                     # 主程序（需 chmod +x）
  html/                   # 前台 / 后台 / 安装向导 / API 文档
  data/tpl/               # 内置模板
  data/                   # 其余运行时目录（空目录占位）
  config.example.json     # 配置模板（不含真实密码）
  iycms.service           # systemd 单元样例
docs/                     # GitHub Pages 文档站
checksums.sha256          # 校验值
```

## 快速开始

```bash
mkdir -p /www/wwwroot/iycms && cd /www/wwwroot/iycms
# 上传 package/ 内容或解压归档包
chmod +x cms
cp config.example.json config.conf   # 填写数据库信息
# 写入 systemd 单元并启动（详见文档）
systemctl enable --now iycms
```

首次启动后访问 `http://服务器IP:51200/install` 完成安装向导。

完整步骤（含截图）：<https://minerchu.github.io/iycms-archive/install.html>

## 校验值

见 [`checksums.sha256`](./checksums.sha256)。主程序 SHA256：

```
8af6a807679fc439e3cbc136a7b3f42df752de91f87aa4d381711b2a47360912
```

## 脱敏说明

本仓库**不包含**以下内容：

- `config.conf` 中的真实数据库密码（改为 `config.example.json`）
- `install.lock`、`data/key/`、`data/token/`
- `data/cache/`、`data/uploadFile/`、`data/app/`（用户上传与 134MB 安装包）
- `stdout.log`（原文件约 802MB）

## 版权

IYCMS 版权归原作者所有。本仓库仅用于官方停止服务后的个人存档、迁移与继续运维，不构成任何授权或再分发许可。请自行评估公开分发的法律风险。

