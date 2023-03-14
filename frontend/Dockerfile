
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
# TODO
#  - /app/dist는 vue 폴더이므로 nextjs에 맞는 폴더로 변경
#  - nginx 설정 폴더, nginx.conf 파일 추가.

# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]
