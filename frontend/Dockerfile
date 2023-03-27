
FROM node:18.12.1 as builder

WORKDIR /app

COPY package.json .
RUN npm i
COPY . .
RUN npm run build

# =================== frontend nginx 적용 X ============================
EXPOSE 3000
CMD ["npm", "run", "start"]

# =================== frontend nginx 적용 시 ============================
# 현재 아래 설정으로 build 후 접속시 500 Internal Server Error 발생
# Next.js 설정 문제로 추정되어 nginx 제외로 임시 배포
# FROM nginx:alpine
# COPY --from=builder /app/.next /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]
