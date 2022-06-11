# 一、环境准备
# windows系统安装docker desktop桌面端 网络环境一定要稳定 你懂得！

# 二、制作镜像(软件包)
# step1 ： 项目根目录下创建Dockerfile文件
# vi Dockerfile

# step2 ： 在Dockerfile文件中添加一个CMD命令
# node版本号
# FROM node:15-alpine as builder
# # 工作目录
# WORKDIR /create-react-app
# # 添加所有文件到create-react-app目录
# ADD . /create-react-app
# ADD package.json package-lock.json  /create-react-app/
# # 执行命令
# RUN npm ci
# RUN npm run build
# FROM nginx:alpine
# # 部署前端我们只需要静态生成的静态资源，只需要提取编译后的文件到ngix即可
# COPY --from=builder /create-react-app/build /usr/share/nginx/html
FROM node:15-alpine as builder
WORKDIR /create-react-app
ADD . /create-react-app
ADD package.json package-lock.json  /create-react-app/
RUN npm ci
RUN npm run build
FROM nginx:alpine
COPY --from=builder /create-react-app/build /usr/share/nginx/html

# step3 : 创建一个Docker镜像 ， 类似编译成一个exe
# docker image build --progress plain -t create-react-app-demo .

# step4 : 启动镜像，创建一个镜像实例（容器）
# // 将Dockerfile中暴露出来的3000端口映射到本机的1234端口
# docker container run -p 1234:3000 create-react-app-demo 

# step5 : 容器启动之后，打开浏览器，访问http://localhost:1234/



# =====================================================================================
#   dokcer 镜像优化--优化镜像文件大小
# =====================================================================================
# 1、docker images  查看镜像软件大小

# 2、不要用http-server，用nginx