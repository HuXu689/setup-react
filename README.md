# Welcome to Setup-React

This is sample for project react. Use react-router

List các công cụ sử dụng:

- Prettier, ESLint, Husky và committlint

1. Giải thích file
   tsconfig.jso : chứa các edit về typescript
   react-router.config.ts: bật tắt chế độ SSR hoặc CSR (SSR cần cài nodejs để chạy, CSR không cần: theo dõi thư mục build, buld trước start:csr sau)
   package.json: chứa dependences của dự án (build: build sourcecode để deploy, start: để deploy, dev: chạy code, typecheck: kiểm tra có lỗi cú pháp ts không)
   .gitignore: chứa các thư mục không cần đẩy lên git
   app>root.tsx: chứa metadata dùng cho SEO
   .editorconfig: Thống nhất cách viết code (thụt dòng, xuống dòng, charset…) giữa các máy và IDE
   .prettierrc: Cấu hình cách Prettier tự động format code. Cài format on save để tự động format code khi lưu file
   .prettierignore: Không format những file/thư mục được ghi vào
2. Các bước setup

- Tạo dự án react router: npx create-react-router@latest setup-react
- Cài vite-plugin-devtools-json(Node version>=20: nvm use 22.14.0): npm install -D vite-plugin-devtools-json
- import devtoolsJson from "vite-plugin-devtools-json" trong vite.config.ts và thêm devtoolsJson() trong plugin
- Cài extensions cho vs code: EditorConfig for VS Code, Prettier - Code formatter, Material Icon Theme, ESLint
- Tạo file: .editorconfig, .prettierrc, .prettierignore, eslint.config.js
- Đến (3.)
- Đến (4.)
- Đến (5.)
- Thêm vào scripts package.json: "start:csr": "vite preview --port 3000"

3. Format code all file with prettier

- Cài thư viện: npm i prettier -D
- Thêm vào scripts package.json: "prettier": "prettier --check .", "prettier:fix": "prettier --write ."
- Chạy: npm run prettier, npm run prettier:fix

4. Format eslint all file: Kiểm tra code style

- Sửa file eslint.config.js theo https://github.com/vitejs/vite/blob/main/packages/create-vite/template-react-ts/eslint.config.js
- Thêm globalIgnores(['dist', 'build', 'node_modules', 'react-router', 'coverage', 'public', 'out', 'lib']) để loại bỏ thư mục không cần theo eslint
- Cài thư viện theo file eslint.config.js
- Thêm vào scripts package.json: "lint": "eslint .", "lint:fix": "eslint . --fix"
- Chạy: npm run lint, npm run lint:fix

5. Dùng alias: Thay vì ../ viết thành ~/

- Vào settings của vs code tới Import Module Specifier
- Sửa JavaScript › Preferences: Import Module Specifier và TypeScript › Preferences: Import Module Specifier thành non-relative
- Muốn thêm các alias khác: vào tsconfig.json thêm vào phần "paths" của "compilerOptions": "@/_": ["../app/_"] (ví dụ)

6. Thay đổi port

- Sửa vite.config.ts:
  export default defineConfig({
  server:{
  port: 3000, // Port for the development server
  host: true, // Allow access from other devices on the network
  strictPort: true, // Prevent the server from trying to use another port if 3000 is already in use
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson()],
  })

7. Bật tắt sourcemap CSS khi dev: để hiển thị css của file nào khi kiểm tra phần tử

- Sửa vite.config.ts thêm:
  css: {
  devSourcemap: true, // Enable sourcemap CSS when dev
  },

8. Cài Husky và committlint: Tự động chạy các lệnh trước khi commit/push code (Như check format code prettier hay eslint), kiểm tra chặn commit sai cú pháp:
   Ví dụ mục đích và cách viết
   Thêm tính năng: "feat: thêm trang giỏ hàng"
   Sửa lỗi: "fix: sửa lỗi đăng nhập"
   Cập nhật phụ: "chore: update dependencies"
   Refactor code: "refactor: tách component"
   Viết test: "test: thêm test cho nút Save"

- Tạo file commitlint.config.cjs:
  module.exports = {
  extends: ['@commitlint/config-conventional'],
  }
- Cài thư viện: npm install --save-dev husky @commitlint/config-conventional @commitlint/cli
- Khởi tạo Husky: npx husky install
- Thêm vào scripts package.json: "prepare": "husky install"
- Tạo Git hook để kiểm tra message commit(Tạo file .husky/commit-msg): npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$
- Tạo file .gitattributes để tự động chuyển CRLF → LF khi commit: \* text=auto eol=lf
- Sửa file commit-msg (Trong foulder .husky):
  #!/usr/bin/env sh
  npx --no -- commitlint --edit "$1"
- Sửa file pre-commit (Trong foulder .husky):
  #!/usr/bin/env sh
  npm run lint
  npm run prettier:fix

9. Tip dùng git:

- git gcam "feat: thêm chức năng tìm kiếm" || git commit -am "feat: thêm chức năng tìm kiếm" : Tự động git add và git commit
- git gp || git push : Đẩy code lên GitHub
- git gst || git status : Kiểm tra trạng thái file
- git gco <branch> || git checkout <branch> : Chuyển nhánh
- git gcb <branch> || git checkout -b <branch> : Tạo nhánh mới
- git gl || git log --oneline --graph --decorate --all : Xem lịch sử commit dạng cây
  Cách setup:
  git config --global alias.gcam 'commit -am'
  git config --global alias.gp 'push'
  git config --global alias.gst 'status'
  git config --global alias.gco 'checkout'
  git config --global alias.gcb 'checkout -b'
  git config --global alias.gl 'log --oneline --graph --decorate --all'
