#!/usr/bin/env bash
# IYCMS 2.3.4 一键安装脚本
# 用法:
#   bash install.sh                     # 交互式，使用默认路径与端口
#   bash install.sh --db-root-pass xxx  # 非交互，适用于自动化
# 支持 Debian/Ubuntu 与 RHEL/CentOS/Alma/Rocky。
set -Eeuo pipefail
umask 022

APP_DIR="${APP_DIR:-/www/wwwroot/iycms}"
HTTP_PORT="${HTTP_PORT:-51200}"
BACKEND_PORT="${BACKEND_PORT:-21007}"
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-iycms}"
DB_USER="${DB_USER:-iycms}"
DB_PASS="${DB_PASS:-}"
DB_ROOT_PASS="${DB_ROOT_PASS:-}"
SERVICE_NAME="${SERVICE_NAME:-iycms}"
ARCHIVE_URL="${ARCHIVE_URL:-https://github.com/Minerchu/iycms-archive/releases/download/v2.3.4/iycms-backup-2026-11-07.tar.gz}"
ARCHIVE_SHA256="${ARCHIVE_SHA256:-9c30108c63dcc455d9f15a501508aa133faff36faa120d82275ef412f6b063bc}"

SKIP_DB=0
SKIP_START=0
NO_DEPS=0
FORCE=0
DRY_RUN=0

log()  { printf '\033[1;34m[iycms]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warn]\033[0m %s\n' "$*"; }
die()  { printf '\033[1;31m[error]\033[0m %s\n' "$*" >&2; exit 1; }

ask_secret() {
  local v=""
  if [[ -r /dev/tty ]]; then
    read -r -s -p "$1" v < /dev/tty
    printf '\n' >&2
  else
    die "需要交互输入，但当前没有终端；请通过环境变量或参数传入"
  fi
  printf '%s' "$v"
}

usage() {
  cat <<'EOF'
IYCMS 2.3.4 一键安装

用法:
  sudo bash install.sh [选项]

选项:
  --dir PATH            安装目录，默认 /www/wwwroot/iycms
  --http-port N         前台端口，默认 51200
  --backend-port N      后台端口，默认 21007
  --db-host H           数据库地址，默认 127.0.0.1
  --db-port N           数据库端口，默认 3306
  --db-name N           数据库名，默认 iycms
  --db-user N           数据库账号，默认 iycms
  --db-pass P           数据库密码，默认自动生成
  --db-root-pass P      MySQL root 密码（本地 socket 认证时可省略）
  --skip-db             跳过建库（使用已有数据库）
  --skip-start          只安装文件，不启动 systemd 服务
  --no-deps             不自动安装系统依赖
  --force               覆盖已有安装（会备份 config.conf）
  --dry-run             只打印计划，不执行
  -h, --help            显示帮助

环境变量同参数名大写，例如:
  DB_ROOT_PASS=xxx HTTP_PORT=51200 bash install.sh

安装完成后访问:
  http://服务器IP:51200/install
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir) APP_DIR="$2"; shift 2 ;;
    --http-port) HTTP_PORT="$2"; shift 2 ;;
    --backend-port) BACKEND_PORT="$2"; shift 2 ;;
    --db-host) DB_HOST="$2"; shift 2 ;;
    --db-port) DB_PORT="$2"; shift 2 ;;
    --db-name) DB_NAME="$2"; shift 2 ;;
    --db-user) DB_USER="$2"; shift 2 ;;
    --db-pass) DB_PASS="$2"; shift 2 ;;
    --db-root-pass) DB_ROOT_PASS="$2"; shift 2 ;;
    --skip-db) SKIP_DB=1; shift ;;
    --skip-start) SKIP_START=1; shift ;;
    --no-deps) NO_DEPS=1; shift ;;
    --force) FORCE=1; shift ;;
    --dry-run) DRY_RUN=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) die "未知参数: $1（--help 查看用法）" ;;
  esac
done

[[ "$DB_NAME" =~ ^[A-Za-z0-9_]+$ ]] || die "数据库名只允许字母、数字、下划线"
[[ "$DB_USER" =~ ^[A-Za-z0-9_]+$ ]] || die "数据库账号只允许字母、数字、下划线"
[[ "$HTTP_PORT" =~ ^[0-9]+$ && "$BACKEND_PORT" =~ ^[0-9]+$ ]] || die "端口必须是数字"

if [[ "$DRY_RUN" -eq 0 ]]; then
  [[ ${EUID:-$(id -u)} -eq 0 ]] || die "请使用 root 运行（sudo bash install.sh）"
fi

if [[ -f "$APP_DIR/install.lock" && "$FORCE" -eq 0 ]]; then
  die "$APP_DIR 已安装过（存在 install.lock）。重装请加 --force，或换 --dir"
fi
if [[ -d "$APP_DIR" && -n "$(ls -A "$APP_DIR" 2>/dev/null || true)" && "$FORCE" -eq 0 && ! -f "$APP_DIR/install.lock" ]]; then
  die "$APP_DIR 非空。请换目录，或加 --force 覆盖"
fi

if [[ "$DRY_RUN" -eq 1 ]]; then
  cat <<EOF
[iycms] dry-run 计划:
  安装目录 : $APP_DIR
  前台端口 : $HTTP_PORT
  后台端口 : $BACKEND_PORT
  数据库   : $DB_HOST:$DB_PORT / $DB_NAME / $DB_USER
  归档地址 : $ARCHIVE_URL
  服务名   : $SERVICE_NAME
  跳过建库 : $SKIP_DB
  跳过启动 : $SKIP_START
EOF
  exit 0
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

install_deps() {
  local need_mysql=0
  command -v mysql >/dev/null 2>&1 || need_mysql=1
  local need=0
  for c in curl tar gzip sha256sum; do
    command -v "$c" >/dev/null 2>&1 || need=1
  done
  if [[ "$need" -eq 0 && "$need_mysql" -eq 0 ]]; then return 0; fi
  log "安装系统依赖（curl tar gzip coreutils mysql-client）"
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y curl tar gzip coreutils ca-certificates || true
    DEBIAN_FRONTEND=noninteractive apt-get install -y default-mysql-client || \
      DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-client || true
  elif command -v dnf >/dev/null 2>&1; then
    dnf install -y curl tar gzip coreutils ca-certificates mysql || true
  elif command -v yum >/dev/null 2>&1; then
    yum install -y curl tar gzip coreutils ca-certificates mysql || true
  else
    warn "未识别包管理器，请手动安装缺失依赖"
  fi
}

gen_pass() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 12
  else
    head -c 24 /dev/urandom | od -An -tx1 | tr -d ' \n' | cut -c1-24
  fi
}

MYSQL_ROOT_ARGS=()
build_mysql_root_args() {
  MYSQL_ROOT_ARGS=(-u root)
  if [[ "$DB_HOST" != "127.0.0.1" && "$DB_HOST" != "localhost" ]]; then
    MYSQL_ROOT_ARGS+=(-h "$DB_HOST" -P "$DB_PORT")
  fi
  if [[ -n "$DB_ROOT_PASS" ]]; then
    MYSQL_ROOT_ARGS+=("-p$DB_ROOT_PASS")
  fi
}

mysql_root() {
  mysql "${MYSQL_ROOT_ARGS[@]}" "$@"
}

ensure_mysql_root() {
  build_mysql_root_args
  if mysql_root -e 'SELECT 1' >/dev/null 2>&1; then return 0; fi
  if [[ -z "$DB_ROOT_PASS" ]]; then
    warn "无法免密连接 MySQL，需要 root 密码"
    DB_ROOT_PASS="$(ask_secret 'MySQL root 密码: ')"
    build_mysql_root_args
    mysql_root -e 'SELECT 1' >/dev/null 2>&1 || die "MySQL root 认证失败"
  else
    die "MySQL root 认证失败，请检查 --db-root-pass"
  fi
}

[ "$NO_DEPS" -eq 1 ] || install_deps
command -v curl >/dev/null 2>&1 || die "缺少 curl"
command -v tar  >/dev/null 2>&1 || die "缺少 tar"

if command -v ss >/dev/null 2>&1; then
  if ss -ltn 2>/dev/null | awk '{print $4}' | grep -Eq "[:.](${HTTP_PORT}|${BACKEND_PORT})$"; then
    die "端口 $HTTP_PORT 或 $BACKEND_PORT 已被占用，请用 --http-port / --backend-port 更换"
  fi
fi

if [[ -f "$APP_DIR/config.conf" && "$FORCE" -eq 1 ]]; then
  cp "$APP_DIR/config.conf" "$APP_DIR/config.conf.bak.$(date +%s)"
  warn "已备份原 config.conf"
fi

log "创建目录 $APP_DIR"
mkdir -p "$APP_DIR"

log "下载 IYCMS 归档（约 86MB）"
curl -fL --retry 3 --connect-timeout 15 --progress-bar -o "$TMP_DIR/iycms.tar.gz" "$ARCHIVE_URL"
if [[ -n "$ARCHIVE_SHA256" ]]; then
  echo "$ARCHIVE_SHA256  $TMP_DIR/iycms.tar.gz" | sha256sum -c - >/dev/null || die "归档校验失败"
  log "SHA256 校验通过"
fi

log "解压到 $APP_DIR"
tar xzf "$TMP_DIR/iycms.tar.gz" -C "$APP_DIR" --strip-components=1
chmod +x "$APP_DIR/cms"
[[ -f "$APP_DIR/html/install/install.html" ]] || die "解压结果不完整：缺少 html/install"

if [[ "$SKIP_DB" -eq 0 ]]; then
  command -v mysql >/dev/null 2>&1 || die "缺少 mysql 客户端；可先建库后加 --skip-db"
  [[ -n "$DB_PASS" ]] || DB_PASS="$(gen_pass)"
  ensure_mysql_root
  log "创建数据库 $DB_NAME 与账号 $DB_USER"
  db_pass_sql="${DB_PASS//\'/\'\'}"
  mysql_root <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${db_pass_sql}';
ALTER USER '${DB_USER}'@'127.0.0.1' IDENTIFIED BY '${db_pass_sql}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'127.0.0.1';
FLUSH PRIVILEGES;
SQL
else
  log "跳过建库（--skip-db）"
  [[ -n "$DB_PASS" ]] || DB_PASS="CHANGE_ME"
fi

log "写入 $APP_DIR/config.conf"
cat > "$APP_DIR/config.conf" <<EOF
{
	"dbType": 2,
	"dbHost": "${DB_HOST}",
	"dbName": "${DB_NAME}",
	"dbUser": "${DB_USER}",
	"dbPassword": "${DB_PASS}",
	"dbPort": ${DB_PORT},
	"backendPort": ${BACKEND_PORT},
	"openHttp": true,
	"httpPort": ${HTTP_PORT},
	"openHttps": false,
	"httpsPort": 443,
	"env": ""
}
EOF
chmod 600 "$APP_DIR/config.conf"

log "写入 systemd 服务 /etc/systemd/system/${SERVICE_NAME}.service"
cat > "/etc/systemd/system/${SERVICE_NAME}.service" <<EOF
[Unit]
Description=iycms service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=${APP_DIR}
ExecStart=${APP_DIR}/cms
Restart=always
RestartSec=5
StandardOutput=append:${APP_DIR}/stdout.log
StandardError=append:${APP_DIR}/stdout.log

[Install]
WantedBy=multi-user.target
EOF

if [[ "$SKIP_START" -eq 0 ]]; then
  systemctl daemon-reload
  systemctl enable "$SERVICE_NAME" >/dev/null 2>&1 || true
  systemctl restart "$SERVICE_NAME"
  log "等待服务监听 $HTTP_PORT ..."
  ok=0
  for _ in $(seq 1 30); do
    code="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${HTTP_PORT}/" || true)"
    if [[ "$code" == "200" ]]; then ok=1; break; fi
    sleep 1
  done
  if [[ "$ok" -eq 0 ]]; then
    warn "服务未在 30 秒内返回 200，请检查: journalctl -u ${SERVICE_NAME} -n 100 --no-pager"
  fi
else
  log "跳过启动（--skip-start）"
fi

IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
[[ -n "$IP" ]] || IP="服务器IP"

cat <<EOF

============================================================
 IYCMS 2.3.4 安装完成
------------------------------------------------------------
 安装目录 : $APP_DIR
 前台     : http://${IP}:${HTTP_PORT}/
 后台     : http://${IP}:${BACKEND_PORT}/backend/
 安装向导 : http://${IP}:${HTTP_PORT}/install
 数据库   : ${DB_NAME} / ${DB_USER} / ${DB_PASS}
 配置文件 : $APP_DIR/config.conf
 服务管理 : systemctl status ${SERVICE_NAME}
            systemctl restart ${SERVICE_NAME}
------------------------------------------------------------
 下一步:
 1. 打开安装向导完成数据库初始化（会生成 install.lock）
 2. 登录后台后立即修改初始密码
 3. 用 nginx 反代 80/443，不要直接暴露 ${BACKEND_PORT}
============================================================
EOF
