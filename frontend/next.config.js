/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['k.kakaocdn.net'],
    domains: ['www.bigkinds.or.kr'] // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  }
}
